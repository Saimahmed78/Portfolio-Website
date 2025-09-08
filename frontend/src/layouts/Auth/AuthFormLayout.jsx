export default function AuthFormLayout({ title, subtitle, children }) {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#0f172a] p-5 font-inter animate-fadeIn">
      {title && (
        <h1 className="text-3xl font-bold text-blue-500 text-center mb-2 sm:text-2xl">
          {title}
        </h1>
      )}
      {subtitle && (
        <p className="text-lg text-slate-300 text-center mb-6 sm:text-base">
          {subtitle}
        </p>
      )}
      {children}
    </div>
  );
}
