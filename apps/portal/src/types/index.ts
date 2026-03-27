/**
 * Application information interface
 */
export interface AppInfo {
  name: string;
  description: string;
  url: string;
  techStack: string[];
  icon: string;
}

/**
 * Application status type
 */
export type AppStatus = boolean | null;

/**
 * Status record mapping app names to their status
 */
export type AppStatuses = Record<string, AppStatus>;

/**
 * Status badge props
 */
export interface StatusBadgeProps {
  status: AppStatus;
}

/**
 * Launch button props
 */
export interface LaunchButtonProps {
  url: string;
  status: AppStatus;
  className?: string;
}

/**
 * Tech stack display props
 */
export interface TechStackProps {
  techStack: string[];
  className?: string;
}

/**
 * App row props
 */
export interface AppRowProps {
  app: AppInfo;
  status: AppStatus;
}

/**
 * Header props
 */
export interface HeaderProps {
  onlineCount: number;
  totalCount: number;
  currentTime: Date;
}

/**
 * Summary card props
 */
export interface SummaryCardProps {
  onlineCount: number;
  totalCount: number;
}
