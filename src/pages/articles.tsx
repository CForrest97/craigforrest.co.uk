import React from "react";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import assert from "assert";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { Hero } from "../components/Hero";
import { ProjectCard } from "../components/ProjectCard";
import { getDatabase } from "../lib/notion";

type Article = {
  title: string;
  id: string;
};
type Props = {
  articles: Article[];
};

const Articles: NextPage<Props> = ({ articles }) => (
  <>
    <Head>
      <title>Articles | Craig Forrest</title>
    </Head>
    <Hero
      title="Articles ✍️"
      description="A space for me to write some articles..."
    />

    <section className="mt-16">
      {articles.map((article) => (
        <ProjectCard
          title={article.title}
          description=""
          href={`/articles/${article.id}`}
          imageSrc=""
        />
      ))}
    </section>
  </>
);

export default Articles;

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const databaseId = process.env.NOTION_DATABASE_ID;

  assert(
    typeof databaseId === "string",
    `database ID: "${databaseId}" is not valid`
  );
  const slugify = (name: string): string =>
    name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const database = await getDatabase(databaseId);
  const pages = database.filter(
    (response): response is PageObjectResponse => response.object === "page"
  );
  pages.forEach((page) => {
    console.log((page.properties.Name as any).title[0]?.plain_text);
  });

  return {
    props: {
      articles: pages
        .map(
          (response) => (response.properties.Name as any).title[0]?.plain_text
        )
        .filter(Boolean)
        .map((title) => ({ title, id: slugify(title) })),
    },
  };
};
