from app.admin import bp
from app.extensions import db
from flask import jsonify, redirect, request, current_app
from sqlalchemy import desc,asc
from dotenv import load_dotenv
import os
from datetime import datetime
import uuid
from app.services.parseFilter import build_raw_sql_query
from sqlalchemy import create_engine, text

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
        logs = db.session.query(Log).order_by(asc(Log.created_at)).all()
        tableData = []
        for log in logs:
            current_app.logger.info(log.model)
            tableData.append({
                "id": log.id,
                "status": log.type.split('.')[-1],
                "email": log.user.email,
                "inputToken": log.input_token,
                "outputToken": log.output_token,
                "cost": log.cost,
                "model": log.model,
                "createdAt": datetime.strftime(log.created_at, '%Y-%m-%d %H:%M:%S'),
                "timeTaken": log.time_taken ,
            })
     
        return jsonify({"tableData": tableData })
    
    elif request.method == 'POST':
        jsonData = request.get_json()
        filterData = jsonData['filter']

        current_app.logger.info(filterData)
        tableData = []
        with engine.connect() as connection:
            queries = build_raw_sql_query(filterData)
            query = text(queries)
            current_app.logger.info(query)
            logs = connection.execute(query)
            current_app.logger.info("executed")
            
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
        

    
 
