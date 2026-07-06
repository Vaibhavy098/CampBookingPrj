const ROLE_CLAIM =
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";

export const decodeToken = (token) => {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
};

export const getTokenRole = (token) => {
  if (!token) return null;
  const decoded = decodeToken(token);
  return decoded?.[ROLE_CLAIM] || decoded?.role || null;
};

export const getTokenUserId = (token) => {
  if (!token) return null;
  return decodeToken(token)?.sub || null;
};

export const getTokenEmail = (token) => {
  if (!token) return null;
  return decodeToken(token)?.email || null;
};

export const isTokenExpired = (token) => {
  if (!token) return true;
  const decoded = decodeToken(token);
  if (!decoded?.exp) return true;
  return Date.now() >= decoded.exp * 1000;
};
