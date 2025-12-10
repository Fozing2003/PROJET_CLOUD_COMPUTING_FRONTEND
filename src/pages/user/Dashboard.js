import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/sidebar";
import Topbar from "../../components/topbar/Topbar";
import PreviewSidebar from "../../components/previewsidebar/previewsidebar";
import { FaEye, FaTrash } from "react-icons/fa";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";


export default function Dashboard() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [cvList, setCvList] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);

  useEffect(() => {
    // Simulation des données utilisateur
    const loggedInUser = { name: "Utilisateur" };
    const userCVs = [
      { id: 1, title: "CV Développeur Web", model: "Moderne", createdAt: "2025-11-17" },
      { id: 2, title: "CV Data Analyst", model: "Classique", createdAt: "2025-11-16" },
      { id: 3, title: "CV Designer UI/UX", model: "Minimaliste", createdAt: "2025-11-15" },
      { id: 4, title: "CV Ingénieur Logiciel", model: "Professionnel", createdAt: "2025-11-14" },
      { id: 5, title: "CV Étudiant", model: "Étudiant", createdAt: "2025-11-13" },
    ];

    setUserName(loggedInUser.name);
    setCvList(userCVs);
  }, []);

  const handleDelete = (id) => {
    setCvList(cvList.filter(cv => cv.id !== id));
  };

  return (
    <div className="dashboard-layout">
      <Sidebar setSelectedModel={setSelectedModel} />

      <div className="dashboard-content">
        <Topbar />

        <div className="dashboard-inner">
          <h1 className="welcome-title">
            Bienvenue sur votre espace personnel, <span>{userName}</span>
          </h1>
          <button onClick={() => navigate("/creer-cv")}>
             + Créer mon CV
          </button>


          <div className="cv-section">
            <h2>Mes CV</h2>

            {cvList.length === 0 ? (
              <p className="empty-text">Vous n’avez pas encore créé de CV.</p>
            ) : (
              <table className="cv-table">
                <thead>
                  <tr>
                    <th>Titre du CV</th>
                    <th>Modèle</th>
                    <th>Date de création</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cvList.map((cv) => (
                    <tr key={cv.id}>
                      <td>{cv.title}</td>
                      <td>{cv.model}</td>
                      <td>{cv.createdAt}</td>
                      <td>
                        <button className="icon-btn" title="Voir">
                          <FaEye />
                        </button>
                        <button
                          className="icon-btn delete-btn"
                          title="Supprimer"
                          onClick={() => handleDelete(cv.id)}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {selectedModel && (
        <PreviewSidebar
          model={selectedModel}
          onClose={() => setSelectedModel(null)}
        />
      )}
    </div>
  );
}
