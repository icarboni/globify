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
  const [accessToken, setAccessToken] = useState<string | null>(null);
  
  useEffect(() => {
    const getAccessToken = async () => {
      setAccessToken(localStorage.getItem("accessToken"))
      if (accessToken) {
        setIsAuthenticated(true);
      }
    }
    getAccessToken();
  })

  function handleSignIn() {
    const url = getAutenticationURL();
    window.location.href  = url;
    const hash = window.location.hash;
      if (hash) {
        const params = new URLSearchParams(hash.substring(1));
        const accessToken = params.get('access_token');
        if (accessToken) {
          localStorage.setItem("accessToken", accessToken);
        }
        window.location.href = "http://localhost:3000";
    }
  }
  useEffect(() => {
    setIsAuthenticated(localStorage.getItem("accessToken") !== null)
  }, []);
    const [ searchText, setSearchText ] = useState<string>("");

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
            <div
              id="search-container"
              className="flex items-center bg-gray-700"
            >
              <FaSearch className="ms-2" />
              <input
                id="search-form"
                className="me-2 bg-gray-700 text-white rounded-full px-4 py-2 focus: outline-none"
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
            </div>
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

export default Navbar