import { describe, expect, it, vi, beforeEach } from 'vitest';

describe('apps-config', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it('should export apps array', async () => {
    const { apps } = await import('@/lib/apps-config');
    expect(Array.isArray(apps)).toBe(true);
    expect(apps.length).toBe(2);
  });

  it('should have GitHub Portfolio app', async () => {
    const { apps } = await import('@/lib/apps-config');
    const githubApp = apps.find((app) => app.name === 'GitHub Portfolio');
    expect(githubApp).toBeDefined();
    expect(githubApp?.description).toContain('GitHub');
    expect(githubApp?.techStack).toContain('Next.js');
    expect(githubApp?.icon).toBe('github');
  });

  it('should have Product Feedback app', async () => {
    const { apps } = await import('@/lib/apps-config');
    const feedbackApp = apps.find((app) => app.name === 'Product Feedback');
    expect(feedbackApp).toBeDefined();
    expect(feedbackApp?.description).toContain('Feedback');
    expect(feedbackApp?.techStack).toContain('Vite');
    expect(feedbackApp?.icon).toBe('feedback');
  });

  it('should have valid URLs for all apps', async () => {
    const { apps } = await import('@/lib/apps-config');
    apps.forEach((app) => {
      expect(app.url).toBeDefined();
      expect(typeof app.url).toBe('string');
      expect(app.url.length).toBeGreaterThan(0);
    });
  });

  it('should have valid techStack for all apps', async () => {
    const { apps } = await import('@/lib/apps-config');
    apps.forEach((app) => {
      expect(Array.isArray(app.techStack)).toBe(true);
      expect(app.techStack.length).toBeGreaterThan(0);
    });
  });

  it('should use environment variable URL when set', async () => {
    // Set environment variable before importing
    process.env.NEXT_PUBLIC_GITHUBPORTFOLIO_URL = 'https://custom-url.com';
    process.env.NODE_ENV = 'development';

    const { apps } = await import('@/lib/apps-config');
    const githubApp = apps.find((app) => app.name === 'GitHub Portfolio');

    expect(githubApp?.url).toBe('https://custom-url.com');

    // Clean up
    delete process.env.NEXT_PUBLIC_GITHUBPORTFOLIO_URL;
    delete process.env.NODE_ENV;
  });

  it('should use production URLs in production environment', async () => {
    // Set NODE_ENV to production
    process.env.NODE_ENV = 'production';

    const { apps } = await import('@/lib/apps-config');
    const githubApp = apps.find((app) => app.name === 'GitHub Portfolio');
    const feedbackApp = apps.find((app) => app.name === 'Product Feedback');

    expect(githubApp?.url).toBe('https://hdruk-technical-test-github-portfol.vercel.app/');
    expect(feedbackApp?.url).toBe('https://hdruk-technical-test-product-feedba.vercel.app/');

    // Clean up
    delete process.env.NODE_ENV;
  });

  it('should use development URLs in development environment', async () => {
    // Set NODE_ENV to development
    process.env.NODE_ENV = 'development';

    const { apps } = await import('@/lib/apps-config');
    const githubApp = apps.find((app) => app.name === 'GitHub Portfolio');
    const feedbackApp = apps.find((app) => app.name === 'Product Feedback');

    expect(githubApp?.url).toBe('http://localhost:3001');
    expect(feedbackApp?.url).toBe('http://localhost:3002');

    // Clean up
    delete process.env.NODE_ENV;
  });
});
