/**
 * Explains unauthenticated GitHub API limits when requests fail.
 */
export function UnauthenticatedRateLimitNotice() {
  return (
    <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50/80 p-3 text-xs text-amber-900 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-100">
      <p className="font-semibold">When you do not need a key</p>
      <p className="mt-1">
        Public repositories can be fetched without authentication using{" "}
        <code>GET https://api.github.com/users/{"{username}"}/repos</code>.
      </p>
      <p className="mt-1">
        Unauthenticated requests are limited to 60 requests/hour per IP and return
        public repositories only.
      </p>
    </div>
  );
}

