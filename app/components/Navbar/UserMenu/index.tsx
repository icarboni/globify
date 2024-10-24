const UserMenu = () => {

  function handleSignOut() {
    console.log("Signing out");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("stateKey");  
  }

  return (
    <div className="user-menu flex items-center">
      <button className="btn text-white font-bold mr-3" id="signupBtn" onClick={handleSignOut}>
        Log out
      </button>
      <div
        className="bg-red-300"
        style={{ width: "35px", height: "35px", borderRadius: "50px" }}
      >
      </div>
    </div>
  );
}

export default UserMenu