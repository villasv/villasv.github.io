import { Sidebar } from "@/components/sidebar";

export const metadata = {
  title: "Victor's Website",
  description: "on the independent web",
  icons: {
    // TODO: move link rel indie auth here
  },
};

export default function Page() {
  return (
    <div>
      <Sidebar />
    </div>
  );
}
