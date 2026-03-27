export interface AppInfo {
  name: string;
  description: string;
  url: string;
  techStack: string[];
  icon: string;
}

export const apps: AppInfo[] = [
  {
    name: "GitHub Portfolio",
    description: "Enterprise GitHub repository dashboard with advanced search and filtering.",
    url: "http://localhost:3001",
    techStack: ["Next.js", "React", "Tailwind", "TypeScript"],
    icon: "github",
  },
  {
    name: "Product Feedback",
    description: "Feedback collection system with star ratings and accessibility features.",
    url: "http://localhost:3002",
    techStack: ["Vite", "React", "Tailwind", "TypeScript"],
    icon: "feedback",
  },
];
