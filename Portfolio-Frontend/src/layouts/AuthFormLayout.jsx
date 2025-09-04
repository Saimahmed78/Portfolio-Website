import { Outlet } from "react-router";
import "./AuthShared.css";
import "./AuthLayout.css";

export default function AuthFormLayout({ title, subtitle, children }) {
  return (
    <div className="auth-container">
      {title && <h1 className="auth-title">{title}</h1>}
      {subtitle && <p className="auth-subtitle">{subtitle}</p>}
      {children}
    </div>
  );
}

