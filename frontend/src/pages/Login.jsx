import React, { useState } from 'react';
import { ShieldCheck, Lock } from 'lucide-react';

export default function Login({ onLoginSuccess }) {
  const [officerId, setOfficerId] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (officerId === 'admin' && password === 'admin123') {
      onLoginSuccess();
    } else {
      setError('Invalid Officer Credentials. Use dummy: admin / admin123');
    }
  };

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div className="card" style={{ width: '100%', maxWidth: '420px', padding: '30px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <ShieldCheck size={48} color="var(--gov-blue)" />
          <h2 style={{ fontSize: '1.3rem', marginTop: '10px' }}>LAND ACQUISITION MONITORING</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--saffron-accent)', fontWeight: 'bold' }}>OFFICER PORTAL</p>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Authorized Access Only</p>
        </div>

        {error && <div style={{ background: '#fee2e2', color: 'var(--risk-critical)', padding: '8px', borderRadius: '4px', fontSize: '0.8rem', marginBottom: '12px' }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Officer ID</label>
            <input className="form-control" value={officerId} onChange={(e) => setOfficerId(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input className="form-control" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}>
            <Lock size={16} /> LOGIN TO OFFICER DASHBOARD
          </button>
        </form>

        <div style={{ marginTop: '20px', borderTop: '1px solid var(--border-color)', paddingTop: '12px', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center' }}>
          🔒 SIH Prototype Authentication — Demo Credentials Pre-filled
        </div>
      </div>
    </div>
  );
}