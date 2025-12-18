/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaSave, FaSpinner } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import api from "../utils/axios";
import { toast } from "react-toastify";

export default function CreatePost() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const [mediaFile, setMediaFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preview, setPreview] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = "Le titre est requis";
    if (!formData.content) newErrors.content = "Le contenu est requis";

    if (mediaFile) {
      const allowedTypes = ["image/jpeg", "image/png", "image/gif", "video/mp4", "video/mov", "video/avi"];
      if (!allowedTypes.includes(mediaFile.type)) {
        newErrors.media = "Le fichier doit être une image ou une vidéo (jpg, png, gif, mp4, mov, avi)";
      }
      if (mediaFile.size > 4 * 1024 * 1024) {
        newErrors.media = "La taille du fichier ne doit pas dépasser 4 Mo";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setMediaFile(file);
    setPreview(file ? URL.createObjectURL(file) : null);
    if (errors.media) setErrors({ ...errors, media: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (!user) {
      toast.error("Veuillez vous connecter pour créer un article.");
      navigate("/login");
      return;
    }

    setIsSubmitting(true);
    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("content", formData.content);
      if (mediaFile) data.append("media", mediaFile);

      const response = await api.post("/api/posts", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Article créé avec succès !", { autoClose: 2000 });
      navigate("/profile");
    } catch (error) {
      const message = error.response?.data?.message || "Échec de la création de l’article.";
      toast.error(message);
      setErrors({ api: message });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <FaSpinner className="animate-spin text-green-600 text-4xl" />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <main className="flex-grow max-w-3xl mx-auto px-6 sm:px-12 py-16 w-full">
        <motion.div className="bg-white rounded-2xl shadow-lg p-8">
          <motion.h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8">
            Créer un nouvel article
          </motion.h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Titre */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">Titre</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-600 ${errors.title ? "border-red-500" : "border-gray-300"}`}
                disabled={isSubmitting}
              />
              {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title}</p>}
            </div>

            {/* Contenu */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">Contenu</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows="6"
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-600 ${errors.content ? "border-red-500" : "border-gray-300"}`}
                disabled={isSubmitting}
              />
              {errors.content && <p className="text-red-600 text-sm mt-1">{errors.content}</p>}
            </div>

            {/* Média */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">Téléverser un média (facultatif)</label>
              <input
                type="file"
                accept="image/*,video/*"
                onChange={handleFileChange}
                className={`w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 ${errors.media ? "border-red-500" : ""}`}
                disabled={isSubmitting}
              />
              {preview && (
                <div className="mt-4">
                  {mediaFile.type.startsWith("image") ? (
                    <img src={preview} alt="aperçu" className="max-h-64 object-contain" />
                  ) : (
                    <video src={preview} controls className="max-h-64" />
                  )}
                </div>
              )}
              {errors.media && <p className="text-red-600 text-sm mt-1">{errors.media}</p>}
            </div>

            {/* Erreur API */}
            {errors.api && <p className="text-red-600 text-sm text-center">{errors.api}</p>}

            {/* Soumission */}
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 flex items-center justify-center gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <FaSpinner className="animate-spin" /> Création en cours...
                </>
              ) : (
                <>
                  <FaSave /> Créer l’article
                </>
              )}
            </button>
          </form>
        </motion.div>
      </main>
    </div>
  );
}