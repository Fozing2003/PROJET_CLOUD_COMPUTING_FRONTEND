import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";

export default function Sidebar({ setSelectedModel }) {
  const [openTemplates, setOpenTemplates] = useState(false);

  const models = [
    { id: 1, name: "Modèle 1", img: "/models/cv2.png" },
    { id: 2, name: "Modèle 2", img: "/models/cv5.png" },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">Dashboard</div>

      <nav className="sidebar-nav">
        <ul>
          <li>
            <Link to="/" className="sidebar-link">Accueil</Link>
          </li>

          <li>
            <div
              className="sidebar-link dropdown-toggle"
              onClick={() => setOpenTemplates(!openTemplates)}
            >
              Modèles <span className="chevron">{openTemplates ? "▲" : "▼"}</span>
            </div>

            {openTemplates && (
              <ul className="dropdown-menu">
                {models.map((model) => (
                  <li key={model.id}>
                    <img
                      src={model.img}
                      alt={model.name}
                      className="miniature"
                      onClick={() => setSelectedModel(model.img.replace("/models/", "").replace(".png", ""))}
                      title={model.name}
                    />
                  </li>
                ))}
              </ul>
            )}
          </li>

          <li>
            <Link to="/settings" className="sidebar-link">Paramètres</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
