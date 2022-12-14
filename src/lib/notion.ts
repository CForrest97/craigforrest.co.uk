import { Client } from "@notionhq/client";
import assert from "assert";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const getDatabaseId = (): string => {
  const databaseId = process.env.NOTION_DATABASE_ID;

  assert(
    typeof databaseId === "string",
    `database ID: "${databaseId}" is not valid`
  );

  return databaseId;
};

export const getDatabase = () =>
  notion.databases
    .query({
      database_id: getDatabaseId(),
    })
    .then(({ results }) => results);

export const getBlocks = async (blockId: string) =>
  notion.blocks.children
    .list({
      block_id: blockId,
    })
    .then(({ results }) => results.filter((result) => "type" in result));
