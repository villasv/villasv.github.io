export function enumerate(list: React.JSX.Element[]): React.JSX.Element[] {
  const last = list.pop();
  if (last === undefined) return [];
  const nextToLast = list.pop();
  if (nextToLast === undefined) return [last];
  return [...list.flatMap((el) => [el, <>, </>]), nextToLast, <> and </>, last];
}

export function concatWithSpaces(
  list: React.JSX.Element[],
): React.JSX.Element[] {
  const last = list.pop();
  if (last === undefined) return [];
  return [...list.flatMap((el) => [el, <> </>]), last];
}
