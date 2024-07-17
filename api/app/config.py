import os
from dotenv import load_dotenv

load_dotenv()
basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
    SECRET_KEY = os.getenv('FLASK_SECRET') 
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL') 
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    OPENAI_API_KEY = os.getenv('OPENAI_API_KEY') 
    FLASK_APP = os.getenv('FLASK_APP')
    FLASK_ENV = os.getenv('FLASK_ENV')
    FLASK_DEBUG = os.getenv('FLASK_DEBUG')
# 'sqlite:///' + os.path.join(basedir, 'map-gen.db')