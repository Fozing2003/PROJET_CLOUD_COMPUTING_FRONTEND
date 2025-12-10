import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo + description */}
        <div className="footer-brand">
          <div className="logo-box">CV</div>
          <div className="brand-text">
            <span className="brand-name">CV Maker</span>
            <p>Créez votre CV professionnel en quelques minutes.</p>
          </div>
        </div>

        {/* Liens utiles */}
        <div className="footer-links">
          <h4>Liens utiles</h4>
          <Link to="/">Accueil</Link>
          <Link to="/templates">Modèles</Link>
          <Link to="/help">Aide</Link>
          <Link to="/contact">Contact</Link>
        </div>

        {/* Contact */}
        <div className="footer-contact">
          <h4>Contact</h4>
          <p>Email : support@cvmaker.com</p>
          <p>Téléphone : +237 600 000 000</p>
          <div className="socials">
            <a href="#" aria-label="Facebook">FB</a>
            <a href="#" aria-label="Twitter">TW</a>
            <a href="#" aria-label="LinkedIn">LI</a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} CV Maker. Tous droits réservés.
      </div>
    </footer>
  );
}
