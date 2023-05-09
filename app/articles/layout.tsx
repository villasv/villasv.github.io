import { Container } from "@/components/structure";
import { Article } from "./article";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Container>
      <Article>{children}</Article>
    </Container>
  );
}
