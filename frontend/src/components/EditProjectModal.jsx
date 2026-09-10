import React, { useState } from 'react';
import { X, RefreshCw } from 'lucide-react';

export default function EditProjectModal({ project, onClose, onSave }) {
  // Safe initialization with fallbacks
  const [formData, setFormData] = useState({
    ...project,

    compensationCompletion:
      Number(project?.compensationCompletion ?? 0),

    possessionPct:
      Number(project?.possessionPct ?? 0),

    courtCases:
      Number(project?.courtCases ?? 0),

    approvalDelayDays:
      Number(project?.approvalDelayDays ?? 0),

    legalDispute:
      Boolean(project?.legalDispute),

    // GIS coordinates
    latitude:
      Number(project?.latitude ?? 0),

    longitude:
      Number(project?.longitude ?? 0)
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'number'
          ? Number(value)
          : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave(formData);
    onClose();
  };

  if (!project) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
      }}
    >
      <div
        className="card"
        style={{
          width: '600px',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
      >

        {/* HEADER */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px'
          }}
        >
          <h3>
            Update Progress: {project.name || 'Project'} ({project.id || ''})
          </h3>

          <button
            className="btn btn-secondary"
            onClick={onClose}
            style={{ padding: '4px 8px' }}
          >
            <X size={16} />
          </button>
        </div>


        <form onSubmit={handleSubmit}>

          {/* ================================================= */}
          {/* GIS LOCATION */}
          {/* ================================================= */}

          <h4 style={{ marginBottom: '12px' }}>
            Project Location
          </h4>

          <div className="grid-2">

            <div className="form-group">
              <label>Latitude</label>

              <input
                className="form-control"
                type="number"
                name="latitude"
                step="any"
                value={formData.latitude}
                onChange={handleChange}
                required
              />
            </div>


            <div className="form-group">
              <label>Longitude</label>

              <input
                className="form-control"
                type="number"
                name="longitude"
                step="any"
                value={formData.longitude}
                onChange={handleChange}
                required
              />
            </div>

          </div>


          {/* ================================================= */}
          {/* PROGRESS */}
          {/* ================================================= */}

          <h4 style={{ marginTop: '20px', marginBottom: '12px' }}>
            Progress & Risk Factors
          </h4>

          <div className="grid-2">

            <div className="form-group">
              <label>Compensation Paid (%)</label>

              <input
                className="form-control"
                type="number"
                name="compensationCompletion"
                min="0"
                max="100"
                value={formData.compensationCompletion}
                onChange={handleChange}
              />
            </div>


            <div className="form-group">
              <label>Land Possession (%)</label>

              <input
                className="form-control"
                type="number"
                name="possessionPct"
                min="0"
                max="100"
                value={formData.possessionPct}
                onChange={handleChange}
              />
            </div>

          </div>


          <div className="grid-2">

            <div className="form-group">
              <label>Active Court Cases</label>

              <input
                className="form-control"
                type="number"
                name="courtCases"
                min="0"
                value={formData.courtCases}
                onChange={handleChange}
              />
            </div>


            <div className="form-group">
              <label>Clearance Delay (Days)</label>

              <input
                className="form-control"
                type="number"
                name="approvalDelayDays"
                min="0"
                value={formData.approvalDelayDays}
                onChange={handleChange}
              />
            </div>

          </div>


          {/* ================================================= */}
          {/* LEGAL DISPUTE */}
          {/* ================================================= */}

          <div className="form-group">

            <label>Legal Dispute Active?</label>

            <select
              className="form-control"
              name="legalDispute"
              value={
                formData.legalDispute
                  ? 'true'
                  : 'false'
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  legalDispute:
                    e.target.value === 'true'
                })
              }
            >

              <option value="false">
                Resolved / No Dispute
              </option>

              <option value="true">
                Active Legal Dispute
              </option>

            </select>

          </div>


          {/* ================================================= */}
          {/* BUTTONS */}
          {/* ================================================= */}

          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '10px',
              marginTop: '20px'
            }}
          >

            <button
              className="btn btn-secondary"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>


            <button
              className="btn btn-primary"
              type="submit"
            >
              <RefreshCw size={16} />
              {' '}
              Update Progress & Recalculate Risk
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}