import styles from "./styles.module.css";

export default async function Page() {
  return (
    <div>
      <ul>
        <li>
          <a href="notes/now">What's Up</a>
        </li>
        <li>
          <a href="notes/tech">Technology</a>
        </li>
      </ul>
    </div>
  );
}
