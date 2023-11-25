import {
  getAllNotes,
  getFileSubpath,
  getNoteSlug,
  getNoteTitle,
  getPageSubpath,
} from "@/components/notes/factory";

describe("Notes Factory", () => {
  describe(getNoteSlug.name, () => {
    it("should use note id if content offers no title", () => {
      const relativePath = "notes/Interesting Stuff/1234.mdx";
      const content = `just some text\nwith maybe a subheader\n## Hello`;
      const slug = getNoteSlug(relativePath, content);
      expect(slug).toBe("1234");
    });

    it("should use available title replacing '&' with 'and'", () => {
      const relativePath = "notes/Interesting Stuff/1234.mdx";
      const content = `just some text\nwith a title\n# Hello & Welcome!`;
      const slug = getNoteSlug(relativePath, content);
      expect(slug).toBe("hello-and-welcome");
    });
  });

  describe(getNoteTitle.name, () => {
    it("should use available heading", () => {
      const content = `## subheader\n# header`;
      const title = getNoteTitle(content);
      expect(title).toBe("header");
    });
  });

  describe(getPageSubpath.name, () => {
    it("should use folder and slug to build a path", async () => {
      const relativePath = "notes/Interesting Stuff/1234.mdx";
      const content = `just some text\nwith a title\n# Hello & Welcome!`;
      const url = getPageSubpath(relativePath, content);
      expect(url).toBe("interesting-stuff/hello-and-welcome");
    });
  });

  describe(getFileSubpath.name, () => {
    it("should return relative path without the notes part", async () => {
      const relativePath = "notes/Interesting Stuff/1234.mdx";
      const url = getFileSubpath(relativePath);
      expect(url).toBe("Interesting Stuff/1234.mdx");
    });
  });

  describe(getAllNotes.name, () => {
    it("should return a list of notes", async () => {
      const notes = await getAllNotes();
      expect(notes.length).toBeGreaterThan(0);
    });
  });
});
