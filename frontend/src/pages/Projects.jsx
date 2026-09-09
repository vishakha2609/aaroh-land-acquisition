import React, { useState } from 'react';

export default function Projects({ projects, onDeleteClick, onViewClick, onEditClick }) {
  const [search, setSearch] = useState('');

  const filtered = projects.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.district.toLowerCase().includes(search.toLowerCase()) ||
    p.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Manage Land Acquisition Projects</h2>
        <input 
          className="form-control" 
          placeholder="Search by ID, Name or District..." 
          value={search} 
          onChange={e => setSearch(e.target.value)} 
          style={{ width: '300px' }} 
        />
      </div>

      <div className="card">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Project Name</th>
              <th>District</th>
              <th>Risk Level</th>
              <th>Delay Prob.</th>
              <th>Est. Delay</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td><strong>{p.name}</strong></td>
                <td>{p.district}</td>
                <td>
                  <span className={`badge badge-${p.riskLevel ? p.riskLevel.toLowerCase() : 'low'}`}>
                    {p.riskLevel}
                  </span>
                </td>
                <td>{p.delayProbability}%</td>
                <td>{p.predictedDelayDays} Days</td>
                <td>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button 
                      className="btn btn-secondary" 
                      style={{ padding: '4px 8px', fontSize: '0.75rem' }} 
                      onClick={() => onViewClick(p)}
                    >
                      View
                    </button>
                    <button 
                      className="btn btn-primary" 
                      style={{ padding: '4px 8px', fontSize: '0.75rem' }} 
                      onClick={() => onEditClick(p)}
                    >
                      Update
                    </button>
                    <button 
                      className="btn btn-danger" 
                      style={{ padding: '4px 8px', fontSize: '0.75rem' }} 
                      onClick={() => onDeleteClick(p)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}