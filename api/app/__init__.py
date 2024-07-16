from flask import Flask, jsonify, redirect, url_for, request, render_template, session
from flask_cors import CORS, cross_origin
from sqlalchemy.ext.automap import automap_base
from sqlalchemy import MetaData, Integer
from api.app.config import Config
from app.extensions import db
from sqlalchemy.orm import relationship, Mapped, mapped_column
from typing import List

def create_app(config_class=Config):
    app = Flask(__name__)
    cors = CORS(app)
    app.config.from_object(config_class)
    app.logger.info('Starting the Flask App')
    # Initialize Flask extensions here
    db.init_app(app)
    
    def checkAuth():
        app.logger.info('Before request')
        for i in request.cookies:
            app.logger.info(f'{i}: {request.cookies[i]}')
            

    from app.main import bp as main_bp
    app.register_blueprint(main_bp)

    app.before_request_funcs= {
        'plan': [checkAuth]
    }

    from app.plans import bp as plans_bp
    app.register_blueprint(plans_bp, url_prefix='/api/plan')

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
            __tablename__ = 'Plan'
            # id: Mapped[int] = mapped_column(Integer, primary_key=True)
#             logs: Mapped[List["Log"]] = relationship(
#        back_populates="plan", cascade="all, delete-orphan"
#   )
        class Log(Base):
            __tablename__ = 'Log'
            # id: Mapped[int] = mapped_column(Integer, primary_key=True)
            # plan: Mapped["Plan"] = relationship("Plan", back_populates="logs")
            pass
    
        Base.prepare(db.engine, reflect=True)

        app.config['myPlan'] = Plan
        app.config['myLog'] = Log

    return app