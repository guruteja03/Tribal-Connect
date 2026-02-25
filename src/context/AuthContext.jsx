import { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);
const AUTH_KEY = 'tribalcraft_user';
const USERS_KEY = 'tribalcraft_admin_users';

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
    try {
      return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    } catch {
      return [];
    }
  };

  const persistUserRecord = (record) => {
    const existing = getStoredUsers();
    const withoutCurrent = existing.filter((item) => String(item.email).toLowerCase() !== String(record.email).toLowerCase());
    localStorage.setItem(USERS_KEY, JSON.stringify([{ ...record }, ...withoutCurrent]));
  };

  const login = ({ email, password, role }) => {
    const users = getStoredUsers();
    const matchedUser = users.find(
      (item) =>
        String(item.email).toLowerCase() === String(email).toLowerCase()
        && item.password === password
        && item.role === role
    );

    if (!matchedUser) return null;

    const loggedInUser = {
      id: matchedUser.id || Date.now(),
      name: matchedUser.name || String(email).split('@')[0],
      email: matchedUser.email,
      role: matchedUser.role,
    };
    localStorage.setItem(AUTH_KEY, JSON.stringify(loggedInUser));
    setUser(loggedInUser);
    return loggedInUser;
  };

  const register = ({ name, email, password, role }) => {
    const existingUsers = getStoredUsers();
    const emailTaken = existingUsers.some(
      (item) => String(item.email).toLowerCase() === String(email).toLowerCase()
    );

    if (emailTaken) {
      return { ok: false, error: 'An account with this email already exists.' };
    }

    const saved = { id: Date.now(), name, email, password, role };
    localStorage.setItem('tribalcraft_registered_user', JSON.stringify(saved));
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
