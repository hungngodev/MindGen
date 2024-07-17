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

@bp.route('/generated', methods=['GET', 'POST'])
async def index():

    Plan = current_app.config['myPlan']
    Log = current_app.config['myLog']
    User = current_app.config['myUser']
    
    if current_app.config['session']:
        session = current_app.config['session']
        user_id = str(session['sub'])
        currentUser = db.session.get(User, user_id)

    if request.method == 'GET':
        current_app.logger.info('GET all chat history')
        plans =db.session.query(Plan).order_by(asc(Plan.created_at)).all()
        history = []
        for plan in plans:
            history.append({"content": plan.content, "role": plan.role})
        return jsonify({"history" :history })
    elif request.method == 'POST':
        jsonData = request.get_json()
        planData = jsonData['plan']
        
        inputTimeStamp = datetime.now()
        
        newUserPlan = Plan(content=planData, role="user" , id = str(uuid.uuid4())  )
        newInputLog = Log( id = str(uuid.uuid4()) , input=planData, output="processing", model="gpt-4o", type="chat.completions.processing")
        
        newUserPlan.log_collection.append(newInputLog)
        currentUser.plan_collection.append(newUserPlan)
        currentUser.log_collection.append(newInputLog)
        
        db.session.add(newUserPlan)
        db.session.commit()
        
        planResponse = await planOpenAIRequest(planData)
        planGenerated = planResponse.choices[0].message.content
        
        newBotPlan = Plan(id = str(uuid.uuid4()) ,content=planGenerated, role="bot")
        newOutputLog = Log(
             id = str(uuid.uuid4()) ,
                input = planData,
                output= planGenerated,
                 model= "gpt-4o",
                 type="chat.completions.processed",
                 time_taken =float((datetime.now() - inputTimeStamp).total_seconds()),
                 inputToken = planResponse.usage.prompt_tokens,
                 outputToken = planResponse.usage.completion_tokens,
                 cost = planResponse.usage.prompt_tokens * float(os.getenv("OPENAI_INPUT_COST")) + planResponse.usage.completion_tokens * float(os.getenv("OPENAI_OUTPUT_COST"))
        )
        
        newUserPlan.log_collection.append(newOutputLog)
        currentUser.plan_collection.append(newBotPlan)
        currentUser.log_collection.append(newOutputLog)
        
        db.session.add(newBotPlan)
        db.session.commit()
        return jsonify({"message": planGenerated})

