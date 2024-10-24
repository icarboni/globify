"use client"
// icons from https://fontawesome.com/search
import { useEffect, useState } from "react";
import "./style.css"
import { FaSearch } from "react-icons/fa";
import { IoIosFolderOpen } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { getAutenticationURL } from "@/app/login";
import Image from "next/image";
import UserMenu from "./UserMenu";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.substring(1));
      const accessToken = params.get('access_token');
      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
        setToken(accessToken);
        window.location.href = "http://localhost:3000";
      }
    } else {
      const storedToken = localStorage.getItem('accessToken');
      if (storedToken) {
        setToken(storedToken);
      }
    }
    setIsAuthenticated(localStorage.getItem("accessToken") !== null);
  }, []);

  function handleSignIn() {
    const url = getAutenticationURL();
    window.location.href = url;
  }

  const searchTracks = async (query: string) => {
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error: ${response.status} - ${response.statusText}\n${errorText}`);
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Search submitted:", searchText);
    searchTracks(searchText);
  };

  return (
    <>
      <nav className="bg-gray-900 p-4">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
          <Image
            src="/logo.png"
            alt="spotifylogo"
            className="w-8 h-8 mr-3"
            width={32}
            height={32}
          />
          <form
            id="search-container"
            className="flex items-center bg-gray-700"
            onSubmit={handleSearchSubmit}
          >
            <FaSearch className="ms-2" />
            <input
              id="search-form"
              className="me-2 bg-gray-700 text-white rounded-full px-4 py-2 focus:outline-none"
              type="text"
              placeholder="Search"
              aria-label="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            {searchText === "" ? (
              <IoIosFolderOpen className="me-2" />
            ) : (
              <IoMdClose
                className="me-2"
                onClick={() => {
                  setSearchText("");
                }}
              />
            )}
          </form>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          {!isAuthenticated ? (
            <div
              className="hidden w-full md:block md:w-auto"
              id="authButtons"
            >
              <button className="btn text-white font-bold" id="signupBtn">
                Sign up
              </button>
              <button
                className="btn me-2 font-bold text-gray-900"
                id="loginBtn"
                onClick={handleSignIn}
              >
                Log in
              </button>
            </div>
          ) : (
            <UserMenu />
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;