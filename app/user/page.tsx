"use client"

import { useState, useEffect } from 'react';

const UserProfile: React.FC = () => {
  const [playlistId] = useState<string>('64zWmHwvt0uOrd4M1j6WFi'); // ID de la playlist hardcodeada por ahora
  const [topArtists, setTopArtists] = useState<any[]>([]); // Estado para los top artistas

  // Información del usuario (hardcodeada de momento)
  const user = {
    name: 'Juan Pérez',
    image: 'https://randomuser.me/api/portraits/men/32.jpg', // Imagen de perfil simulada
    publicPlaylists: 12, // Número de playlists públicas (hardcodeado)
    following: 34, // Número de artistas seguidos (hardcodeado)
    followers: 450, // Número de seguidores (hardcodeado)
  };

  // Token de autorización (hardcodeado de momento)
  const token = 'BQCfmdXu_uJ6mu8lIX-iQtERUcMShk9LAd7zG6-HZe8AVwp1uqr26z4ca-khyxfSwXgKlE1Z2QlojN7ALN3tVCER8v5cYzu3b00bd0x0aT0p0TrI3-oUuBzAfSrd0iqCJx-5hABzUmInaz_0jUjdJo1_VhP7pZ6XOQjbC0URZ1i1PxrLtX4o8tif9KEr9xVwVj9b6JX5a0tGfqUvNOUoCAt6pc9T3s6m4S_VaVaOGaLUPi4t8EOB4uLt0FHNne1xbr0M';

  // Función para llamar a la API de Spotify
  async function fetchWebApi(endpoint: string, method: string, body?: any) {
    const res = await fetch(`https://api.spotify.com/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method,
      body: JSON.stringify(body),
    });
    return await res.json();
  }

  // Función para obtener los top artistas del usuario
  async function getTopArtists() {
    const data = await fetchWebApi(
      'v1/me/top/artists?time_range=short_term&limit=5', // Top artistas del último mes
      'GET'
    );
    return data.items;
  }

  // Efecto para cargar los top artistas cuando se monta el componente
  useEffect(() => {
    async function fetchData() {
      const artists = await getTopArtists();
      setTopArtists(artists);
    }
    fetchData();
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen text-white p-8">
      <div className="flex flex-col max-w-4xl mx-auto">

        {/* Sección de información del usuario */}
        <div className="bg-gray-800 p-6 flex flex-row items-center rounded-t-lg">
          <img
            className="w-32 h-32 rounded-full mr-6"
            src={user.image}
            alt={`${user.name}'s profile`}
          />
          
          <div>
            <h1 className="text-2xl font-bold mb-2">{user.name}</h1>
            <div className="flex flex-row space-x-6 text-sm">
              <div>
                <span className="font-bold">{user.publicPlaylists}</span> Playlists públicas
              </div>
              <div>
                <span className="font-bold">{user.following}</span> Siguiendo
              </div>
              <div>
                <span className="font-bold">{user.followers}</span> Seguidores
              </div>
            </div>
          </div>
        </div>

        {/* Sección de Top Artists */}
        <div className="bg-gray-700 p-6">
          <h2 className="text-xl font-bold mb-4">Mis Top Artistas del Mes</h2>
          <div className="flex space-x-4">
            {topArtists.length > 0 ? (
              topArtists.map((artist) => (
                <div key={artist.id} className="text-center">
                  <img
                    src={artist.images[0]?.url || 'https://via.placeholder.com/150'} // Imagen del artista o un placeholder
                    alt={artist.name}
                    className="w-20 h-20 rounded-full mb-2"
                  />
                  <p className="text-sm">{artist.name}</p>
                </div>
              ))
            ) : (
              <p>Cargando top artistas...</p>
            )}
          </div>
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
