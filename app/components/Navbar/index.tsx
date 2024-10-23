"use client"

import { useState } from "react";
import "./style.css"
import { FaSearch } from "react-icons/fa";
import { IoIosFolderOpen } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { getAutenticationURL, getUserLogged } from "@/app/login";
import Image from "next/image";
import UserMenu from "./UserMenu";

const Navbar = () => {

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


    const [ searchText, setSearchText ] = useState<string>("");

    return (
      <>
        <nav className="bg-gray-900 p-4">
          <div className="container mx-auto flex items-center justify-between">
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
            </div>
            { getUserLogged() ? 
              <div className="flex items-center" id="authButtons">
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
            </div> : 
            <UserMenu />
          }
          </div>
        </nav>
      </>
    );
}

export default Navbar