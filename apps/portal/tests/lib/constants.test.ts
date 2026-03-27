import { describe, expect, it } from 'vitest';
import { STATUS_CHECK_TIMEOUT_MS, STATUS_CHECK_INTERVAL_MS, STATUS_MESSAGES, STATUS_LABELS } from '@/lib/constants';

describe('constants', () => {
  describe('STATUS_CHECK_TIMEOUT_MS', () => {
    it('should be 3000ms', () => {
      expect(STATUS_CHECK_TIMEOUT_MS).toBe(3000);
    });
  });

  describe('STATUS_CHECK_INTERVAL_MS', () => {
    it('should be 30000ms', () => {
      expect(STATUS_CHECK_INTERVAL_MS).toBe(30000);
    });
  });

  describe('STATUS_MESSAGES', () => {
    it('should have CHECKING message', () => {
      expect(STATUS_MESSAGES.CHECKING).toBe('Checking');
    });

    it('should have ONLINE message', () => {
      expect(STATUS_MESSAGES.ONLINE).toBe('Online');
    });

    it('should have OFFLINE message', () => {
      expect(STATUS_MESSAGES.OFFLINE).toBe('Offline');
    });

    it('should have ALL_OPERATIONAL message', () => {
      expect(STATUS_MESSAGES.ALL_OPERATIONAL).toBe('All systems operational');
    });

    it('should have SYSTEMS_OFFLINE function', () => {
      expect(STATUS_MESSAGES.SYSTEMS_OFFLINE(1)).toBe('1 system(s) offline');
      expect(STATUS_MESSAGES.SYSTEMS_OFFLINE(2)).toBe('2 system(s) offline');
    });
  });

  describe('STATUS_LABELS', () => {
    it('should have ONLINE label', () => {
      expect(STATUS_LABELS.ONLINE).toBe('Applications Online');
    });

    it('should have SYSTEM_STATUS label', () => {
      expect(STATUS_LABELS.SYSTEM_STATUS).toBe('System Status');
    });
  });
});
