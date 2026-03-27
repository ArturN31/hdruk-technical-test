# Product Feedback Form

A product feedback form built with React, TypeScript, and Tailwind CSS. Collects user ratings and written feedback with validation, accessibility support, and security features.

## Features

- **Star Rating System**: 5-star rating with hover preview and keyboard navigation
- **Written Review**: Text area with real-time character counter (250 character limit)
- **Real-time Validation**: Instant feedback on input changes
- **Full Accessibility**: WCAG compliant with ARIA support, keyboard navigation, screen reader compatibility
- **Security**: XSS protection with input sanitization
- **Responsive Design**: Mobile-first design using Tailwind CSS
- **Performance**: Optimized bundle size (~63KB gzipped)
- **Testing**: 100% test coverage with 69 tests

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# From monorepo root
npm install

# Or from this directory
cd apps/product-feedback-form
npm install
```

### Development

```bash
# From monorepo root
npm run dev:form

# Or from this directory
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Build

```bash
npm run build
```

Output: `dist/` folder with static files.

### Preview Production Build

```bash
npm run preview
```

### Type Check

```bash
npm run type-check
```

### Lint

```bash
npm run lint
```

## Testing

```bash
# Run all tests
npm run test:run

# Run with coverage
npm run test:coverage

# Watch mode
npm run test

# Open interactive UI
npm run test:ui
```

### Test Coverage

| Metric     | Coverage |
| ---------- | -------- |
| Statements | 100%     |
| Branches   | 99%      |
| Functions  | 100%     |
| Lines      | 100%     |

## Accessibility Features

### Keyboard Navigation

| Key               | Action                              |
| ----------------- | ----------------------------------- |
| `Tab`             | Focus first star (or selected star) |
| `Arrow Right/Up`  | Increase rating                     |
| `Arrow Left/Down` | Decrease rating                     |
| `Home`            | Jump to first star                  |
| `End`             | Jump to last star                   |
| `Enter/Space`     | Select focused star                 |

### Screen Reader Support

- Proper ARIA roles (`radiogroup`, `radio`)
- `aria-label` on all interactive elements
- `aria-checked` for star states
- Live regions for error messages

### Visual Indicators

- Focus rings for keyboard users
- Hover states for mouse users
- Color-coded character counter
- Clear error states

## Security Features

### XSS Protection

- Script tag removal
- Event handler stripping
- JavaScript URL blocking
- HTML tag sanitization

### Input Validation

- Required fields enforcement
- Character length limits (250 chars)
- Repetitive character detection
- Type-safe TypeScript throughout

## Tech Stack

| Technology   | Version | Purpose                 |
| ------------ | ------- | ----------------------- |
| React        | 19      | UI framework            |
| TypeScript   | 5.9     | Type safety             |
| Vite         | 8       | Build tool & dev server |
| Tailwind CSS | 4       | Styling                 |
| Vitest       | 4       | Testing framework       |
| ESLint       | 9       | Code linting            |

## Available Scripts

| Command                 | Description                              |
| ----------------------- | ---------------------------------------- |
| `npm run dev`           | Start development server with hot reload |
| `npm run build`         | Build for production                     |
| `npm run preview`       | Preview production build locally         |
| `npm run lint`          | Run ESLint for code quality              |
| `npm run lint:fix`      | Fix ESLint errors automatically          |
| `npm run test`          | Run tests in watch mode                  |
| `npm run test:run`      | Run tests once                           |
| `npm run test:coverage` | Run tests with coverage report           |
| `npm run test:ui`       | Open test UI dashboard                   |
| `npm run type-check`    | Run TypeScript type checking             |
