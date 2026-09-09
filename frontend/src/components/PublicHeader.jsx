import React from 'react';
import { Building2, Lock, ShieldCheck } from 'lucide-react';

export default function PublicHeader({ onLoginClick, activeTab, setActiveTab }) {
  return (
    <header style={{ background: 'var(--navy-primary)', color: 'white', borderBottom: '3px solid var(--saffron-accent)' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => setActiveTab('home')}>
          <Building2 size={32} color="var(--saffron-accent)" />
          <div>
            <h1 style={{ fontSize: '1.2rem', fontWeight: '700', letterSpacing: '0.5px' }}>AAROH</h1>
            <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>AI-Assisted Acquisition Risk and Operational Hazard</p>
          </div>
        </div>

        <nav style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <button 
            onClick={() => setActiveTab('home')} 
            style={{ background: 'none', border: 'none', color: activeTab === 'home' ? 'var(--saffron-accent)' : 'white', fontWeight: '600', cursor: 'pointer' }}>
            Home
          </button>
          <button 
            onClick={() => setActiveTab('projects')} 
            style={{ background: 'none', border: 'none', color: activeTab === 'projects' ? 'var(--saffron-accent)' : 'white', fontWeight: '600', cursor: 'pointer' }}>
            Public Projects
          </button>
          <button 
            onClick={() => setActiveTab('notices')} 
            style={{ background: 'none', border: 'none', color: activeTab === 'notices' ? 'var(--saffron-accent)' : 'white', fontWeight: '600', cursor: 'pointer' }}>
            Notices & Updates
          </button>
          
          <button onClick={onLoginClick} className="btn btn-primary" style={{ backgroundColor: 'var(--saffron-accent)' }}>
            <Lock size={16} /> Officer Login
          </button>
        </nav>
      </div>
    </header>
  );
}