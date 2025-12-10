import React, { useState } from "react";
import SkillBar from "./SkillBar";
import "./modele1.css";

export default function Modele1({ editable = false }) {
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
    <div className="cv-container">
      <div className="left-section">
        <div className="photo-container" onClick={() => document.getElementById("photoInput").click()}>
          {photo ? (
            <img src={photo} alt="profil" className="photo" />
          ) : (
            <div className="photo-placeholder">Cliquez pour importer</div>
          )}
          <input
            id="photoInput"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handlePhotoUpload}
          />
        </div>

        <h2 contentEditable={editable}>NOMS & PRENOMS</h2>
        <h3 contentEditable={editable}>INGÉNIEUR INFORMATICIEN</h3>

        <section>
          <h4>PROFIL</h4>
          <p contentEditable={editable}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris iaculis lobortis diam.
          </p>
        </section>

        <section>
          <h4>LOGICIELS</h4>
          <div className="bar-group">
            {[1,2,3].map((i) => (
              <div key={i} className="bar-line">
                <span contentEditable={editable}>LOGICIEL</span>
                <SkillBar name="" defaultValue={65} editable={editable} />
              </div>
            ))}
          </div>
        </section>

        <section>
          <h4>COMPÉTENCES</h4>
          <div className="bar-group">
            {[1,2,3].map((i) => (
              <div key={i} className="bar-line">
                <span contentEditable={editable}>COMPÉTENCE</span>
                <SkillBar name="" defaultValue={80} editable={editable} />

              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="right-section">
        <section>
          <h4>EXPÉRIENCE</h4>
          {[1,2,3].map((i) => (
            <div key={i} className="exp-block">
              <h5 contentEditable={editable}>NOM DE L'ENTREPRISE | JAN 2009 - DÉC 2011</h5>
              <p contentEditable={editable}>FONCTION AU SEIN DE L'ENTREPRISE</p>
              <p contentEditable={editable}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris iaculis lobortis diam.
              </p>
            </div>
          ))}
        </section>

        <section>
          <h4 contentEditable={editable}>FORMATION</h4>
          {[1,2,3].map((i) => (
            <div key={i} className="exp-block">
              <h5 contentEditable={editable}>TITRE ATTEINT | JAN 2009 - DÉC 2011</h5>
              <p contentEditable={editable}>CENTRE ÉDUCATIF</p>
              <p contentEditable={editable}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris iaculis lobortis diam.
              </p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
