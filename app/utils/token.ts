"use client"

export default function getToken() {
  const token = localStorage.getItem("accessToken");
  if (token)
    return { token, isAuthenticated: true };
  return { token: null, isAuthenticated: false };
}