import { Render } from "@9gustin/react-notion-render";
import { GetServerSideProps, NextPage } from "next";
import assert from "assert";
import Head from "next/head";
import React from "react";
import { getBlocks, getDatabase } from "../../lib/notion";
import { Hero } from "../../components/Hero";

const page: NextPage<Props> = ({ title, blocks }) => (
  <>
    <Head>
      <title>Articles | Craig Forrest</title>
    </Head>
    <Hero title={title} description="" />

    <section className="mt-16">{<Render blocks={blocks as any} />}</section>
  </>
);

export default page;

type Props = {
  title: string;
  blocks: Awaited<ReturnType<typeof getBlocks>> | null;
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  const databaseId = process.env.NOTION_DATABASE_ID;

  assert(
    typeof databaseId === "string",
    `database ID: "${databaseId}" is not valid`
  );

  const database = await getDatabase(databaseId);
  const regExp = new RegExp(`notion.so/${query.id}-[0-9a-f]{32}`, "i");
  const page = database.find(
    (response) => "url" in response && regExp.test(response.url)
  );

  if (!page) {
    database.forEach((response) => {
      if ("url" in response) {
        console.log(response.url);
      }
    });
  }

  return {
    props: {
      blocks: page ? await getBlocks(page.id) : null,
      // eslint-disable-next-line no-nested-ternary
      title: page
        ? "properties" in page
          ? (page.properties.Name as any).title[0]?.plain_text
          : ""
        : "",
    },
  };
};
