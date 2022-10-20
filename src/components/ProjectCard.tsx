import Link from "next/link";
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
      <div>
        <h2 className="text-2xl sm:text-5xl lg:text-4xl mb-2">{title}</h2>
        <p className="mt-4 mb-4">{description}</p>

        <Link href={href}>
          <a
            className="text-pink-600 underline"
            style={{
              textUnderlineOffset: "3px",
              textDecorationThickness: "1px",
            }}
          >
            Find out more...
          </a>
        </Link>
      </div>
    </div>
  </article>
);
