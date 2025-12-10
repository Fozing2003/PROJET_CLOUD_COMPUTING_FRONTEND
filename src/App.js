import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginForm from "./components/auth/login/LoginForm";
import RegisterForm from "./components/auth/register/RegisterForm";
import Dashboard from "./pages/user/Dashboard";
import Home from "./pages/home/Home";
import Templates from "./pages/templates/Templates";
import Help from "./pages/help/help";
import Helpuser from "./pages/helpuser/helpuser";
import Profile from "./pages/profile/profile"; // ← Nouvelle page Profil
import Settings from "./pages/settings/settings"; // ← Nouvelle page Paramètres
import MainLayout from "./layouts/MainLayout"; // Layout avec Header/Footer
import CreerCV from "./pages/CreerCV/CreerCV";
import CreerModele from "./pages/CreerCV/CreerModele";
import AdminLayout from "./pages/Admin/AdminLayout";

function App() {
  return (
    <Router>
      <Routes>
        {/* Pages SANS Header/Footer */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />

        {/* Pages AVEC Header/Footer */}
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />

        {/* Page modèles */}
        <Route
          path="/templates"
          element={
            <MainLayout>
              <Templates />
            </MainLayout>
          }
        />

        <Route
          path="/helpuser"
          element={

            <Helpuser />

          }
        />

        <Route
          path="/AdminLayout"
          element={
          
              <AdminLayout  />
            
          }
        />

        <Route
          path="/creer-cv"
          element={
            
              <CreerCV />
            
          }
        />

        <Route
          path="/creer-cv/:modele"
          element={
            <MainLayout>
              <CreerModele />
            </MainLayout>
          }
        />


        {/* Page aide */}
        <Route
          path="/help"
          element={
            <MainLayout>
              <Help />
            </MainLayout>
          }
        />

        {/* Page Profil */}
        <Route
          path="/profile"
          element={

            <Profile />

          }
        />

        {/* Page Paramètres */}
        <Route
          path="/settings"
          element={

            <Settings />

          }
        />


        {/* Dashboard SANS Header/Footer */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Route fallback vers Accueil */}
        <Route
          path="*"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
