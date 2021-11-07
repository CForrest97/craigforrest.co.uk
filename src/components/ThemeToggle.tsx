import React from "react";
import { AnimatePresence, motion } from "framer-motion";

const ThemeToggle = () => {
  const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => {
    setIsDark(localStorage.getItem("theme") === "dark");
  }, []);

  React.useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.removeItem("theme");
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark((d) => !d);

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
          onClick={toggleTheme}
        >
          {isDark ? "🌙" : "🌤️"}
        </motion.button>
      </AnimatePresence>
    </div>
  );
};

export default ThemeToggle;
