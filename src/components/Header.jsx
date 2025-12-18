/* eslint-disable no-unused-vars */
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiSearch, FiLogOut } from "react-icons/fi";
import { useAuth } from "../contexts/AuthContext";

export default function Header() {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuLinks = [
    { to: "/", label: "Accueil" },
    ...(user && !loading ? [{ to: "/create", label: "Créer un article" }] : []),
    { to: "/about", label: "À propos" },
    { to: "/team", label: "Équipe" },
   
  ];

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate("/");
  };

  const getAvatarInitials = () => {
    if (!user || !user.name) return "";
    return user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <>
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 shadow-md"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-3xl font-extrabold tracking-widest text-green-600">
            CLOUD BLOGGING
          </Link>

          {/* Menu Desktop */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold text-gray-700">
            {menuLinks.map((link) => (
              <Link key={link.label} to={link.to} className="hover:text-green-600 transition">
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions à droite */}
          <div className="flex items-center space-x-4 relative">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="text-gray-600 hover:text-black focus:outline-none text-lg"
              aria-label="Afficher la recherche"
            >
              <FiSearch />
            </button>

            {showSearch && (
              <motion.input
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                type="search"
                placeholder="Rechercher des articles..."
                className="absolute right-12 top-full mt-2 w-60 px-4 py-2 border border-gray-300 rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
                onBlur={() => setShowSearch(false)}
              />
            )}

            {!loading && user ? (
              <>
                <Link
                  to="/profile"
                  className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center text-sm font-semibold hover:bg-green-700 transition"
                  aria-label="Profil utilisateur"
                >
                  {getAvatarInitials()}
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-green-600 hover:text-green-700 font-semibold"
                  aria-label="Se déconnecter"
                >
                  <FiLogOut />
                  <span>Déconnexion</span>
                </button>
              </>
            ) : (
              !loading && (
                <Link
                  to="/login"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
                >
                  Connexion
                </Link>
              )
            )}

            {/* Menu burger mobile */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                className="text-2xl text-gray-700"
              >
                {isMobileMenuOpen ? <FiX /> : <FiMenu />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Menu mobile déroulant */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="fixed top-16 left-0 right-0 bg-white shadow-md border-b border-gray-200 md:hidden px-6 py-4 space-y-4 z-30"
          >
            {menuLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="block text-gray-700 text-base font-semibold hover:text-green-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {!loading && user ? (
              <>
                <Link
                  to="/profile"
                  className="block text-gray-700 text-base font-semibold hover:text-green-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Profil ({user.username})
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left text-gray-700 text-base font-semibold hover:text-green-600"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              !loading && (
                <>
                  <Link
                    to="/login"
                    className="block text-gray-700 text-base font-semibold hover:text-green-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Connexion
                  </Link>
                  <Link
                    to="/register"
                    className="block text-gray-700 text-base font-semibold hover:text-green-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Inscription
                  </Link>
                </>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contenu principal */}
      <main className="pt-16">
        {/* Le reste du contenu de votre page ira ici */}
      </main>
    </>
  );
}