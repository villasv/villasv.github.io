import styles from "./sidebar.module.css";

export function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <h2>digital garden</h2>
      <p>
        This is my humble site on the World Wide Web, where I curate my notes .
      </p>
      <ul>
        <li>
          AK Waitman's <a href="notes/cuisine">🥘 Personal Chef</a>
        </li>
        <li>
          AK Waitman's <a href="notes/coffee">☕ Resident Barista</a>
        </li>
        <li>
          AK Waitman's <a href="notes/athletics">👟 Fitness Coach</a>
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
