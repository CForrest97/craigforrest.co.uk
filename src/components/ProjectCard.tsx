import Link from "next/link";
import Image from "next/image";
import React from "react";

type Props = {
  title: string;
  description: string;
  href: string;
  imageSrc: string;
};

export const ProjectCard = ({ title, description, href }: Props) => (
  <article>
    <div className="flex flex-col font-light w-full text-black dark:text-white mb-16">
      <h2 className="text-2xl sm:text-5xl lg:text-4xl mb-2">{title}</h2>
      <p className="mt-4">{description}</p>
      <Link href={href}>
        <a className="text-pink-600 underline mt-4">Find out more...</a>
      </Link>
    </div>
  </article>
);
