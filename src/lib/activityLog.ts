import { ActivityLogEntry, UserRole } from '../types';

export function logActivity(user: string, role: UserRole, action: string, details: string): void {
  try {
    const entry: ActivityLogEntry = {
      id: 'log_' + Date.now(),
      timestamp: new Date().toISOString(),
      user,
      role,
      action,
      details
    };

    const existing: ActivityLogEntry[] = JSON.parse(localStorage.getItem('ik_activity_logs') || '[]');
    const updated = [entry, ...existing].slice(0, 200); // Keep last 200 logs
    localStorage.setItem('ik_activity_logs', JSON.stringify(updated));
  } catch (e) {
    console.warn('Activity logging error:', e);
  }
}

export function getActivityLogs(): ActivityLogEntry[] {
  try {
    const logs = JSON.parse(localStorage.getItem('ik_activity_logs') || '[]');
    if (logs.length === 0) {
      return [
        {
          id: 'log_init',
          timestamp: new Date().toISOString(),
          user: 'Imam Khan',
          role: 'admin',
          action: 'System Initialized',
          details: 'Admin Dashboard and Activity Logging enabled.'
        }
      ];
    }
    return logs;
  } catch {
    return [];
  }
}
