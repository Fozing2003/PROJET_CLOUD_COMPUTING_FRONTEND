<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Tableau de bord - Interface Utilisateur</title>
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: "Segoe UI", Arial, sans-serif;
    }

    body {
      display: flex;
      height: 100vh;
      background-color: #eef2f3;
    }

    /* --- Barre latérale --- */
    .sidebar {
      background-color: #2c3e50;
      color: white;
      width: 230px;
      display: flex;
      flex-direction: column;
      padding: 20px;
      overflow-y: auto;
    }

    .sidebar h2 {
      font-size: 1.2em;
      margin-bottom: 20px;
      border-bottom: 1px solid #34495e;
      padding-bottom: 10px;
    }

    .sidebar ul {
      list-style: none;
    }

    .sidebar ul li {
      margin: 12px 0;
      cursor: pointer;
      transition: 0.2s;
      padding: 8px;
      border-radius: 4px;
    }

    .sidebar ul li:hover {
      background-color: #34495e;
    }

    /* --- Sous-menu --- */
    .submenu {
      list-style: none;
      margin-top: 5px;
      margin-left: 15px;
      display: none;
      transition: max-height 0.3s ease;
    }

    .submenu li {
      font-size: 0.9em;
      color: #bdc3c7;
    }

    .submenu li:hover {
      color: #1abc9c;
    }

    /* --- Zone principale --- */
    .main-content {
      flex: 1;
      background-color: #f9f9f9;
      display: flex;
      flex-direction: column;
    }

    /* --- En-tête --- */
    .header {
      background-color: white;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: 10px 20px;
      border-bottom: 1px solid #ddd;
    }

    .header .icon {
      font-size: 20px;
      margin-left: 20px;
      cursor: pointer;
    }

    /* --- Contenu principal --- */
    .content {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
    }

    .content h3 {
      font-size: 1.2em;
      margin-bottom: 20px;
      color: #2c3e50;
    }

    .btn {
      background-color: #0078d7;
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 8px;
      font-size: 16px;
      cursor: pointer;
      transition: 0.3s;
    }

    .btn:hover {
      background-color: #005fa3;
    }

    /* --- Responsive --- */
    @media (max-width: 768px) {
      body {
        flex-direction: column;
      }
      .sidebar {
        width: 100%;
        flex-direction: row;
        justify-content: space-around;
      }
      .sidebar h2 {
        display: none;
      }
    }
  </style>

  <script>
    function creerCV() {
      alert("Fonctionnalité à venir : Créer un CV !");
    }

    function toggleSubmenu() {
      const submenu = document.getElementById("submenu-param");
      submenu.style.display =
        submenu.style.display === "block" ? "none" : "block";
    }
  </script>
</head>
<body>
  
  <div class="sidebar">
    <h2>Tableau de bord</h2>
    <ul>
      <li>📄 Mes CV</li>
      <li>📋 Liste CV</li>

    
      <li onclick="toggleSubmenu()">⚙️ Paramètres ▾</li>
      <ul class="submenu" id="submenu-param">
        <li>👤 Mon profil</li>
        <li>🔒 Sécurité</li>
        <li>🚪 Déconnexion</li>
      </ul>
    </ul>
  </div>

  
  <div class="main-content">

    <div class="header">
      <span class="icon">🔔</span>
      <span class="icon">☰</span>
    </div>

    
    <div class="content">
      <h3>Texte : Bienvenue sur ton espace utilisateur</h3>
      <button class="btn" onclick="creerCV()">Créer un CV</button>
    </div>
  </div>
</body>
</html>