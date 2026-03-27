# HDR UK - Technical Test Monorepo

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![Tests](https://img.shields.io/badge/Tests-237%20passing-brightgreen.svg)]()

A monorepo containing multiple applications using npm workspaces. Includes a central portal app for easy navigation between all applications.

> **Public Repository**: This is a public repository. Please review [SECURITY.md](SECURITY.md) before contributing and never commit sensitive data.

## Live Demos

| Application | URL |
|------------|-----|
| **Portal** | https://hdruk-technical-test-portal.vercel.app |
| **GitHub Portfolio** | https://hdruk-technical-test-github-portfol.vercel.app |
| **Product Feedback Form** | https://hdruk-technical-test-product-feedba.vercel.app |

## Quick Start

### Prerequisites

- Node.js 20.x or later
- npm 10.x or later

### Installation

```bash
npm install
```

### Development

```bash
# Run all applications
npm run dev:all
```

Open [http://localhost:3000](http://localhost:3000) to access the portal.

### Port Assignments

| Application | Port | URL |
|------------|------|-----|
| Portal | 3000 | http://localhost:3000 |
| GitHub Portfolio | 3001 | http://localhost:3001 |
| Product Feedback Form | 3002 | http://localhost:3002 |

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
- **Environment-aware URLs** (localhost in dev, production in prod)
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

# Optional: Override linked app URLs
# NEXT_PUBLIC_GITHUBPORTFOLIO_URL=http://localhost:3001
# NEXT_PUBLIC_PRODUCTFEEDBACK_URL=http://localhost:3002
```

**Smart URL Detection:**
- **Development**: Automatically uses `localhost:3001` and `localhost:3002`
- **Production**: Automatically uses Vercel deployment URLs
- **Override**: Set `NEXT_PUBLIC_*_URL` environment variables to customize

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

## Security

> **Important**: This is a public repository. Never commit sensitive data.

### Environment Variables

Each app has its own `.env.local` file. **Never commit `.env` files!**

```bash
# Copy example to local (do this for each app)
cp apps/portal/.env.example apps/portal/.env.local
cp apps/github-portfolio/.env.example apps/github-portfolio/.env.local
```

**Security Features:**
- All `.env*` files are gitignored
- Security headers configured on all Next.js apps
- Rate limiting on API routes (10 req/min per IP)
- Input validation with Zod schemas
- XSS protection on forms

See [SECURITY.md](SECURITY.md) for more details.

## Deployment

### Pre-Deployment Checklist

```bash
# 1. Install dependencies
npm install

# 2. Run all checks
npm run lint
npm run type-check
npm run test

# 3. Build all workspaces
npm run build --workspaces --if-present
```

### Vercel Deployment

1. **Portal**: Root directory = `apps/portal`
2. **GitHub Portfolio**: Root directory = `apps/github-portfolio`
3. **Product Feedback Form**: Root directory = `apps/product-feedback-form`

**Portal URL Configuration:**
- Automatically detects production environment
- Uses Vercel URLs in production, localhost in development
- Optional: Set environment variables to override defaults

See [DEPLOYMENT.md](DEPLOYMENT.md) for comprehensive deployment instructions.

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Quick Start for Contributors

```bash
# 1. Fork the repository
# 2. Clone your fork
git clone https://github.com/YOUR_USERNAME/hdruk-technical-test.git
cd hdruk-technical-test

# 3. Install dependencies
npm install

# 4. Create a branch
git checkout -b feature/your-feature-name

# 5. Make your changes and test
npm run lint
npm run type-check
npm run test

# 6. Commit and push
git commit -m "feat: your change description"
git push origin feature/your-feature-name

# 7. Open a Pull Request
```

## Test Coverage

| Application | Tests | Coverage |
|------------|-------|----------|
| GitHub Portfolio | 168 | 68%+ |
| Product Feedback Form | 69 | 100% |
| **Total** | **237** | **Excellent** |

## License

MIT - see [LICENSE](LICENSE) for details.
