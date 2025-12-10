import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Topbar.css";

export default function Topbar({ avatar }) {
  const [openMenu, setOpenMenu] = useState(false);
  const [notifications, setNotifications] = useState(0);

  useEffect(() => {
    setNotifications(0);
  }, []);

  return (
    <header className="topbar">
      {/* Logo */}
      <div className="topbar-left">
        <div className="logo-box">CV</div>
        <span className="brand-name">CV Maker</span>
      </div>

      {/* 🔎 BARRE DE RECHERCHE AU MILIEU */}
      <div className="topbar-search">
        <input
          type="text"
          placeholder="Chercher un modèle…"
          className="search-input"
        />
        <button className="search-btn">
          🔍
        </button>
      </div>

      <div className="topbar-right">
        {/* Notifications */}
        <div className="notification-icon">
          🔔
          {notifications > 0 && <span className="badge">{notifications}</span>}
        </div>

        {/* Menu profil */}
        <div
          className="profile-container"
          onClick={() => setOpenMenu(!openMenu)}
        >
          <img
            src={avatar || "/images/default-avatar.png"}
            alt="Profil"
            className="profile-avatar"
          />
          {openMenu && (
            <ul className="profile-dropdown">
              <li><Link to="/profile">Mon Profil</Link></li>
              <li><Link to="/settings">Paramètres</Link></li>
              <li><Link to="/help">Aide</Link></li>
              <li><Link to="/">Déconnexion</Link></li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
}
