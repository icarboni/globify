"use client"

import handler from "./hooks"
import { getTracks } from "./topTracks"

import { useEffect, useState } from "react";

const Playlists = () => {
    const [topTracks, setTopTracks] = useState<string[]>([]);
    // const playlists = handler();

    useEffect(() => {
        getTracks().then(tracks => setTopTracks(tracks));
    }, []);

    return (
        <div>
            {topTracks.map((track: string, index: number) => 
                <div key={index}>{track}</div>
            )}
        </div>
    )
}

export default Playlists