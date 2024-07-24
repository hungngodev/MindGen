from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase,relationship

class Base(DeclarativeBase):
    pass

db = SQLAlchemy(model_class=Base)

