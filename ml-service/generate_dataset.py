import pandas as pd
import numpy as np

np.random.seed(42)

N = 1000

data = pd.DataFrame({
    "land_area": np.random.uniform(10, 1000, N),
    "affected_families": np.random.randint(10, 1000, N),
    "landowners": np.random.randint(10, 800, N),
    "compensation_completion": np.random.uniform(10, 100, N),
    "legal_dispute": np.random.choice([0, 1], N, p=[0.7, 0.3]),
    "court_cases": np.random.randint(0, 10, N),
    "ownership_conflict": np.random.choice([0, 1], N, p=[0.75, 0.25]),
    "approval_delay_days": np.random.randint(0, 150, N),
    "possession_pct": np.random.uniform(10, 100, N),
    "rehabilitation_pct": np.random.uniform(10, 100, N),
    "stakeholder_response": np.random.choice(
        ["Good", "Normal", "Poor"],
        N,
        p=[0.4, 0.4, 0.2]
    )
})


# Convert stakeholder response into numerical risk factor
stakeholder_risk = data["stakeholder_response"].map({
    "Good": 0,
    "Normal": 1,
    "Poor": 2
})


# --------------------------------------------------
# CALCULATE SYNTHETIC DELAY SCORE
# --------------------------------------------------

delay_score = (
    (100 - data["compensation_completion"]) * 0.20
    + (100 - data["possession_pct"]) * 0.15
    + (100 - data["rehabilitation_pct"]) * 0.10
    + data["approval_delay_days"] * 0.15
    + data["legal_dispute"] * 15
    + data["court_cases"] * 3
    + data["ownership_conflict"] * 12
    + stakeholder_risk * 8
    + np.log1p(data["affected_families"]) * 2
)


# Add small randomness so the model does not learn
# a perfectly deterministic rule
delay_score += np.random.normal(0, 5, N)


# --------------------------------------------------
# CREATE TARGET VARIABLES
# --------------------------------------------------

data["delay_probability"] = (
    1 / (1 + np.exp(-(delay_score - 50) / 15))
) * 100


data["delay_probability"] = (
    data["delay_probability"]
    .clip(0, 100)
    .round(2)
)


data["delay_status"] = pd.cut(
    data["delay_probability"],
    bins=[-1, 30, 60, 100],
    labels=["On-Time", "At-Risk", "Delayed"]
)


data["predicted_delay_days"] = (
    data["delay_probability"] * 1.2
    + np.random.normal(0, 5, N)
).clip(0, 180).round(0)


# --------------------------------------------------
# SAVE DATASET
# --------------------------------------------------

output_path = "dataset/land_acquisition_dataset.csv"

data.to_csv(
    output_path,
    index=False
)


print("Dataset generated successfully!")
print(f"Total records: {len(data)}")
print(f"Saved to: {output_path}")

print("\nColumns:")
print(list(data.columns))

print("\nFirst 5 records:")
print(data.head())