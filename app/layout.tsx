import "./globals.css";
import styles from "./styles.module.css";

const links = [
  <a key={1} href="/notes">
    📓 Notes
  </a>,
  <a key={2} href="/feed.xml" target="_blank" rel="noopener noreferrer">
    📡 RSS
  </a>,
  <a key={3}>📨 Newsletter (WIP)</a>,
  <a key={4} rel="me" href="https://mastodon.social/@villasbc">
    💬 Mastodon
  </a>,
  <a key={5} rel="me" href="http://pxlfd.ca/users/victor">
    📷 Pixelfed
  </a>,
  <a key={6} rel="me" href="http://neodb.social/users/villasv/">
    📚 NeoDB
  </a>,
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className={styles.wrapper}>
          <div className={styles.floater}>
            <div className={styles.sidebar}>
              <div className={styles.sidebar}>
                <h1>
                  <a href="/">Victor Villas</a>
                </h1>
                <p>
                  Born at 356.42 ppm CO₂ <br />
                  🇨🇦 Living the good life in YVR <br />
                  🇧🇷 Inner voice speaks in pt_BR <br />
                  💻 Paying bills with software
                </p>
                <ul>
                  {links.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                  <br />
                </ul>
                <h2>me elsewhere</h2>
                <ul>
                  <li>
                    <a rel="me" href="mailto:mail@victor.villas">
                      📧 Email
                    </a>
                  </li>
                  <li>
                    <a rel="me" href="http://github.com/villasv/">
                      💾 GitHub
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.topbar}>
              <a href="/">📒 Updates</a>
              {...links}
            </div>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
