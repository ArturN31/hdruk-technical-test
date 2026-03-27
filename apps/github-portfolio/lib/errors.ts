import type { GitHubApiErrorCode } from "@/types/github";

/**
 * Error messages for GitHub API errors.
 */
const ERROR_MESSAGES: Record<GitHubApiErrorCode, string> = {
  USER_NOT_FOUND: "GitHub user was not found.",
  RATE_LIMITED: "GitHub API rate limit reached. Please try again in a moment.",
  UPSTREAM_ERROR: "Something went wrong while loading repositories.",
} as const;

/**
 * Get human-readable error message from error code.
 * @param errorCode - GitHub API error code
 * @returns Error message string or null if no error
 */
export function getErrorMessage(errorCode: GitHubApiErrorCode | null): string | null {
  if (!errorCode) return null;
  return ERROR_MESSAGES[errorCode] ?? ERROR_MESSAGES.UPSTREAM_ERROR;
}

/**
 * Get error title from error code.
 * @param errorCode - GitHub API error code
 * @returns Short error title for display
 */
export function getErrorTitle(errorCode: GitHubApiErrorCode | null): string {
  if (!errorCode) return "";
  
  switch (errorCode) {
    case "USER_NOT_FOUND":
      return "User not found";
    case "RATE_LIMITED":
      return "Rate limited by GitHub";
    default:
      return "Couldn't load repositories";
  }
}

/**
 * Check if error code indicates a rate limit error.
 * @param errorCode - Error code to check
 * @returns True if rate limited
 */
export function isRateLimitError(errorCode: GitHubApiErrorCode | null): boolean {
  return errorCode === "RATE_LIMITED";
}

/**
 * Check if error code indicates a user not found error.
 * @param errorCode - Error code to check
 * @returns True if user not found
 */
export function isUserNotFoundError(errorCode: GitHubApiErrorCode | null): boolean {
  return errorCode === "USER_NOT_FOUND";
}

/**
 * Check if error code indicates a recoverable error (can retry).
 * @param errorCode - Error code to check
 * @returns True if error is recoverable
 */
export function isRecoverableError(errorCode: GitHubApiErrorCode | null): boolean {
  return errorCode === "RATE_LIMITED" || errorCode === "UPSTREAM_ERROR";
}
