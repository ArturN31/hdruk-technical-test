# HDUK Technical Test - Monorepo

A monorepo containing multiple applications using npm workspaces. Includes a central portal app for easy navigation between all applications.

## Quick Start

### Prerequisites

- **Node.js:** 20.x or later
- **npm:** 10.x or later

### Installation

```bash
# Install all dependencies for all apps
npm install
```

### Development

```bash
# Start the portal and all applications simultaneously
npm run dev:all
```

Then open [http://localhost:3000](http://localhost:3000) to access the portal.

### Port Assignments

| Application           | Port | URL                     |
| --------------------- | ---- | ----------------------- |
| Portal                | 3000 | <http://localhost:3000> |
| GitHub Portfolio      | 3001 | <http://localhost:3001> |
| Product Feedback Form | 3002 | <http://localhost:3002> |

## Available Commands

```bash
# Run linting for all apps
npm run lint

# Run type checking for all apps
npm run type-check

# Run tests for all apps
npm run test

# Run tests with coverage for all apps
npm run test:coverage

# Build all apps
npm run build --workspaces --if-present

# Clean all build artifacts
npm run clean
```

### Running Commands for Specific Apps

```bash
# Run github-portfolio dev server
npm run dev -w @repo/github-portfolio

# Build portal
npm run build -w @repo/portal

# Run tests for product-feedback-form
npm run test -w product-feedback-form
```

## Applications

### 1. Portal (`apps/portal`)

Central entry point to all applications in this monorepo.

**Features:**

- Application cards with descriptions and tech stack
- Quick launch links to each application
- Responsive design (desktop, tablet, mobile)
- Dark mode support

**Running:**

```bash
npm run dev:portal
```

**Environment Variables:**

```bash
# Copy apps/portal/.env.example to apps/portal/.env.local
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 2. GitHub Portfolio (`apps/github-portfolio`)

Browse and explore GitHub repositories with filtering, sorting, and search capabilities.

**Features:**

- Repository browser with filters (type, language, sort)
- Real-time search with suggestions
- Pagination with load more
- Rate limiting protection
- Comprehensive test suite (168 tests)

**Running:**

```bash
npm run dev:github
```

**Environment Variables:**

```bash
# Copy apps/github-portfolio/.env.example to apps/github-portfolio/.env.local
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=10
# Optional: For higher GitHub API rate limits
# GITHUB_API_TOKEN=your_github_token_here
```

**Test Coverage:** 68%+ (168 tests passing)

### 3. Product Feedback Form (`apps/product-feedback-form`)

Collect product feedback with star ratings and detailed reviews.

**Features:**

- Star rating system
- Form validation
- Review submission
- Comprehensive test suite (69 tests)

**Running:**

```bash
npm run dev:form
```

**Test Coverage:** 100% (69 tests passing)

## Adding New Applications

1. Create a new directory under `apps/`:

   ```bash
   mkdir apps/my-new-app
   cd apps/my-new-app
   npm init -y
   ```

2. Update `package.json`:

   ```json
   {
   	"name": "@repo/my-new-app",
   	"private": true
   }
   ```

3. Add to portal config (`apps/portal/src/lib/apps-config.ts`)

## npm Workspaces

This monorepo uses npm workspaces for dependency management:

- **Hoisted dependencies:** Shared dependencies installed at root level
- **Local linking:** Packages automatically linked
- **Single install:** One `npm install` at root installs everything

## Test Coverage

| Application           | Tests | Coverage |
| --------------------- | ----- | -------- |
| GitHub Portfolio      | 168   | 68%+     |
| Product Feedback Form | 69    | 100%     |
| Portal                | 0     | N/A      |
