import React from "react";
import { Link } from "react-router-dom";
import "./CreerCV.css";

export default function CreerCV() {
  return (
    <div className="creer-cv-container">
      <h1 className="creer-cv-title">Choisissez un modèle de CV</h1>

      <div className="cv-modeles-grid">

        {/* Modèle 1 */}
        <Link to="/creer-cv/modele1" className="cv-modele-card">
          <img className="cv-modele-img" src="/modele1.jpg" alt="Modèle 1" />
          <p className="cv-modele-title">Modèle 1</p>
        </Link>

        {/* Modèle 2 */}
        <Link to="/creer-cv/modele2" className="cv-modele-card">
          <img className="cv-modele-img" src="/modele2.jpg" alt="Modèle 2" />
          <p className="cv-modele-title">Modèle 2</p>
        </Link>

        {/* Modèle 3 */}
        <Link to="/creer-cv/modele3" className="cv-modele-card">
          <img className="cv-modele-img" src="/modele3.jpg" alt="Modèle 3" />
          <p className="cv-modele-title">Modèle 3</p>
        </Link>

        {/* Modèle 4 */}
        <Link to="/creer-cv/modele4" className="cv-modele-card">
          <img className="cv-modele-img" src="/modele4.jpg" alt="Modèle 4" />
          <p className="cv-modele-title">Modèle 4</p>
        </Link>

      </div>
    </div>
  );
}
