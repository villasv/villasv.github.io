import path from "path";
import { AspectIndex } from "@/components/aspect-index";

const cwd = path.basename(__dirname);
export default async function Page() {
  return <AspectIndex base={cwd} />;
}
