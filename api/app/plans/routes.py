from app.plans import bp
from app.extensions import db
from flask import jsonify, redirect, request, current_app
from app.services.OpenAI import planGenerated
from app.models.plans import Plan
from sqlalchemy import desc

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
        db.session.add(newUserPlan)
        planResponse = await planGenerated(planData)
        newBotPlan = Plan(content=planResponse, role="bot")
        db.session.add(newBotPlan)
        db.session.commit()
        return jsonify({"message": planResponse})

