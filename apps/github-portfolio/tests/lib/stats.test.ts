/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, it } from "vitest";
import { calculateTotalStars, getUniqueLanguages, formatStarCount, formatNumber } from "@/lib/stats";

describe("stats utilities", () => {
  const mockRepos = [
    { stargazers_count: 100, language: "TypeScript" },
    { stargazers_count: 200, language: "JavaScript" },
    { stargazers_count: 150, language: "TypeScript" },
    { stargazers_count: 50, language: null },
  ];

  describe("calculateTotalStars", () => {
    it("calculates total stars", () => {
      expect(calculateTotalStars(mockRepos as any)).toBe(500);
    });
    it("returns 0 for empty array", () => {
      expect(calculateTotalStars([])).toBe(0);
    });
  });

  describe("getUniqueLanguages", () => {
    it("returns sorted unique languages", () => {
      expect(getUniqueLanguages(mockRepos as any)).toEqual(["JavaScript", "TypeScript"]);
    });
    it("excludes null languages", () => {
      const languages = getUniqueLanguages(mockRepos as any);
      expect(languages).not.toContain(null);
    });
    it("returns empty array for no languages", () => {
      expect(getUniqueLanguages([{ stargazers_count: 100, language: null }] as any)).toEqual([]);
    });
  });

  describe("formatStarCount", () => {
    it("formats thousands with k", () => {
      expect(formatStarCount(1200)).toBe("1.2k");
    });
    it("formats hundreds without k", () => {
      expect(formatStarCount(999)).toBe("999");
    });
    it("formats exact thousands", () => {
      expect(formatStarCount(1000)).toBe("1.0k");
    });
  });

  describe("formatNumber", () => {
    it("formats with locale separators", () => {
      expect(formatNumber(1234567)).toBe("1,234,567");
    });
    it("uses custom locale", () => {
      expect(formatNumber(1234567, "de-DE")).toBe("1.234.567");
    });
  });
});
