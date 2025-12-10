import React from "react";
import "./help.css"; // CSS dédié pour la page

function Help() {
  return (
    <main className="help-container">
      <h1>Assistance & FAQ</h1>
      <p>
        Vous avez besoin d’aide pour créer votre CV ? Voici un guide rapide pour vous accompagner.
      </p>

      <section className="faq-section">
        <div className="faq-item">
          <h3>Comment créer un CV rapidement ?</h3>
          <p>
            Cliquez sur "Créer votre CV" depuis la page d'accueil, choisissez un modèle, remplissez vos informations et téléchargez votre CV en quelques minutes.
          </p>
        </div>

        <div className="faq-item">
          <h3>Puis-je modifier un modèle existant ?</h3>
          <p>
            Oui, vous pouvez personnaliser chaque modèle en modifiant les textes, les sections et les couleurs selon vos préférences.
          </p>
        </div>

        <div className="faq-item">
          <h3>Comment télécharger mon CV ?</h3>
          <p>
            Après avoir créé votre CV, cliquez sur le bouton "Télécharger" pour obtenir une version PDF prête à être envoyée.
          </p>
        </div>

        <div className="faq-item">
          <h3>Est-ce gratuit ?</h3>
          <p>
            Oui, la création et le téléchargement des CV de base sont entièrement gratuits.
          </p>
        </div>
      </section>
    </main>
  );
}

export default Help;
