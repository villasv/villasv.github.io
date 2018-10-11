import styles from "./sidebar.module.css";

export function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <h2>A personal website</h2>
      <p>
        This is my humble site on the World Wide Web. Here I play as cyberspace
        architect, librarian, and digital gardener. Sometimes I write about
        things I do out there on the carbonspace as well.
      </p>
      <h2>Also me but elsewhere</h2>
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
      <h2>Words of affirmation</h2>
      <ul>
        <li>
          <a href="/articles/life">⏳ Life, The Universe and Everything</a>
        </li>
        <li>
          <a href="/articles/stretch">🧞 Arcane & Blursed StretchText</a>
        </li>
      </ul>
    </div>
  );
}
