import "./globals.css";
import { Sidebar } from "@/components/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div id="sidebar">
          <div>
            <Sidebar />
          </div>
        </div>
        <div id="content">
          <a className="home-link" href="/">
            🔙 Homepage
          </a>
          <div className="children">{children}</div>
        </div>
      </body>
    </html>
  );
}
