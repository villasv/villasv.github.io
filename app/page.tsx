import { Feed } from "@/components/feed";
import { Sidebar } from "@/components/sidebar";
import styles from "./(aspects)/styles.module.css";

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
  return (
    <div className={styles["aspect-wrapper"]}>
      <div className={styles["sidebar-floater"]}>
        <div className={styles["sidebar"]}>
          <Sidebar />
        </div>
      </div>
      <div className={styles["content"]}>
        <Feed />
      </div>
    </div>
  );
}
