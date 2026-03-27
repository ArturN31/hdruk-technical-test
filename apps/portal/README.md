# HDR UK Applications Portal

Central dashboard for managing and accessing all applications in the monorepo.

## Features

- **Application Cards**: Visual cards displaying each app with description and tech stack
- **Quick Launch**: One-click access to each application in a new tab
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Dark Mode Support**: Automatically adapts to system theme preference
- **Accessibility**: WCAG compliant with skip links, ARIA labels, keyboard navigation
- **Security Headers**: Full suite of security headers configured

## Quick Start

### Prerequisites

- Node.js >= 20.0.0
- npm >= 10.0.0

### Installation

```bash
# From monorepo root
npm install
```

### Development

```bash
# Run the portal (port 3000)
npm run dev:portal

# Or directly
cd apps/portal
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

### Configuration

```bash
# Application URL (used for metadata and SEO)
NEXT_PUBLIC_APP_URL=http://localhost:3000

# For production:
# NEXT_PUBLIC_APP_URL=https://your-domain.com
```

## Testing

```bash
# Run tests
npm run test

# Run with coverage
npm run test:coverage

# Watch mode
npm run test:watch
```

### Build

```bash
npm run build
```

### Start Production

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

## Security

The following security headers are configured:

- **Strict-Transport-Security**: Force HTTPS
- **X-Frame-Options**: Prevent clickjacking
- **X-Content-Type-Options**: Prevent MIME sniffing
- **X-XSS-Protection**: XSS filter
- **Referrer-Policy**: Control referrer information
- **Permissions-Policy**: Disable sensitive APIs

## Accessibility

- Skip-to-content link for keyboard users
- ARIA labels on all interactive elements
- Status conveyed through both color and text
- Keyboard navigation support
- Focus visible styles
- Semantic HTML structure

## Test Coverage

- **Total Tests:** 148
- **Coverage:** 98.78% statements, 96.55% branches, 96% functions, 100% lines
- **Test Files:** 13 files covering all components, hooks, and utilities
- **Test Execution:** ~8 seconds

**Coverage by Category:**

| Category    | Coverage |
| ----------- | -------- |
| Statements  | 98.78%   |
| Branches    | 96.55%   |
| Functions   | 96%      |
| Lines       | 100%     |

**Files with 100% Coverage:**

- All feature components (`components/features/**/*`)
- All UI components (`components/ui/**/*`)
- All hooks (`hooks/**/*`)
- All utilities (`lib/**/*`)
- App pages (`app/**/*`)

## Tech Stack

- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **Vitest** - Testing framework
- **React Testing Library** - Component testing

## Port Assignments

| Application | Port | URL                     |
| ----------- | ---- | ----------------------- |
| Portal      | 3000 | <http://localhost:3000> |

## Scripts

| Script          | Description                    |
| --------------- | ------------------------------ |
| `dev`           | Start development server       |
| `build`         | Create production build        |
| `start`         | Start production server        |
| `lint`          | Run ESLint                     |
| `lint:fix`      | Fix ESLint errors              |
| `type-check`    | Run TypeScript type checking   |
| `test`          | Run tests                      |
| `test:watch`    | Run tests in watch mode        |
| `test:coverage` | Run tests with coverage report |
| `clean`         | Remove build artifacts         |
