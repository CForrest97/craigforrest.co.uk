import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion, AnimateSharedLayout } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";

type LinkProps = { path: string; name: string; isActive: boolean };

const TopLevelLink: React.FC<LinkProps> = ({
  path,
  name,
  isActive,
}: LinkProps) => (
  <Link href={path}>
    <a className="text-gray-600 dark:text-gray-50 px-3 py-2 text-sm font-medium">
      {name}
      {isActive && (
        <motion.div
          className="border-b-2 border-pink-600"
          layoutId="top-level-navigation"
          animate
        />
      )}
    </a>
  </Link>
);

const TopLevelLinks: React.FC = () => {
  const { asPath } = useRouter();

  const links = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Articles", path: "/articles" },
  ];

  return (
    <AnimateSharedLayout>
      <nav className="flex space-x-4">
        {links.map(({ path, name }) => (
          <TopLevelLink
            name={name}
            path={path}
            isActive={path === asPath || asPath.startsWith(`${path}/`)}
            key={path}
          />
        ))}
      </nav>
    </AnimateSharedLayout>
  );
};

export const Header: React.FC = () => (
  <header className="bg-white dark:bg-gray-800 transition-colors duration-400 ease-linear mx-auto px-3 md:px-36 lg:px-52 xl:px-80 flex items-center justify-between h-16 border-b-2 border-gray-200 dark:border-gray-600 fixed w-full z-50">
    <Link href="/">
      <a className="text-gray-800 dark:text-gray-50 py-2 text-lg font-medium">
        <span className="block sm:hidden">C.F</span>
        <span className="hidden sm:block">Craig Forrest</span>
      </a>
    </Link>
    <div className="flex space-x-10">
      <TopLevelLinks />
      <ThemeToggle />
    </div>
  </header>
);
