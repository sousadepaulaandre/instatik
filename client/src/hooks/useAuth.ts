import { useCallback, useMemo } from "react";

type UseAuthOptions = {
  redirectOnUnauthenticated?: boolean;
  redirectPath?: string;
};

// Simplified auth hook - authentication will be implemented later
// For now, everyone is considered authenticated
export function useAuth(options?: UseAuthOptions) {
  // Mock user data
  const mockUser = {
    id: "demo-user",
    name: "Demo User",
    email: "demo@instatik.com.br",
  };

  const logout = useCallback(async () => {
    // Logout will be implemented later
    console.log("Logout functionality coming soon");
  }, []);

  const state = useMemo(() => {
    localStorage.setItem(
      "manus-runtime-user-info",
      JSON.stringify(mockUser),
    );
    return {
      user: mockUser,
      loading: false,
      error: null,
      isAuthenticated: true, // Always authenticated for now
    };
  }, []);

  return {
    ...state,
    refresh: () => Promise.resolve(),
    logout,
  };
}
