# Deployment Checklist

Use this checklist before deploying to production.

## ✅ Pre-Deployment Verification

### 1. Code Quality

```bash
# From monorepo root
npm install
npm run lint
npm run type-check
npm run test
npm run build --workspaces --if-present
```

**Expected Results:**
- [ ] Lint: 0 errors (warnings OK)
- [ ] Type Check: Pass
- [ ] Tests: All passing (237 tests)
- [ ] Build: All workspaces build successfully

### 2. Environment Variables

#### Portal (`apps/portal/.env.local`)
- [ ] `NEXT_PUBLIC_APP_URL` set to production URL

#### GitHub Portfolio (`apps/github-portfolio/.env.local`)
- [ ] `RATE_LIMIT_WINDOW_MS` configured
- [ ] `RATE_LIMIT_MAX_REQUESTS` configured
- [ ] `GITHUB_API_TOKEN` (optional, for higher rate limits)

#### Product Feedback Form
- [ ] No environment variables required

### 3. Security Review

- [ ] No hardcoded secrets in code
- [ ] `.env` files in `.gitignore`
- [ ] Security headers configured (all Next.js apps)
- [ ] Rate limiting enabled (github-portfolio)
- [ ] Input validation in place (all apps)
- [ ] XSS protection enabled (product-feedback-form)

### 4. Performance

- [ ] Bundle sizes optimized
- [ ] Images optimized (if any)
- [ ] No console.log in production code
- [ ] Tree-shaking enabled

### 5. Accessibility

- [ ] ARIA labels on interactive elements
- [ ] Keyboard navigation works
- [ ] Color contrast meets WCAG standards
- [ ] Screen reader testing completed

## 🚀 Deployment Steps

### Vercel

1. **Connect Repository**
   - [ ] Import GitHub repository to Vercel
   - [ ] Select monorepo root

2. **Configure Projects**

   **Portal:**
   - [ ] Root Directory: `apps/portal`
   - [ ] Build Command: `npm run build`
   - [ ] Output Directory: `.next`
   - [ ] Environment Variables:
     - `NEXT_PUBLIC_APP_URL=https://your-domain.com`

   **GitHub Portfolio:**
   - [ ] Root Directory: `apps/github-portfolio`
   - [ ] Build Command: `npm run build`
   - [ ] Output Directory: `.next`
   - [ ] Environment Variables:
     - `RATE_LIMIT_WINDOW_MS=60000`
     - `RATE_LIMIT_MAX_REQUESTS=10`
     - `GITHUB_API_TOKEN` (optional)

   **Product Feedback Form:**
   - [ ] Root Directory: `apps/product-feedback-form`
   - [ ] Build Command: `npm run build`
   - [ ] Output Directory: `dist`

3. **Deploy**
   - [ ] Deploy each project
   - [ ] Verify deployment URLs
   - [ ] Test all functionality

### Docker

1. **Build Images**
   ```bash
   # Portal
   docker build -f apps/portal/Dockerfile -t portal:latest .
   
   # GitHub Portfolio
   docker build -f apps/github-portfolio/Dockerfile -t github-portfolio:latest .
   
   # Product Feedback Form
   docker build -f apps/product-feedback-form/Dockerfile -t feedback-form:latest .
   ```

2. **Test Locally**
   ```bash
   docker run -p 3000:3000 portal:latest
   docker run -p 3001:3001 github-portfolio:latest
   docker run -p 80:80 feedback-form:latest
   ```

3. **Push to Registry**
   ```bash
   docker tag portal:latest your-registry/portal:latest
   docker push your-registry/portal:latest
   ```

### Static Hosting (Product Feedback Form)

1. **Build**
   ```bash
   npm run build -w product-feedback-form
   ```

2. **Deploy to Netlify**
   - [ ] Connect repository
   - [ ] Build command: `npm run build -w product-feedback-form`
   - [ ] Publish directory: `apps/product-feedback-form/dist`

3. **Deploy to AWS S3**
   ```bash
   aws s3 sync apps/product-feedback-form/dist s3://your-bucket
   aws cloudfront create-invalidation --distribution-id YOUR_ID --paths "/*"
   ```

## 🧪 Post-Deployment Testing

### Functional Testing

- [ ] Portal loads and shows all apps
- [ ] GitHub Portfolio fetches repositories
- [ ] GitHub Portfolio filters work
- [ ] GitHub Portfolio search works
- [ ] Product Feedback Form validates input
- [ ] Product Feedback Form submits successfully

### Performance Testing

- [ ] Page load time < 3 seconds
- [ ] Time to interactive < 5 seconds
- [ ] No console errors
- [ ] No 404 errors in network tab

### Security Testing

- [ ] Security headers present
- [ ] Rate limiting works (github-portfolio)
- [ ] XSS attempts blocked (feedback-form)
- [ ] No sensitive data exposed

### Accessibility Testing

- [ ] Keyboard navigation works
- [ ] Screen reader announces content correctly
- [ ] Focus indicators visible
- [ ] Color contrast adequate

## 📊 Monitoring Setup

### Recommended Tools

1. **Error Tracking**
   - [ ] Sentry
   - [ ] LogRocket

2. **Performance Monitoring**
   - [ ] Vercel Analytics
   - [ ] Google Lighthouse

3. **Uptime Monitoring**
   - [ ] UptimeRobot
   - [ ] Pingdom

### Environment-Specific Checks

#### Production
- [ ] Error tracking enabled
- [ ] Analytics configured
- [ ] Rate limits appropriate for traffic
- [ ] SSL certificates valid

#### Staging
- [ ] Mirrors production configuration
- [ ] Test data only
- [ ] Access restricted

## 🔄 Rollback Plan

1. **Vercel**
   - Go to Deployments
   - Click on previous successful deployment
   - Click "Promote to Production"

2. **Docker**
   ```bash
   docker pull your-registry/portal:previous-tag
   docker stop portal
   docker run -d --name portal your-registry/portal:previous-tag
   ```

3. **Static Hosting**
   ```bash
   # Re-deploy previous build
   git checkout <previous-commit>
   npm run build -w product-feedback-form
   aws s3 sync dist/ s3://your-bucket
   ```

## 📝 Deployment Log

| Date | Version | Deployed By | Status | Notes |
|------|---------|-------------|--------|-------|
|      |         |             |        |       |

## 🆘 Emergency Contacts

- **Technical Lead:** [Name] - [Contact]
- **DevOps:** [Name] - [Contact]
- **On-Call:** [Name] - [Contact]

## 📚 Additional Resources

- [Vercel Deployment Guide](https://vercel.com/docs/deployments)
- [Docker Best Practices](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)
- [Next.js Production Checklist](https://nextjs.org/docs/deployment)
