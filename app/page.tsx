import { Feed } from "@/components/feed";
import { Sidebar } from "@/components/sidebar";

export const metadata = {
  title: "Victor's Website",
  description: "on the independent web",
};

export default function Page() {
  return (
    <div>
      <h1>Victor Villas'</h1>
      <Sidebar />
      <Feed />
    </div>
  );
}
