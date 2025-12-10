import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterForm.css";

function RegisterForm() {
  const navigate = useNavigate(); // ← pour naviguer
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name && email && password) {
      alert(`Compte créé pour ${name}`);
      navigate("/login"); // ← redirection après inscription
    } else {
      alert("Veuillez remplir tous les champs !");
    }
  };

  return (
    <div className="overlay">
      <div className="form-container">

        {/* BOUTON RETOUR */}
        <button className="close-btn" onClick={() => navigate("/")}>
          ✖
        </button>

        <h2 className="form-title">Créer un compte</h2>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label>Nom complet</label>
            <input
              type="text"
              placeholder="Nom complet"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="exemple@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group password-input">
            <label>Mot de passe</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? "Masquer" : "Afficher"}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
          </div>

          <button type="submit" className="register-btn">
            S’inscrire
          </button>
        </form>

        <p className="switch-text">
          Déjà un compte ?{" "}
          <span className="link" onClick={() => navigate("/login")}>
            Se connecter
          </span>
        </p>
      </div>
    </div>
  );
}

export default RegisterForm;
