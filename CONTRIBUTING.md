# Contributing to HDUK Technical Test

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to this project.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Documentation](#documentation)
- [Questions?](#questions)

## Code of Conduct

Please be respectful and constructive in your interactions. We welcome contributions from everyone regardless of experience level.

## Getting Started

### 1. Fork the Repository

Click the "Fork" button at the top right of the repository page.

### 2. Clone Your Fork

```bash
git clone https://github.com/YOUR_USERNAME/hdruk-technical-test.git
cd hdruk-technical-test
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Create a Branch

```bash
git checkout -b feature/your-feature-name
```

## Development Workflow

### Running Applications

```bash
# Run all applications
npm run dev:all

# Run specific application
npm run dev:portal      # Portal (port 3000)
npm run dev:github      # GitHub Portfolio (port 3001)
npm run dev:form        # Product Feedback Form (port 5173)
```

### Before Committing

```bash
# Run all checks
npm run lint
npm run type-check
npm run test
npm run build --workspaces --if-present
```

## Pull Request Process

### 1. Create a PR

- Go to your fork on GitHub
- Click "New Pull Request"
- Select your branch and the main branch of this repo
- Fill out the PR template

### 2. PR Requirements

- [ ] Code passes all checks (lint, type-check, tests, build)
- [ ] Tests added/updated for new functionality
- [ ] Documentation updated
- [ ] No secrets or sensitive data committed
- [ ] Commit messages are clear and descriptive

### 3. Review Process

- Maintainers will review your PR
- Address any feedback
- Once approved, your PR will be merged

## Coding Standards

### TypeScript

- Use strict TypeScript (no `any` types)
- Define interfaces for complex objects
- Use meaningful variable and function names

```typescript
// ✅ Good
interface User {
  id: string;
  name: string;
}

function getUser(id: string): User | null {
  // implementation
}

// ❌ Avoid
function getUser(id: any): any {
  // implementation
}
```

### React

- Use functional components with hooks
- Keep components small and focused
- Use TypeScript for props

```typescript
// ✅ Good
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

function Button({ label, onClick, disabled = false }: ButtonProps) {
  return <button onClick={onClick} disabled={disabled}>{label}</button>;
}
```

### Styling

- Use Tailwind CSS utility classes
- Follow existing patterns
- Keep responsive design in mind

### Testing

- Write tests for new functionality
- Aim for meaningful coverage (not just 100%)
- Test edge cases

```typescript
describe('Button', () => {
  it('renders with label', () => {
    render(<Button label="Click me" onClick={() => {}} />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    render(<Button label="Click" onClick={onClick} />);
    fireEvent.click(screen.getByText('Click'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
```

## Testing

### Running Tests

```bash
# All tests
npm run test

# With coverage
npm run test:coverage

# Watch mode
npm run test:watch
```

### Writing Tests

- Use Vitest and React Testing Library
- Test behavior, not implementation
- Use meaningful test descriptions

## Documentation

### README Updates

Update README files when:
- Adding new features
- Changing configuration
- Adding dependencies
- Modifying APIs

### Code Comments

- Comment complex logic
- Explain "why" not "what"
- Keep comments up to date

## Security

### Important

- **Never commit secrets** (API keys, passwords, tokens)
- Use `.env.local` for sensitive data
- Add `.env.local` to `.gitignore` (already configured)

### Reporting Security Issues

See [SECURITY.md](SECURITY.md) for how to report vulnerabilities.

## Applications

### Portal (`apps/portal`)

Central dashboard for all applications.

**Adding a new app to the portal:**
1. Update `apps/portal/src/lib/apps-config.ts`
2. Add app details to the `apps` array
3. Test locally before submitting PR

### GitHub Portfolio (`apps/github-portfolio`)

GitHub repository browser.

**Key files:**
- `hooks/useGitHub.ts` - Data fetching
- `components/repository/` - UI components
- `app/api/github/repos/route.ts` - API route

### Product Feedback Form (`apps/product-feedback-form`)

Feedback collection form.

**Key files:**
- `src/components/ProductFeedbackForm/` - Form components
- `src/utils/formValidation.ts` - Validation logic
- `src/utils/sanitize.ts` - Input sanitization

## Questions?

- **General questions**: Open a GitHub Discussion
- **Bug reports**: Open a GitHub Issue
- **Security issues**: See [SECURITY.md](SECURITY.md)

## Thank You!

Your contributions make this project better for everyone. We appreciate your time and effort!
