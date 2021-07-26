import fs from "fs";
import getConfig from "next/config";
export default async function taxonomy(req, res) {
	const { serverRuntimeConfig } = getConfig();
	const id = req.query.id.join("/");
	const content = fs.readFileSync(`./${id}/index.md`, "utf8");
	res.json({ data: content });
}
