import React, { useState } from "react";
import "./modele2.css";
import SkillBar from "./SkillBar";


export default function Modele2({ editable = false }) {
  const [photo, setPhoto] = useState(null);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setPhoto(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="cv2-container">
      {/* LEFT PANEL */}
      <div className="cv2-left">
        <div
          className="cv2-photo-box"
          onClick={() => document.getElementById("photoInput2").click()}
        >
          {photo ? (
            <img src={photo} alt="profil" className="cv2-photo" />
          ) : (
            <div className="cv2-photo-placeholder">Importer photo</div>
          )}
          <input
            id="photoInput2"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handlePhotoUpload}
          />
        </div>

        <div className="cv2-section">
          <h4>COMPÉTENCES</h4>
          <ul>
            <li contentEditable={editable}>Expertise comptable - Gestion client</li>
            <li contentEditable={editable}>Audit - Révision des comptes</li>
            <li contentEditable={editable}>MS Excel - MS Word - PowerPoint</li>
            <li contentEditable={editable}>QuickBooks</li>
          </ul>
        </div>

        <div className="cv2-section">
          <h4 contentEditable={editable}>RÉUSSITES</h4>
          <ul>
            <li contentEditable={editable}>
              Gestion de portefeuille de 20 PME<br />
              <span>Avec un taux de succès de 98% sur l'accompagnement financier.</span>
            </li>
            <li contentEditable={editable}>
              Modernisation du processus comptable<br />
              <span>Réduction de 15% des coûts internes.</span>
            </li>
          </ul>
        </div>

        <div className="cv2-section">
          <h4>POINTS FORTS</h4>
          <ul>
            <li contentEditable={editable}>Compétences relationnelles</li>
            <li contentEditable={editable}>Rigueur & sens du détail</li>
            <li contentEditable={editable}>Gestion du stress</li>
            <li contentEditable={editable}>Créativité & adaptation</li>
          </ul>
        </div>

        <div className="cv2-section">
          <h4>LANGUES</h4>
          <ul>
            <li contentEditable={editable}>Français ★★★★★</li>
            <li> contentEditable={editable}Anglais ★★★★☆</li>
          </ul>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="cv2-right">
        <h1 contentEditable={editable}>MARIE LEMOINE</h1>
        <h3 contentEditable={editable}>Experte-Comptable | Gestion Client | Audit & Révision</h3>

        <div className="cv2-contact">
          <p contentEditable={editable}>📞 +33 5 98 76 54 32</p>
          <p contentEditable={editable}>✉️ email@example.com</p>
          <p contentEditable={editable}>🔗 linkedin.com</p>
          <p contentEditable={editable}>📍 Paris, France</p>
        </div>

        <div className="cv2-block">
          <h4>PROFIL PROFESSIONNEL</h4>
          <p contentEditable={editable}>
            Passionnée par l'expertise comptable, avec une expérience d’un an dans le domaine.
            Excellente connaissance des gestions de sections clients, tenue, révision et gestion des comptes PME.
          </p>
        </div>

        <div className="cv2-block">
          <h4>EXPÉRIENCE PROFESSIONNELLE</h4>
          <h5 contentEditable={editable}>Assistant Expert-Comptable — Deloitte (2022 - 2023)</h5>
          <p contentEditable={editable}>Paris, France</p>
          <ul>
            <li contentEditable={editable}>Gestion et révision de dossiers PME.</li>
            <li contentEditable={editable}>Optimisation des processus comptables.</li>
            <li contentEditable={editable}>Audit financier annuel.</li>
          </ul>
        </div>

        <div className="cv2-block">
          <h4>FORMATION</h4>
          <h5 contentEditable={editable}>Master en Comptabilité & Audit — Univ. Paris Dauphine (2018 - 2022)</h5>
          <h5 contentEditable={editable}>Licence de Sciences Comptables — Univ. Paris 1 (2015 - 2018)</h5>
        </div>

        <div className="cv2-block">
          <h4>COURS ET CERTIFICATIONS</h4>
          <ul>
            <li contentEditable={editable}>Formation en Gestion Budgétaire</li>
            <li contentEditable={editable}>Cash Management Certification</li>
          </ul>
        </div>

        <div className="cv2-block">
          <h4>MA JOURNÉE</h4>
          <div className="cv2-journee-demo">(Graphique décoratif)</div>
        </div>
      </div>
    </div>
  );
}
