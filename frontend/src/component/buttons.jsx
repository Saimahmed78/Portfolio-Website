import { Link } from "react-router";
import "../styles/buttons.css";
export function CTAButton({ to, children }) {
  return (
    <Link to={to} className="cta-button">
      {children}
    </Link>
  );
}
