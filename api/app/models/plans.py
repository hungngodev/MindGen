from app.extensions import db
from sqlalchemy.sql import func


class Plan(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text)
    role = db.Column(db.Text)
    created_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.now())
    def __repr__(self) -> str:
        return f"<Plan {self.id}>"