import { Link } from "react-router";
import styles from "./Button.module.css";

export function CtaButton({ to, children }) {
  return (
    <Link to={to} className={styles["cta-button"]}>
      {children}
    </Link>
  );
}
