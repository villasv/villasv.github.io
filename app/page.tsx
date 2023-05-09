import styles from "./home.module.css";

export const metadata = {
  title: "Victor's Website",
  description: "on the independent web",
};

export default function Page() {
  return (
    <div>
      <h1>Victor Villas'</h1>
      <div className={styles.sidebar}>
        <h2>A personal website</h2>
        <p>
          This is my humble abode on the Worldwide Web. It is statically
          generated from some markdown documents, custom frontend components and
          a flat-file database.
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
              💾 GitHub (github.com/villasv)
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
