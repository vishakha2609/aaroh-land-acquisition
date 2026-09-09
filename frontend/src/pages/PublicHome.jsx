import React from 'react';
import { Layers, CheckCircle2, Clock, MapPin, ArrowRight } from 'lucide-react';

export default function PublicHome({ projects, notices, setActiveTab, onLoginClick }) {
  const total = projects.length;
  const completed = projects.filter(p => p.publicStatus === 'Completed').length;
  const inProgress = projects.filter(p => p.publicStatus === 'In Progress').length;
  const delayed = projects.filter(p => p.publicStatus === 'Delayed').length;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      {/* Hero Section */}
      <div style={{ background: 'linear-gradient(135deg, var(--navy-primary), var(--navy-secondary))', color: 'white', padding: '40px', borderRadius: '12px', marginBottom: '30px', position: 'relative' }}>
        <h1 style={{ fontSize: '2.2rem', marginBottom: '12px' }}>Transparent Land Acquisition Information Portal</h1>
        <p style={{ fontSize: '1.05rem', color: '#cbd5e1', maxWidth: '750px', marginBottom: '24px' }}>
          Access transparent, non-sensitive infrastructure project land acquisition updates, District updates, and official progress notices through a unified national public platform.
        </p>
        <div style={{ display: 'flex', gap: '16px' }}>
          <button className="btn btn-primary" onClick={() => setActiveTab('projects')}>
            View Public Projects <ArrowRight size={16} />
          </button>
          <button className="btn btn-secondary" onClick={() => setActiveTab('notices')}>
            Official Notices
          </button>
        </div>
      </div>

      {/* Floating Info Cards */}
      <div className="grid-4" style={{ marginBottom: '30px' }}>
        <div className="card" style={{ borderLeft: '4px solid var(--gov-blue)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Tracked</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{total}</div>
            </div>
            <Layers color="var(--gov-blue)" size={28} />
          </div>
        </div>
        <div className="card" style={{ borderLeft: '4px solid var(--risk-low)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Completed</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{completed}</div>
            </div>
            <CheckCircle2 color="var(--risk-low)" size={28} />
          </div>
        </div>
        <div className="card" style={{ borderLeft: '4px solid var(--risk-medium)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>In Progress</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{inProgress}</div>
            </div>
            <Clock color="var(--risk-medium)" size={28} />
          </div>
        </div>
        <div className="card" style={{ borderLeft: '4px solid var(--risk-critical)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Delayed</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{delayed}</div>
            </div>
            <MapPin color="var(--risk-critical)" size={28} />
          </div>
        </div>
      </div>

      {/* Recent Notices Preview */}
      <div className="card">
        <h3>Recent Government Announcements & Public Notices</h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px' }}>Authentic non-sensitive notifications published for citizen information.</p>
        <div>
          {notices.map(notice => (
            <div key={notice.id} style={{ borderBottom: '1px solid var(--border-color)', padding: '12px 0' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--saffron-accent)', fontWeight: 'bold' }}>{notice.date} | {notice.category}</div>
              <h4 style={{ margin: '4px 0' }}>{notice.title}</h4>
              <p style={{ fontSize: '0.88rem', color: '#475569' }}>{notice.summary}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}