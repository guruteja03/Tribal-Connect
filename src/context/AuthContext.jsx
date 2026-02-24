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

  const persistUserRecord = (record) => {
    const existing = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    const withoutCurrent = existing.filter((item) => item.email !== record.email);
    localStorage.setItem(USERS_KEY, JSON.stringify([{ ...record }, ...withoutCurrent]));
  };

  // Stores the logged in user with selected role in localStorage.
  const login = ({ email, role, name }) => {
    const loggedInUser = {
      id: Date.now(),
      name: name || email.split('@')[0],
      email,
      role,
    };
    localStorage.setItem(AUTH_KEY, JSON.stringify(loggedInUser));
    persistUserRecord(loggedInUser);
    setUser(loggedInUser);
    return loggedInUser;
  };

  const register = ({ name, email, role }) => {
    const saved = { id: Date.now(), name, email, role };
    localStorage.setItem('tribalcraft_registered_user', JSON.stringify(saved));
    persistUserRecord(saved);
    return true;
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
