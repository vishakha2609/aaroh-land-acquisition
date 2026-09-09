import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error


# 1. Load dataset
data = pd.read_csv("dataset/land_acquisition_dataset.csv")

print("Dataset loaded successfully!")
print("Total records:", len(data))


# 2. Convert stakeholder response into numbers
data["stakeholder_response"] = data["stakeholder_response"].map({
    "Good": 0,
    "Normal": 1,
    "Poor": 2
})


# 3. Select input features
features = [
    "land_area",
    "affected_families",
    "landowners",
    "compensation_completion",
    "legal_dispute",
    "court_cases",
    "ownership_conflict",
    "approval_delay_days",
    "possession_pct",
    "rehabilitation_pct",
    "stakeholder_response"
]

X = data[features]

# Target we want to predict
y = data["delay_probability"]


# 4. Split data into training and testing
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)


# 5. Create Random Forest model
model = RandomForestRegressor(
    n_estimators=200,
    random_state=42
)


# 6. Train model
print("Training Random Forest model...")

model.fit(X_train, y_train)

print("Model training completed!")


# 7. Test model
predictions = model.predict(X_test)

mae = mean_absolute_error(y_test, predictions)

print(f"Mean Absolute Error: {mae:.2f}")


# 8. Save trained model
joblib.dump(
    model,
    "land_acquisition_model.pkl"
)

print("Model saved successfully!")
print("File: land_acquisition_model.pkl")