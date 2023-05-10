import { listPages } from "@/lib/reflection";

describe(listPages.name, () => {
  it("should output relevant article pages", () => {
    const articles = listPages({ route: "articles" });
    expect(articles.length).toBeGreaterThan(1);
  });
});
