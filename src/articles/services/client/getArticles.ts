import { Article } from "../../models/Article";

export const getArticles = async (): Promise<Article[]> =>
  fetch(`/api/articles`)
    .then((response) => response.json())
    .then(({ articles }) => articles);
