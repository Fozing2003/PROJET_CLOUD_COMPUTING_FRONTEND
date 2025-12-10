import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      alert(`Bienvenue ${email}`);
      navigate("/dashboard");
    } else {
      alert("Veuillez entrer vos identifiants !");
    }
  };

  return (
    <div className="login-overlay">
      <div className="login-card">

        {/* BOUTON RETOUR */}
        <button className="close-btn" onClick={() => navigate("/")}>
          ✖
        </button>

        <h2 className="login-title">Connexion</h2>

        <form onSubmit={handleSubmit} className="login-form">
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

          <p 
            className="forgot-password"
            onClick={() => navigate("/forgot-password")}
          >
            Mot de passe oublié ?
          </p>

          <button type="submit" className="login-btn">
            Se connecter
          </button>
        </form>

        <p className="switch-text">
          Pas de compte ?{" "}
          <span className="link" onClick={() => navigate("/register")}>
            S’inscrire
          </span>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
