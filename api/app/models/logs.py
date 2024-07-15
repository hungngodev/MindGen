from typing import TYPE_CHECKING, Optional
from app.extensions import db
from sqlalchemy import (Column, DateTime, Float, ForeignKey, Integer, String,
                        Text)
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from sqlalchemy.sql import func

if TYPE_CHECKING:
    from app.models.plans import Plan
class Log(db.Model):
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    input : Mapped[str] = mapped_column(String, nullable=False)    
    output : Mapped[str] = mapped_column(String, nullable=False)    
    model: Mapped[str] = mapped_column(String, nullable=False)    
    type: Mapped[str] = mapped_column(String, nullable=False)    
    
    created_at: Mapped[DateTime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    
    inputToken: Mapped[Optional[int]] = mapped_column(Integer, nullable=True, default=0)
    outputToken: Mapped[Optional[int]] = mapped_column(Integer, nullable=True, default=0)
    cost: Mapped[Optional[float]] = mapped_column(Float, nullable=True, default=0.0)
    time_taken: Mapped[Optional[float]] = mapped_column(Float, nullable=True, default=0.0)

    
    plan_id: Mapped[int] = mapped_column(Integer, ForeignKey("plan.id"))
    plan: Mapped["Plan"] = relationship("Plan", back_populates="logs")
    
    
    
    def __repr__(self) -> str:
        return f"<Log {self.input} {self.output} {self.model} {self.type} {self.inputToken} {self.created_at}>"
