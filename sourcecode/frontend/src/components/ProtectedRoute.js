import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const userRole = token ? "user" : null;

  if (!token || userRole !== role) {
    return <Navigate to="/login" />;
  }

  return children;
}
