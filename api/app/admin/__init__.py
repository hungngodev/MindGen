from flask import Blueprint

bp = Blueprint('admin', __name__)

from api.app.admin import routes