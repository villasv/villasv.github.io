import styles from "./styles.module.css";
import { Sidebar } from "@/components/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles["aspect-wrapper"]}>
      <div className={styles["sidebar-floater"]}>
        <div className={styles["sidebar"]}>
          <Sidebar />
        </div>
      </div>
      <div className={styles["content"]}>
        <a className={styles["home-link"]} href="/">
          🔙 Homepage
        </a>
        {children}
      </div>
    </div>
  );
}
