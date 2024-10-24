"use client"

import { useState, useEffect } from 'react';

const UserProfile: React.FC = () => {
  const [playlistId] = useState<string>('64zWmHwvt0uOrd4M1j6WFi'); // ID de la playlist
  const [topArtists, setTopArtists] = useState<any[]>([]); // Estado para los top artistas
  const [user, setUser] = useState<any>(null); // Estado para la información del usuario
  const [error, setError] = useState<string | null>(null); // Estado para el manejo de errores

  // Token de autorización hardcodeado
  const token = 'BQBgAK2pxuOUP7gtZJOPPvC2gcOue5LSt-dNrUvLyFXkAKm1UBIyBEXjk7rOvl_kIY88YbRc6KixdaKkWUglOvzRDogKNE4U1ssdwrO-WPrlmNLOTP8Pb2Q25T63GBmVUkTyQjLH08nt4izHu68POE6ZcTr2f8WzHDZ7JYF4h_NBN-KNaptjLw1UuLOVhlwFQvadx62G5xWWXshaIbaheXj-USu4Igur4HWqkGqher_hoTl2-w-ZaDKuZ4gatwrLcWzcRe2aHQ';

  // Función para llamar a la API de Spotify
  async function fetchWebApi(endpoint: string, method: string, body?: any) {
    try {
      const res = await fetch(`https://api.spotify.com/${endpoint}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method,
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errorData = await res.json(); // Obtener detalles del error
        throw new Error(`Error: ${res.status} ${res.statusText} - ${errorData.error.message}`);
      }

      return await res.json();
    } catch (error) {
      console.error('Error fetching data from Spotify API:', error);
      setError((error as Error).message);
      return null;
    }
  }

  // Función para obtener la información del usuario
  async function getUserInfo() {
    const data = await fetchWebApi('v1/me', 'GET');
    return data;
  }

  // Función para obtener los top artistas del usuario
  async function getTopArtists() {
    const data = await fetchWebApi('v1/me/top/artists?time_range=short_term&limit=5', 'GET');
    return data?.items || []; // Devolvemos los artistas o un arreglo vacío
  }

  // Función para obtener los detalles de cada artista, incluyendo el número de seguidores
  async function getArtistDetails(artistId: string) {
    const data = await fetchWebApi(`v1/artists/${artistId}`, 'GET');
    return data;
  }

  // Efecto para cargar la información del usuario y los top artistas cuando se monta el componente
  useEffect(() => {
    async function fetchData() {
      try {
        console.log('Fetching user info...');
        const userInfo = await getUserInfo(); // Obtener la información del usuario
        if (userInfo) {
          console.log('User info fetched:', userInfo);
          setUser(userInfo);
        } else {
          throw new Error('No se pudo obtener la información del usuario.');
        }

        console.log('Fetching top artists...');
        const artists = await getTopArtists(); // Obtener los top artistas

        // Obtener detalles de cada artista (incluyendo seguidores)
        const artistsWithDetails = await Promise.all(artists.map(async (artist) => {
          const artistDetails = await getArtistDetails(artist.id);
          return {
            ...artist,
            followers: artistDetails.followers.total,
          };
        }));

        console.log('Top artists fetched:', artistsWithDetails);
        setTopArtists(artistsWithDetails);
      } catch (error) {
        const errorMessage =
          (error as Error).message || 'Error desconocido al obtener datos de la API de Spotify';
        console.error('Error fetching data from Spotify API:', errorMessage);
        setError(errorMessage); // Asignar el mensaje de error a estado
      }
    }
    fetchData();
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen text-white p-8">
      <div className="flex flex-col max-w-4xl mx-auto">

        {/* Sección de información del usuario */}
        <div className="bg-gray-800 p-6 flex flex-row items-center rounded-t-lg">
          {user ? (
            <>
              <img
                className="w-32 h-32 rounded-full mr-6"
                src={user.images[0]?.url || 'https://randomuser.me/api/portraits/men/32.jpg'}
                alt={`${user.display_name}'s profile`}
              />
              
              <div>
                <h1 className="text-2xl font-bold mb-2">{user.display_name}</h1>
                <div className="flex flex-row space-x-6 text-sm">
                  <div>
                    <span className="font-bold">{user.followers?.total || 0}</span> Seguidores
                  </div>
                  <div>
                    <span className="font-bold">{user.product}</span> Tipo de cuenta
                  </div>
                  <div>
                    <span className="font-bold">{user.external_urls?.spotify ? '1' : '0'}</span> Playlists públicas
                  </div>
                  <div>
                    <span className="font-bold">{user.following?.total || 0}</span> Siguiendo
                  </div>
                </div>
              </div>
            </>
          ) : (
            <p>Cargando información del usuario...</p>
          )}
        </div>

        {/* Sección de Top Artists */}
        <div className="bg-gray-700 p-6">
          <h2 className="text-xl font-bold mb-4">Mis Top Artistas del Mes</h2>
          {error ? (
            <p className="text-red-500">Error: {error}</p>
          ) : (
            <div className="flex space-x-4">
              {topArtists.length > 0 ? (
                topArtists.map((artist) => (
                  <div key={artist.id} className="text-center">
                    <img
                      src={artist.images[0]?.url || 'https://via.placeholder.com/150'}
                      alt={artist.name}
                      className="w-20 h-20 rounded-full mb-2"
                    />
                    <p className="text-sm">{artist.name}</p>
                    <p className="text-xs text-gray-400">{artist.followers} Seguidores</p>
                  </div>
                ))
              ) : (
                <p>No se encontraron artistas o están cargando...</p>
              )}
            </div>
          )}
        </div>

        {/* Sección de Playlist embebida */}
        <div className="bg-gray-700 p-6 rounded-b-lg">
          <h2 className="text-xl font-bold mb-4">Mi Playlist Recomendada</h2>
          <iframe
            title="Spotify Embed: Recommendation Playlist"
            src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`}
            width="100%"
            height="360px"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
