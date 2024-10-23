"use client"

import { useState } from "react";
import "./style.css"
import { FaSearch } from "react-icons/fa";
import { IoIosFolderOpen } from "react-icons/io";
import { IoMdClose } from "react-icons/io";

const Navbar = () => {

    const [ searchText, setSearchText ] = useState<string>("");

    return (
        <>
            <nav className="bg-gray-900 p-4">
            <div className="container mx-auto flex items-center justify-between">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/2048px-Spotify_logo_without_text.svg.png" alt="spotifylogo" className="w-8 h-8 mr-3" />
            <div id="search-container" className="flex items-center bg-gray-700">
                <FaSearch className="ms-2"/>
                <input id="search-form" className="me-2 bg-gray-700 text-white rounded-full px-4 py-2" type="text" placeholder="Search" aria-label="Search" value={searchText} onChange={ (e) => setSearchText(e.target.value)}/>
                { searchText === "" ? <IoIosFolderOpen className="me-2"/> : <IoMdClose className="me-2" onClick={ () => { setSearchText("")}}/> }
            </div>
            <div className="flex items-center" id="authButtons">
                <button className="btn text-white font-bold" id="signupBtn">Sign up</button>
                <button className="btn me-2 font-bold text-gray-900" id="loginBtn">Log in</button>
            </div>
        </div>
            </nav>
            <h1 className="text-white text-center mt-8">Please, log in to start listening</h1>
            <div className="container text-white text-center mt-8 bg-gray-700 rounded"> 
                <form>
                    
                </form>
            </div>
        
        </>
    )
}

export default Navbar;
