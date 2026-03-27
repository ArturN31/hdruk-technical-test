/**
 * Status check timeout in milliseconds.
 * How long to wait before aborting a status check request.
 */
export const STATUS_CHECK_TIMEOUT_MS = 3000;

/**
 * Status check interval in milliseconds.
 * How often to re-check the status of applications.
 */
export const STATUS_CHECK_INTERVAL_MS = 30000;

/**
 * Status messages
 */
export const STATUS_MESSAGES = {
  CHECKING: 'Checking',
  ONLINE: 'Online',
  OFFLINE: 'Offline',
  ALL_OPERATIONAL: 'All systems operational',
  SYSTEMS_OFFLINE: (count: number) => `${count} system(s) offline`,
} as const;

/**
 * Status labels for display
 */
export const STATUS_LABELS = {
  ONLINE: 'Applications Online',
  SYSTEM_STATUS: 'System Status',
} as const;
