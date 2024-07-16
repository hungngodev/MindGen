from flask import Blueprint

bp = Blueprint('main', __name__, url_prefix='/api/hihi')


from app.main import routes