import sqlite3

connection = sqlite3.connect("land_projects.db")
cursor = connection.cursor()

# Coordinates for existing prototype projects
coordinates = {
    "LA-1001": (18.5204, 73.8567),       # Pune
    "LA-1002": (19.9975, 73.7898),       # Nashik
    "LA-1003": (21.1458, 79.0882),       # Nagpur
    "LA-1004": (17.6805, 74.0183),       # Satara
    "LA-1005": (17.6599, 75.9064),       # Solapur
    "LA-7C885054": (19.0760, 72.8777),   # Mumbai
    "LA-3F3BAF6C": (18.5204, 73.8567)    # Pune
}

for project_id, (latitude, longitude) in coordinates.items():

    cursor.execute(
        """
        UPDATE projects
        SET latitude = ?, longitude = ?
        WHERE project_id = ?
        """,
        (latitude, longitude, project_id)
    )

connection.commit()
connection.close()

print("Existing project coordinates updated successfully.")