from flask import render_template, jsonify
from app.main import bp


@bp.route('/')
def index():
    return jsonify({"message": "GET method"})