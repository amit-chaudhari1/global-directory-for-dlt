import fs from "fs";
import getConfig from "next/config";
export default async function taxanomy(req, res) {
  const { serverRuntimeConfig } = getConfig();
  const id = req.query.id.join("/");
  console.log(id);
  const content = fs.readFileSync(`./${id}/index.md`, "utf8");
  console.log(content);
  res.json({ data: content });
}
