import { List } from "@/components/list";
import { Container, Section, Sidebar, Segment } from "@/components/page";
import { Email, GitHub } from "@/components/relme";

export const metadata = {
  title: "Victor's Website",
  description: "on the independent web",
};

export default function Page() {
  return (
    <Container>
      <h1>Victor Villas'</h1>
      <Section>
        <h2>Latest</h2>
        <p>Nothing to see here (yet).</p>
      </Section>
      <Sidebar>
        <h2>A personal website</h2>
        <p>
          This is my humble abode on the Worldwide Web. It is statically
          generated from some markdown documents, custom frontend components and
          a flat-file database. You can check it out on{" "}
          <GitHub repo="villasv.github.io" />. If none of that made sense, no
          worries. I just like my website and wanted to tell you about it. Maybe
          this encourages you to make your own as well?
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
