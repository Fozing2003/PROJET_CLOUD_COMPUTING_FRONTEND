/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaUser, FaComment, FaCalendarAlt, FaEye, FaSpinner, FaTag } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import api from "../utils/axios";

export default function ShowPost() {
  const { id } = useParams();
  const { user, loading: authLoading } = useAuth();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isLoadingPost, setIsLoadingPost] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Récupérer les détails de l'article
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get(`api/posts/${id}`);
        setPost(response.data);
        setComments(response.data.comments || []);
      } catch (err) {
        setError("Échec du chargement de l’article.");
        toast.error("Échec du chargement de l’article.", {
          position: "top-right",
          autoClose: 3000,
        });
      } finally {
        setIsLoadingPost(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (newComment.trim() === "") return;

    if (!user) {
      toast.error("Veuillez vous connecter pour commenter.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await api.post(`/api/posts/${id}/comments`, {
        content: newComment.trim(),
      });

      const newCommentData = {
        id: response.data.id || Date.now(),
        content: newComment.trim(),
        user: {
          id: user.id,
          username: user.username,
          name: user.name,
        },
      };

      setComments([...comments, newCommentData]);
      setNewComment("");
      toast.success("Commentaire publié avec succès !", {
        position: "top-right",
        autoClose: 2000,
      });
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Échec de la publication du commentaire.";
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading || isLoadingPost) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <FaSpinner className="animate-spin h-10 w-10 text-green-600" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-xl text-gray-700">Article non trouvé.</p>
      </div>
    );
  }

  // Gestion de l'image
  const hasImage = post.media && Array.isArray(post.media) && post.media.length > 0 && post.media[0]?.url_media;
  const imageUrl = hasImage 
    ? post.media[0].url_media 
    : (post.media && typeof post.media === 'string' && post.media.trim() !== '')
      ? `http://localhost:8000/storage/${post.media}`
      : null;

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <main className="max-w-screen-xl mx-auto px-6 sm:px-12 py-16 w-full">
        <article className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12">
          {/* Badge de catégorie */}
          {post.category?.name && (
            <motion.div
              className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-6"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <FaTag className="text-xs" />
              {post.category.name}
            </motion.div>
          )}

          {/* Titre */}
          <motion.h1
            className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {post.title}
          </motion.h1>

          {/* Métadonnées */}
          <motion.div
            className="flex flex-wrap items-center gap-6 text-gray-600 mb-8 text-sm sm:text-base pb-6 border-b border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-semibold shadow-md">
                {post.user?.name ? post.user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <span className="font-semibold text-gray-900">
                {post.user?.name || post.user?.username || 'Anonyme'}
              </span>
            </div>
            <span className="flex items-center gap-2">
              <FaCalendarAlt className="text-green-600" />
              {new Date(post.created_at || post.createdOn).toLocaleDateString('fr-FR', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </span>
            <span className="flex items-center gap-2">
              <FaComment className="text-green-600" />
              {comments.length} {comments.length === 1 ? 'commentaire' : 'commentaires'}
            </span>
          </motion.div>

          {/* Image */}
          {imageUrl && (
            <motion.div
              className="w-full rounded-xl overflow-hidden shadow-2xl mb-8"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <img
                src={imageUrl}
                alt={post.title}
                className="w-full h-auto object-cover max-h-[600px]"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </motion.div>
          )}

          {/* Contenu */}
          <motion.div
            className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <p className="text-lg whitespace-pre-wrap">{post.content}</p>
          </motion.div>
        </article>

        {/* Section des commentaires */}
        <section className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12">
          <motion.h2
            className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <FaComment className="text-green-600" />
            Commentaires ({comments.length})
          </motion.h2>

          {comments.length === 0 ? (
            <motion.p
              className="text-gray-500 text-center py-8 text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Aucun commentaire pour le moment. Soyez le premier à partager votre avis !
            </motion.p>
          ) : (
            <motion.ul
              className="space-y-6 mb-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.2 },
                },
              }}
            >
              {comments.map((comment) => (
                <motion.li
                  key={comment.id}
                  className="bg-gray-50 p-6 rounded-xl hover:bg-gray-100 transition-colors duration-300"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-semibold shadow-md flex-shrink-0">
                      {comment.user?.name ? comment.user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div className="flex-grow">
                      <p className="font-semibold text-gray-900 mb-2">
                        {comment.user?.name || comment.user?.username || 'Anonyme'}
                      </p>
                      <p className="text-gray-700 leading-relaxed">{comment.content}</p>
                    </div>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          )}

          {/* Formulaire d’ajout de commentaire */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Laisser un commentaire</h3>
            <form onSubmit={handleAddComment} className="space-y-4">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Partagez vos pensées..."
                className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm resize-none"
                rows={5}
                required
                disabled={isSubmitting}
              />
              <motion.button
                type="submit"
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    <span>Publication en cours...</span>
                  </>
                ) : (
                  <span>Publier le commentaire</span>
                )}
              </motion.button>
            </form>
          </motion.div>
        </section>
      </main>
    </div>
  );
}