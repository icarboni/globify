"use client"

import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/Navbar";
import Playbar from "./components/Playbar";
import { createContext, useContext, useState } from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Create a context
const SearchContext = createContext({
  searchText: "",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setSearchText: (text: string) => {},
});

export const useSearch = () => useContext(SearchContext);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [searchText, setSearchText] = useState<string>("");
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-700`}
      >
        <SearchContext.Provider value={{ searchText, setSearchText }}>
          <Navbar />
          {children}
          <Playbar />
        </SearchContext.Provider>
      </body>
    </html>
  );
}
