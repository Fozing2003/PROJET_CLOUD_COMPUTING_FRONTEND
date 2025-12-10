import React from "react";

export default function Profile() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Mon Profil</h1>
      <p>Ici, vous pouvez voir vos informations personnelles et les modifier si nécessaire.</p>

      <div style={{ marginTop: "1rem" }}>
        <p><strong>Nom :</strong> John Doe</p>
        <p><strong>Email :</strong> johndoe@example.com</p>
      </div>
    </div>
  );
}
