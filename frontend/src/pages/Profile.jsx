import React from 'react';
import { UserCheck } from 'lucide-react';

export default function Profile({ onLogout }) {
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2>Officer Profile Information</h2>
      <div className="card" style={{ marginTop: '20px', textAlign: 'center' }}>
        <UserCheck size={64} color="var(--gov-blue)" style={{ marginBottom: '12px' }} />
        <h3>District Land Acquisition Officer</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Department of Land Acquisition & Rehabilitation</p>

        <div style={{ textAlign: 'left', marginTop: '20px', background: '#f8fafc', padding: '16px', borderRadius: '6px' }}>
          <p><strong>District Jurisdiction:</strong> Pune & Regional Belt</p>
          <p><strong>Role:</strong> Authorized Officer (SIH Prototype Access)</p>
          <p><strong>Session Authenticated:</strong> Yes</p>
        </div>

        <button className="btn btn-danger" onClick={onLogout} style={{ marginTop: '20px' }}>
          Logout Session
        </button>
      </div>
    </div>
  );
}