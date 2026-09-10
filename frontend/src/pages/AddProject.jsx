import React, { useState } from 'react';

export default function AddProject({ onAddProject }) {
  const [formData, setFormData] = useState({
    id: `LA-${Math.floor(1000 + Math.random() * 9000)}`,
    name: '',
    district: 'Pune',
    state: 'Maharashtra',

    // GIS location
    latitude: '',
    longitude: '',

    type: 'Highway',
    landArea: '',
    affectedFamilies: '',
    landowners: '',
    compensationCompletion: 50,
    legalDispute: 'false',
    courtCases: 0,
    approvalDelayDays: 0,
    possessionPct: 50,
    stakeholderResponse: 'Normal'
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    onAddProject({
      ...formData,
      latitude: Number(formData.latitude),
      longitude: Number(formData.longitude),
      landArea: Number(formData.landArea) || 0,
      affectedFamilies: Number(formData.affectedFamilies) || 0,
      landowners: Number(formData.landowners) || 0,
      compensationCompletion: Number(formData.compensationCompletion) || 0,
      courtCases: Number(formData.courtCases) || 0,
      approvalDelayDays: Number(formData.approvalDelayDays) || 0,
      possessionPct: Number(formData.possessionPct) || 0,
      legalDispute: formData.legalDispute === 'true'
    });
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <h2>Add New Land Acquisition Project</h2>

      <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>
        Provide complete project and field metrics for accurate AI delay prediction and monitoring.
      </p>

      <div className="card">
        <form onSubmit={handleSubmit}>

          {/* Basic Information */}
          <h4 style={{ marginBottom: '12px', color: 'var(--navy-primary)' }}>
            1. Basic Project Details
          </h4>

          <div className="grid-2">

            <div className="form-group">
              <label>Project ID</label>
              <input
                className="form-control"
                value={formData.id}
                disabled
              />
            </div>

            <div className="form-group">
              <label>Project Name *</label>
              <input
                className="form-control"
                required
                value={formData.name}
                onChange={e =>
                  setFormData({
                    ...formData,
                    name: e.target.value
                  })
                }
                placeholder="e.g., Ring Road Phase 2 Expansion"
              />
            </div>

            <div className="form-group">
              <label>District</label>
              <select
                className="form-control"
                value={formData.district}
                onChange={e =>
                  setFormData({
                    ...formData,
                    district: e.target.value
                  })
                }
              >
                <option value="Pune">Pune</option>
                <option value="Nashik">Nashik</option>
                <option value="Nagpur">Nagpur</option>
                <option value="Satara">Satara</option>
                <option value="Solapur">Solapur</option>
              </select>
            </div>

            <div className="form-group">
              <label>Project Type</label>
              <select
                className="form-control"
                value={formData.type}
                onChange={e =>
                  setFormData({
                    ...formData,
                    type: e.target.value
                  })
                }
              >
                <option value="Highway">Highway</option>
                <option value="Railway">Railway</option>
                <option value="Industrial Corridor">
                  Industrial Corridor
                </option>
                <option value="Renewable Energy">
                  Renewable Energy
                </option>
              </select>
            </div>

          </div>

          {/* GIS Location */}
          <hr
            style={{
              border: '0',
              borderTop: '1px solid var(--border-color)',
              margin: '20px 0'
            }}
          />

          <h4 style={{ marginBottom: '12px', color: 'var(--navy-primary)' }}>
            2. Project Location
          </h4>

          <div className="grid-2">

            <div className="form-group">
              <label>Latitude *</label>
              <input
                className="form-control"
                type="number"
                step="any"
                required
                value={formData.latitude}
                onChange={e =>
                  setFormData({
                    ...formData,
                    latitude: e.target.value
                  })
                }
                placeholder="e.g., 18.5204"
              />
            </div>

            <div className="form-group">
              <label>Longitude *</label>
              <input
                className="form-control"
                type="number"
                step="any"
                required
                value={formData.longitude}
                onChange={e =>
                  setFormData({
                    ...formData,
                    longitude: e.target.value
                  })
                }
                placeholder="e.g., 73.8567"
              />
            </div>

          </div>

          {/* Scale & Impact Metrics */}
          <hr
            style={{
              border: '0',
              borderTop: '1px solid var(--border-color)',
              margin: '20px 0'
            }}
          />

          <h4 style={{ marginBottom: '12px', color: 'var(--navy-primary)' }}>
            3. Scale & Social Impact
          </h4>

          <div className="grid-2">

            <div className="form-group">
              <label>Land Area (Hectares) *</label>
              <input
                className="form-control"
                type="number"
                min="1"
                required
                value={formData.landArea}
                onChange={e =>
                  setFormData({
                    ...formData,
                    landArea: e.target.value
                  })
                }
                placeholder="e.g., 350"
              />
            </div>

            <div className="form-group">
              <label>Affected Families Count *</label>
              <input
                className="form-control"
                type="number"
                min="0"
                required
                value={formData.affectedFamilies}
                onChange={e =>
                  setFormData({
                    ...formData,
                    affectedFamilies: e.target.value
                  })
                }
                placeholder="e.g., 180"
              />
            </div>

            <div className="form-group">
              <label>Registered Landowners Count *</label>
              <input
                className="form-control"
                type="number"
                min="0"
                required
                value={formData.landowners}
                onChange={e =>
                  setFormData({
                    ...formData,
                    landowners: e.target.value
                  })
                }
                placeholder="e.g., 220"
              />
            </div>

            <div className="form-group">
              <label>Stakeholder Responsiveness</label>
              <select
                className="form-control"
                value={formData.stakeholderResponse}
                onChange={e =>
                  setFormData({
                    ...formData,
                    stakeholderResponse: e.target.value
                  })
                }
              >
                <option value="Fast">Fast Response</option>
                <option value="Normal">Normal Response</option>
                <option value="Slow">Slow Response</option>
              </select>
            </div>

          </div>

          {/* Acquisition & Legal Status */}
          <hr
            style={{
              border: '0',
              borderTop: '1px solid var(--border-color)',
              margin: '20px 0'
            }}
          />

          <h4 style={{ marginBottom: '12px', color: 'var(--navy-primary)' }}>
            4. Acquisition, Clearance & Dispute Status
          </h4>

          <div className="grid-2">

            <div className="form-group">
              <label>Compensation Completion (%)</label>
              <input
                className="form-control"
                type="number"
                min="0"
                max="100"
                value={formData.compensationCompletion}
                onChange={e =>
                  setFormData({
                    ...formData,
                    compensationCompletion: e.target.value
                  })
                }
              />
            </div>

            <div className="form-group">
              <label>Physical Possession Handover (%)</label>
              <input
                className="form-control"
                type="number"
                min="0"
                max="100"
                value={formData.possessionPct}
                onChange={e =>
                  setFormData({
                    ...formData,
                    possessionPct: e.target.value
                  })
                }
              />
            </div>

            <div className="form-group">
              <label>Active Legal Dispute?</label>
              <select
                className="form-control"
                value={formData.legalDispute}
                onChange={e =>
                  setFormData({
                    ...formData,
                    legalDispute: e.target.value
                  })
                }
              >
                <option value="false">No Legal Dispute</option>
                <option value="true">Active Legal Dispute</option>
              </select>
            </div>

            <div className="form-group">
              <label>Pending Court Cases Count</label>
              <input
                className="form-control"
                type="number"
                min="0"
                value={formData.courtCases}
                onChange={e =>
                  setFormData({
                    ...formData,
                    courtCases: e.target.value
                  })
                }
              />
            </div>

            <div className="form-group">
              <label>Inter-departmental Clearance Delay (Days)</label>
              <input
                className="form-control"
                type="number"
                min="0"
                value={formData.approvalDelayDays}
                onChange={e =>
                  setFormData({
                    ...formData,
                    approvalDelayDays: e.target.value
                  })
                }
              />
            </div>

          </div>

          <button
            className="btn btn-primary"
            type="submit"
            style={{
              marginTop: '20px',
              width: '100%',
              justifyContent: 'center'
            }}
          >
            Register Project & Run AI Risk Assessment
          </button>

        </form>
      </div>
    </div>
  );
}