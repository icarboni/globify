import { useState } from "react";

const UserMenu = () => {
  function handleSignOut() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("stateKey");

    window.location.href = "http://localhost:3000";
  }

  const [isClicked, setIsClicked] = useState(false);
  return (
    <div className="user-menu items-center hidden md:flex">
      <div className="flex">
        <div
          className="bg-red-300"
          style={{ width: "35px", height: "35px", borderRadius: "50px" }}
          onClick={() => setIsClicked(true)}
        ></div>
        {isClicked && (
          <div
            className="absolute right-3 mt-[40px] w-48 bg-slate-900 border border-slate-700 rounded shadow-lg"
            onMouseLeave={() => setIsClicked(false)}
          >
            <a
              href="/user"
              className="block w-full text-left px-4 py-2 text-gray-100 hover:text-gray-800  hover:bg-slate-400"
            >
              View Profile
            </a>
            <button
              onClick={handleSignOut}
              className="block w-full text-left px-4 py-2 text-gray-100 hover:text-gray-800  hover:bg-slate-400"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserMenu;
