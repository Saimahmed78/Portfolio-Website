// src/components/ErrorBoundary.jsx

const ErrorBoundary = () => {

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>💥 Something went wrong</h1>
      <p>{ "An unexpected error occurred."}</p>
    </div>
  );
};

export default ErrorBoundary;
