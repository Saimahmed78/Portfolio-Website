import { Link } from "react-router";

export function CtaButton({ to, children }) {
  return (
    <Link
      to={to}
      className="inline-block px-6 py-3 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-900 transition-colors"
    >
      {children}
    </Link>
  );
}
