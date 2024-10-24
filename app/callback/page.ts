"use client";

export default function Callback() {
  const url = new URL(window.location.href);

  const hash = url.hash;
  console.log(hash);
  if (hash) {
    const params = new URLSearchParams(hash.substring(1));
    const accessToken = params.get("access_token");
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
    }

    window.location.href = "http://localhost:3000";
  }
}
