import { MantineProvider } from "@mantine/core";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import React from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { useTheme } from "../providers/ThemeProvider";

type Props = {
  children: React.ReactNode;
};

export const Layout: React.FC<Props> = ({ children }: Props) => {
  const { asPath } = useRouter();
  const { isDark } = useTheme();

  const variants = {
    hidden: { opacity: 0, x: 0, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: -100 },
  };

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: isDark ? "dark" : "light",
      }}
    >
      <Header />
      <AnimatePresence
        exitBeforeEnter
        onExitComplete={() => window.scrollTo(0, 0)}
      >
        <motion.div
          key={asPath}
          initial="hidden"
          animate="enter"
          exit="exit"
          variants={variants}
          transition={{ type: "linear" }}
          className="pt-16 h-full"
        >
          <div className="px-7 md:px-36 lg:px-52 xl:px-80">{children}</div>
        </motion.div>
      </AnimatePresence>
      <Footer />
    </MantineProvider>
  );
};
