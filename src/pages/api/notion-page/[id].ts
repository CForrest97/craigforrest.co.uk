import { NextApiHandler } from "next";
import { getArticles } from "../../../articles/services/server/getArticles";
import { getNotionPage } from "../../../articles/services/server/getNotionPage";

const handler: NextApiHandler = async (req, res) => {
  const { id } = req.query;
  if (typeof id !== "string")
    return res
      .status(400)
      .send(`req.query.id: "${req.query.id}" is not a string`);

  const page = await getNotionPage(id);

  return res.status(200).json({ page });
};

export default handler;
