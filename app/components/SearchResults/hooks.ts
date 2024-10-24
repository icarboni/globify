

export async function fetchWebApi(
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


export async function getSearhResults(token: string, query: string) {
  const { data, error } = await fetchWebApi(
    token,
    `v1/search?q=${query}&type=track`,
    "GET"
  );
  if (error) {
    throw new Error("Error al obtener la información del usuario");
  }
  return data;
}