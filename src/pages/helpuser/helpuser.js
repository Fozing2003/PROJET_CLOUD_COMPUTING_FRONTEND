import React from "react";

export default function Helpuser() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Aide</h1>
      <p>Besoin d’aide ? Voici quelques informations pour utiliser l’application :</p>

      <ul style={{ marginTop: "1rem", lineHeight: "1.8" }}>
        <li>Créer et gérer vos CV facilement.</li>
        <li>Choisir parmi plusieurs modèles disponibles.</li>
        <li>Modifier vos informations personnelles dans votre profil.</li>
        <li>Configurer vos préférences dans les paramètres.</li>
      </ul>
    </div>
  );
}
