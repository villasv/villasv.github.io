import styles from "./sidebar.module.css";

export function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <h1>Victor Villas</h1>
      <ul>
        <li>🔗 Husband,</li>
        <li>
          <a href="words">📝 writer</a>,
        </li>
        <li>
          <a href="civil">🗳️ citizen</a>,
        </li>
        <li>
          <a href="tech">🔩 technologist</a>,
        </li>
        <li>
          <a href="coffee">☕ barista</a>,
        </li>
        <li>
          {/* <a href="food">🥘 Cook</a>, */}
          🥘 cook,
        </li>
        <li>
          {/* <a href="world">🏕️ Explorer</a>, */}
          🏕️ explorer,
        </li>
        <li>
          {/* <a href="sport">👟 Athlete</a>, */}
          👟 athlete.
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
