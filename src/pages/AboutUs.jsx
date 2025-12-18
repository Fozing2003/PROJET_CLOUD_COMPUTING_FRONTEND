/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { FaInfoCircle, FaCogs, FaRocket, FaNetworkWired } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function AboutUs() {
  const features = [
    {
      icon: <FaCogs className="text-indigo-600 text-3xl" />,
      title: "Architecture Microservices",
      description:
        "Construite avec des services indépendants et évolutifs qui communiquent de manière fluide pour offrir une expérience utilisateur cohérente.",
    },
    {
      icon: <FaRocket className="text-indigo-600 text-3xl" />,
      title: "Conception Évolutive",
      description:
        "Conçue pour l’évolutivité : chaque service peut être développé, déployé et mis à l’échelle de façon autonome.",
    },
    {
      icon: <FaNetworkWired className="text-indigo-600 text-3xl" />,
      title: "Intégration Transparente",
      description:
        "Mise en œuvre des bonnes pratiques en conception d’API et communication inter-services pour des performances robustes.",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <motion.div
        className="sticky top-0 z-50 bg-white shadow-md"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      ></motion.div>

      <section className="max-w-screen-xl mx-auto px-6 sm:px-12 py-16 w-full text-gray-800">
        <motion.h1
          className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 flex items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <FaInfoCircle className="mr-3 text-indigo-600" />
          À Propos
        </motion.h1>
        <motion.p
          className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Nous sommes des étudiants en Master spécialisé en Réseaux et Services Distribués, actuellement en première année de notre formation.
        </motion.p>
        <motion.p
          className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Dans le cadre de notre cours de Cloud Computing, nous devions concevoir une application web moderne reposant sur une architecture microservices. L’objectif était d’acquérir une expérience concrète des systèmes distribués et des défis liés à la communication entre services dans un environnement cloud.
        </motion.p>
        <motion.p
          className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Ce projet constitue une démonstration frontale qui interagit de manière fluide avec plusieurs microservices, illustrant ainsi les bonnes pratiques en matière de conception logicielle évolutive et maintenable.
        </motion.p>
        <motion.p
          className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          À travers cette application, nous illustrons comment les microservices peuvent collaborer pour offrir une expérience utilisateur riche, tout en permettant un développement, un déploiement et une mise à l’échelle indépendants — des principes fondamentaux des services distribués dans le cloud.
        </motion.p>
        <motion.img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
          alt="Illustration des microservices dans le cloud"
          className="w-full h-96 object-cover rounded-xl shadow-lg mt-12"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        />

        <section className="mt-16">
          <motion.h2
            className="text-3xl font-semibold text-gray-900 mb-8 flex items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <FaRocket className="mr-3 text-indigo-600" />
            Points Forts du Projet
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.3,
                },
              },
            }}
          >
            {features.map(({ icon, title, description }) => (
              <motion.div
                key={title}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="mb-4">{icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {title}
                </h3>
                <p className="text-gray-600">{description}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </section>
    </div>
  );
}