export interface AppInfo {
  name: string;
  description: string;
  url: string;
  techStack: string[];
  icon: string;
}

// Environment-aware URL configuration
const isDevelopment = process.env.NODE_ENV === "development";

// Production URLs (Vercel deployments)
const PRODUCTION_URLS = {
  githubPortfolio: "https://hdruk-technical-test-github-portfol.vercel.app/",
  productFeedback: "https://hdruk-technical-test-product-feedba.vercel.app/",
} as const;

// Development URLs (localhost) - from root package.json scripts
const DEVELOPMENT_URLS = {
  githubPortfolio: "http://localhost:3001",
  productFeedback: "http://localhost:3002",
} as const;

// Select URLs based on environment
const getAppUrl = (app: "githubPortfolio" | "productFeedback") => {
  // Allow overriding via environment variables
  const envVar = `NEXT_PUBLIC_${app.toUpperCase()}_URL`;
  const envUrl = process.env[envVar];
  
  if (envUrl) return envUrl;
  return isDevelopment ? DEVELOPMENT_URLS[app] : PRODUCTION_URLS[app];
};

export const apps: AppInfo[] = [
  {
    name: "GitHub Portfolio",
    description: "Enterprise GitHub repository dashboard with advanced search and filtering.",
    url: getAppUrl("githubPortfolio"),
    techStack: ["Next.js", "React", "Tailwind", "TypeScript"],
    icon: "github",
  },
  {
    name: "Product Feedback",
    description: "Feedback collection system with star ratings and accessibility features.",
    url: getAppUrl("productFeedback"),
    techStack: ["Vite", "React", "Tailwind", "TypeScript"],
    icon: "feedback",
  },
];
