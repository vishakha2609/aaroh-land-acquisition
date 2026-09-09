import React from 'react';
import { X, CheckCircle, AlertTriangle, Clock } from 'lucide-react';

export default function ProjectDetailsModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
          <div>
            <h2>{project.name}</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Project ID: {project.id} | District: {project.district}</p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={24} /></button>
        </div>

        <div style={{ padding: '16px 0' }}>
          <div className="grid-2" style={{ marginBottom: '16px' }}>
            <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '6px' }}>
              <strong>Land Area:</strong> {project.landArea} Hectares<br/>
              <strong>Affected Families:</strong> {project.affectedFamilies}<br/>
              <strong>Type:</strong> {project.type}
            </div>
            <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '6px' }}>
              <strong>Risk Score:</strong> {project.riskScore}/100<br/>
              <strong>Delay Probability:</strong> {project.delayProbability}%<br/>
              <strong>Est. Delay:</strong> {project.predictedDelayDays} Days
            </div>
          </div>

          <h4>Execution Timeline Phase</h4>
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: '20px 0', textAlign: 'center', fontSize: '0.8rem' }}>
            <div><CheckCircle color="green" size={20}/><br/>Notification</div>
            <div><CheckCircle color="green" size={20}/><br/>Approval</div>
            <div><AlertTriangle color="orange" size={20}/><br/>Compensation ({project.compensationCompletion}%)</div>
            <div><Clock color="gray" size={20}/><br/>Possession ({project.possessionPct}%)</div>
            <div><Clock color="gray" size={20}/><br/>Rehabilitation</div>
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <button className="btn btn-secondary" onClick={onClose}>Close Details</button>
        </div>
      </div>
    </div>
  );
}