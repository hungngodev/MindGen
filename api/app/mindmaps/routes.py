from app.plans import bp
from app.extensions import db
from flask import jsonify, redirect, request, current_app
from app.services.OpenAI import planOpenAIRequest
from sqlalchemy import desc,asc
from dotenv import load_dotenv
import os
from datetime import datetime
import uuid
load_dotenv()

@bp.route('/saved', methods=['GET', 'POST'])
async def index():
    User = current_app.config['myUser']
    
    if current_app.config['session']:
        session = current_app.config['session']
        userId = str(session['sub'])
        currentUser = db.session.get(User, userId)

    if request.method == 'GET':
        
        return jsonify({"history" : "history" })
    
    elif request.method == 'POST':

        return jsonify({"message": "POST method"})



