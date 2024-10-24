import { getAutenticationURL } from "@/app/utils/login";

const Login = () => {

      function handleSignIn() {
        const url = getAutenticationURL();
        window.location.href = url;
      }
    
    return (
      <div className="mt-[150px] flex flex-col items-center">
        <div className="text-xl">
            You need to login to use this app!
        </div>
        <button
          className="btn mt-4 font-bold text-gray-900 text-2xl"
          id="loginBtn"
          onClick={handleSignIn}
        >
          Log in
        </button>
      </div>
    );

}


export default Login;