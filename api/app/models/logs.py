from app.extensions import db
from sqlalchemy.sql import func
from sqlalchemy.orm import DeclarativeBase,relationship
from sqlalchemy import Integer, String, Text, Column, ForeignKey, Float, DateTime
from sqlalchemy.orm import Mapped, mapped_column
from app.models.plans import Plan

class Log(db.Model):
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    input : Mapped[str] = mapped_column(String, nullable=False)    
    output : Mapped[str] = mapped_column(String, nullable=False)    
    model: Mapped[str] = mapped_column(String, nullable=False)    
    type: Mapped[str] = mapped_column(String, nullable=False)    
    
    created_at: Mapped[DateTime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    timme_taken: Mapped[float] = mapped_column(Float)
    
    inputToken :Mapped[int] = mapped_column(Integer)
    outputToken: Mapped[int] = mapped_column(Integer)
    cost: Mapped[float] = mapped_column(Float)
    
    plan_id: Mapped[int] = mapped_column(Integer, ForeignKey("plan.id"))
    plan: Mapped["Plan"] = relationship("Plan", back_populates="logs")
    
    
    def __repr__(self) -> str:
        return f"<Log {self.input} 
    {self.output}
    {self.model}
    {self.type}
    {self.inputToken}
    {self.created_at}
    >"