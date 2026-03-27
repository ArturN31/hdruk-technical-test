import { describe, expect, it } from "vitest";
import Home from "@/app/page";

describe("Home", () => {
  it("exports", () => {
    expect(Home).toBeDefined();
    expect(typeof Home).toBe("function");
  });
});
