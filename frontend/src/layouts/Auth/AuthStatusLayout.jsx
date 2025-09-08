import { Outlet } from "react-router"; // make sure to use react-router-dom

export default function AuthStatusLayout() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#0f172a] p-5 font-inter animate-fadeIn">
      <div className="bg-[#1e293b] rounded-2xl shadow-xl flex flex-col gap-4 relative overflow-hidden w-full max-w-md p-8 text-center animate-fadeInSm">
        <Outlet />
      </div>
    </div>
  );
}
