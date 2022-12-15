import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import { NotionPage } from "../articles/services/server/getNotionPage";
import { getNotionPage } from "../articles/services/client/getNotionPage";

export const useNotionPage = (slug: string): NotionPage | null => {
  const [cachedValue, setCachedValue] = useState<NotionPage | null>(null);
  const { data: notionPage } = useQuery<NotionPage>(["notion-page", slug], () =>
    getNotionPage(slug)
  );

  useEffect(() => {
    if (notionPage?.title) setCachedValue(notionPage);
  }, [notionPage]);

  return notionPage?.title ? notionPage : cachedValue;
};
