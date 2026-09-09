import React from 'react';
import { 
  LayoutDashboard, FolderKanban, PlusCircle, SearchCode, 
  ShieldAlert, Lightbulb, FileSpreadsheet, UserCheck, LogOut, FileText 
} from 'lucide-react';

export default function OfficerSidebar({ activePage, setActivePage, onLogout, notificationsCount }) {
  const menu = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'projects', label: 'Manage Projects', icon: FolderKanban },
    { id: 'add-project', label: 'Add New Project', icon: PlusCircle },
    { id: 'analyze', label: 'Analyze Project (AI)', icon: SearchCode },
    { id: 'risk-monitoring', label: 'Risk Monitoring', icon: ShieldAlert },
    { id: 'alerts', label: 'Alerts', icon: ShieldAlert, badge: notificationsCount },
    { id: 'recommendations', label: 'Recommendations', icon: Lightbulb },
    { id: 'reports', label: 'Reports & Export', icon: FileSpreadsheet },
    { id: 'profile', label: 'Officer Profile', icon: UserCheck }
  ];

  return (
    <aside className="sidebar" style={{ width: '260px', background: 'var(--navy-secondary)', color: 'white', padding: '20px 12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <div style={{ padding: '0 12px 20px 12px', borderBottom: '1px solid #2e436e', marginBottom: '16px' }}>
          <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--saffron-accent)', fontWeight: '700' }}>Authorized Portal</div>
          <div style={{ fontSize: '1rem', fontWeight: '700' }}>District Officer View</div>
        </div>

        <nav>
          {menu.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'space-between',
                  padding: '10px 12px',
                  marginBottom: '4px',
                  borderRadius: '6px',
                  background: isActive ? 'var(--gov-blue)' : 'transparent',
                  color: isActive ? 'white' : '#cbd5e1',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: isActive ? '600' : 'normal'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Icon size={18} />
                  <span>{item.label}</span>
                </div>
                {item.badge > 0 && (
                  <span style={{ background: 'var(--risk-critical)', color: 'white', padding: '2px 6px', borderRadius: '10px', fontSize: '0.7rem' }}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      <button
        onClick={onLogout}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '10px 12px',
          background: '#1e293b',
          color: '#f87171',
          border: '1px solid #334155',
          borderRadius: '6px',
          cursor: 'pointer',
          marginTop: '20px'
        }}
      >
        <LogOut size={18} />
        <span>Logout Session</span>
      </button>
    </aside>
  );
}