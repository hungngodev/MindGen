from flask import render_template, jsonify,request
from app.main import bp


@bp.route('/')
def index():
    return jsonify({"message": "this is main routes"})