import React, { useState } from "react";
import "./modele4.css";
import SkillBar from "./SkillBar";


export default function Modele4({ editable = false }) {
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
    <div className="cv4-container">
      {/* LEFT COLUMN */}
      <div className="cv4-left">
        <div className="cv4-photo-wrapper" onClick={() => document.getElementById("photoInput4").click()}>
          {photo ? (
            <img src={photo} alt="profil" className="cv4-photo" />
          ) : (
            <div className="cv4-photo-placeholder">Importer photo</div>
          )}
          <input id="photoInput4" type="file" accept="image/*" style={{ display: "none" }} onChange={handlePhotoUpload} />
        </div>

        <h1 contentEditable={editable}>Prénom<br />NOM</h1>
        <h3 contentEditable={editable}>INFOGRAPHISTE</h3>

        <div className="cv4-section">
          <ul className="cv4-links">
            <li contentEditable={editable}>profil.skype</li>
            <li contentEditable={editable}>url.linkedin</li>
            <li contentEditable={editable}>profil.twitter</li>
          </ul>
        </div>

        <div className="cv4-section">
          <h3 className="cv4-title">EXPÉRIENCES PROFESSIONNELLES</h3>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="cv4-exp-block">
              <p contentEditable={editable}>Du 00/00/0000 au 00/00/0000<br />(Ville-Pays)</p>
              <h4 contentEditable={editable}>NOM DE L'ENTREPRISE</h4>
              <p contentEditable={editable}>Infographiste</p>
              <p contentEditable={editable}>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div className="cv4-right">
        <div className="cv4-contact-row">
          <p contentEditable={editable}>📍 xxxxxxxxxxxxx</p>
          <p contentEditable={editable} >📞 xxxxxxxxxxxxxx</p>
          <p contentEditable={editable}>✉️ xxxxxxxxxx@xxx.com</p>
        </div>

        <div className="cv4-desc">
          <h3 contentEditable={editable}>Brève description de ton profil</h3>
          <p contentEditable={editable}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eu lacus id
            lacus gravida luctus. Aliquam nec varius mauris. Lorem ipsum dolor sit amet.
          </p>
        </div>

        <div className="cv4-block">
          <h3 contentEditable={editable}>FORMATION</h3>
          <ul>
            <li contentEditable={editable}>Annéés — Diplôme — Université ou école</li>
            <li contentEditable={editable}>Annéés — Diplôme — Université ou école</li>
            <li contentEditable={editable}i>Annéés — Diplôme — Université ou école</li>
          </ul>
        </div>

        <div className="cv4-block">
          <h3>LANGUES</h3>
          <ul>
            <li contentEditable={editable}>Allemand</li>
            <li contentEditable={editable}>Anglais</li>
            <li contentEditable={editable}>Espagnol</li>
          </ul>
        </div>

        <div className="cv4-block">
          <h3>COMPÉTENCES</h3>
          <ul>
            <li contentEditable={editable}>Word</li>
            <li contentEditable={editable}>Excel</li>
            <li contentEditable={editable}>Photoshop</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
