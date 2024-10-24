function generateRandomString(length: number): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function getAutenticationURL() {
    const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID as string;
    const redirect_uri = "http://localhost:3000/callback";

    const state = generateRandomString(16);

    localStorage.setItem("stateKey", state);
    const scope =
      "user-read-private user-read-email user-top-read user-library-read playlist-read-private";

    let url = "https://accounts.spotify.com/authorize";
    url += "?response_type=token";
    url += "&client_id=" + encodeURIComponent(client_id);
    url += "&scope=" + encodeURIComponent(scope);
    url += "&redirect_uri=" + encodeURIComponent(redirect_uri);
    url += "&state=" + encodeURIComponent(state);
    url += "&show_dialog=true";

    return url;
}
