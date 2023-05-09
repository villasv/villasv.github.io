import styles from "./articles.module.css";

export function Article({ children }: { children: React.ReactNode }) {
  return <div className={styles.article}>{children}</div>;
}
