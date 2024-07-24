from flask import Blueprint

bp = Blueprint('main', __name__, url_prefix='/api/hihi')


from api.app.main import routes