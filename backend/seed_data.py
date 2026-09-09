from database import SessionLocal, engine, Base
from models import Project


# Make sure tables exist
Base.metadata.create_all(bind=engine)


db = SessionLocal()


projects = [

    Project(
        project_id="LA-1001",
        project_name="Pune Ring Road Expansion Phase 1",
        district="Pune",
        state="Maharashtra",
        project_type="Highway",
        land_area=450,
        affected_families=320,
        landowners=410,
        compensation_completion=34,
        legal_dispute=True,
        court_cases=3,
        ownership_conflict=True,
        approval_delay_days=42,
        possession_pct=25,
        rehabilitation_pct=15,
        stakeholder_response="Slow",
        prediction_status="Delayed",
        delay_probability=91,
        predicted_delay_days=78,
        risk_score=91,
        risk_level="CRITICAL",
        public_status="Delayed"
    ),

    Project(
        project_id="LA-1002",
        project_name="Nashik Highway Development Sector B",
        district="Nashik",
        state="Maharashtra",
        project_type="Highway",
        land_area=280,
        affected_families=180,
        landowners=210,
        compensation_completion=52,
        legal_dispute=True,
        court_cases=1,
        ownership_conflict=False,
        approval_delay_days=15,
        possession_pct=45,
        rehabilitation_pct=40,
        stakeholder_response="Normal",
        prediction_status="Delayed",
        delay_probability=78,
        predicted_delay_days=54,
        risk_score=78,
        risk_level="HIGH",
        public_status="Delayed"
    ),

    Project(
        project_id="LA-1003",
        project_name="Nagpur Logistics Corridor Expressway",
        district="Nagpur",
        state="Maharashtra",
        project_type="Industrial Corridor",
        land_area=600,
        affected_families=120,
        landowners=150,
        compensation_completion=100,
        legal_dispute=False,
        court_cases=0,
        ownership_conflict=False,
        approval_delay_days=0,
        possession_pct=100,
        rehabilitation_pct=100,
        stakeholder_response="Fast",
        prediction_status="On-Time",
        delay_probability=12,
        predicted_delay_days=0,
        risk_score=12,
        risk_level="LOW",
        public_status="Completed"
    ),

    Project(
        project_id="LA-1004",
        project_name="Satara Railway Expansion Line",
        district="Satara",
        state="Maharashtra",
        project_type="Railway",
        land_area=190,
        affected_families=210,
        landowners=260,
        compensation_completion=40,
        legal_dispute=False,
        court_cases=0,
        ownership_conflict=True,
        approval_delay_days=30,
        possession_pct=30,
        rehabilitation_pct=20,
        stakeholder_response="Slow",
        prediction_status="Delayed",
        delay_probability=68,
        predicted_delay_days=45,
        risk_score=68,
        risk_level="HIGH",
        public_status="Delayed"
    ),

    Project(
        project_id="LA-1005",
        project_name="Solapur Solar Power Land Acquisition",
        district="Solapur",
        state="Maharashtra",
        project_type="Renewable Energy",
        land_area=800,
        affected_families=90,
        landowners=110,
        compensation_completion=85,
        legal_dispute=False,
        court_cases=0,
        ownership_conflict=False,
        approval_delay_days=5,
        possession_pct=80,
        rehabilitation_pct=75,
        stakeholder_response="Normal",
        prediction_status="On-Time",
        delay_probability=28,
        predicted_delay_days=10,
        risk_score=28,
        risk_level="LOW",
        public_status="In Progress"
    )
]


# Check if database already has data
existing_count = db.query(Project).count()


if existing_count == 0:

    db.add_all(projects)

    db.commit()

    print("Successfully inserted 5 synthetic projects.")

else:

    print(
        f"Database already contains "
        f"{existing_count} projects."
    )


db.close()