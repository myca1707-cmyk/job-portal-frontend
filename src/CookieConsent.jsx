import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "#1a1a1a",
        color: "#fff",
        padding: "1rem 1.5rem",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
        zIndex: 9999,
        boxShadow: "0 -2px 10px rgba(0,0,0,0.3)",
      }}
    >
      <p style={{ margin: 0, fontSize: "0.9rem", flex: "1 1 300px" }}>
        We use cookies to improve your experience on our site. By continuing to browse, you agree to our use of cookies. Read our{" "}
        <Link to="/privacy-policy" style={{ color: "#fff", textDecoration: "underline" }}>
          Privacy Policy
        </Link>{" "}
        to learn more.
      </p>
      <div style={{ display: "flex", gap: "0.75rem", flexShrink: 0 }}>
        <button
          onClick={handleDecline}
          style={{
            padding: "0.5rem 1rem",
            background: "transparent",
            border: "1px solid #fff",
            color: "#fff",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Decline
        </button>
        <button
          onClick={handleAccept}
          className="btn-primary"
          style={{ padding: "0.5rem 1rem", borderRadius: "4px", cursor: "pointer" }}
        >
          Accept
        </button>
      </div>
    </div>
  );
}

export default CookieConsent;