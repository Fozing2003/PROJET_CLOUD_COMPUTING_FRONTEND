import React, { useState } from "react";
import "./modele3.css";
import SkillBar from "./SkillBar";


export default function Modele3({ editable = false }) {
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
    <div className="cv3-container">
      {/* HEADER */}
      <div className="cv3-header">
        <div className="cv3-photo-box" onClick={() => document.getElementById("photoInput3").click()}>
          {photo ? <img src={photo} alt="profil" className="cv3-photo" /> : <div className="cv3-photo-placeholder">Importer photo</div>}
          <input id="photoInput3" type="file" accept="image/*" style={{ display: "none" }} onChange={handlePhotoUpload} />
        </div>

        <div className="cv3-header-info">
          <h1 contentEditable={editable}>Nom Prénom</h1>
          <h3 contentEditable={editable}>Contrôleur de gestion</h3>

          <div className="cv3-contact">
            <p contentEditable={editable}>27 ans, Célibataire</p>
            <p contentEditable={editable}>Adresse : xxxxx</p>
            <p contentEditable={editable}>Phone : 00-71-40-xxxx</p>
            <p contentEditable={editable}>Email : xxxxx@gmail.com</p>
            <p contentEditable={editable}>Mobilité : Nationale</p>
            <p contentEditable={editable}>Disponibilité : Immédiate</p>
          </div>
        </div>
      </div>

      <div className="cv3-body">
        {/* LEFT SIDE */}
        <div className="cv3-left">
          <div className="cv3-section">
            <h4>OUTILS INFORMATIQUES</h4>
            <ul>
              <li contentEditable={editable}>Outil 1</li>
              <li contentEditable={editable}>Outil 2</li>
              <li contentEditable={editable}>Outil 3</li>
              <li contentEditable={editable}>Outil 4</li>
              <li contentEditable={editable}>Outil 5</li>
              <li contentEditable={editable}>Outil 6</li>
            </ul>
          </div>

          <div className="cv3-section">
            <h4>LANGUES</h4>
            <ul>
              <li contentEditable={editable}>Arabe</li>
              <li contentEditable={editable} >Tamazight</li>
              <li contentEditable={editable}>Anglais</li>
              <li contentEditable={editable}>Français</li>
            </ul>
          </div>

          <div className="cv3-section">
            <h4>COMPÉTENCES</h4>
            <ul>
              <li contentEditable={editable}>Compétence 1</li>
              <li contentEditable={editable}>Compétence 2</li>
              <li contentEditable={editable}>Compétence 3</li>
              <li contentEditable={editable}>Compétence 4</li>
            </ul>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="cv3-right">
          <div className="cv3-block">
            <h3>FORMATIONS</h3>
            <ul>
              <li contentEditable={editable}>L'année 2017 : Faculté des xxx</li>
              <li contentEditable={editable}>L'année 2015 : Master de xxx</li>
              <li contentEditable={editable}>L'année 2014 : Licence de xxx</li>
              <li contentEditable={editable}>L'année 2012 : DEUG de xxx</li>
              <li contentEditable={editable}>Baccalauréat xxx</li>
            </ul>
          </div>

          <div className="cv3-block">
            <h3>EXPÉRIENCES PROFESSIONNELLES</h3>
            {[1, 2, 3].map((i) => (
              <div key={i} className="cv3-exp">
                <h4 contentEditable={editable}>NOM ENTREPRISE | MOIS 2017 – MOIS 2017</h4>
                <p contentEditable={editable}>Titre du poste : Décrivez ici les fonctions que vous avez occupé et les résultats obtenus.</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}