const OpenInboxButton = ({ email }) => {
  const domain = email.split("@")[1];
  let link = null;

  if (domain === "gmail.com") link = "https://mail.google.com";
  else if (domain === "yahoo.com") link = "https://mail.yahoo.com";
  else if (domain === "outlook.com" || domain === "hotmail.com")
    link = "https://outlook.live.com";
  else link = null;

  return (
    <div>
      {link ? (
        <button
          style={{
            margin: "20px 0",
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#3b82f6",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#e0e8f3ff",
              fontWeight: "bold",
            }}
          >
            Open {domain.split(".")[0].toUpperCase()}
          </a>
        </button>
      ) : (
        <p className="text-gray-500">Open your email inbox to confirm.</p>
      )}
    </div>
  );
};

export default OpenInboxButton;

// usage
