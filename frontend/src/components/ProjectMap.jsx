import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const districtCoordinates = {
  Pune: [18.5204, 73.8567],
  Mumbai: [19.0760, 72.8777],
  Nashik: [19.9975, 73.7898],
  Nagpur: [21.1458, 79.0882],
  Satara: [17.6805, 74.0183],
  Solapur: [17.6599, 75.9064]
};

function ProjectMap({ projects = [] }) {

  const groupedProjects = {};

  projects.forEach((project) => {
    let latitude = Number(project.latitude);
    let longitude = Number(project.longitude);

    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
      const location = districtCoordinates[project.district];

      if (location) {
        latitude = location[0];
        longitude = location[1];
      }
    }

    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return;

    const key = `${latitude},${longitude}`;

    if (!groupedProjects[key]) {
      groupedProjects[key] = {
        latitude,
        longitude,
        projects: []
      };
    }

    groupedProjects[key].projects.push(project);
  });

  return (
    <MapContainer
      center={[19.0, 74.0]}
      zoom={7}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {Object.values(groupedProjects).map((location) => (
        <Marker
          key={`${location.latitude}-${location.longitude}`}
          position={[location.latitude, location.longitude]}
        >
          <Popup>
            <div style={{ minWidth: "250px" }}>
              {location.projects.map((project) => (
                <div
                  key={project.id}
                  style={{
                    marginBottom: "12px",
                    paddingBottom: "10px",
                    borderBottom: "1px solid #ddd"
                  }}
                >
                  <strong>{project.name}</strong>

                  <div>
                    District: {project.district}
                  </div>

                  <div>
                    Delay Probability: {project.delayProbability ?? 0}%
                  </div>

                  <div>
                    Risk: {project.riskLevel ?? "Unknown"}
                  </div>
                </div>
              ))}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default ProjectMap;