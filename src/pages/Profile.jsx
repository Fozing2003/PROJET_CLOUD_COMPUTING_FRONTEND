/* eslint-disable no-unused-vars */
import { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBook, FaEye, FaEdit, FaTrash, FaSpinner } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import api from "../utils/axios";

export default function Profile() {
  const { user, loading: authLoading } = useAuth();
  const [posts, setPosts] = useState([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const [error, setError] = useState(null);

  // Obtenir les initiales à partir du nom
  const getInitials = () => {
    if (!user || !user.name) return "";
    return user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  // Récupérer les articles de l'utilisateur
  useEffect(() => {
    if (!user) return;
    const fetchPosts = async () => {
      try {
        const response = await api.get(`/api/posts`);
        const userPosts = response.data.filter(post => post.user_id === user.id);
        setPosts(userPosts);
      } catch (err) {
        setError("Échec du chargement des articles.");
        toast.error("Échec du chargement des articles.", {
          position: "top-right",
          autoClose: 3000,
        });
      } finally {
        setIsLoadingPosts(false);
      }
    };
    fetchPosts();
  }, [user]);

  // Gérer la suppression d’un article
  const handleDelete = async (postId) => {
    if (!window.confirm("Êtes-vous sûr(e) de vouloir supprimer cet article ?")) return;

    try {
      await api.delete(`/api/posts/${postId}`);
      setPosts(posts.filter((post) => post.id !== postId));
      toast.success("Article supprimé avec succès !", {
        position: "top-right",
        autoClose: 2000,
      });
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Échec de la suppression de l’article.";
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  if (authLoading || isLoadingPosts) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <FaSpinner className="animate-spin text-green-600 text-4xl" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg">Veuillez vous connecter pour voir votre profil.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <section className="flex-grow max-w-5xl mx-auto px-6 sm:px-12 py-16 w-full">
        {/* Carte d'informations utilisateur */}
        <motion.section
          className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-8 mb-12 border border-gray-100"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <motion.div
              className="w-40 h-40 rounded-full bg-gradient-to-br from-green-400 to-green-600 text-white flex items-center justify-center text-5xl font-bold shadow-2xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {getInitials()}
            </motion.div>
            <div className="text-center md:text-left flex-1">
              <motion.h1
                className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {user.name}
              </motion.h1>
              <motion.p
                className="text-gray-600 text-lg mb-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                {user.email}
              </motion.p>
              <motion.p
                className="text-gray-700 text-lg max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                {user.bio || "Aucune biographie fournie."}
              </motion.p>
              <motion.button
                className="mt-4 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl shadow-lg hover:from-green-600 hover:to-green-700 transition-all text-base font-semibold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Modifier le profil
              </motion.button>
            </div>
          </div>
          {/* Section des statistiques */}
          <motion.div
            className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <div className="flex items-center gap-3 bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <FaBook className="text-green-600 text-xl" />
              </div>
              <div>
                <p className="text-2xl text-gray-900 font-bold">{posts.length}</p>
                <p className="text-gray-600 text-sm">Articles publiés</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <FaEye className="text-blue-600 text-xl" />
              </div>
              <div>
                <p className="text-2xl text-gray-900 font-bold">N/D</p>
                <p className="text-gray-600 text-sm">Vues totales</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                <FaBook className="text-purple-600 text-xl" />
              </div>
              <div>
                <p className="text-2xl text-gray-900 font-bold">
                  {posts.filter(p => p.created_at && new Date(p.created_at).getMonth() === new Date().getMonth()).length}
                </p>
                <p className="text-gray-600 text-sm">Ce mois-ci</p>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Section des articles */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.3 },
            },
          }}
        >
          <motion.div
            className="flex items-center justify-between mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900">
              Mes articles ({posts.length})
            </h2>
            <a
              href="/create"
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl shadow-lg hover:from-green-600 hover:to-green-700 transition-all text-base font-semibold"
            >
              + Nouvel article
            </a>
          </motion.div>

          {posts.length === 0 ? (
            <motion.div
              className="text-center p-12 bg-white rounded-2xl shadow-lg border-2 border-dashed border-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <FaBook className="text-gray-400 text-3xl" />
              </div>
              <p className="text-gray-600 text-lg mb-4">Aucun article publié pour le moment.</p>
              <p className="text-gray-500 text-sm mb-6">Commencez à partager vos idées avec le monde !</p>
              <a
                href="/create"
                className="inline-block px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl shadow-lg hover:from-green-600 hover:to-green-700 transition-all text-base font-semibold"
              >
                Rédiger votre premier article
              </a>
            </motion.div>
          ) : (
            <ul className="space-y-6">
              {posts.map((post) => {
                const hasImage = post.media && typeof post.media === 'string' && post.media.trim() !== '';
                const imageUrl = hasImage ? `http://localhost:8000/storage/${post.media}` : null;

                return (
                  <motion.li
                    key={post.id}
                    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all border border-gray-100"
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex flex-col sm:flex-row gap-6">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={post.title}
                          className="w-full sm:w-40 h-40 object-cover rounded-lg shadow-md"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="w-full sm:w-40 h-40 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                          <FaBook className="text-gray-400 text-4xl" />
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2 hover:text-green-600 transition-colors cursor-pointer">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-1">
                          Publié le {new Date(post.created_at).toLocaleDateString('fr-FR', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </p>
                        {post.category?.name && (
                          <span className="inline-flex items-center gap-1 text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold mb-3">
                            {post.category.name}
                          </span>
                        )}
                        <div className="mt-4 flex gap-3">
                          <a
                            href={`/posts/${post.id}`}
                            className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 hover:bg-green-100 rounded-lg text-sm font-semibold transition-colors"
                          >
                            <FaEye /> Voir
                          </a>
                         
                          <button
                            onClick={() => handleDelete(post.id)}
                            className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-sm font-semibold transition-colors"
                          >
                            <FaTrash /> Supprimer
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.li>
                );
              })}
            </ul>
          )}
        </motion.section>
      </section>
    </div>
  );
}