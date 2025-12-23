import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // ✅ Clear auth data
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // ✅ Redirect to login
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>CampusFix</div>

      <div style={styles.actions}>
        <span
          style={styles.link}
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </span>

        <button style={styles.logout} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    height: "60px",
    background: "#0b1d33",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 24px",
  },
  logo: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  actions: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  link: {
    cursor: "pointer",
  },
  logout: {
    background: "#ef4444",
    border: "none",
    color: "#fff",
    padding: "8px 14px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default Navbar;
