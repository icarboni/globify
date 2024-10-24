
const token: string = 'BQBAGEnYnamRVVYnkffwIeiAbviZmHjZpkIewkRbEegeGNoOt4wKLlrjq0bQqLJOvmplPaYz7Ie-MOZXmrksXjbVD4R8Lb9_No6QrAaFskJipdkyYF_ODAbKlLzxrWq9AnR_mkmWm07KPnLvy2hzNYlrHpxjBLMVezVUXQKjeJbQJ8TrhnRdZiDYrbrYkThBaFVB8fHWSqeZagd1RR6OqBzbj7IFyyE6vwyl23zQl0to7sOMIPUXBN5qFsn7KPhkfaRpOUMyegAB';

async function fetchWebApi(endpoint: string, method: string, body?: any): Promise<any> {
    const res = await fetch(`https://api.spotify.com/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method,
      body: body ? JSON.stringify(body) : undefined
    });
    
    return await res.json();
  }
  



  export async function getTracks() {
    const response = await fetchWebApi('v1/me/top/tracks?time_range=long_term&limit=5', 'GET');
    const topTracks = response.items
    console.log(topTracks)
    return(
      topTracks?.map(
        (track: any) => track.name
      )
    );
  }


  