import { getArtistDetails, getTopArtists } from "@/app/user/hooks";
import getToken from "@/app/utils/token";
import { useEffect, useState } from "react";


const TopArtists = (): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [topArtists, setTopArtists] = useState<any[]>([]); // Estado para los top artistas
  const [error, setError] = useState<string | null>(null); // Estado para el manejo de errores

  useEffect(() => {
    async function fetchData() {
      const { token } = getToken(); // Obtener el token de acceso
      if (!token) {
        return;
      }
      try {
        const artists = await getTopArtists(token); // Obtener los top artistas

        // Obtener detalles de cada artista (incluyendo seguidores)
        const artistsWithDetails = await Promise.all(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          artists.map(async (artist: any) => {
            const artistDetails = await getArtistDetails(token, artist.id);
            return {
              ...artist,
              followers: artistDetails.followers.total,
            };
          })
        );
        setTopArtists(artistsWithDetails);
      } catch (error) {
        const errorMessage =
          (error as Error).message ||
          "Error desconocido al obtener datos de la API de Spotify";
        setError(errorMessage); // Asignar el mensaje de error a estado
      }
    }
    fetchData();
  }, []);

  return (
    <div className="bg-slate-600 p-6">
      <h2 className="text-xl font-bold mb-4">Mis Top Artistas del Mes</h2>
      {error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <div className="flex">
          {topArtists.length > 0 ? (
            topArtists.map((artist) => (
              <div
                key={artist.id}
                className="text-center flex flex-col grow items-center"
              >
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
  );
}

export default TopArtists;