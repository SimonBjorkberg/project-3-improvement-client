import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";

const Navbar = () => {

  const { isLoggedIn, logOutUser, userInfo } = useContext(AuthContext)

  console.log(userInfo)

  return (
    <nav className="h-20 bg-neutral-900 flex flex-row justify-between fixed z-10 w-screen">
      <div className="w-[80%] mx-auto flex flex-row justify-between text-white">
        <Link className="my-auto" to={"/"}>Home</Link>
        {!isLoggedIn ? <div className="my-auto">
          <button className="mr-5 border py-1 px-2 rounded-md bg-neutral-800 hover:bg-neutral-700 duration-300 transition-all">
            <Link to={"/login"}>
              Log In
            </Link>
          </button>
          <button className="text-black bg-white py-1 px-2 rounded-md duration-500 transition-all">
            <Link to={"/signup"}>
              Sign Up
            </Link>
          </button>
        </div>
          :
          <div className="my-auto flex flex-row">
            <div className="w-10 mr-5 rounded-full hover:opacity-80 transition-all duration-300">
              <Link to={`/profile/${userInfo?._id}`}>
                <img src={userInfo?.image} alt=""/>
              </Link>
            </div>
            <button className="transition-all duration-300 hover:text-neutral-400" onClick={() => logOutUser()}>
              Logout
            </button>
          </div>}
      </div>
    </nav>
  );
};

export default Navbar;
