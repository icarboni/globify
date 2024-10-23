"use client"

import { useState } from 'react';

const UserProfile: React.FC = () => {
  const [playlistId] = useState<string>('64zWmHwvt0uOrd4M1j6WFi'); // ID de la playlist hardcodeada por ahora

  // Información del usuario (hardcodeada de momento)
  const user = {
    name: 'Juan Pérez',
    email: 'juan.perez@example.com',
    image: 'https://randomuser.me/api/portraits/men/32.jpg', // Imagen de perfil simulada
    publicPlaylists: 12, // Número de playlists públicas (hardcodeado)
    following: 34, // Número de artistas seguidos (hardcodeado)
    followers: 450, // Número de seguidores (hardcodeado)
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white p-8 flex items-start justify-center">
      <div className="bg-gray-800 rounded-lg p-8 flex flex-row space-x-8">
        {/* Imagen de perfil */}
        <img
          className="w-36 h-36 rounded-full"
          src={user.image}
          alt={`${user.name}'s profile`}
        />
        
        {/* Información del usuario */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
          <p className="text-lg mb-4">Email: {user.email}</p>

          {/* Playlists públicas, Following y Followers */}
          <div className="flex flex-row space-x-8 text-sm mb-4">
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

          {/* Playlist embebida de Spotify */}
          <div className="mt-6">
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
    </div>
  );
};

export default UserProfile;
