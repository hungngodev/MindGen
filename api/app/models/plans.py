from app.extensions import db


class Plan(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text)
    role = db.Column(db.Text)
    def __repr__(self):
        return f'<Plan "{self.title}">'