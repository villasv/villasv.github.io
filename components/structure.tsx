import styles from "./structure.module.css";

export function Container({ children }: { children: React.ReactNode }) {
  return <div className={styles.container}>{children}</div>;
}

export function Sidebar({ children }: { children: React.ReactNode }) {
  return <div className={styles.sidebar}>{children}</div>;
}

export function Section({ children }: { children: React.ReactNode }) {
  return <div className={styles.section}>{children}</div>;
}

export function Segment({ children }: { children: React.ReactNode }) {
  return <div className={styles.segment}>{children}</div>;
}
