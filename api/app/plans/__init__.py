from flask import Blueprint

bp = Blueprint('plan', __name__)



from api.app.plans import routes