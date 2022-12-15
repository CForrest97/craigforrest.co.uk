import { useQuery, useQueryClient } from "react-query";
import { Article } from "../models/Article";
import { getArticles } from "../services/client/getArticles";
import { getNotionPage } from "../services/client/getNotionPage";

export const useArticles = (): Article[] | null => {
  const queryClient = useQueryClient();
  const { data: articles } = useQuery<Article[]>("articles", getArticles);

  articles?.forEach((article) => {
    queryClient.prefetchQuery(["notion-page", article.slug], () =>
      getNotionPage(article.slug)
    );
  });

  return articles ?? null;
};
