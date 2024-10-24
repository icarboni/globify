"use client"

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler() {
const token = "BQD6h4C3FNnHzecPZXELwCKki1LaiKVXvUtszxTke1QTDbT6tCEkKJJDCyKwIOWFWTepNLdZrS5ZpdMzb7jF51EaYQ8dCUkU5qIbpYTRPMipt8dgqTNtYb1r0DG0yqCetkMLpAtUq7-QlPqVrUWeyU2drLTsWHpkLG7iBPUKc0nLyQLqYZzSekFiyczUQFlQsAol1-0" // Obtén el token de acceso desde el almacenamiento local.
  console.log
  const response = await fetch('https://api.spotify.com/v1/me/playlists', {
    headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "GET"
  });

  console.log(response)
  if (!response.ok) {
    console.log("ERROR")
    return;
  }

  console.log(response)
  const data = await response.json();
  return data
}
