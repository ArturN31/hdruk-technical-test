"use client";

import { AlertCircle } from "lucide-react";
import { useEffect } from "react";
import { Button } from "@/components/common/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-50">
      <div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-4 py-10 text-center">
        <AlertCircle className="mb-4 h-16 w-16 text-red-500" aria-hidden="true" />
        <h1 className="mb-2 text-2xl font-bold tracking-tight sm:text-3xl">
          Something went wrong
        </h1>
        <p className="mb-6 max-w-md text-zinc-600 dark:text-zinc-400">
          We encountered an unexpected error. Please try refreshing the page or
          try again later.
        </p>
        <div className="flex gap-3">
          <Button onClick={reset}>Try Again</Button>
          <Button
            variant="secondary"
            onClick={() => (window.location.href = window.location.href)}
          >
            Refresh Page
          </Button>
        </div>
        {process.env.NODE_ENV === "development" && (
          <details className="mt-8 w-full max-w-lg text-left">
            <summary className="cursor-pointer text-sm font-medium text-zinc-500">
              Error Details (Development)
            </summary>
            <pre className="mt-2 overflow-auto rounded-lg bg-zinc-900 p-4 text-xs text-zinc-100">
              {error.message}
              {error.stack && `\n\n${error.stack}`}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}
