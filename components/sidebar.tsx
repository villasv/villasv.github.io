import styles from "./sidebar.module.css";

export function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <h2>A personal website</h2>
      <p>
        This is my humble site on the World Wide Web. Here I play as cyberspace
        architect, librarian, and gardener. Sometimes I'll be doing other things
        out there in the carbonspace as well, which I abstract away into theory
        here.
      </p>
      <h2>Also me but elsewhere</h2>
      <ul style={{ listStyle: "none" }}>
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
      </ul>
    </div>
  );
}
