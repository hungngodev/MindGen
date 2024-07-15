from app.extensions import db
from sqlalchemy.sql import func
from sqlalchemy import Integer, String, Text, Column, ForeignKey, Float, DateTime, List
from sqlalchemy.orm import Mapped, mapped_column, relationship
from api.app.models.logs import Log


class Plan(db.Model):
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    
    content: Mapped[str] = mapped_column(String, nullable=False)    
    role: Mapped[str] = mapped_column(String, nullable=False)
    
    created_at: Mapped[DateTime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    
    logs: Mapped[List["Log"]] = relationship(
        back_populates="plan", cascade="all, delete-orphan"
    )
    def __repr__(self) -> str:
        return f"<Plan {self.id}>"
