from typing import List
from app.extensions import db
from flask import (Flask, jsonify, redirect, render_template, request, session,
                   url_for)
from flask_cors import CORS, cross_origin
from api.app.services.jwt import get_token
from sqlalchemy import Integer, MetaData
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Mapped, mapped_column, relationship
from api.app.config import Config


def create_app(config_class=Config):
    app = Flask(__name__)
    cors = CORS(app)
    app.config.from_object(config_class)
    app.logger.info('Starting the Flask App')
    # Initialize Flask extensions here
    db.init_app(app)
    
    @app.before_request
    def checkAuth():
        app.logger.info('Before request')
        session_token = request.cookies.get('next-auth.session-token')
        app.config['session'] = None
        if session_token:
            session = get_token(session_token)
            app.config['session'] = session
            

            

    from app.main import bp as main_bp
    app.register_blueprint(main_bp)


    from app.plans import bp as plans_bp
    app.register_blueprint(plans_bp, url_prefix='/api/plan')
    
    from app.mindmaps import bp as mindmaps_bp
    app.register_blueprint(mindmaps_bp, url_prefix='/api/mindmap')
    
    from app.admin import bp as admin_bp
    app.register_blueprint(admin_bp, url_prefix='/api/admin')

    @app.route('/api/test', methods = ['GET', 'POST'])
    def test_page():
        if request.method == 'GET':
            return jsonify({"message": "GET method"})
    
    with app.app_context():
        #db.create_all()
        metadata = MetaData()
        metadata.reflect(db.engine)
        Base = automap_base(metadata=metadata)
        db.reflect()
  
        class Plan(Base):
            __tablename__ = 'plans'
#   )
        class Log(Base):
            __tablename__ = 'logs'
            
        class User(Base):
            __tablename__ = 'users'
         
        class MindMap(Base):
            __tablename__ = 'mindmaps'

        Base.prepare(db.engine, reflect=True)
        
        User.logs = relationship('Log', back_populates='user')
        User.plans = relationship('Plan', back_populates='user')
        Plan.user = relationship('User', back_populates='plans')
        Log.user = relationship('User', back_populates='logs')
        Plan.logs = relationship('Log', back_populates='plan')
        Log.plan = relationship('Plan', back_populates='logs')
        User.mindmaps = relationship('MindMap', back_populates='user')
        MindMap.user = relationship('User', back_populates='mindmaps')
        
        app.config['myPlan'] = Plan
        app.config['myLog'] = Log
        app.config['myUser'] = User
        app.config['myMindMap']= MindMap
    return app