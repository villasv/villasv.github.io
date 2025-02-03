import "./globals.css";
import styles from "./styles.module.css";

const socials = [
  <a rel="me" href="https://mastodon.social/@villasbc">
    💬 Mastodon
  </a>,
  <a rel="me" href="http://pxlfd.ca/users/victor">
    📷 Pixelfed
  </a>,
  <a rel="me" href="http://neodb.social/users/villasv/">
    📚 NeoDB
  </a>,
  <a href="/feed.xml" target="_blank" rel="noopener noreferrer">
    📡 RSS Feed
  </a>,
  <a>📨 Newsletter</a>,
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
                  {/* <li>🔗 Husband,</li>
                      <li>
                        <a href="/civil">🗳️ citizen</a>,
                      </li>
                      <li>
                        <a href="/outdoor">🗺️ outdoorsy</a>,
                      </li>
                      <li>
                        <a href="/coffee">☕ barista</a>,
                      </li>
                      <li>
                        <a href="/food">🥘 cook</a>,
                      </li>
                      <li>
                        <a href="/tech">🔩 tinkerer</a>,
                      </li>
                      <li>
                        <a href="/words">📝 writer</a>.
                      </li> */}
                </ul>
                <h2>me elsewhere</h2>
                <ul>
                  {socials.map((s) => (
                    <li>{s}</li>
                  ))}
                  <br />
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
              {socials.flatMap((s, i) => [i > 0 ? "//" : "", s])}
            </div>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
