"use client";

import { useEffect } from "react";

const Callback = () => {


  useEffect(() => {
    const getAccessToken = () => {
      const url = new URL(window.location.href);
    
      const hash = url.hash;
      if (hash) {
        const params = new URLSearchParams(hash.substring(1));
        const accessToken = params.get("access_token");
        if (accessToken) {
          localStorage.setItem("accessToken", accessToken);
        }
    
        window.location.href = "http://localhost:3000";
      }
    }
    getAccessToken();
  })
}

export default Callback;