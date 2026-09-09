import React, { useState } from 'react';

export default function PublicProjects({ projects }) {
  const [filterDistrict, setFilterDistrict] = useState('All');

  const filtered = filterDistrict === 'All' 
    ? projects 
    : projects.filter(p => p.district === filterDistrict);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <h2>Public Infrastructure Land Acquisition Projects</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '20px', fontSize: '0.9rem' }}>
        Public non-sensitive portal view. Internal risk score, operational SHAP metrics, and officer controls are restricted.
      </p>

      <div style={{ marginBottom: '16px', display: 'flex', gap: '12px', alignItems: 'center' }}>
        <label style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>Filter by District:</label>
        <select className="form-control" style={{ width: '200px' }} value={filterDistrict} onChange={(e) => setFilterDistrict(e.target.value)}>
          <option value="All">All Districts</option>
          <option value="Pune">Pune</option>
          <option value="Nashik">Nashik</option>
          <option value="Nagpur">Nagpur</option>
          <option value="Satara">Satara</option>
          <option value="Solapur">Solapur</option>
        </select>
      </div>

      <div className="card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Project Name</th>
              <th>District</th>
              <th>Type</th>
              <th>Land Area</th>
              <th>Public Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(project => (
              <tr key={project.id}>
                <td><strong>{project.name}</strong></td>
                <td>{project.district}</td>
                <td>{project.type}</td>
                <td>{project.landArea} Ha</td>
                <td>
                  <span className={`badge ${project.publicStatus === 'Completed' ? 'badge-low' : project.publicStatus === 'Delayed' ? 'badge-critical' : 'badge-medium'}`}>
                    {project.publicStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}