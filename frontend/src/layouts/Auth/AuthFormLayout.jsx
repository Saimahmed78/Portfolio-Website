export default function AuthFormLayout({ title, subtitle, children }) {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[var(--bg-void)] p-5 font-inter animate-fadeIn">
      {title && (
        <h1 className="text-3xl font-bold text-[var(--accent-primary)] text-center mb-2 sm:text-2xl">
          {title}
        </h1>
      )}
      {subtitle && (
        <p className="text-lg text-[var(--text-secondary)] text-center mb-6 sm:text-base">
          {subtitle}
        </p>
      )}
      {children}
    </div>
  );
}
