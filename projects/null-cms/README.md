# NextJS Ultra-Light CMS

An ultralight CMS that makes it easier to drop MDX files on a NextJS static
website and have a basic directory page with all the sub-pages listed.

## Usage

Placing the `Index` component on a `page.tsx` under `app/some/route`:

```typescript
import { Index } from "null-cms/components";

export default async function Page() {
  return <Index base=${__dirname} />;
}
```

will render a component that lists all `app/some/route/**/page.mdx` pages.
