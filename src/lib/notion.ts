import { Client } from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const getDatabase = (databaseId: string) =>
  notion.databases
    .query({
      database_id: databaseId,
    })
    .then(({ results }) => results);

export const getBlocks = async (blockId: string) =>
  notion.blocks.children
    .list({
      block_id: blockId,
    })
    .then(({ results }) => results.filter((result) => "type" in result));
