import { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);
const AUTH_KEY = 'tribalcraft_user';
const USERS_KEY = 'tribalcraft_admin_users';
const LEGACY_USER_KEY = 'tribalcraft_registered_user';

const normalizeEmail = (value) => String(value || '').trim().toLowerCase();
const normalizeRole = (value) => String(value || 'customer').trim().toLowerCase();
const normalizePassword = (value) => String(value || '').trim();

const toRecords = (value) => {
  if (Array.isArray(value)) return value;
  if (value && typeof value === 'object') return Object.values(value);
  return [];
};

const normalizeUserRecord = (item) => ({
  id: item?.id || null,
  name: String(item?.name || '').trim(),
  email: String(item?.email || '').trim(),
  password: normalizePassword(item?.password),
  role: normalizeRole(item?.role),
});

const pickBetterRecord = (current, incoming) => {
  if (!current) return incoming;
  const currentScore = Number(Boolean(current.password)) + Number(Boolean(current.name));
  const incomingScore = Number(Boolean(incoming.password)) + Number(Boolean(incoming.name));
  return incomingScore > currentScore ? { ...current, ...incoming } : { ...incoming, ...current };
};

const getStoredUser = () => {
  const raw = localStorage.getItem(AUTH_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser());

  const getStoredUsers = () => {
    let primaryUsers = [];
    try {
      const parsed = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
      primaryUsers = toRecords(parsed);
    } catch {
      primaryUsers = [];
    }

    let legacyUsers = [];
    try {
      const legacy = JSON.parse(localStorage.getItem(LEGACY_USER_KEY) || 'null');
      legacyUsers = toRecords(legacy);
    } catch {
      legacyUsers = [];
    }

    const byEmail = new Map();
    [...primaryUsers, ...legacyUsers].forEach((item) => {
      const normalized = normalizeUserRecord(item);
      const key = normalizeEmail(normalized.email);
      if (!key) return;
      const current = byEmail.get(key);
      byEmail.set(key, pickBetterRecord(current, normalized));
    });
    const users = Array.from(byEmail.values());
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    return users;
  };

  const persistUserRecord = (record) => {
    const existing = getStoredUsers();
    const withoutCurrent = existing.filter((item) => normalizeEmail(item.email) !== normalizeEmail(record.email));
    const normalized = {
      ...record,
      email: String(record.email || '').trim(),
      password: normalizePassword(record.password),
      role: normalizeRole(record.role),
    };
    localStorage.setItem(USERS_KEY, JSON.stringify([normalized, ...withoutCurrent]));
    localStorage.setItem(LEGACY_USER_KEY, JSON.stringify(normalized));
  };

  const login = ({ email, password, role }) => {
    const users = getStoredUsers();
    const emailKey = normalizeEmail(email);
    const passwordKey = normalizePassword(password);
    const roleKey = normalizeRole(role);

    const exactMatch = users.find(
      (item) =>
        normalizeEmail(item.email) === emailKey
        && String(item.password || '') === passwordKey
        && String(item.role || '').trim().toLowerCase() === roleKey
    );
    const matchedUser =
      exactMatch
      || users.find(
        (item) => normalizeEmail(item.email) === emailKey && String(item.password || '') === passwordKey
      );

    if (!matchedUser) return null;

    const loggedInUser = {
      id: matchedUser.id || Date.now(),
      name: matchedUser.name || String(email).split('@')[0],
      email: matchedUser.email,
      role: normalizeRole(matchedUser.role),
    };
    localStorage.setItem(AUTH_KEY, JSON.stringify(loggedInUser));
    setUser(loggedInUser);
    return loggedInUser;
  };

  const register = ({ name, email, password, role }) => {
    const existingUsers = getStoredUsers();
    const emailTaken = existingUsers.some(
      (item) => normalizeEmail(item.email) === normalizeEmail(email)
    );

    if (emailTaken) {
      return { ok: false, code: 'EMAIL_EXISTS', error: 'This email is already registered. Please login.' };
    }

    const saved = {
      id: Date.now(),
      name: String(name || '').trim(),
      email: String(email || '').trim(),
      password: normalizePassword(password),
      role: normalizeRole(role),
    };
    localStorage.setItem(LEGACY_USER_KEY, JSON.stringify(saved));
    persistUserRecord(saved);
    return { ok: true };
  };

  const logout = () => {
    localStorage.removeItem(AUTH_KEY);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      register,
      logout,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
}
