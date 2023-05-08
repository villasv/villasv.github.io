import { List } from "@/components/emoji-list";
import { Email, GitHub } from "@/components/relme";
import styles from "./index.css";

export const metadata = {
  title: "Victor's Website",
  description: "on the independent web",
};

export default function Page() {
  return (
    <div className={styles.container}>
      <h1>Victor Villas'</h1>
      <div className={styles.panel}>
        <div className={styles.section}>
          <h2>A personal website</h2>
          <p>
            This is my humble abode on the Worldwide Web. It is statically
            generated from some markdown documents, custom React components and
            a flat-file database checked in git along with the source code. You
            can check out its sources on <GitHub repo="villasv.github.io" />. If
            none of that made sense, no worries. I just like my website and
            wanted to tell you about it. Maybe this encourages you to make your
            own as well?
          </p>
        </div>
        <div className={styles.section}>
          <h2>Me elsewhere</h2>
          <List
            items={{
              "📧": <Email />,
              "💾": <GitHub />,
            }}
          />
        </div>
      </div>
    </div>
  );
}
