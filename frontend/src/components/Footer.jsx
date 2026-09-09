import React from 'react';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--navy-primary)', color: '#94a3b8', padding: '24px', textAlign: 'center', fontSize: '0.85rem', marginTop: 'auto', borderTop: '1px solid #1e293b' }}>
      <p style={{ color: 'white', fontWeight: '600' }}>AAROH Portal</p>
      <p style={{ marginTop: '4px' }}>Smart India Hackathon (SIH 2026) Prototype</p>
      <div style={{ margin: '12px 0', display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <span>Public Transparency</span>
        <span>•</span>
        <span>Decision Support System</span>
        <span>•</span>
        <span>Explainable AI Risk Engine</span>
      </div>
      <p style={{ color: '#fbbf24', fontSize: '0.8rem' }}>
        ⚠ DISCLAIMER: This application is a prototype developed for Smart India Hackathon. It is not an official Government of India website.
      </p>
    </footer>
  );
}