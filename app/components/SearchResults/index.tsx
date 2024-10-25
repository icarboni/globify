"use client"

import { useEffect, useState } from "react";
import { getSearhResults } from "./hooks";
import getToken from "@/app/utils/token";

interface SearchResultsProps {
    searchText: string;
}
const SearchResults = ({searchText}: SearchResultsProps) => {

    const [result, setResult] = useState([]);

    useEffect(() => {
        const getResults = async () => {
            const { token } = getToken(); // Obtener el token de acceso
            if (!token) {
              return;
            }
            try {
              const results = await getSearhResults(token!, searchText); 
              if (result) {
                setResult(results.tracks.items);
              } else {
                throw new Error(
                  "No se pudo obtener la información de la busqueda."
                );
              }
            } catch (error) {
              throw new Error("Error al obtener datos de la API de Spotify");
              console.error(error);
            }
        }
        getResults()
    }, [searchText]);

    return (
        <div>
          
            {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
              result.map((item: any) => (
                <div key={item.id} className="flex flex-col m-3 bg-slate-800 p-3 rounded-lg w-[500px]">
                    <div className="text-xl">
                        { item.name }
                    </div> 
                    <div className="text-sm">{
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      item.artists.map((artist: any) => artist.name).join(", ")}</div>
                </div>
            ))}
        </div>
    )

}

export default SearchResults;