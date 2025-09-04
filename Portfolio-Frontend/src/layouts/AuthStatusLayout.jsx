import { Outlet } from "react-router";
import "./AuthShared.css";
import "./StatusLayout.css";
export default function AuthStatusLayout() {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <Outlet />
      </div>
    </div>
  );
}
