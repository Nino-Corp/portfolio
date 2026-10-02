import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onClick: () => void;
  isOpen: boolean;
}

export default function ExplorerButton({ onClick, isOpen }: Props) {
  return (
    <AnimatePresence mode="wait">
      <motion.button
        key={isOpen ? "fermer" : "explorer"}
        onClick={onClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="explorer-button"
        initial={{ opacity: 0, y: 10, x: "-50%" }}
        animate={{ opacity: 1, y: 0, x: "-50%" }}
        exit={{ opacity: 0, y: -10, x: "-50%" }}
        transition={{ duration: 0.3 }}
        style={isOpen ? { background: "rgba(255,255,255,0.2)", borderColor: "rgba(255,255,255,0.4)" } : {}}
      >
        <span className="plus-icon">{isOpen ? "✕" : "+"}</span>
        {isOpen ? "FERMER" : "EXPLORER"}
      </motion.button>
    </AnimatePresence>
  );
}
