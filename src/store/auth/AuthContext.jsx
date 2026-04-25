import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { Users as seedUsers } from "../../mockdata/users";
import {
  clearSession,
  getSession,
  getUsers,
  saveSession,
  saveUsers,
  seedUsersIfEmpty,
} from "./authStorage";

const AuthContext = createContext(null);

function sanitizeUser(user) {
  // nunca persistir password en session
  const { password: _password, ...safe } = user;
  return safe;
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => {
    seedUsersIfEmpty(seedUsers);
    return getSession();
  });

  const user = session?.user ?? null;

  const login = useCallback(({ email, password }) => {
    const users = getUsers();
    const found = users.find((u) => u.email === email && u.password === password);
    if (!found) return { ok: false, error: "Credenciales inválidas" };

    const nextSession = { user: sanitizeUser(found), createdAt: Date.now() };
    saveSession(nextSession);
    setSession(nextSession);
    return { ok: true };
  }, []);

  const register = useCallback(({ name, email, password }) => {
    const users = getUsers();
    const exists = users.some((u) => u.email === email);
    if (exists) return { ok: false, error: "El email ya está registrado" };

    const nextUser = {
      id: crypto.randomUUID(),
      name,
      email,
      password,
    };
    const nextUsers = [nextUser, ...users];
    saveUsers(nextUsers);

    const nextSession = { user: sanitizeUser(nextUser), createdAt: Date.now() };
    saveSession(nextSession);
    setSession(nextSession);
    return { ok: true };
  }, []);

  const logout = useCallback(() => {
    clearSession();
    setSession(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      register,
      logout,
    }),
    [login, logout, register, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
}

