const UserMenu = () => {
  function handleSignOut() {
    console.log("Signing out");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("stateKey");

    window.location.href = "http://localhost:3000";
  }

  return (
    <div className="user-menu items-center hidden md:flex">
      <div className="flex">
        <button
          className="btn text-white font-bold mr-3"
          id="signupBtn"
          onClick={handleSignOut}
        >
          Log out
        </button>
        <div
          className="bg-red-300"
          style={{ width: "35px", height: "35px", borderRadius: "50px" }}
        ></div>
      </div>
    </div>
  );
};

export default UserMenu;
