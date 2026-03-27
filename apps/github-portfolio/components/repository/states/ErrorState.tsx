import { AlertCircle } from "lucide-react";
import type { GitHubApiErrorCode } from "@/types/github";
import { UnauthenticatedRateLimitNotice } from "@/components/common/feedback/UnauthenticatedRateLimitNotice";
import { Button } from "@/components/common/Button";

export interface ErrorStateProps {
  errorCode: GitHubApiErrorCode | null;
  errorMessage: string | null;
  onRetry: () => void;
}

export function ErrorState({ errorCode, errorMessage, onRetry }: ErrorStateProps) {
  const title = errorCode === "USER_NOT_FOUND"
    ? "User not found"
    : errorCode === "RATE_LIMITED"
      ? "Rate limited by GitHub"
      : "Couldn't load repositories";

  const showRateLimitNotice = errorCode === "RATE_LIMITED" || errorCode === "UPSTREAM_ERROR";

  return (
    <div className="p-8">
      <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
        <AlertCircle className="mx-auto h-10 w-10 text-red-500" aria-hidden="true" />
        <h3 className="mt-3 text-sm font-semibold text-red-900">{title}</h3>
        <p className="mt-2 text-sm text-red-700">{errorMessage}</p>
        {showRateLimitNotice && <UnauthenticatedRateLimitNotice />}
        <div className="mt-4">
          <Button onClick={onRetry}>Try Again</Button>
        </div>
      </div>
    </div>
  );
}
