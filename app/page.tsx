"use client"

import { useEffect, useState } from "react";
import getToken from "./utils/token";
import { getUserInfo } from "./user/hooks";
import TopArtists from "./components/TopArtists";
import Login from "./components/Login";
import SearchResults from "./components/SearchResults";
import { useSearch } from "./layout";

export default function Home() {
  const { searchText } = useSearch();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      setIsLoading(true);
      const { token, isAuthenticated } = getToken();
      setIsAuthenticated(isAuthenticated);
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const userInfo = await getUserInfo(token!);
        if (userInfo) {
          setUser(userInfo);
        } else {
          throw new Error("No se pudo obtener la información del usuario.");
        }
        setIsLoading(false);
      } catch (error) {
        const errorMessage =
          (error as Error).message ||
          "Error desconocido al obtener datos de la API de Spotify";
        setError(errorMessage);
      }
    };
    getUserData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-2">
      {isLoading ? (
        "Loading..."
      ) : (
        <>
          {!isAuthenticated ? (
            <Login />
          ) : (
            <>
              {searchText === "" ? (
                <div className="p-4 w-[80%]">
                  <div className="text-2xl mb-2">
                    Welcome {user?.display_name}!{" "}
                  </div>
                  {error ? error : <TopArtists />}
                </div>
              ) : (
                <SearchResults searchText={searchText} />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
