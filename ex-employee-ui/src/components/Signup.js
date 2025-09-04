// src/components/Signup.js
import React, { useState, useEffect } from "react"; // added useEffect
import Header from "./Header";
import { signup, verifyOtp, resendOtp } from "../services/authService";
import { useNavigate } from "react-router-dom";


export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    empIdArgano: "",
    password: "",
  });

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState("");
  const [resendCount, setResendCount] = useState(0);

  // Loading states for each async action
  const [loadingSignup, setLoadingSignup] = useState(false);
  const [loadingVerify, setLoadingVerify] = useState(false);
  const [loadingResend, setLoadingResend] = useState(false);

  // New effect: show max attempts message automatically
  useEffect(() => {
    if (resendCount >= 3) {
      setMessage("Max resend OTP attempts exceeded.");
    }
  }, [resendCount]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoadingSignup(true);
    const res = await signup(formData);
    setLoadingSignup(false);
    setMessage(res.msg || "Unexpected signup response");
    if (res.code === "SUCCESS") {
      setOtpSent(true);
      setResendCount(0); // reset when OTP sent successfully
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setLoadingVerify(true);
    const res = await verifyOtp({ email: formData.email, otp });
    setLoadingVerify(false);
    setMessage(res.msg || "Unexpected OTP verification response");
    if (res.code === "SUCCESS") {
      // Navigate to login page after successful OTP verification
      navigate("/login");
    }
  };

  const handleResendOtp = async () => {
    if (resendCount >= 3) {
      setMessage("Max resend OTP attempts exceeded.");
      return;
    }
    setLoadingResend(true);
    const res = await resendOtp({ email: formData.email});
    setLoadingResend(false);
    setMessage(res.msg || "Unexpected resend OTP response");
    if (res.code === "SUCCESS") {
      setResendCount(resendCount + 1);
    }
  };

  return (
    <div>
      <Header />
      <div style={styles.container}>
        {!otpSent ? (
          <>
            <h2 style={styles.heading}>Signup</h2>
            <form onSubmit={handleSignup}>
              <label style={styles.label}>First Name</label>
              <input
                type="text"
                name="firstName"
                placeholder="Enter First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
                style={styles.input}
                disabled={loadingSignup}
              />

              <label style={styles.label}>Last Name</label>
              <input
                type="text"
                name="lastName"
                placeholder="Enter Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
                style={styles.input}
                disabled={loadingSignup}
              />

              <label style={styles.label}>Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                placeholder="Enter Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                style={styles.input}
                disabled={loadingSignup}
              />

              <label style={styles.label}>Email ID (Personal)</label>
              <input
                type="email"
                name="email"
                placeholder="Enter Personal Email ID"
                value={formData.email}
                onChange={handleChange}
                required
                style={styles.input}
                disabled={loadingSignup}
              />

              <label style={styles.label}>Emp ID (Argano)</label>
              <input
                type="text"
                name="empIdArgano"
                placeholder="Enter Emp ID"
                value={formData.empIdArgano}
                onChange={handleChange}
                required
                style={styles.input}
                disabled={loadingSignup}
              />

              <label style={styles.label}>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
                required
                style={styles.input}
                disabled={loadingSignup}
              />

              <button type="submit" style={styles.button} disabled={loadingSignup}>
                {loadingSignup ? "Signing up..." : "Signup"}
              </button>
            </form>
          </>
        ) : (
          <>
            <h2 style={styles.heading}>Verify OTP</h2>
            <form
              onSubmit={handleOtpSubmit}
              style={{ textAlign: "center", marginTop: 20 }}
            >
              <label style={styles.label}>Enter OTP</label>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                style={styles.input}
                disabled={loadingVerify}
              />
              <br />
              <br />
              <button type="submit" style={styles.button} disabled={loadingVerify}>
                {loadingVerify ? "Verifying..." : "Verify OTP"}
              </button>
              <br />
              <br />
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={resendCount >= 3 || loadingResend}
                style={{
                  background: "none",
                  color: resendCount >= 3 ? "#999" : "#2b3e6c",
                  border: "none",
                  cursor: resendCount >= 3 || loadingResend ? "not-allowed" : "pointer",
                  textDecoration: resendCount >= 3 || loadingResend ? "none" : "underline",
                }}
              >
                {loadingResend ? "Resending..." : "Resend OTP"}
              </button>
              {resendCount > 0 && resendCount < 3 && (
                <p style={{ fontSize: "12px", color: "#555" }}>
                  Attempts left: {3 - resendCount}
                </p>
              )}
            </form>
          </>
        )}

        {message && (
          <p style={{ color: "#d9534f", marginTop: "20px" }}>{message}</p>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "40px auto",
    backgroundColor: "#f0f8ff",
    padding: 30,
    borderRadius: 12,
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    fontFamily: "Segoe UI, sans-serif",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#2b3e6c",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
    color: "#2b3e6c",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#2b3e6c",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
  },
};
