from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime
from datetime import datetime

from database import Base


class Project(Base):

    __tablename__ = "projects"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    project_id = Column(
        String,
        unique=True,
        index=True,
        nullable=False
    )

    project_name = Column(
        String,
        nullable=False
    )

    district = Column(String)

    state = Column(String)

    latitude = Column(Float)

    longitude = Column(Float)

    project_type = Column(String)

    land_area = Column(Float)

    affected_families = Column(Integer)

    landowners = Column(Integer)

    compensation_completion = Column(Float)

    legal_dispute = Column(Boolean)

    court_cases = Column(Integer)

    ownership_conflict = Column(Boolean)

    approval_delay_days = Column(Integer)

    possession_pct = Column(Float)

    rehabilitation_pct = Column(Float)

    stakeholder_response = Column(String)

    prediction_status = Column(String)

    delay_probability = Column(Float)

    predicted_delay_days = Column(Float)

    risk_score = Column(Float)

    risk_level = Column(String)

    public_status = Column(String)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )