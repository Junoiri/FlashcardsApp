import { Navigate } from "react-router-dom";

/**
 * ProtectedRoute component restricts access to its children based on the user's authentication status and role.
 * It checks for a valid token in localStorage and compares the user's role with the required role.
 * If the user is not authenticated or does not have the required role, it redirects to the login page.
 *
 * @param {ReactNode} children - The child components to render if the user is authenticated and has the required role.
 * @param {string} role - The required role to access the protected route.
 * @returns {JSX.Element} The rendered child components or a redirect to the login page.
 */
export default function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const userRole = token ? "user" : null;

  /**
   * Checks if the user is authenticated and has the required role.
   * If not, redirects to the login page.
   *
   * @returns {JSX.Element} The rendered child components or a redirect to the login page.
   */
  if (!token || userRole !== role) {
    return <Navigate to="/auth/login" />;
  }

  return children;
}
