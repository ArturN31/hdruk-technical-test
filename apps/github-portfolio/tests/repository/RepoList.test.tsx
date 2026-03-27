import { describe, expect, it } from "vitest";
import { RepoList } from "@/components/repository/RepoList";

describe("RepoList", () => {
  it("exports", () => {
    expect(RepoList).toBeDefined();
    expect(typeof RepoList).toBe("function");
  });
});
