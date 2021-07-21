import fs from "fs";
import path from "path";
//implements the graph structure
export function buildGraph(dir) {
  let files = fs.readdirSync(dir);
  let graph = {
    name: dir,
    children: [],
    files: [],
  };
  for (let file of files) {
    let filePath = path.join(dir, file);
    let stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      graph.children.push(buildGraph(filePath));
    } else {
      graph.files.push({
        name: file,
        path: filePath,
      });
    }
  }
  return graph;
}

export default function getData(id) {
  const content = fs.readFileSync(`public/blog/${id}/${id + ".md"}`, "utf8");
  return content;
}
