/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaChevronLeft, FaChevronRight, FaTag, FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import api from "../utils/axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PostCard from "../components/PostCard";
import Hero from "../components/Hero";

export default function Home() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Tout");
  const [searchQuery, setSearchQuery] = useState("");
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);

  const taglines = ["Découvrez", "Explorez", "Inspirez-vous"];

  // Récupérer les articles
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get("api/posts");
        const data = response.data || [];
        setPosts(data);

        // Générer les catégories depuis les articles
        const uniqueCategories = Array.from(
          new Set(data.map(post => post.category?.name).filter(Boolean))
        );
        setCategories([{ id: 0, name: "Tout" }, ...uniqueCategories.map((name, i) => ({ id: i + 1, name }))]);

      } catch (error) {
        toast.error("Échec du chargement des articles.", { position: "top-right", autoClose: 3000 });
      } finally {
        setIsLoadingPosts(false);
      }
    };

    fetchPosts();
  }, []);

  // Faire défiler la phrase d’accroche toutes les 3 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % taglines.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [taglines.length]);

  // Filtrer les articles par catégorie et recherche
  const filteredPosts = posts.filter((post) => {
    const matchesCategory = selectedCategory === "Tout" || post.category?.name === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Articles mis en avant (mock)
  const featuredStories = [
    {
      id: 1,
      title: "Inspiration Naturelle",
      description: "Découvrez comment la nature inspire l'art et l'innovation.",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 2,
      title: "Voyage Créatif",
      description: "Un voyage à travers les esprits les plus créatifs du monde.",
      image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80",
    },
  ];

  if (isLoadingPosts) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <FaSpinner className="animate-spin h-10 w-10 text-green-600" />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Hero />

      <section className="flex-grow max-w-screen-xl mx-auto px-6 sm:px-12 py-16 w-full">
        {/* En-tête avec phrase d’accroche */}
        <motion.div className="bg-gray-100 rounded-xl shadow-md p-8 mb-16" initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <AnimatePresence mode="wait">
            <motion.h2
              key={taglineIndex}
              className="text-4xl sm:text-5xl font-extrabold text-center text-gray-900 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {taglines[taglineIndex]} des articles qui inspirent
            </motion.h2>
          </AnimatePresence>

          {/* Onglets de catégories */}
          <motion.nav className="flex flex-wrap gap-2 mb-6 justify-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.name)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  selectedCategory === category.name ? "bg-green-600 text-white shadow-md" : "bg-white text-gray-700 border border-gray-300 hover:bg-green-100"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.name}
              </motion.button>
            ))}
          </motion.nav>

          {/* Barre de recherche */}
          <motion.div className="relative w-full max-w-md mx-auto" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-600" />
            <input
              type="text"
              placeholder="Rechercher des articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg bg-white text-gray-900 border border-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 shadow-sm text-base"
            />
          </motion.div>
        </motion.div>

        {/* Section des articles */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.3 } },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredPosts.length === 0 ? (
            <motion.p className="text-center text-gray-600 col-span-full text-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              Aucun article trouvé. Essayez d’ajuster votre recherche ou vos filtres.
            </motion.p>
          ) : (
            filteredPosts.map((post) => {
              const hasImage = post.media && post.media.trim() !== "";
              const imageUrl = hasImage ? `http://localhost:8000/storage/${post.media}` : null;
              
              return (
                <motion.div
                  key={post.id}
                  variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                  whileHover={{ scale: 1.02, y: -8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="h-full"
                  onClick={() => navigate(`/posts/${post.id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-full flex flex-col">
                    {/* Section image (si elle existe) */}
                    {hasImage && (
                      <div className="relative h-56 overflow-hidden">
                        <img 
                          src={imageUrl} 
                          alt={post.title}
                          className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        {post.category?.name && (
                          <div className="absolute top-4 left-4 flex items-center gap-2 bg-green-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm">
                            <FaTag className="text-xs" />
                            {post.category.name}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Contenu */}
                    <div className={`p-6 flex-grow flex flex-col ${!hasImage ? 'pt-8' : ''}`}>
                      {/* Badge catégorie (sans image) */}
                      {!hasImage && post.category?.name && (
                        <div className="flex items-center gap-2 text-green-600 text-sm font-semibold mb-3">
                          <FaTag className="text-xs" />
                          <span>{post.category.name}</span>
                        </div>
                      )}

                      <h3 
                        onClick={() => navigate(`/posts/${post.id}`)}
                        className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-green-600 transition-colors cursor-pointer"
                      >
                        {post.title}
                      </h3>

                      <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">
                        {post.content}
                      </p>

                      {/* Auteur & date */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-semibold shadow-md text-sm">
                            {post.user?.name ? post.user.name.charAt(0).toUpperCase() : 'U'}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">
                              {post.user?.name || post.user?.username || 'Anonyme'}
                            </p>
                            <p className="text-xs text-gray-500">
                              {new Date(post.created_at).toLocaleDateString('fr-FR', { 
                                month: 'short', 
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </p>
                          </div>
                        </div>
                        
                        <motion.button 
                          onClick={() => navigate(`/posts/${post.id}`)}
                          className="text-green-600 hover:text-green-700 font-medium text-sm"
                          whileHover={{ x: 5 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          Lire la suite →
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </motion.div>

        {/* Bouton "Voir plus" */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.8, duration: 0.8 }} className="mt-20 text-center">
          <button className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-lg transition-all text-lg font-semibold">
            Voir plus d’articles
          </button>
        </motion.div>
      </section>

      {/* Section des articles mis en avant */}
      <section className="bg-gray-100 max-w-screen-xl mx-auto px-6 sm:px-12 py-20 w-full relative">
        <motion.h2 initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-5xl font-extrabold text-center text-gray-900 mb-12">
          Articles mis en avant
        </motion.h2>
        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.4 } } }}>
          {featuredStories.map((story) => (
            <motion.div key={story.id} className="relative rounded-xl overflow-hidden shadow-lg group" variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }} whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
              <div className="h-72 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: `url(${story.image})` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">{story.title}</h3>
                <p className="text-lg">{story.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <div className="absolute inset-y-0 left-0 flex items-center">
          <motion.button className="p-3 bg-green-600 text-white rounded-full hover:bg-green-700" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
            <FaChevronLeft className="h-6 w-6" />
          </motion.button>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center">
          <motion.button className="p-3 bg-green-600 text-white rounded-full hover:bg-green-700" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
            <FaChevronRight className="h-6 w-6" />
          </motion.button>
        </div>
      </section>
    </div>
  );
}