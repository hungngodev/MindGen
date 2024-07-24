from flask import Blueprint

bp = Blueprint('mindmap', __name__)



from api.app.mindmaps import routes