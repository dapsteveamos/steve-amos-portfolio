import { Navigate } from "react-router-dom";

function ProtectedRoute({ user, children }) {
  const adminEmail = "dapsteveamos@gmail.com";

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  if (user.email !== adminEmail) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;