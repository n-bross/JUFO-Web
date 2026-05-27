export type UserRole = 'admin' | 'editor' | 'viewer';

const ROLE_STORAGE_KEY = 'jufo-user-role';

export function getStoredRole(): UserRole | null {
  if (typeof window === 'undefined') return null;
  const raw = window.localStorage.getItem(ROLE_STORAGE_KEY);
  if (raw === 'admin' || raw === 'editor' || raw === 'viewer') return raw;
  return null;
}

export function setStoredRole(role: UserRole) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(ROLE_STORAGE_KEY, role);
}

export function clearStoredRole() {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(ROLE_STORAGE_KEY);
}

export function hasAdminAccess(role: UserRole | null) {
  return role === 'admin';
}
