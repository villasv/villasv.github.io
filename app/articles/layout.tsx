import styles from "./articles.module.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className={styles.article}>{children}</div>;
}
