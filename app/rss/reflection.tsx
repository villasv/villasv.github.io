import fs from "fs";
import path from "path";

export interface ListPageOpts {
  route?: string;
}

export function listPages(opts: ListPageOpts) {
  const routePrefix = opts.route ?? "";
  const routeDir = path.join(process.cwd(), `app/${routePrefix}`);
  return fs
    .readdirSync(routeDir, { withFileTypes: true })
    .filter((f) => f.isDirectory())
    .map((f) => path.join(routePrefix, f.name));
}
