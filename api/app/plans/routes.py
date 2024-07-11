from app.plans import bp
from app.extensions import db
from flask import jsonify, redirect, request
from app.services.OpenAI import planGenerated
from app.models.plans import Plan

@bp.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'GET':
        print("get")
        return jsonify({"message": "GET method"})
    elif request.method == 'POST':
        jsonData = request.get_json()
        planData = jsonData['plan']
        planResponse = planGenerated(planData)
        return jsonify({"message": planResponse})

@bp.route('/save', methods=['POST'])
def save():
    jsonData = request.get_json()
    planData = jsonData['plan']
    plan = Plan(content=planData)
    db.session.add(plan)
    db.session.commit()
    return jsonify({"message": "Plan saved successfully"})