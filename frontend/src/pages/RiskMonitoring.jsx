import React from 'react';

export default function RiskMonitoring({ projects }) {
  return (
    <div>
      <h2>Risk Engine & Escalation Monitoring</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>Comprehensive risk scoring aggregated from ML predictions.</p>

      <div className="card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Project</th>
              <th>District</th>
              <th>Risk Score</th>
              <th>Level</th>
              <th>Primary Bottleneck</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(p => (
              <tr key={p.id}>
                <td><strong>{p.name}</strong></td>
                <td>{p.district}</td>
                <td><strong>{p.riskScore}/100</strong></td>
                <td><span className={`badge badge-${p.riskLevel ? p.riskLevel.toLowerCase() : 'low'}`}>{p.riskLevel}</span></td>
                <td>{p.legalDispute ? 'Active Legal Dispute' : p.compensationCompletion < 50 ? 'Incomplete Compensation' : 'Normal Operation'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}