import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function ConfirmDeleteModal({ project, onConfirm, onCancel }) {
  if (!project) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-card" style={{ maxWidth: '450px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--risk-critical)', marginBottom: '16px' }}>
          <AlertTriangle size={28} />
          <h3 style={{ margin: 0 }}>Confirm Deletion</h3>
        </div>
        <p style={{ fontSize: '0.95rem', color: '#334155', marginBottom: '16px' }}>
          Are you sure you want to delete project: <strong>{project.name}</strong> (ID: {project.id})? This action cannot be undone.
        </p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
          <button className="btn btn-danger" onClick={() => onConfirm(project.id)}>Delete Project</button>
        </div>
      </div>
    </div>
  );
}