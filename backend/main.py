from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import uuid
import pandas as pd
import joblib
import shap
from pathlib import Path

from database import engine, get_db, Base
from models import Project
from schemas import ProjectCreate, ProjectResponse


# ============================================================
# LOAD ML MODEL
# ============================================================

BASE_DIR = Path(__file__).resolve().parent

model = joblib.load(
    BASE_DIR / "land_acquisition_model.pkl"
)


# ============================================================
# SHAP EXPLAINER
# ============================================================

explainer = shap.TreeExplainer(model)


# ============================================================
# SHAP → RECOMMENDATION MAPPING
# ============================================================

recommendation_map = {
    "legal_dispute":
        "Escalate active legal disputes for faster resolution.",

    "compensation_completion":
        "Prioritize pending compensation payments to affected landowners.",

    "stakeholder_response":
        "Increase stakeholder engagement and follow-up.",

    "court_cases":
        "Monitor pending court cases and coordinate with the legal department.",

    "possession_pct":
        "Accelerate land possession through coordination with landowners and field authorities.",

    "rehabilitation_pct":
        "Expedite rehabilitation and resettlement activities for affected families.",

    "approval_delay_days":
        "Expedite pending approvals and coordinate with concerned authorities.",

    "ownership_conflict":
        "Verify ownership records and resolve ownership conflicts.",

    "affected_families":
        "Prioritize stakeholder coordination for affected families.",

    "landowners":
        "Strengthen coordination with affected landowners.",

    "land_area":
        "Strengthen planning and monitoring for the large land acquisition area."
}


# ============================================================
# DATABASE
# ============================================================

Base.metadata.create_all(bind=engine)


# ============================================================
# FASTAPI APP
# ============================================================

app = FastAPI(
    title="Land Acquisition Backend",
    description="Backend API for Land Acquisition Delay Prediction System",
    version="1.0.0"
)


# ============================================================
# CORS
# ============================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================
# HEALTH CHECK
# ============================================================

@app.get("/health")
def health():
    return {"status": "healthy"}


# ============================================================
# ML PREDICTION + SHAP + RECOMMENDATIONS
# ============================================================

@app.post("/api/predict")
def predict_project(project: ProjectCreate):

    stakeholder_mapping = {
        "Good": 0,
        "Normal": 1,
        "Poor": 2
    }

    input_data = pd.DataFrame([{
        "land_area": project.land_area,
        "affected_families": project.affected_families,
        "landowners": project.landowners,
        "compensation_completion": project.compensation_completion,
        "legal_dispute": int(project.legal_dispute),
        "court_cases": project.court_cases,
        "ownership_conflict": int(project.ownership_conflict),
        "approval_delay_days": project.approval_delay_days,
        "possession_pct": project.possession_pct,
        "rehabilitation_pct": project.rehabilitation_pct,
        "stakeholder_response": stakeholder_mapping[
            project.stakeholder_response
        ]
    }])

    # ========================================================
    # GET PREDICTION FROM RANDOM FOREST MODEL
    # ========================================================

    prediction = round(
        float(model.predict(input_data)[0]),
        2
    )

    # ========================================================
    # SHAP EXPLANATION
    # ========================================================

    shap_values = explainer.shap_values(input_data)[0]

    feature_names = input_data.columns.tolist()

    shap_factors = []

    for feature, value in zip(feature_names, shap_values):

        impact = round(float(value), 2)

        if impact > 0:
            direction = "increases risk"
        elif impact < 0:
            direction = "reduces risk"
        else:
            direction = "no significant impact"

        shap_factors.append({
            "feature": feature,
            "impact": impact,
            "direction": direction
        })

    # Sort by strongest SHAP impact
    shap_factors = sorted(
        shap_factors,
        key=lambda x: abs(x["impact"]),
        reverse=True
    )

    # ========================================================
    # SHAP-BASED RECOMMENDATION ENGINE
    # ========================================================

    # Only factors that positively contribute to the
    # current prediction are considered.
    positive_factors = [
        factor for factor in shap_factors
        if factor["impact"] > 0
    ]

    # Generate recommendations from the strongest
    # positive SHAP factors.
    recommendations = []

    for factor in positive_factors[:5]:

        feature = factor["feature"]

        if feature in recommendation_map:

            recommendations.append({
                "factor": feature,
                "impact": factor["impact"],
                "recommendation": recommendation_map[feature]
            })

    # ========================================================
    # 4-LEVEL RISK CLASSIFICATION
    # ========================================================

    if prediction < 30:
        risk_level = "LOW"
        status = "On-Time"

    elif prediction < 60:
        risk_level = "MEDIUM"
        status = "At-Risk"

    elif prediction < 80:
        risk_level = "HIGH"
        status = "Delayed"

    else:
        risk_level = "CRITICAL"
        status = "Delayed"

    # ========================================================
    # ESTIMATED DELAY DAYS
    # ========================================================

    predicted_delay_days = round(
        prediction * 1.2,
        0
    )

    # ========================================================
    # FINAL RESPONSE
    # ========================================================

    return {
        "delay_probability": prediction,
        "risk_level": risk_level,
        "prediction_status": status,
        "predicted_delay_days": predicted_delay_days,
        "shap_factors": shap_factors,
        "recommendations": recommendations
    }


# ============================================================
# CREATE PROJECT
# ============================================================

@app.post("/api/projects", response_model=ProjectResponse)
def create_project(
    project: ProjectCreate,
    db: Session = Depends(get_db)
):

    # Generate project ID if not provided
    project_id = project.project_id

    if not project_id:
        project_id = "LA-" + str(uuid.uuid4())[:8].upper()

    stakeholder_mapping = {
        "Good": 0,
        "Normal": 1,
        "Poor": 2
    }

    # ========================================================
    # PREPARE ML INPUT
    # ========================================================

    input_data = pd.DataFrame([{
        "land_area": project.land_area,
        "affected_families": project.affected_families,
        "landowners": project.landowners,
        "compensation_completion": project.compensation_completion,
        "legal_dispute": int(project.legal_dispute),
        "court_cases": project.court_cases,
        "ownership_conflict": int(project.ownership_conflict),
        "approval_delay_days": project.approval_delay_days,
        "possession_pct": project.possession_pct,
        "rehabilitation_pct": project.rehabilitation_pct,
        "stakeholder_response": stakeholder_mapping[
            project.stakeholder_response
        ]
    }])

    # ========================================================
    # ML PREDICTION
    # ========================================================

    prediction = model.predict(input_data)[0]

    delay_probability = round(
        float(prediction),
        2
    )

    # ========================================================
    # 4-LEVEL RISK CLASSIFICATION
    # ========================================================

    if delay_probability < 30:
        risk_level = "LOW"
        prediction_status = "On-Time"

    elif delay_probability < 60:
        risk_level = "MEDIUM"
        prediction_status = "At-Risk"

    elif delay_probability < 80:
        risk_level = "HIGH"
        prediction_status = "Delayed"

    else:
        risk_level = "CRITICAL"
        prediction_status = "Delayed"

    # ========================================================
    # OTHER PREDICTION VALUES
    # ========================================================

    predicted_delay_days = round(
        delay_probability * 1.2,
        0
    )

    risk_score = delay_probability

    public_status = "In Progress"

    # ========================================================
    # CREATE DATABASE OBJECT
    # ========================================================

    new_project = Project(
        project_id=project_id,
        project_name=project.project_name,
        district=project.district,
        state=project.state,
        project_type=project.project_type,

        land_area=project.land_area,
        affected_families=project.affected_families,
        landowners=project.landowners,

        compensation_completion=project.compensation_completion,

        legal_dispute=project.legal_dispute,
        court_cases=project.court_cases,
        ownership_conflict=project.ownership_conflict,

        approval_delay_days=project.approval_delay_days,

        possession_pct=project.possession_pct,
        rehabilitation_pct=project.rehabilitation_pct,

        stakeholder_response=project.stakeholder_response,

        prediction_status=prediction_status,
        delay_probability=delay_probability,
        predicted_delay_days=predicted_delay_days,

        risk_score=risk_score,
        risk_level=risk_level,

        public_status=public_status
    )

    # Save project
    db.add(new_project)
    db.commit()
    db.refresh(new_project)

    return new_project


# ============================================================
# GET ALL PROJECTS
# ============================================================

@app.get(
    "/api/projects",
    response_model=list[ProjectResponse]
)
def get_projects(
    db: Session = Depends(get_db)
):

    return db.query(Project).order_by(
        Project.created_at.desc()
    ).all()


# ============================================================
# GET SINGLE PROJECT
# ============================================================

@app.get("/api/projects/{project_id}")
def get_project(
    project_id: int,
    db: Session = Depends(get_db)
):

    project = db.query(Project).filter(
        Project.id == project_id
    ).first()

    if not project:
        raise HTTPException(
            status_code=404,
            detail="Project not found"
        )

    return project


# ============================================================
# UPDATE PROJECT + RECALCULATE ML PREDICTION
# ============================================================

@app.put(
    "/api/projects/{project_id}",
    response_model=ProjectResponse
)
def update_project(
    project_id: int,
    project: ProjectCreate,
    db: Session = Depends(get_db)
):

    # ========================================================
    # FIND EXISTING PROJECT
    # ========================================================

    existing_project = db.query(Project).filter(
        Project.id == project_id
    ).first()

    if not existing_project:
        raise HTTPException(
            status_code=404,
            detail="Project not found"
        )

    # ========================================================
    # STAKEHOLDER MAPPING
    # ========================================================

    stakeholder_mapping = {
        "Good": 0,
        "Normal": 1,
        "Poor": 2
    }

    # ========================================================
    # PREPARE UPDATED DATA FOR ML MODEL
    # ========================================================

    input_data = pd.DataFrame([{
        "land_area": project.land_area,
        "affected_families": project.affected_families,
        "landowners": project.landowners,
        "compensation_completion": project.compensation_completion,
        "legal_dispute": int(project.legal_dispute),
        "court_cases": project.court_cases,
        "ownership_conflict": int(project.ownership_conflict),
        "approval_delay_days": project.approval_delay_days,
        "possession_pct": project.possession_pct,
        "rehabilitation_pct": project.rehabilitation_pct,
        "stakeholder_response": stakeholder_mapping[
            project.stakeholder_response
        ]
    }])

    # ========================================================
    # RUN ML PREDICTION AGAIN
    # ========================================================

    prediction = model.predict(input_data)[0]

    delay_probability = round(
        float(prediction),
        2
    )

    # ========================================================
    # RECALCULATE RISK LEVEL
    # ========================================================

    if delay_probability < 30:
        risk_level = "LOW"
        prediction_status = "On-Time"

    elif delay_probability < 60:
        risk_level = "MEDIUM"
        prediction_status = "At-Risk"

    elif delay_probability < 80:
        risk_level = "HIGH"
        prediction_status = "Delayed"

    else:
        risk_level = "CRITICAL"
        prediction_status = "Delayed"

    # ========================================================
    # RECALCULATE ESTIMATED DELAY
    # ========================================================

    predicted_delay_days = round(
        delay_probability * 1.2,
        0
    )

    risk_score = delay_probability

    # ========================================================
    # UPDATE PROJECT INFORMATION
    # ========================================================

    existing_project.project_name = project.project_name
    existing_project.district = project.district
    existing_project.state = project.state
    existing_project.project_type = project.project_type

    existing_project.land_area = project.land_area
    existing_project.affected_families = project.affected_families
    existing_project.landowners = project.landowners

    existing_project.compensation_completion = (
        project.compensation_completion
    )

    existing_project.legal_dispute = (
        project.legal_dispute
    )

    existing_project.court_cases = (
        project.court_cases
    )

    existing_project.ownership_conflict = (
        project.ownership_conflict
    )

    existing_project.approval_delay_days = (
        project.approval_delay_days
    )

    existing_project.possession_pct = (
        project.possession_pct
    )

    existing_project.rehabilitation_pct = (
        project.rehabilitation_pct
    )

    existing_project.stakeholder_response = (
        project.stakeholder_response
    )

    # ========================================================
    # UPDATE ML RESULTS
    # ========================================================

    existing_project.prediction_status = (
        prediction_status
    )

    existing_project.delay_probability = (
        delay_probability
    )

    existing_project.predicted_delay_days = (
        predicted_delay_days
    )

    existing_project.risk_score = (
        risk_score
    )

    existing_project.risk_level = (
        risk_level
    )

    # ========================================================
    # SAVE UPDATED PROJECT
    # ========================================================

    db.commit()
    db.refresh(existing_project)

    return existing_project


# ============================================================
# DELETE PROJECT
# ============================================================

@app.delete("/api/projects/{project_id}")
def delete_project(
    project_id: int,
    db: Session = Depends(get_db)
):

    project = db.query(Project).filter(
        Project.id == project_id
    ).first()

    if not project:
        raise HTTPException(
            status_code=404,
            detail="Project not found"
        )

    db.delete(project)
    db.commit()

    return {
        "message": "Project deleted successfully",
        "id": project_id
    }