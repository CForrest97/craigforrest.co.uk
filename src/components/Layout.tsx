import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import React from "react";
import { Footer } from "./Footer";
import Header from "./Header";

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }: Props) => {
  const { asPath } = useRouter();

  const variants = {
    hidden: { opacity: 0, x: 0, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: -100 },
  };

  return (
    <>
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
    </>
  );
};
export default Layout;
