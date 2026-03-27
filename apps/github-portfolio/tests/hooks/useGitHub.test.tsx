import { describe, expect, it } from "vitest";
import { useGitHub } from "@/hooks/useGitHub";

describe("useGitHub", () => {
  it("exports", () => {
    expect(useGitHub).toBeDefined();
    expect(typeof useGitHub).toBe("function");
  });
});
