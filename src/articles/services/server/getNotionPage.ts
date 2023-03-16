import assert from "assert";
import { getBlocks, getDatabase } from "../../../lib/notion";

export type NotionPage = Awaited<ReturnType<typeof getNotionPage>>;
export const getNotionPage = async (id: string) => {
  const databaseId = process.env.NOTION_DATABASE_ID;

  assert(
    typeof databaseId === "string",
    `database ID: "${databaseId}" is not valid`
  );

  const database = await getDatabase();
  const page = database.find(
    (response) =>
      "url" in response && response.url.toLowerCase().includes(id.toLowerCase())
  );

  return {
    blocks: page ? await getBlocks(page.id) : null,
    title:
      page && "properties" in page
        ? (page.properties.Name as any).title[0]?.plain_text
        : "",
  };
};
