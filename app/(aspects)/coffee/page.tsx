import path from "path";
import { Index } from "@/projects/null-cms/components";

const cwd = path.basename(__dirname);
export default async function Page() {
  console.log(__dirname)
  return <Index />;
}
