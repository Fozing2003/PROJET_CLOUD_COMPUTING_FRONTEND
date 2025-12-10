import React, { useState } from 'react';
import { Menu, X, LayoutDashboard, FileText, Users, Settings, LogOut, ChevronDown } from 'lucide-react';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [showModal, setShowModal] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'templates', label: 'Modèles CV', icon: FileText },
    { id: 'users', label: 'Utilisateurs', icon: Users },
    { id: 'settings', label: 'Paramètres', icon: Settings },
  ];

  const stats = [
    { label: 'Total Modèles', value: '24', change: '+12%', color: 'indigo' },
    { label: 'Utilisateurs', value: '1,234', change: '+23%', color: 'green' },
    { label: 'CV Créés', value: '5,678', change: '+34%', color: 'blue' },
    { label: 'Téléchargements', value: '8,901', change: '+18%', color: 'purple' },
  ];

  const templates = [
    { id: 1, name: 'Modèle Professionnel', date: 'Créé il y a 2 jours', status: 'Actif', downloads: 245 },
    { id: 2, name: 'Modèle Créatif', date: 'Créé il y a 5 jours', status: 'Actif', downloads: 189 },
    { id: 3, name: 'Modèle Minimaliste', date: 'Créé il y a 1 semaine', status: 'Actif', downloads: 367 },
    { id: 4, name: 'Modèle Moderne', date: 'Créé il y a 2 semaines', status: 'Inactif', downloads: 156 },
  ];

  const users = [
    { id: 1, name: 'Jean Dupont', email: 'jean.dupont@email.com', role: 'Utilisateur', cvCount: 3, joinDate: '15 Nov 2024' },
    { id: 2, name: 'Marie Martin', email: 'marie.martin@email.com', role: 'Premium', cvCount: 8, joinDate: '10 Nov 2024' },
    { id: 3, name: 'Pierre Dubois', email: 'pierre.dubois@email.com', role: 'Utilisateur', cvCount: 2, joinDate: '08 Nov 2024' },
    { id: 4, name: 'Sophie Laurent', email: 'sophie.laurent@email.com', role: 'Premium', cvCount: 12, joinDate: '05 Nov 2024' },
  ];

  const renderDashboard = () => (
    <>
      <div className="stats-grid">
        {stats.map((stat, idx) => (
          <div key={idx} className="stat-card">
            <div className="stat-header">
              <span className="stat-label">{stat.label}</span>
              <span className={`stat-change ${stat.color}`}>
                {stat.change}
              </span>
            </div>
            <p className="stat-value">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="content-card">
        <div className="content-card-header">
          <h3 className="content-card-title">Modèles Récents</h3>
          <button className="new-btn" onClick={() => setActiveMenu('templates')}>+ Nouveau Modèle</button>
        </div>
        
        <div className="template-list">
          {templates.slice(0, 3).map((template) => (
            <div key={template.id} className="template-item">
              <div className="template-info">
                <div className="template-icon">CV</div>
                <div>
                  <h4 className="template-title">{template.name}</h4>
                  <p className="template-date">{template.date}</p>
                </div>
              </div>
              <div className="template-actions">
                <span className={`status-badge ${template.status === 'Actif' ? '' : 'inactive'}`}>
                  {template.status}
                </span>
                <button className="action-btn">
                  <ChevronDown size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  const renderTemplates = () => (
    <div className="content-card">
      <div className="content-card-header">
        <h3 className="content-card-title">Tous les Modèles</h3>
        <button className="new-btn" onClick={() => setShowModal(true)}>+ Nouveau Modèle</button>
      </div>
      
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Nom du Modèle</th>
              <th>Date de Création</th>
              <th>Téléchargements</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {templates.map((template) => (
              <tr key={template.id}>
                <td>
                  <div className="table-cell-with-icon">
                    <div className="template-icon-small">CV</div>
                    <span>{template.name}</span>
                  </div>
                </td>
                <td>{template.date}</td>
                <td>{template.downloads}</td>
                <td>
                  <span className={`status-badge ${template.status === 'Actif' ? '' : 'inactive'}`}>
                    {template.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="action-btn" title="Modifier">✏️</button>
                    <button className="action-btn" title="Dupliquer">📋</button>
                    <button className="action-btn" title="Supprimer">🗑️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="content-card">
      <div className="content-card-header">
        <h3 className="content-card-title">Gestion des Utilisateurs</h3>
        <button className="new-btn" onClick={() => setShowModal(true)}>+ Nouvel Utilisateur</button>
      </div>
      
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Rôle</th>
              <th>CV Créés</th>
              <th>Date d'inscription</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className="table-cell-with-icon">
                    <div className="user-avatar-small">{user.name.charAt(0)}</div>
                    <span>{user.name}</span>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>
                  <span className={`role-badge ${user.role === 'Premium' ? 'premium' : ''}`}>
                    {user.role}
                  </span>
                </td>
                <td>{user.cvCount}</td>
                <td>{user.joinDate}</td>
                <td>
                  <div className="action-buttons">
                    <button className="action-btn" title="Voir profil">👁️</button>
                    <button className="action-btn" title="Modifier">✏️</button>
                    <button className="action-btn" title="Supprimer">🗑️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="settings-container">
      <div className="content-card" style={{marginBottom: '1.5rem'}}>
        <h3 className="content-card-title" style={{marginBottom: '1.5rem'}}>Paramètres Généraux</h3>
        
        <div className="settings-section">
          <div className="setting-item">
            <div className="setting-info">
              <h4 className="setting-title">Nom de l'application</h4>
              <p className="setting-description">Le nom affiché dans l'application</p>
            </div>
            <input type="text" className="setting-input" defaultValue="CV Maker" />
          </div>
          
          <div className="setting-item">
            <div className="setting-info">
              <h4 className="setting-title">Email de contact</h4>
              <p className="setting-description">Email pour les notifications importantes</p>
            </div>
            <input type="email" className="setting-input" defaultValue="admin@cvmaker.com" />
          </div>
          
          <div className="setting-item">
            <div className="setting-info">
              <h4 className="setting-title">Limite de CV par utilisateur</h4>
              <p className="setting-description">Nombre maximum de CV qu'un utilisateur peut créer</p>
            </div>
            <input type="number" className="setting-input" defaultValue="5" style={{width: '120px'}} />
          </div>
          
          <div className="setting-item">
            <div className="setting-info">
              <h4 className="setting-title">Activer les inscriptions</h4>
              <p className="setting-description">Autoriser les nouveaux utilisateurs à s'inscrire</p>
            </div>
            <label className="toggle-switch">
              <input type="checkbox" defaultChecked />
              <span className="toggle-slider"></span>
            </label>
          </div>
          
          <div className="setting-item">
            <div className="setting-info">
              <h4 className="setting-title">Mode maintenance</h4>
              <p className="setting-description">Mettre l'application en maintenance</p>
            </div>
            <label className="toggle-switch">
              <input type="checkbox" />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>
        
        <div style={{marginTop: '2rem'}}>
          <button className="new-btn">Enregistrer les modifications</button>
        </div>
      </div>
      
      <div className="content-card">
        <h3 className="content-card-title" style={{marginBottom: '1.5rem'}}>Sécurité</h3>
        
        <div className="settings-section">
          <div className="setting-item">
            <div className="setting-info">
              <h4 className="setting-title">Authentification à deux facteurs</h4>
              <p className="setting-description">Ajouter une couche de sécurité supplémentaire</p>
            </div>
            <label className="toggle-switch">
              <input type="checkbox" defaultChecked />
              <span className="toggle-slider"></span>
            </label>
          </div>
          
          <div className="setting-item">
            <div className="setting-info">
              <h4 className="setting-title">Durée de session</h4>
              <p className="setting-description">Temps avant déconnexion automatique (en minutes)</p>
            </div>
            <input type="number" className="setting-input" defaultValue="30" style={{width: '120px'}} />
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch(activeMenu) {
      case 'templates':
        return renderTemplates();
      case 'users':
        return renderUsers();
      case 'settings':
        return renderSettings();
      default:
        return renderDashboard();
    }
  };

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        .container {
          display: flex;
          height: 100vh;
          background-color: #f9fafb;
        }

        .sidebar {
          background: linear-gradient(to bottom, #312e81, #4338ca);
          color: white;
          transition: width 0.3s ease-in-out;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .sidebar.open {
          width: 256px;
        }

        .sidebar.closed {
          width: 80px;
        }

        .sidebar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem;
          border-bottom: 1px solid #4f46e5;
        }

        .sidebar-title {
          font-size: 1.25rem;
          font-weight: bold;
          background: linear-gradient(to right, white, #c7d2fe);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .menu-toggle {
          padding: 0.5rem;
          border: none;
          background: none;
          color: white;
          cursor: pointer;
          border-radius: 0.5rem;
          transition: background-color 0.2s;
        }

        .menu-toggle:hover {
          background-color: #3730a3;
        }

        .nav {
          flex: 1;
          padding: 1rem;
        }

        .nav-item {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          margin-bottom: 0.5rem;
          border: none;
          border-radius: 0.5rem;
          background: none;
          color: #c7d2fe;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 1rem;
        }

        .nav-item:hover {
          background-color: #3730a3;
        }

        .nav-item.active {
          background-color: white;
          color: #312e81;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          transform: scale(1.05);
        }

        .nav-item span {
          font-weight: 500;
        }

        .user-section {
          padding: 1rem;
          border-top: 1px solid #4f46e5;
        }

        .user-profile {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .user-profile:hover {
          background-color: #3730a3;
        }

        .user-profile.centered {
          justify-content: center;
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(to bottom right, #818cf8, #a78bfa);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          flex-shrink: 0;
        }

        .user-info {
          flex: 1;
        }

        .user-name {
          font-weight: 500;
          font-size: 0.875rem;
        }

        .user-email {
          font-size: 0.75rem;
          color: #c7d2fe;
        }

        .logout-btn {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.5rem 1rem;
          margin-bottom: 2.5rem;
          border: none;
          border-radius: 0.5rem;
          background: none;
          color: #c7d2fe;
           background-color: #e00707ff;
          cursor: pointer;
          transition: background-color 0.2s;
          font-size: 0.875rem;
        }

        .logout-btn:hover {
          background-color: #e00707ff;
        }

        .main-content {
          flex: 1;
          overflow: auto;
        }

        .header {
          background-color: white;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          border-bottom: 1px solid #e5e7eb;
        }

        .header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 2rem;
        }

        .header-title {
          font-size: 1.5rem;
          font-weight: bold;
          color: #1f2937;
        }

        .header-subtitle {
          font-size: 0.875rem;
          color: #6b7280;
          margin-top: 0.25rem;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .notification-btn {
          position: relative;
          padding: 0.5rem;
          border: none;
          background: none;
          color: #4b5563;
          cursor: pointer;
          border-radius: 0.5rem;
          transition: background-color 0.2s;
        }

        .notification-btn:hover {
          background-color: #f3f4f6;
        }

        .notification-badge {
          position: absolute;
          top: 4px;
          right: 4px;
          width: 8px;
          height: 8px;
          background-color: #ef4444;
          border-radius: 50%;
        }

        .content-area {
          padding: 2rem;
          margin-top:62px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .stat-card {
          background-color: white;
          border-radius: 0.75rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          padding: 1.5rem;
          border: 1px solid #f3f4f6;
          cursor: pointer;
          transition: all 0.3s;
        }

        .stat-card:hover {
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
          transform: scale(1.05);
        }

        .stat-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          font-size: 0.875rem;
          font-weight: 500;
          color: #4b5563;
        }

        .stat-change {
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.25rem 0.5rem;
          border-radius: 9999px;
        }

        .stat-change.indigo {
          background-color: #e0e7ff;
          color: #4338ca;
        }

        .stat-change.green {
          background-color: #d1fae5;
          color: #059669;
        }

        .stat-change.blue {
          background-color: #dbeafe;
          color: #2563eb;
        }

        .stat-change.purple {
          background-color: #ede9fe;
          color: #7c3aed;
        }

        .stat-value {
          font-size: 1.875rem;
          font-weight: bold;
          color: #1f2937;
        }

        .content-card {
          background-color: white;
          border-radius: 0.75rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          padding: 1.5rem;
          border: 1px solid #f3f4f6;
        }

        .content-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
        }

        .content-card-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: #1f2937;
        }

        .new-btn {
          padding: 0.5rem 1rem;
          background-color: #4f46e5;
          color: white;
          border: none;
          border-radius: 0.5rem;
          cursor: pointer;
          font-weight: 500;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          transition: all 0.2s;
        }

        .new-btn:hover {
          background-color: #4338ca;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }

        .template-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .template-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem;
          background-color: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .template-item:hover {
          background-color: #f3f4f6;
        }

        .template-info {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .template-icon {
          width: 48px;
          height: 48px;
          background: linear-gradient(to bottom right, #6366f1, #a855f7);
          border-radius: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          flex-shrink: 0;
        }

        .template-title {
          font-weight: 500;
          color: #1f2937;
        }

        .template-date {
          font-size: 0.875rem;
          color: #6b7280;
        }

        .template-actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .status-badge {
          padding: 0.25rem 0.75rem;
          background-color: #d1fae5;
          color: #059669;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .status-badge.inactive {
          background-color: #fee2e2;
          color: #dc2626;
        }

        .action-btn {
          padding: 0.5rem;
          border: none;
          background: none;
          cursor: pointer;
          border-radius: 0.5rem;
          transition: background-color 0.2s;
          color: #4b5563;
        }

        .action-btn:hover {
          background-color: #e5e7eb;
        }

        .table-container {
          overflow-x: auto;
        }

        .data-table {
          width: 100%;
          border-collapse: collapse;
        }

        .data-table thead {
          background-color: #f9fafb;
          border-bottom: 2px solid #e5e7eb;
        }

        .data-table th {
          padding: 0.75rem 1rem;
          text-align: left;
          font-size: 0.875rem;
          font-weight: 600;
          color: #4b5563;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .data-table td {
          padding: 1rem;
          border-bottom: 1px solid #e5e7eb;
          font-size: 0.875rem;
          color: #1f2937;
        }

        .data-table tbody tr {
          transition: background-color 0.2s;
        }

        .data-table tbody tr:hover {
          background-color: #f9fafb;
        }

        .table-cell-with-icon {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .template-icon-small {
          width: 36px;
          height: 36px;
          background: linear-gradient(to bottom right, #6366f1, #a855f7);
          border-radius: 0.375rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 0.75rem;
          flex-shrink: 0;
        }

        .user-avatar-small {
          width: 36px;
          height: 36px;
          background: linear-gradient(to bottom right, #818cf8, #a78bfa);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 0.875rem;
          flex-shrink: 0;
        }

        .action-buttons {
          display: flex;
          gap: 0.5rem;
        }

        .role-badge {
          padding: 0.25rem 0.75rem;
          background-color: #dbeafe;
          color: #2563eb;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .role-badge.premium {
          background-color: #fef3c7;
          color: #d97706;
        }

        .settings-container {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .settings-section {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .setting-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem;
          background-color: #f9fafb;
          border-radius: 0.5rem;
          border: 1px solid #e5e7eb;
        }

        .setting-info {
          flex: 1;
        }

        .setting-title {
          font-weight: 500;
          color: #1f2937;
          margin-bottom: 0.25rem;
        }

        .setting-description {
          font-size: 0.875rem;
          color: #6b7280;
        }

        .setting-input {
          padding: 0.5rem 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 0.375rem;
          font-size: 0.875rem;
          width: 300px;
          transition: border-color 0.2s;
        }

        .setting-input:focus {
          outline: none;
          border-color: #4f46e5;
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
        }

        .toggle-switch {
          position: relative;
          display: inline-block;
          width: 48px;
          height: 24px;
        }

        .toggle-switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .toggle-slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #d1d5db;
          transition: 0.3s;
          border-radius: 24px;
        }

        .toggle-slider:before {
          position: absolute;
          content: "";
          height: 18px;
          width: 18px;
          left: 3px;
          bottom: 3px;
          background-color: white;
          transition: 0.3s;
          border-radius: 50%;
        }

        .toggle-switch input:checked + .toggle-slider {
          background-color: #4f46e5;
        }

        .toggle-switch input:checked + .toggle-slider:before {
          transform: translateX(24px);
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal-content {
          background-color: white;
          border-radius: 0.75rem;
          padding: 2rem;
          max-width: 500px;
          width: 90%;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        }

          .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
        }

        .modal-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #1f2937;
        }

        .modal-close {
          background: none;
          border: none;
          color: #6b7280;
          cursor: pointer;
          font-size: 1.25rem;
          padding: 0.25rem;
          border-radius: 0.25rem;
          transition: background-color 0.2s;
        }

        .modal-close:hover {
          background-color: #f3f4f6;
        }

        .modal-body {
          margin-bottom: 1.5rem;
        }

        .modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 0.75rem;
        }

        .modal-btn {
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .modal-btn.secondary {
          background-color: #f3f4f6;
          color: #1f2937;
          border: 1px solid #e5e7eb;
        }

        .modal-btn.primary {
          background-color: #4f46e5;
          color: white;
          border: none;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .modal-btn.secondary:hover {
          background-color: #e5e7eb;
        }

        .modal-btn.primary:hover {
          background-color: #4338ca;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }

        @media (max-width: 768px) {
          .sidebar.open {
            width: 80px;
          }
          .sidebar-title, .nav-item span, .user-name, .user-email {
            display: none;
          }
          .user-profile {
            justify-content: center;
          }
          .nav-item {
            justify-content: center;
            gap: 0;
          }
          .content-area {
            padding: 1rem;
          }
        }
      `}</style>

      <div className="container">
        {/* Sidebar */}
        <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
          <div className="sidebar-header">
            {sidebarOpen && <h2 className="sidebar-title">Admin Panel</h2>}
            <button className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          <nav className="nav">
            {menuItems.map((item) => (
              <button
                key={item.id}
                className={`nav-item ${activeMenu === item.id ? 'active' : ''}`}
                onClick={() => setActiveMenu(item.id)}
              >
                <item.icon size={20} />
                {sidebarOpen && <span>{item.label}</span>}
              </button>
            ))}
          </nav>

          <div className="user-section">
            <div className={`user-profile ${!sidebarOpen ? 'centered' : ''}`}>
              <div className="user-avatar">A</div>
              {sidebarOpen && (
                <div className="user-info">
                  <div className="user-name">Admin</div>
                  <div className="user-email">madeubertrand@gmail.com</div>
                </div>
              )}
            </div>
            <button className="logout-btn">
              <LogOut size={18} />
              {sidebarOpen && <span>Déconnexion</span>}
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          <header className="header">
            <div className="header-content">
              <div>
                <h1 className="header-title">
                  {menuItems.find(item => item.id === activeMenu)?.label || 'Dashboard'}
                </h1>
                <p className="header-subtitle">Bienvenue dans votre tableau de bord administrateur</p>
              </div>
              <div className="header-actions">
                <button className="notification-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM9 7H4l5-5v5z" />
                  </svg>
                  <span className="notification-badge"></span>
                </button>
              </div>
            </div>
          </header>

          <div className="content-area">
            {renderContent()}
          </div>
        </main>
      </div>

      {/* Modal (simple placeholder) */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">
                {activeMenu === 'users' ? 'Nouvel Utilisateur' : 'Nouveau Modèle'}
              </h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <p>
                {activeMenu === 'users'
                  ? "Formulaire d'ajout d'un nouvel utilisateur (à implémenter)."
                  : "Formulaire de création d'un nouveau modèle CV (à implémenter)."}
              </p>
            </div>
            <div className="modal-footer">
              <button className="modal-btn secondary" onClick={() => setShowModal(false)}>
                Annuler
              </button>
              <button className="modal-btn primary" onClick={() => setShowModal(false)}>
                Créer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}