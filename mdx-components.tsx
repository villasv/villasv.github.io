// This file allows usage of custom React components in MDX files.

import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { ...components };
}
