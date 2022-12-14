import { NextApiHandler } from "next";
import { getArticles } from "../../../articles/services/server/getArticles";

const handler: NextApiHandler = async (req, res) => {
  const articles = await getArticles();

  res.status(200).json({ articles });
};

export default handler;
