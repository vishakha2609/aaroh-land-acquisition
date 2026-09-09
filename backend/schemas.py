from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class ProjectCreate(BaseModel):

    project_id: Optional[str] = None

    project_name: str

    district: str

    state: str

    project_type: str

    land_area: float = Field(gt=0)

    affected_families: int = Field(
        default=0,
        ge=0
    )

    landowners: int = Field(
        default=0,
        ge=0
    )

    compensation_completion: float = Field(
        default=0,
        ge=0,
        le=100
    )

    legal_dispute: bool = False

    court_cases: int = Field(
        default=0,
        ge=0
    )

    ownership_conflict: bool = False

    approval_delay_days: int = Field(
        default=0,
        ge=0
    )

    possession_pct: float = Field(
        default=0,
        ge=0,
        le=100
    )

    rehabilitation_pct: float = Field(
        default=0,
        ge=0,
        le=100
    )

    stakeholder_response: str = "Normal"


class ProjectResponse(BaseModel):

    id: int

    project_id: str

    project_name: str

    district: Optional[str]

    state: Optional[str]

    project_type: Optional[str]

    land_area: float

    affected_families: int

    landowners: int

    compensation_completion: float

    legal_dispute: bool

    court_cases: int

    ownership_conflict: bool

    approval_delay_days: int

    possession_pct: float

    rehabilitation_pct: float

    stakeholder_response: str

    prediction_status: str

    delay_probability: float

    predicted_delay_days: float

    risk_score: float

    risk_level: str

    public_status: str

    created_at: datetime

    class Config:
        from_attributes = True