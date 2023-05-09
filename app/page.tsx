import { List } from "@/components/list";
import { Container, Sidebar } from "@/components/structure";
import { Email, GitHub } from "@/components/relme";

export const metadata = {
  title: "Victor's Website",
  description: "on the independent web",
};

export default function Page() {
  return (
    <Container>
      <h1>Victor Villas'</h1>
      <Sidebar>
        <h2>A personal website</h2>
        <p>
          This is my humble abode on the Worldwide Web. It is statically
          generated from some markdown documents, custom frontend components and
          a flat-file database.
        </p>
        <h2>Also me but elsewhere</h2>
        <List
          items={{
            "📧": <Email />,
            "💾": <GitHub />,
          }}
        />
      </Sidebar>
    </Container>
  );
}
