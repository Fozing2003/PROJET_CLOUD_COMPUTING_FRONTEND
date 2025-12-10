import React from "react";
import "./Templates.css"; // CSS dédié pour la page

function Templates() {
  // Liste complète des modèles
  const models = [
    { id: 1, name: "Modèle Moderne", image: "/models/cv2.png", color: "#5E81F4" },
    { id: 2, name: "Modèle Élégant", image: "/models/cv4.png", color: "#00B894" },
    { id: 3, name: "Modèle Classique", image: "/models/cv3.jpeg", color: "#FDCB6E" },
    { id: 4, name: "Modèle Minimaliste", image: "/models/cv2.png", color: "#E84393" },
    { id: 5, name: "Modèle Professionnel", image: "/models/cv5.png", color: "#0984E3" },
    { id: 1, name: "Modèle Moderne", image: "/models/cv7.jpg", color: "#5E81F4" },
    { id: 2, name: "Modèle Élégant", image: "/models/cv4.png", color: "#00B894" },
  ];

  return (
    <main className="templates-container">
      <h1>Catalogue de modèles</h1>
      <p>Découvrez tous les modèles de CV disponibles et choisissez celui qui vous convient.</p>

      <div className="templates-grid">
        {models.map((model) => (
          <div key={model.id} className="cv-model" style={{ borderTop: `5px solid ${model.color}` }}>
            <div className="cv-model-content">
              <div className="cv-sample">
                <img src={model.image} alt={model.name} className="cv-image" />
              </div>
              <h4>{model.name}</h4>
              <button className="use-model-btn">Utiliser</button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Templates;
