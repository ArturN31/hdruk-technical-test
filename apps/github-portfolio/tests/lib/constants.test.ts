import { describe, expect, it } from "vitest";
import { ITEMS_PER_PAGE, DEBOUNCE_DELAY_MS, STALE_TIME_MS, QUERY_RETRY_COUNT, getLanguageColor } from "@/lib/constants";

describe("constants", () => {
  it("exports ITEMS_PER_PAGE", () => {
    expect(ITEMS_PER_PAGE).toBe(12);
  });

  it("exports DEBOUNCE_DELAY_MS", () => {
    expect(DEBOUNCE_DELAY_MS).toBe(150);
  });

  it("exports STALE_TIME_MS", () => {
    expect(STALE_TIME_MS).toBe(300000);
  });

  it("exports QUERY_RETRY_COUNT", () => {
    expect(QUERY_RETRY_COUNT).toBe(1);
  });

  describe("getLanguageColor", () => {
    it("returns color for known language", () => {
      expect(getLanguageColor("TypeScript")).toBe("#3178c6");
    });

    it("returns unknown color for null", () => {
      expect(getLanguageColor(null)).toBe("#808080");
    });

    it("returns unknown color for unknown language", () => {
      expect(getLanguageColor("UnknownLang")).toBe("#808080");
    });
  });
});
