from sqlalchemy import create_engine, text
import json
from flask import jsonify, redirect, request, current_app
from sqlalchemy import desc,asc
from dotenv import load_dotenv
import os
from datetime import datetime
import uuid
from api.app.services.parseFilter import build_raw_sql_query
from api.app.admin import bp
from api.app.extensions import db


load_dotenv()
engine = create_engine(os.getenv('FLASK_DATABASE_URL'))

@bp.route('/statistics', methods=['GET', 'POST', 'DELETE'])
async def index():
    User = current_app.config['myUser']
    Log = current_app.config['myLog']
    
    if current_app.config['session']:
        session = current_app.config['session']
        userId = str(session['sub'])
        currentUser = db.session.get(User, userId)

    if request.method == 'GET':
        filterData = json.loads(request.args.get('filter'))
        tableData = []
        with engine.connect() as connection:
            queries = build_raw_sql_query(filterData)
            current_app.logger.info(queries)
            query = text(queries)
            logs = connection.execute(query)
            for log in logs:
      
                tableData.append({
                    "id": log.id,
                    "status": log.type.split('.')[-1],
                    "email": log.user_email,
                    "inputToken": log.input_token,
                    "outputToken": log.output_token,
                    "cost": log.cost,
                    "model": log.model,
                    "createdAt": datetime.strftime(log.created_at, '%Y-%m-%d %H:%M:%S'),
                    "timeTaken": log.time_taken ,
                })   
        return jsonify({"tableData": tableData })
    
    if request.method == 'DELETE':
        filterData = json.loads(request.data)
        idToDelete = filterData['idToDelete']
        current_app.logger.info(idToDelete)
        return jsonify({"message": "Deleted" })
 
