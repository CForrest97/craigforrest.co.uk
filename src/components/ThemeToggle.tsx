import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "../providers/ThemeProvider";

export const ThemeToggle = () => {
  const { isDark, toggle } = useTheme();

  return (
    <div>
      <AnimatePresence exitBeforeEnter>
        <motion.button
          key={isDark ? "dark" : "light"}
          className="text-3xl"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={toggle}
        >
          {isDark ? "🌙" : "🌤️"}
        </motion.button>
      </AnimatePresence>
    </div>
  );
};
