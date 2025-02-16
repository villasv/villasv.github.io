import { relativeToAppDir, relativeToProject } from "./introspection";

describe(relativeToProject.name, () => {
  it("should return the relative path from the .next/server folder", () => {
    const absoluteBasePath = "/Users/user/proj/.next/server/app/route/section";
    const expected = "app/route/section";
    expect(relativeToProject(absoluteBasePath)).toBe(expected);
  });
});

describe(relativeToAppDir.name, () => {
  it("should return the relative path from the app folder", () => {
    const relativeBasePath = "app/route/section";
    const expected = "route/section";
    expect(relativeToAppDir(relativeBasePath)).toBe(expected);
  });
});
