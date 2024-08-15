import styles from "./styles.module.css";

export function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <h1>
        <a href="/">Victor Villas</a>
      </h1>
      <ul>
        <li>🔗 Husband,</li>
        <li>
          <a href="/civil">🗳️ citizen</a>,
        </li>
        <li>
          <a href="/coffee">☕ barista</a>,
        </li>
        <li>
          <a href="/cycle">🚲 cyclist</a>,
        </li>
        <li>🥘 cook,</li>
        <li>🏕️ explorer,</li>
        <li>👟 athlete,</li>
        <li>
          <a href="/tech">🔩 tinkerer</a>,
        </li>
        <li>
          <a href="/words">📝 writer</a>.
        </li>
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
        <li>
          <a rel="me" href="https://mastodon.social/@villasbc">
            💬 Mastodon
          </a>
        </li>
        <li>
          <a rel="me" href="https://bookwyrm.social/user/villasv">
            📚 BookWyrm
          </a>
        </li>
      </ul>
    </div>
  );
}
