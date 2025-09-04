import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../images/argano-logo.png";

export default function Dashboard() {
  const navigate = useNavigate();
  const [empIdArgano, setEmpIdArgano] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [designation, setDesignation] = useState("");
  const [joinDate, setJoinDate] = useState("");
  const [lastWorkingDay, setLastWorkingDay] = useState("");
  const today = new Date().toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });

  useEffect(() => {
    // Preserve existing flow: treat presence of loggedInEmpId as session
    const legacyEmpId = localStorage.getItem("loggedInEmpId");
    const empIdArg = localStorage.getItem("empIdArgano") || "";
    const firstName = localStorage.getItem("firstName") || "";
    const lastName = localStorage.getItem("lastName") || "";
    const emailStored = localStorage.getItem("email") || "";
    const verified = localStorage.getItem("emailVerified") === "true";
    const designationStored = localStorage.getItem("designation") || "";
    const joinStored = localStorage.getItem("joinDate") || "";
    const lastStored = localStorage.getItem("lastWorkingDay") || "";

    if (!legacyEmpId) {
      navigate("/");
    } else {
      setEmpIdArgano(empIdArg);
      setFullName(`${firstName} ${lastName}`); // already stored in uppercase
      setEmail(emailStored);
      setEmailVerified(verified);

      // Fallbacks as requested
      const defaultDesignation = "Lead Technical Consultant";
      const defaultJoin = new Date(2019, 5, 10).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }); // Jun 10, 2019
      const lastDate = new Date();
      lastDate.setDate(lastDate.getDate() - 10); // 10 days before today
      const defaultLast = lastDate.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });

      setDesignation(designationStored || defaultDesignation);
      setJoinDate(joinStored || defaultJoin);
      setLastWorkingDay(lastStored || defaultLast);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const styles = {
    topBar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 20px",
      backgroundColor: "#f0f8ff",
      borderBottom: "1px solid #ddd"
    },
    logo: { height: 40, cursor: "pointer" },
    rightSection: { display: "flex", alignItems: "center", gap: "15px" },
    empId: { fontWeight: "bold", color: "#2b3e6c" },
    dateText: { color: "#2b3e6c" },
    logoutButton: {
      backgroundColor: "#d9534f",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      padding: "5px 10px",
      cursor: "pointer",
      fontWeight: "bold"
    },
    container: { padding: 30, fontFamily: "Segoe UI, sans-serif" },
    centerContent: { textAlign: "center", marginTop: 50 },
    welcome: { fontSize: "24px", color: "#2b3e6c" },
    subtext: { fontSize: "16px", color: "#555" },
    details: {
      marginTop: 30,
      maxWidth: 500,
      marginLeft: "auto",
      marginRight: "auto",
      textAlign: "left",
      backgroundColor: "#fff",
      padding: 20,
      borderRadius: 8,
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
    },
    detailItem: { marginBottom: 10, fontSize: "15px" },
    label: { fontWeight: "bold", color: "#2b3e6c" }
  };

  return (
    <>
      <div style={styles.topBar}>
        <img
          src={logo}
          alt="Argano Logo"
          style={styles.logo}
          onClick={() => navigate("/dashboard")}
        />
        <div style={styles.rightSection}>
          <span style={styles.empId}>{fullName} (Emp ID: {empIdArgano})</span>
          <span style={styles.dateText}>{today}</span>
          <button onClick={handleLogout} style={styles.logoutButton}>
            Logout
          </button>
        </div>
      </div>

      <div style={styles.container}>
        <div style={styles.centerContent}>
          <h2 style={styles.welcome}>👋 Welcome to the ConnectBack Portal</h2>
          <p style={styles.subtext}>We’re glad to have you here!</p>
        </div>

        <div style={styles.details}>
          <div style={styles.detailItem}>
            <span style={styles.label}>Name: </span> {fullName}
          </div>
          <div style={styles.detailItem}>
            <span style={styles.label}>Designation (at resignation): </span> {designation}
          </div>
          <div style={styles.detailItem}>
            <span style={styles.label}>Join Date: </span> {joinDate}
          </div>
          <div style={styles.detailItem}>
            <span style={styles.label}>Last Working Day: </span> {lastWorkingDay}
          </div>
          <div style={styles.detailItem}>
            <span style={styles.label}>Email: </span> {email}
          </div>
          <div style={styles.detailItem}>
            <span style={styles.label}>Email Verified: </span> {emailVerified ? "Yes" : "No"}
          </div>
        </div>
      </div>
    </>
  );
}
