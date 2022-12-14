import { useQuery } from "react-query";
import { NotionPage } from "../articles/services/server/getNotionPage";
import { getNotionPage } from "../articles/services/client/getNotionPage";

export const useNotionPage = (slug: string): NotionPage | null => {
  const { data: notionPage } = useQuery<NotionPage>(["notion-page", slug], () =>
    getNotionPage(slug)
  );

  return notionPage ?? null;
};
