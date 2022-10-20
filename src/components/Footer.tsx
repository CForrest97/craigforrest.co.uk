import Link from "next/link";
import React, { ReactNode } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

type SocialLinkProps = {
  Icon: ReactNode;
  link: string;
};

const SocialLink = ({ Icon, link }: SocialLinkProps) => (
  <Link href={link}>
    <a className="m-3 hover:text-gray-800 dark:hover:text-white">{Icon}</a>
  </Link>
);

const SocialIcons = () => (
  <div className="flex text-3xl my-6 text-gray-500 dark:text-gray-300">
    <SocialLink Icon={<FaGithub />} link="https://github.com/CForrest97/" />
    <SocialLink
      Icon={<FaLinkedin />}
      link="https://www.linkedin.com/in/craig-forrest-64996a108/"
    />
  </div>
);

export const Footer = () => (
  <footer className="flex flex-col items-center mb-12">
    <SocialIcons />
    <Link href="mailto:craforrest97@gmail.com">
      <a className="hover:text-gray-800 dark:hover:text-white text-gray-500  dark:text-gray-300">
        craforrest97@gmail.com
      </a>
    </Link>
  </footer>
);
