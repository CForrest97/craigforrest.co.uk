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
  const regExp = new RegExp(`notion.so/${id}-[0-9a-f]{32}`, "i");
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
    blocks: page ? await getBlocks(page.id) : null,
    // eslint-disable-next-line no-nested-ternary
    title: page
      ? "properties" in page
        ? (page.properties.Name as any).title[0]?.plain_text
        : ""
      : "",
  };
};
