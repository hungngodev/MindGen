from app.mindmaps import bp
from app.extensions import db
from flask import jsonify, redirect, request, current_app
from app.services.OpenAI import planOpenAIRequest
from sqlalchemy import desc,asc
from dotenv import load_dotenv
import os
from datetime import datetime

import uuid

load_dotenv()

@bp.route('/saved', methods=['GET', 'POST', 'DELETE'])
async def index():
    User = current_app.config['myUser']
    MindMap = current_app.config['myMindMap']
    if current_app.config['session']:
        session = current_app.config['session']
        userId = str(session['sub'])
        currentUser = db.session.get(User, userId)

    if request.method == 'GET':
        allMindmaps = currentUser.mindmaps
        mindmaps = []
        for mindmap in allMindmaps:
            mindmaps.append({"id": mindmap.id, 
                             "elements": mindmap.elements, 
                             "created_at": datetime.strftime(mindmap.created_at, '%Y-%m-%d %H:%M:%S')
            })
        sortedMindMaps = sorted(mindmaps, key=lambda x: x['created_at'], reverse=True)

        return jsonify({"history" : sortedMindMaps })
    
    elif request.method == 'POST':
        jsonData = request.get_json()
        elementData = jsonData['elements']
        newFile  = jsonData['newFile']
        fileName = jsonData['fileName']
        
        findExisting  = db.session.query(MindMap).filter_by(id=fileName).first()
        if not findExisting:
            findExisting = MindMap(id = fileName, elements = elementData)
            db.session.add(findExisting)
        else:
            if newFile:
                return   jsonify({"message": "File already exists"}),409
            findExisting.elements = elementData
            
        findExisting.user = currentUser

        db.session.commit()
        

        return jsonify({"message": "POST method"})
    
    elif request.method == 'DELETE':
        current_app.logger.info('DELETE method')
        jsonData = request.get_json()
        fileName = jsonData['fileName']
        findExisting  = db.session.query(MindMap).filter_by(id=fileName).first()
        if findExisting:
            db.session.delete(findExisting)
            db.session.commit()
        return jsonify({"message": "DELETE method"})


