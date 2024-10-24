"use client";

import { useState, useEffect } from "react";
import { getArtistDetails, getPlaylists, getTopArtists, getUserInfo } from "./hooks";

const UserProfile: React.FC = () => {
  const [selectedPlaylistId, setSelectedPlalistId] = useState<string>(); // ID de la playlist
  const [topArtists, setTopArtists] = useState<any[]>([]); // Estado para los top artistas
  const [user, setUser] = useState<any>(null); // Estado para la información del usuario
  const [error, setError] = useState<string | null>(null); // Estado para el manejo de errores
  const [playlists, setPlaylists] = useState<any[]>([]);
  

  // Efecto para cargar la información del usuario y los top artistas cuando se monta el componente
  useEffect(() => {
    console.log("Fetching data...");
    async function fetchData() {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        return;
      }
      if (token) {
        console.log(token);
      }
      try {
        console.log("Fetching user info...");
        const userInfo = await getUserInfo(token!); // Obtener la información del usuario
        if (userInfo) {
          setUser(userInfo);
        } else {
          throw new Error("No se pudo obtener la información del usuario.");
        }

        const artists = await getTopArtists(token); // Obtener los top artistas

        // Obtener detalles de cada artista (incluyendo seguidores)
        const artistsWithDetails = await Promise.all(artists.map(async (artist: any) => {
          const artistDetails = await getArtistDetails(token, artist.id);
          return {
            ...artist,
            followers: artistDetails.followers.total,
          };
        }));
        setTopArtists(artistsWithDetails);

        const playlists = await getPlaylists(token!);
        setPlaylists(playlists);
        console.log(playlists);
        setSelectedPlalistId(playlists[1].id);

      } catch (error) {
        const errorMessage =
          (error as Error).message ||
          "Error desconocido al obtener datos de la API de Spotify";
        console.error("Error fetching data from Spotify API:", errorMessage);
        setError(errorMessage); // Asignar el mensaje de error a estado
      }
    }
    fetchData();
  }, []);

  return (
    <div className="min-h-screen text-white p-8">
      <div className="flex flex-col max-w-4xl mx-auto">
        {/* Sección de información del usuario */}
        <div className="bg-slate-800 p-6 flex flex-row items-center rounded-t-lg">
          {user ? (
            <>
              {user.images[0]?.url ? (
                <img
                  className="w-32 h-32 rounded-full mr-6"
                  src={user.images[0]?.url}
                  alt={`${user.display_name}'s profile`}
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-gray-700 mr-6 flex justify-center items-center text-7xl">
                  {user.display_name.charAt(0).toUpperCase()}
                </div>
              )}

              <div>
                <h1 className="text-2xl font-bold mb-2">{user.display_name}</h1>
                <div className="flex flex-row space-x-6 text-sm">
                  <div>
                    <span className="font-bold">
                      {user.followers?.total || 0}
                    </span>{" "}
                    Seguidores
                  </div>
                  <div>
                    <span className="font-bold">{user.product}</span> Tipo de
                    cuenta
                  </div>
                  <div>
                    <span className="font-bold">
                      {user.external_urls?.spotify ? "1" : "0"}
                    </span>{" "}
                    Playlists públicas
                  </div>
                  <div>
                    <span className="font-bold">
                      {user.following?.total || 0}
                    </span>{" "}
                    Siguiendo
                  </div>
                </div>
              </div>
            </>
          ) : (
            <p>Cargando información del usuario...</p>
          )}
        </div>

        {/* Sección de Top Artists */}
        <div className="bg-slate-600 p-6">
          <h2 className="text-xl font-bold mb-4">Mis Top Artistas del Mes</h2>
          {error ? (
            <p className="text-red-500">Error: {error}</p>
          ) : (
            <div className="flex">
              {topArtists.length > 0 ? (
                topArtists.map((artist) => (
                  <div key={artist.id} className="text-center flex flex-col grow items-center">
                    {artist.images[0] ? (
                      <img
                        src={artist.images[0]?.url}
                        alt={artist.name}
                        className="w-20 h-20 rounded-full mb-2"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-gray-700 mr-6 flex justify-center items-center text-7xl">
                        {artist.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <p className="text-sm">{artist.name}</p>
                    <p className="text-xs text-gray-400">
                      {artist.followers} Seguidores
                    </p>
                  </div>
                ))
              ) : (
                <p>No se encontraron artistas o están cargando...</p>
              )}
            </div>
          )}
        </div>

        {/* Sección de Playlist embebida */}
        {playlists ? (
          <div className="bg-slate-800 p-6 rounded-b-lg mb-[40px]">
            <h2 className="text-xl font-bold mb-4">Mi Playlist Recomendada</h2>

            <div className="flex mt-3 mb-4 overflow-x-auto flex-wrap">
              {playlists.map((playlist) => (
                <div
                  key={playlist.id}
                  className={`m-2 grow flex items-center p-3 rounded-lg hover:bg-slate-700 cursor-pointer w-[200px]
                  ${
                    selectedPlaylistId === playlist.id
                      ? "bg-blue-500"
                      : "bg-gray-600"
                  }`}
                  onClick={() => setSelectedPlalistId(playlist.id)}
                >
                  {playlist.images ? (
                    <img
                      src={playlist.images[0].url}
                      alt={"img"}
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-red-400"></div>
                  )}
                  <p className="text-xs ml-2">{playlist.name}</p>
                </div>
              ))}
            </div>
            <iframe
              title="Spotify Embed: Recommendation Playlist"
              src={`https://open.spotify.com/embed/playlist/${selectedPlaylistId}?utm_source=generator&theme=0`}
              width="100%"
              height="360px"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          </div>
        ) : (
          "No hay ninguna playlist."
        )}
      </div>
    </div>
  );
};

export default UserProfile;
