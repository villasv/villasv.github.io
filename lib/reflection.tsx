import fs from "fs";
import path from "path";

export interface ListPageOpts {
  route?: string;
}

export function listPages(opts: ListPageOpts) {
  const appDir = path.join(process.cwd(), `app/${opts.route ?? ""}`);
  const files = fs.readdirSync(appDir);
  console.log(files);
  return files.filter((f) => f);
}
