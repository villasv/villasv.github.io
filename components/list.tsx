export function List(props: { items: Record<string, JSX.Element> }) {
  return (
    <ul
      style={{
        marginLeft: 0,
        paddingLeft: 0,
        listStyle: "none",
      }}
    >
      {Object.entries(props.items).map(([key, value]) => (
        <li key={key}>
          {key} {value}
        </li>
      ))}
    </ul>
  );
}
