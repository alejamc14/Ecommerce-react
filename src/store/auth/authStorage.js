import { getJson, removeKey, setJson } from "../storage";

const USERS_KEY = "users";
const SESSION_KEY = "session";

export function seedUsersIfEmpty(seedUsers) {
  const existing = getJson(USERS_KEY, null);
  if (Array.isArray(existing) && existing.length > 0) return;
  setJson(USERS_KEY, seedUsers);
}

export function getUsers() {
  return getJson(USERS_KEY, []);
}

export function saveUsers(users) {
  setJson(USERS_KEY, users);
}

export function getSession() {
  return getJson(SESSION_KEY, null);
}

export function saveSession(session) {
  setJson(SESSION_KEY, session);
}

export function clearSession() {
  removeKey(SESSION_KEY);
}

