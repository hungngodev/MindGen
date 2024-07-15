from app.plans import bp
from app.extensions import db
from flask import jsonify, redirect, request, current_app
from app.services.OpenAI import planGenerated
from app.models.plans import Plan
from sqlalchemy import desc
from app.models.logs import Log
from dotenv import load_dotenv
import os

load_dotenv()

@bp.route('/', methods=['GET', 'POST'])
async def index():
    if request.method == 'GET':
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
        newUserPlan.logs.append(newInputLog)
        db.session.add(newUserPlan)
        db.session.commit()
        
        planResponse = await planGenerated(planData)
        planGenerated = planResponse.choices[0].message.content
        newBotPlan = Plan(content=planGenerated, role="bot")
        
        newUserPlan.logs.append(Log(
                input = planData,
                output= planGenerated,
                 model= "gpt-4o",
                 type="chat.completions.processed",
                 time_taken = planResponse.created - newInputLog.created_at,
                 inputToken = planResponse.usage.prompt_tokens,
                 outputToken = planResponse.usage.completion_tokens,
                 cost = planResponse.usage.prompt_tokens * os.getenv("OPENAI_INPUT_COST") + planResponse.usage.completion_tokens * os.getenv("OPENAI_OUTPUT_COST")
        ))
        db.session.add(newBotPlan)
        db.session.commit()
        return jsonify({"message": planGenerated})

