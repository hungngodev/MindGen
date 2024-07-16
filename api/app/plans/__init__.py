from flask import Blueprint

bp = Blueprint('plan', __name__)



from app.plans import routes