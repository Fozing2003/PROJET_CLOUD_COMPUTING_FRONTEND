import React from "react";

export default function Settings() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Paramètres</h1>
      <p>Gérez vos préférences et configurations personnelles ici.</p>

      <div style={{ marginTop: "1rem" }}>
        <p><strong>Notifications :</strong> Activées</p>
        <p><strong>Thème :</strong> Clair</p>
      </div>
    </div>
  );
}
