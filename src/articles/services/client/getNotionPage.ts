import { NotionPage } from "../server/getNotionPage";

export const getNotionPage = async (id: string): Promise<NotionPage> =>
  fetch(`/api/notion-page/${id}`)
    .then((response) => response.json())
    .then(({ page }) => page);
