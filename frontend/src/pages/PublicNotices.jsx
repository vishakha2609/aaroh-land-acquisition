import React from 'react';
import { Bell } from 'lucide-react';

export default function PublicNotices({ notices }) {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
        <Bell size={28} color="var(--gov-blue)" />
        <h2>Official Notices & Government Announcements</h2>
      </div>

      {notices.map(n => (
        <div key={n.id} className="card" style={{ borderLeft: '4px solid var(--gov-blue)' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--saffron-accent)', fontWeight: 'bold' }}>
            {n.date} — {n.category}
          </div>
          <h3 style={{ margin: '8px 0' }}>{n.title}</h3>
          <p style={{ fontSize: '0.95rem', color: '#334155', marginBottom: '12px' }}>{n.summary}</p>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', background: '#f1f5f9', padding: '4px 8px', borderRadius: '4px' }}>
            SIH 2026 Prototype Notice
          </span>
        </div>
      ))}
    </div>
  );
}