async function fetchWebApi(
  token: string,
  endpoint: string,
  method: string,
  body?: unknown
) {
  try {
    const res = await fetch(`https://api.spotify.com/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method,
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errorData = await res.json(); // Obtener detalles del error
      throw new Error(
        `Error: ${res.status} ${res.statusText} - ${errorData.error.message}`
      );
    }
    const data = await res.json();
    return { data, error: null };
  } catch (error) {
    console.error("Error fetching data from Spotify API:", error);

    return { error, data: null };
  }
}

// Función para obtener la información del usuario
export async function getUserInfo(token: string) {
  const { data, error } = await fetchWebApi(token, "v1/me", "GET");
  if (error) {
    throw new Error("Error al obtener la información del usuario");
  }
  return data;
}

// Función para obtener los top artistas del usuario
export async function getTopArtists(token: string) {
  const { data, error } = await fetchWebApi(
    token,
    "v1/me/top/artists?time_range=short_term&limit=5",
    "GET"
  );
  if (error) {
    throw new Error("Error al obtener los top artistas");
  }
  return data?.items || []; // Devolvemos los artistas o un arreglo vacío
}

// Función para obtener los detalles de cada artista, incluyendo el número de seguidores
export async function getArtistDetails(token: string, artistId: string) {
  const { data, error } = await fetchWebApi(
    token,
    `v1/artists/${artistId}`,
    "GET"
  );
  if (error) throw new Error("Error al obtener los detalles del artista");
  return data;
}

export async function getPlaylists(token: string) {
  const { error, data } = await fetchWebApi(
    token,
    "v1/me/playlists?offset=0&limit=",
    "GET"
  );
  if (error) throw new Error("Error al obtener las playlists");
  return data?.items || [];
}
