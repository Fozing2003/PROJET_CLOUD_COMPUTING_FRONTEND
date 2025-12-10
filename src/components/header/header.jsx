import React from "react";
import { Link } from "react-router-dom";
import "./header.css";

export default function Header() {
  const nav = [
    { name: "Accueil", path: "/" },
    { name: "Modèles", path: "/templates" },
    { name: "Aide", path: "/help" },
    { name: "Se connecter", path: "/login" },
  ];

  return (
    <header className="header">
      <div className="header-container">

        {/* --- LOGO À GAUCHE --- */}
        <div className="header-brand">
          <div className="logo-box">CV</div>
          <span className="brand-name">CV Maker</span>
        </div>

        {/* --- NAVIGATION À DROITE --- */}
        <nav className="nav-container">
          {nav.map((item, index) => (
            <Link key={index} to={item.path} className="nav-link">
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
