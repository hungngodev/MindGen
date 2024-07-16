from app.plans import bp
from app.extensions import db
from flask import jsonify, redirect, request, current_app
from app.services.OpenAI import planOpenAIRequest
from app.models.plans import Plan
from sqlalchemy import desc
from app.models.logs import Log
from dotenv import load_dotenv
import os
from datetime import datetime
load_dotenv()

@bp.route('/', methods=['GET', 'POST'])
async def index():
    if request.method == 'GET':
        current_app.logger.info(request.cookies)
        for i in request.cookies:
            current_app.logger.info(f"Cookie: {i} = {request.cookies[i]}")
        current_app.logger.info('GET all chat history')
        plans = Plan.query.order_by(desc(Plan.created_at)).all()
        history = []
        for plan in plans:
            history.append({"content": plan.content, "role": plan.role})
        return jsonify({"history" :history })
    elif request.method == 'POST':
        jsonData = request.get_json()
        planData = jsonData['plan']
        newUserPlan = Plan(content=planData, role="user")
        newInputLog = Log(input=planData, output="processing", model="gpt-4o", type="chat.completions.processing")
        inputTimeStamp = datetime.now()
        newUserPlan.logs.append(newInputLog)
        db.session.add(newUserPlan)
        db.session.commit()
        
        planResponse = await planOpenAIRequest(planData)
        planGenerated = planResponse.choices[0].message.content
        newBotPlan = Plan(content=planGenerated, role="bot")

        newOutputLog = Log(
                input = planData,
                output= planGenerated,
                 model= "gpt-4o",
                 type="chat.completions.processed",
                 time_taken =float((datetime.now() - inputTimeStamp).total_seconds()),
                 inputToken = planResponse.usage.prompt_tokens,
                 outputToken = planResponse.usage.completion_tokens,
                 cost = planResponse.usage.prompt_tokens * float(os.getenv("OPENAI_INPUT_COST")) + planResponse.usage.completion_tokens * float(os.getenv("OPENAI_OUTPUT_COST"))
        )
        
        newUserPlan.logs.append(newOutputLog)
        db.session.add(newBotPlan)
        db.session.commit()
        return jsonify({"message": planGenerated})

