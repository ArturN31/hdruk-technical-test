# Security Policy

## Reporting a Vulnerability

We take the security of our projects seriously. If you discover a security vulnerability, please report it to us privately.

### How to Report

**Please do NOT report security vulnerabilities through public GitHub issues.**

Instead, please report them via:
- **GitHub Security Advisories**: Use the "Report a vulnerability" feature in the Security tab
- **Email**: [Your email here]

### What to Include

Please include as much information as possible:
- Description of the vulnerability
- Steps to reproduce
- Affected versions
- Potential impact
- Suggested fix (if any)

### Response Time

We will acknowledge receipt of your report within 48 hours and provide updates at least every 5 business days.

### Security Measures

This project implements several security measures:

1. **Environment Variables**: All sensitive configuration is stored in `.env` files (gitignored)
2. **Rate Limiting**: API routes are rate-limited to prevent abuse
3. **Input Validation**: All user input is validated and sanitized
4. **Security Headers**: HTTP security headers are configured
5. **XSS Protection**: User input is sanitized to prevent XSS attacks
6. **No Secrets in Code**: API keys and tokens are never committed

### Best Practices for Contributors

When contributing to this project:

1. **Never commit secrets**: Use environment variables for sensitive data
2. **Validate all input**: Use Zod schemas for validation
3. **Sanitize user content**: Use the provided sanitization utilities
4. **Follow TypeScript strict mode**: Don't use `any` types
5. **Write tests**: Ensure your code is tested
6. **Update dependencies**: Keep dependencies up to date

### Known Security Considerations

#### GitHub Portfolio App

- Uses unauthenticated GitHub API requests (60 requests/hour limit)
- Rate limiting is implemented server-side (10 requests/minute per IP)
- No API keys are required for basic functionality
- Optional: Add `GITHUB_API_TOKEN` for higher rate limits (store in `.env.local`)

#### Product Feedback Form

- All input is sanitized to prevent XSS
- No backend - form data handling is client-side only
- No sensitive data is stored

#### Portal

- Static application with no user input
- No authentication required
- No sensitive data handled

### Security Updates

Security patches will be released as soon as possible after a vulnerability is confirmed. Updates will be announced via:
- GitHub Releases
- Security Advisories

### Security Tools

We use the following security tools:
- ESLint for code quality
- TypeScript for type safety
- Dependabot for dependency updates
- GitHub Security Scanning

Thank you for helping keep this project secure!
