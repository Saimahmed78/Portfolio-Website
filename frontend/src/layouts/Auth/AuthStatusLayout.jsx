import { Outlet } from "react-router";

export default function AuthStatusLayout() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#0f172a] p-5 font-inter animate-fadeIn">
      <Outlet />
    </div>
  );
}
