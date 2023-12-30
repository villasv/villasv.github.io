import "./globals.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="authorization_endpoint" href="https://indieauth.com/auth" />
      </head>
      <body>{children}</body>
    </html>
  );
}
