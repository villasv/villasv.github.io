import styles from "./sidebar.module.css";

export function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <h1>Victor Villas</h1>
      <ul>
        <li>Husband,</li>
        <li>
          <a href="cooking">🥘 Personal Chef</a>,
        </li>
        <li>
          <a href="brewing">☕ Resident Barista</a>,
        </li>
        <li>
          <a href="running">👟 Street Runner</a>,
        </li>
        <li>
          <a href="hiking">🏕️ Outdoors Explorer</a>,
        </li>
        <li>
          <a href="thinking">🧠 Opinionated Human</a>.
        </li>
      </ul>
      <h2>me elsewhere</h2>
      <ul>
        <li>
          <a rel="me" href="mailto:mail@victor.villas">
            📧 Email (mail@victor.villas)
          </a>
        </li>
        <li>
          <a rel="me" href="http://github.com/villasv/">
            💾 Software (github.com/villasv)
          </a>
        </li>
        <li>
          <a rel="me" href="https://mastodon.social/@villasbc">
            💬 Social (mastodon.social/@villasbc)
          </a>
        </li>
        <li>
          <a rel="me" href="https://bookwyrm.social/user/villasv">
            📚 Books (bookwyrm.social/user/villasv)
          </a>
        </li>
      </ul>
    </div>
  );
}
