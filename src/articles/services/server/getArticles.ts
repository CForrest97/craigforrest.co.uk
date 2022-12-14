import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { Article } from "../../models/Article";
import { getDatabase } from "../../../lib/notion";
import { slugify } from "../../../utils/slugify";

export const getArticles = async (): Promise<Article[]> => {
  const database = await getDatabase();

  const pages = database.filter(
    (response): response is PageObjectResponse => response.object === "page"
  );

  const mapIdToName = pages.reduce((acc: Record<string, string>, page) => {
    const name = (page.properties.Name as any).title[0]?.plain_text;
    if (name) {
      return { ...acc, [page.id]: name };
    }
    return acc;
  }, {});

  return pages
    .filter((page) => mapIdToName[page.id])
    .map((page) => ({
      id: page.id,
      slug: slugify(mapIdToName[page.id]),
      isLoading: false,
      title: mapIdToName[page.id],
    }));
};
