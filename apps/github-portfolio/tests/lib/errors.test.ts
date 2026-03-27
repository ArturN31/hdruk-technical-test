import { describe, expect, it } from "vitest";
import { getErrorMessage, getErrorTitle, isRateLimitError, isUserNotFoundError, isRecoverableError } from "@/lib/errors";

describe("errors", () => {
  describe("getErrorMessage", () => {
    it("returns null for null error code", () => {
      expect(getErrorMessage(null)).toBeNull();
    });

    it("returns user not found message", () => {
      expect(getErrorMessage("USER_NOT_FOUND")).toBe("GitHub user was not found.");
    });

    it("returns rate limited message", () => {
      expect(getErrorMessage("RATE_LIMITED")).toBe("GitHub API rate limit reached. Please try again in a moment.");
    });

    it("returns upstream error message", () => {
      expect(getErrorMessage("UPSTREAM_ERROR")).toBe("Something went wrong while loading repositories.");
    });

    it("returns default message for unknown error code", () => {
      expect(getErrorMessage("UNKNOWN" as any)).toBe("Something went wrong while loading repositories.");
    });
  });

  describe("getErrorTitle", () => {
    it("returns empty string for null", () => {
      expect(getErrorTitle(null)).toBe("");
    });

    it("returns user not found title", () => {
      expect(getErrorTitle("USER_NOT_FOUND")).toBe("User not found");
    });

    it("returns rate limited title", () => {
      expect(getErrorTitle("RATE_LIMITED")).toBe("Rate limited by GitHub");
    });

    it("returns default title for upstream error", () => {
      expect(getErrorTitle("UPSTREAM_ERROR")).toBe("Couldn't load repositories");
    });

    it("returns default title for unknown error code", () => {
      expect(getErrorTitle("UNKNOWN" as any)).toBe("Couldn't load repositories");
    });
  });

  describe("isRateLimitError", () => {
    it("returns true for RATE_LIMITED", () => {
      expect(isRateLimitError("RATE_LIMITED")).toBe(true);
    });

    it("returns false for USER_NOT_FOUND", () => {
      expect(isRateLimitError("USER_NOT_FOUND")).toBe(false);
    });

    it("returns false for UPSTREAM_ERROR", () => {
      expect(isRateLimitError("UPSTREAM_ERROR")).toBe(false);
    });

    it("returns false for null", () => {
      expect(isRateLimitError(null)).toBe(false);
    });
  });

  describe("isUserNotFoundError", () => {
    it("returns true for USER_NOT_FOUND", () => {
      expect(isUserNotFoundError("USER_NOT_FOUND")).toBe(true);
    });

    it("returns false for RATE_LIMITED", () => {
      expect(isUserNotFoundError("RATE_LIMITED")).toBe(false);
    });

    it("returns false for UPSTREAM_ERROR", () => {
      expect(isUserNotFoundError("UPSTREAM_ERROR")).toBe(false);
    });

    it("returns false for null", () => {
      expect(isUserNotFoundError(null)).toBe(false);
    });
  });

  describe("isRecoverableError", () => {
    it("returns true for RATE_LIMITED", () => {
      expect(isRecoverableError("RATE_LIMITED")).toBe(true);
    });

    it("returns true for UPSTREAM_ERROR", () => {
      expect(isRecoverableError("UPSTREAM_ERROR")).toBe(true);
    });

    it("returns false for USER_NOT_FOUND", () => {
      expect(isRecoverableError("USER_NOT_FOUND")).toBe(false);
    });

    it("returns false for null", () => {
      expect(isRecoverableError(null)).toBe(false);
    });
  });
});
