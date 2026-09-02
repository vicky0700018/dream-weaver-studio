import { useCallback, useEffect, useState } from "react";

import { ADMIN_CREDENTIALS } from "@/data/settings";

const AUTH_KEY = "dfe_admin_auth";

export function useAdminAuth() {
  const [checked, setChecked] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    try {
      setIsAuthed(window.localStorage.getItem(AUTH_KEY) === "true");
    } catch {
      /* ignore */
    }
    setChecked(true);
  }, []);

  const login = useCallback((email: string, password: string) => {
    const ok =
      email.trim().toLowerCase() === ADMIN_CREDENTIALS.email &&
      password === ADMIN_CREDENTIALS.password;
    if (ok) {
      window.localStorage.setItem(AUTH_KEY, "true");
      setIsAuthed(true);
    }
    return ok;
  }, []);

  const logout = useCallback(() => {
    window.localStorage.removeItem(AUTH_KEY);
    setIsAuthed(false);
  }, []);

  return { checked, isAuthed, login, logout };
}
