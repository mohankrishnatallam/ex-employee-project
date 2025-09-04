// src/services/authService.js
const BASE_URL = "http://localhost:8080/auth";

export async function signup(data) {
  try {
    const res = await fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json().catch(() => ({}));
    return json.code && json.msg
      ? json
      : { code: "UNKNOWN", msg: "Unexpected signup response" };
  } catch {
    return { code: "ERROR", msg: "Error connecting to server" };
  }
}

export async function verifyOtp(data) {
  try {
    const res = await fetch(`${BASE_URL}/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json().catch(() => ({}));
    console.log("verifyOtp response --> ", json);
    return json.code && json.msg
      ? json
      : { code: "UNKNOWN", msg: "Unexpected OTP verification response" };
  } catch {
    return { code: "ERROR", msg: "Error connecting to server" };
  }
}


export async function resendOtp(data) {
    // debugger;
  try {
    const res = await fetch(`${BASE_URL}/resend-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json().catch(() => ({}));
    console.log("resendOtp response --> ", json);
    return json.code && json.msg
      ? json
      : { code: "UNKNOWN", msg: "Unexpected resend OTP response" };
  } catch {
    return { code: "ERROR", msg: "Error connecting to server" };
  }
}

export async function login(credentials) {
  try {
    const res = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    const json = await res.json().catch(() => ({}));
    // Expect LoginApiResponse shape
    return json && (json.code || json.token || json.userInfo)
      ? json
      : { code: "UNKNOWN", msg: "Unexpected login response" };
  } catch {
    return { code: "ERROR", msg: "Error connecting to server" };
  }
}