import { Sidebar } from "@/components/sidebar";

export const metadata = {
  title: "Victor's Website",
  description: "on the independent web",
  icons: {
    other: [
      {
        rel: "alternate",
        type: "application/rss+xml",
        url: "https://victor.villas/feed.xml",
      },
      {
        rel: "authorization_endpoint",
        url: "https://indieauth.com/auth",
      },
    ],
  },
};

export default function Page() {
  return <Sidebar />;
}
