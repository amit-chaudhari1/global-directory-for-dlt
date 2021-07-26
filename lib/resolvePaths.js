import fs from "fs";
import path from "path";
//implements the graph structure
export function buildGraph(dir) {
  let files = fs.readdirSync(dir);
  let graph = {
    id: uuid(),
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
        id: uuid(),
        name: file,
        path: filePath,
      });
    }
  }

  return graph;
}

//write a function that returns a uuid
export function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
