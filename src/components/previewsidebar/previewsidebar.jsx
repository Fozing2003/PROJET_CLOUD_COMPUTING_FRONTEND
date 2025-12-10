import React from "react";
import "./previewsidebar.css";

export default function PreviewSidebar({ model, onClose }) {
  if (!model) return null;

  // Ici tu peux gérer la fonction quand l'utilisateur clique sur "Utiliser"
  const handleUseModel = () => {
    alert(`Vous avez choisi le modèle ${model}`);
    onClose(); // ferme la preview après le choix
    // Ici, plus tard, tu peux rediriger vers la page de création de CV avec ce modèle
  };

  return (
    <aside className="preview-sidebar">
      <div className="preview-header">
        <h3>Prévisualisation</h3>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>

      <div className="preview-content">
        <img
          src={`/models/${model}.png`}
          alt={`Prévisualisation ${model}`}
          className="preview-image"
        />
        <button className="use-model-btn-preview" onClick={handleUseModel}>
          Utiliser ce modèle
        </button>
      </div>
    </aside>
  );
}
