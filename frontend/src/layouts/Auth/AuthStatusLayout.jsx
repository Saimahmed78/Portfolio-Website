import { Outlet } from "react-router";
import "./AuthShared.module.css";
import "./AuthStatusLayout.module.css";
export default function AuthStatusLayout() {
  return (
    <div className={styles["auth-container"]}>
      <div className={styles["auth-card"]}>
        <Outlet />
      </div>
    </div>
  );
}
