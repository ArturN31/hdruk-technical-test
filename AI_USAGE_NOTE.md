# AI Usage Note

AI was used throughout this project for:

1. architectural scaffolding with hook/container/presentational patterns,
2. generating typed UI components and test fixtures, and
3. creating documentation and deployment guides.

Effective prompts were highly constrained with explicit acceptance criteria and verification commands (`lint`, `test`, `build`).
AI implemented production features including:

- rate limiting (10 req/min per IP), security headers, Zod validation, XSS sanitization, and comprehensive error boundaries.
- the test suite (237 tests, 68%+ coverage) was AI-assisted, focusing on business logic and critical user workflows.
- security measures include gitignored environment variables, input validation, rate limiting, and comprehensive security headers on all Next.js applications.

All AI-generated code was reviewed, tested, and validated against security requirements before deployment.

Three applications were deployed: Portal (Next.js), GitHub Portfolio (Next.js with API routes), and Product Feedback Form (handcoded using Vite + React static).

Notable corrections included:

- switching from strict schema parsing to `.passthrough()` for GitHub API payloads to prevent 502 errors,
- implementing sliding window rate limiting instead of fixed window for better burst handling,
- and replacing implicit sorting assumptions with explicit user controls.

This project demonstrates responsible AI-assisted development with human oversight at every stage.
