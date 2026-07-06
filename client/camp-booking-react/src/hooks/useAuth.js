import { useSelector } from "react-redux";

export function useAuth() {
  const { token, userId, email, role, isAuthenticated } = useSelector(
    (state) => state.auth,
  );

  return {
    token,
    userId,
    email,
    role,
    isAuthenticated,
    isAdmin: role === "Admin",
    isUser: role === "User",
  };
}
