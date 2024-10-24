"use client"

import { useEffect, useState } from "react";
import getToken from "./utils/token";
import { getUserInfo } from "./user/hooks";
import TopArtists from "./components/TopArtists";

export default function Home() {

  const [token, setToken] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUserData = async () => {
      const { token, isAuthenticated } = getToken();
      setIsAuthenticated(isAuthenticated);
      if (!token)
        return
      setToken(token);
      try {
        const userInfo = await getUserInfo(token!); 
        if (userInfo) {
          setUser(userInfo);
        } else {
          throw new Error("No se pudo obtener la información del usuario.");
        }
      } catch (error) {
        const errorMessage =
          (error as Error).message ||
          "Error desconocido al obtener datos de la API de Spotify";
        setError(errorMessage);
      }
    }
    getUserData();
  }, []);

  return (
    <div>
      {
        !isAuthenticated ? 
        "Plese login" : 
        <div className="p-8"> 
          <div className="text-2xl mb-2"> Welcome {user?.display_name}! </div>
          <TopArtists />
        </div>
      }
    </div>
  );
}
