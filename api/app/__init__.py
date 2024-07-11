from flask import Flask, jsonify, redirect, url_for, request, render_template, session
from flask_cors import CORS, cross_origin

from api.app.config import Config
from app.extensions import db

def create_app(config_class=Config):
    app = Flask(__name__)
    cors = CORS(app)
    app.config.from_object(config_class)
    app.logger.info('Starting the Flask App')
    # Initialize Flask extensions here
    db.init_app(app)
    
    from app.models.plans import Plan
    # Register blueprints here
    from app.main import bp as main_bp
    app.register_blueprint(main_bp)

    from app.plans import bp as plans_bp
    app.register_blueprint(plans_bp, url_prefix='/api/plan')

    @app.route('/api/test')
    def test_page():
        return jsonify({"message": "GET method"})
    
    with app.app_context():
        db.create_all()
    return app