import { motion, AnimatePresence } from "framer-motion";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  role: string;
  description: string;
  techStack: string[];
  achievements: string[];
}

export default function ProjectDetails({ isOpen, title, role, description, techStack, achievements }: Props) {

  // Suppression de floatAnimation car défini individuellement

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="hologram-container">
          
          {/* Carte 1 : Titre et Rôle (En haut à gauche) */}
          <motion.div
            className="floating-card card-top-left"
            initial={{ opacity: 0, x: -50, scale: 0.9, y: 0 }}
            animate={{ opacity: 1, x: 0, scale: 1, y: [0, -10, 0] }}
            exit={{ opacity: 0, x: -50, scale: 0.9 }}
            transition={{
              opacity: { duration: 0.4 },
              x: { type: "spring", damping: 20 },
              scale: { type: "spring", damping: 20 },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <h2>{title}</h2>
            <span className="role-badge">{role}</span>
          </motion.div>

          {/* Carte 2 : Description et Réalisations (Au centre à droite) */}
          <motion.div
            className="floating-card card-center-right"
            initial={{ opacity: 0, x: 50, scale: 0.9, y: 0 }}
            animate={{ opacity: 1, x: 0, scale: 1, y: [0, -15, 0] }}
            exit={{ opacity: 0, x: 50, scale: 0.9 }}
            transition={{
              opacity: { duration: 0.4, delay: 0.1 },
              x: { type: "spring", damping: 20, delay: 0.1 },
              scale: { type: "spring", damping: 20, delay: 0.1 },
              y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.1 }
            }}
          >
            <p className="panel-description">{description}</p>
            <div className="panel-section" style={{ marginTop: '20px' }}>
              <h3>Réalisations Clés</h3>
              <ul>
                {achievements.map((ach, i) => (
                  <li key={i}>{ach}</li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Carte 3 : Stack Technique (En bas à gauche) */}
          <motion.div
            className="floating-card card-bottom-left"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{
              opacity: { duration: 0.4, delay: 0.2 },
              scale: { type: "spring", damping: 20, delay: 0.2 },
              y: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }
            }}
          >
            <div className="panel-section">
              <h3>Stack Technique</h3>
              <div className="tech-tags">
                {techStack.map((tech, i) => (
                  <span key={i} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      )}
    </AnimatePresence>
  );
}
