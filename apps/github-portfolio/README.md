# GitHub Portfolio

Enterprise-oriented GitHub repository dashboard built with Next.js App Router, TypeScript, Tailwind CSS, and Vitest.

## Features

- Browse public repositories for any GitHub user
- Real-time search with autocomplete suggestions
- Filter by type (all, description, popular, issues, wiki)
- Filter by programming language
- Sort by stars or name (ascending/descending)
- Pagination with load more functionality
- Responsive design (mobile, tablet, desktop)
- Accessibility compliant (ARIA labels, keyboard navigation)
- Rate limiting protection (10 requests/minute per IP)

## Quick Start

### Prerequisites

- Node.js 20.x or later
- npm 10.x or later

### Installation

```bash
# From monorepo root
npm install

# Or from this directory
cd apps/github-portfolio
npm install
```

### Development

```bash
# From monorepo root
npm run dev:github

# Or from this directory
npm run dev
```

Open [http://localhost:3001](http://localhost:3001).

## Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

### Configuration Options

```bash
# Rate Limiting (protects against abuse)
RATE_LIMIT_WINDOW_MS=60000        # 1 minute window
RATE_LIMIT_MAX_REQUESTS=10        # 10 requests per window

# Optional: GitHub API Token (for higher rate limits)
# GITHUB_API_TOKEN=your_token_here
```

## Testing

```bash
# Run all tests
npm run test

# Run with coverage
npm run test:coverage

# Watch mode
npm run test:watch
```

### Test Coverage

- **Total Tests:** 168
- **Coverage:** 68%+ statements, 61%+ branches
- **Test Files:** 33 files covering all components, hooks, and utilities

### Build

```bash
npm run build
```

### Start Production Server

```bash
npm run start
```

### Type Check

```bash
npm run type-check
```

### Lint

```bash
npm run lint
```

## Security Features

- **Rate Limiting:** 10 requests per minute per IP
- **Input Validation:** GitHub username validation (1-39 chars, alphanumeric + hyphens)
- **Security Headers:** HSTS, X-Frame-Options, X-Content-Type-Options, CSP
- **Error Boundaries:** Graceful error handling with retry options
- **No Secrets in Client:** All API calls proxied through server

## Performance

- **First Contentful Paint:** < 1s
- **Time to Interactive:** < 2s
- **Bundle Size:** Optimized with tree-shaking

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React
- **State:** React Query (TanStack Query)
- **Validation:** Zod
- **Testing:** Vitest + React Testing Library
