import sharedStyles from "./AuthShared.module.css";

export default function AuthFormLayout({ title, subtitle, children }) {
  return (
    <div className={sharedStyles["auth-container"]}>
      {title && <h1 className={sharedStyles["auth-title"]}>{title}</h1>}
      {subtitle && <p className={sharedStyles["auth-subtitle"]}>{subtitle}</p>}
      {children}
    </div>
  );
}
