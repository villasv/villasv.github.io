export function GitHub(props: { repo?: string }) {
  return (
    <a
      rel={props.repo ? undefined : "me"}
      href={`http://github.com/villasv/${props.repo ?? ""}`}
    >
      GitHub{props.repo ? undefined : " (github.com/villasv)"}
    </a>
  );
}

export function Email() {
  return (
    <a rel="me" href="mailto:mail@victor.villas">
      Email (mail@victor.villas)
    </a>
  );
}
