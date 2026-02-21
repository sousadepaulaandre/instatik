import { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

// OAuth removed - authentication will be implemented later
export const getLoginUrl = () => {
  // For now, redirect to dashboard directly
  return "/dashboard";
};

export { COOKIE_NAME, ONE_YEAR_MS };
