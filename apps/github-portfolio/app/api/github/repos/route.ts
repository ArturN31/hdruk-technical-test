import { NextRequest, NextResponse } from "next/server";

import { DEFAULT_GITHUB_USERNAME } from "@/lib/constants";
import { githubRepositoriesSchema } from "@/lib/github-schemas";
import type { ReposErrorResponse, ReposSuccessResponse } from "@/types/github";

/**
 * Validate username input
 */
function isValidUsername(username: string): boolean {
  // GitHub usernames: 1-39 characters, alphanumeric and hyphens only
  const githubUsernameRegex = /^[a-zA-Z0-9][-a-zA-Z0-9]{0,38}$/;
  return githubUsernameRegex.test(username);
}

/**
 * GET /api/github/repos?user={username}
 * Proxies unauthenticated GitHub API calls for public repositories.
 * Rate limiting is handled by middleware.ts
 */
export async function GET(req: NextRequest) {
  const userParam = req.nextUrl.searchParams.get("user") ?? DEFAULT_GITHUB_USERNAME;
  const username = userParam.trim() || DEFAULT_GITHUB_USERNAME;

  // Input validation
  if (!isValidUsername(username)) {
    return NextResponse.json<ReposErrorResponse>(
      { 
        error: "Invalid username. Usernames must be 1-39 characters and contain only letters, numbers, and hyphens.", 
        code: "USER_NOT_FOUND" 
      },
      { status: 400 }
    );
  }

  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  const upstream = await fetch(
    `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`,
    {
      headers,
      next: { revalidate: 300 }, // Revalidate every 5 minutes
    }
  );

  if (upstream.status === 404) {
    return NextResponse.json<ReposErrorResponse>(
      { error: "User not found.", code: "USER_NOT_FOUND" },
      { status: 404 }
    );
  }

  if (upstream.status === 403 || upstream.status === 429) {
    return NextResponse.json<ReposErrorResponse>(
      { error: "GitHub API rate limit exceeded. Please try again later.", code: "RATE_LIMITED" },
      { status: upstream.status }
    );
  }

  if (!upstream.ok) {
    return NextResponse.json<ReposErrorResponse>(
      { error: "Failed to fetch repositories from GitHub.", code: "UPSTREAM_ERROR" },
      { status: upstream.status }
    );
  }

  const payload: unknown = await upstream.json();
  const parsed = githubRepositoriesSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json<ReposErrorResponse>(
      { error: "GitHub response format is invalid.", code: "UPSTREAM_ERROR" },
      { status: 502 }
    );
  }

  return NextResponse.json<ReposSuccessResponse>(
    { repositories: parsed.data },
    { status: 200 }
  );
}

