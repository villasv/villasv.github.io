import { Container, Section } from "@/components/structure";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Container>
      <Section>{children}</Section>
    </Container>
  );
}
