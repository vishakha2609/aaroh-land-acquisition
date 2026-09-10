import numpy as np
import pandas as pd
import joblib

from sklearn.ensemble import RandomForestRegressor


# Reproducible synthetic training data
np.random.seed(42)

N = 3000

data = pd.DataFrame({
    "land_area": np.random.uniform(50, 1000, N),
    "affected_families": np.random.randint(20, 500, N),
    "landowners": np.random.randint(30, 600, N),
    "compensation_completion": np.random.uniform(0, 100, N),
    "legal_dispute": np.random.randint(0, 2, N),

    # Changed from 0-5 to 0-3
    "court_cases": np.random.randint(0, 4, N),

    "ownership_conflict": np.random.randint(0, 2, N),

    # Changed from 0-60 to 0-40
    "approval_delay_days": np.random.uniform(0, 40, N),

    "possession_pct": np.random.uniform(0, 100, N),
    "rehabilitation_pct": np.random.uniform(0, 100, N),
    "stakeholder_response": np.random.randint(0, 3, N)
})


# Domain-based synthetic risk calculation
risk = (
    5

    + data["affected_families"] * 0.035
    + data["landowners"] * 0.012
    + data["land_area"] * 0.008

    + data["legal_dispute"] * 15
    + data["court_cases"] * 5
    + data["ownership_conflict"] * 10

    + data["approval_delay_days"] * 0.45
    + data["stakeholder_response"] * 8

    - data["compensation_completion"] * 0.22
    - data["possession_pct"] * 0.20
    - data["rehabilitation_pct"] * 0.12

    + np.random.normal(0, 2, N)
)


# Keep risk between 0 and 100
risk = np.clip(risk, 0, 100)


X = data
y = risk


# Monotonic constraints
#  1 = increasing risk
# -1 = decreasing risk
#  0 = no enforced relationship

monotonic_constraints = [
    0,   # land_area
    1,   # affected_families
    1,   # landowners
   -1,   # compensation_completion
    1,   # legal_dispute
    1,   # court_cases
    1,   # ownership_conflict
    1,   # approval_delay_days
   -1,   # possession_pct
   -1,   # rehabilitation_pct
    1    # stakeholder_response
]


model = RandomForestRegressor(
    n_estimators=200,
    random_state=42,
    monotonic_cst=monotonic_constraints,
    n_jobs=-1
)


model.fit(X, y)


# Save trained model
joblib.dump(model, "land_acquisition_model.pkl")


print("Model trained successfully.")
print("Saved as land_acquisition_model.pkl")
print("\nFeature importances:")

for feature, importance in zip(
    X.columns,
    model.feature_importances_
):
    print(f"{feature}: {importance:.4f}")