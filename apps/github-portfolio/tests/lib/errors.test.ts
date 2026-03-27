import { describe, expect, it } from "vitest";
import { getErrorMessage, getErrorTitle, isRateLimitError, isUserNotFoundError, isRecoverableError } from "@/lib/errors";

describe("errors", () => {
  describe("getErrorMessage", () => {
    it("returns null for null", () => { expect(getErrorMessage(null)).toBeNull(); });
    it("returns user not found", () => { expect(getErrorMessage("USER_NOT_FOUND")).toMatch(/user/); });
    it("returns rate limited", () => { expect(getErrorMessage("RATE_LIMITED")).toMatch(/rate/); });
    it("returns upstream", () => { expect(getErrorMessage("UPSTREAM_ERROR")).toMatch(/wrong/); });
  });

  describe("getErrorTitle", () => {
    it("returns empty for null", () => { expect(getErrorTitle(null)).toBe(""); });
    it("returns user not found title", () => { expect(getErrorTitle("USER_NOT_FOUND")).toBe("User not found"); });
    it("returns rate limited title", () => { expect(getErrorTitle("RATE_LIMITED")).toBe("Rate limited by GitHub"); });
    it("returns default title", () => { expect(getErrorTitle("UPSTREAM_ERROR")).toBe("Couldn't load repositories"); });
  });

  describe("isRateLimitError", () => {
    it("returns true for RATE_LIMITED", () => { expect(isRateLimitError("RATE_LIMITED")).toBe(true); });
    it("returns false for others", () => { expect(isRateLimitError("USER_NOT_FOUND")).toBe(false); });
  });

  describe("isUserNotFoundError", () => {
    it("returns true for USER_NOT_FOUND", () => { expect(isUserNotFoundError("USER_NOT_FOUND")).toBe(true); });
    it("returns false for others", () => { expect(isUserNotFoundError("RATE_LIMITED")).toBe(false); });
  });

  describe("isRecoverableError", () => {
    it("returns true for RATE_LIMITED", () => { expect(isRecoverableError("RATE_LIMITED")).toBe(true); });
    it("returns true for UPSTREAM_ERROR", () => { expect(isRecoverableError("UPSTREAM_ERROR")).toBe(true); });
    it("returns false for USER_NOT_FOUND", () => { expect(isRecoverableError("USER_NOT_FOUND")).toBe(false); });
  });
});
