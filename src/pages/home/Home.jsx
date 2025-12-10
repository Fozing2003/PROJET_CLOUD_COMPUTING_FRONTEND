import React from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";

function Home() {
  const navigate = useNavigate();

  // Liste des 4 modèles avec image et couleur pour la bordure
  const models = [
    { id: 1, name: "Modèle Moderne", image: "/models/cv2.png", color: "#5E81F4" },
    { id: 2, name: "Modèle Élégant", image: "/models/cv3.jpeg", color: "#00B894" },
    { id: 3, name: "Modèle Classique", image: "/models/cv4.png", color: "#FDCB6E" },
    { id: 4, name: "Modèle Minimaliste", image: "/models/cv5.png", color: "#E84393" },
  ];

  return (
    <div className="app">
      <main>
        <h1>Créer son CV devient un jeu d'enfant</h1>
        <p>Générez votre CV facilement ou choisissez un modèle existant.</p>
        <button className="use-model-btn1">Créer votre CV</button>

        <div className="cv-carousel">
          {models.map((model) => (
            <div
              key={model.id}
              className="cv-model"
              style={{ borderTop: `5px solid ${model.color}` }}
            >
              <div className="cv-model-content">
                {/* Image du modèle */}
                <div className="cv-sample">
                  <img src={model.image} alt={model.name} className="cv-image" />
                </div>

                <h4>{model.name}</h4>
                <button className="use-model-btn">Utiliser</button>
              </div>
            </div>
          ))}
        </div>
        <div className="see-more">
          <button onClick={() => navigate("/templates")} className="see-more-btn">
            Voir plus <span className="arrow">→</span>
          </button>
        </div>

      </main>
    </div>
  );
}

export default Home;
