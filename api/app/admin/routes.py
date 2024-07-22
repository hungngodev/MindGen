from app.admin import bp
from app.extensions import db
from flask import jsonify, redirect, request, current_app
from sqlalchemy import desc,asc
from dotenv import load_dotenv
import os
from datetime import datetime
import uuid

load_dotenv()

@bp.route('/statistics', methods=['GET', 'POST', 'DELETE'])
async def index():
    User = current_app.config['myUser']
    Log = current_app.config['myLog']
    
    if current_app.config['session']:
        session = current_app.config['session']
        userId = str(session['sub'])
        currentUser = db.session.get(User, userId)

    if request.method == 'GET':
        logs = db.session.query(Log).order_by(asc(Log.created_at)).all()
        tableData = []
        for log in logs:
            tableData.append({
                "id": log.id,
                "status": log.type.split('.')[-1],
                "email": log.user.email,
                "inputToken": log.input_token,
                "outputToken": log.output_token,
                "amount": log.cost,
                "model": log.model,
                "createdAt": datetime.strftime(log.created_at, '%Y-%m-%d %H:%M:%S'),
                "timeTaken": log.time_taken ,
            })
     
        return jsonify({"tableData": tableData })
    
    elif request.method == 'POST':
        jsonData = request.get_json()
        elementData = jsonData['elements']
        

        return jsonify({"message": "POST method"})
    
 
