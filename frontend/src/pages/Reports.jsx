import React from 'react';
import { DISTRICT_ANALYTICS } from '../data/mockData';
import { Download } from 'lucide-react';

export default function Reports() {
  const handleExportCSV = () => {
    alert("Exporting Synthetic SIH Report CSV...");
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>District Acquisition Reports</h2>
        <button className="btn btn-primary" onClick={handleExportCSV}>
          <Download size={16} /> Export CSV Report
        </button>
      </div>

      <div className="card">
        <h3>District Summary Breakdown</h3>
        <table className="data-table" style={{ marginTop: '12px' }}>
          <thead>
            <tr>
              <th>District Name</th>
              <th>Total Projects</th>
              <th>High Risk Count</th>
              <th>Avg Predicted Delay</th>
            </tr>
          </thead>
          <tbody>
            {DISTRICT_ANALYTICS.map((d, i) => (
              <tr key={i}>
                <td><strong>{d.district}</strong></td>
                <td>{d.total}</td>
                <td><span className="badge badge-high">{d.highRisk}</span></td>
                <td>{d.avgDelay} Days</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}