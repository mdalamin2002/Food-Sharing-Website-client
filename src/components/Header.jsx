import { useContext, useState } from "react";
import { CgMenuMotion } from "react-icons/cg";
import { RiMenuAddLine } from "react-icons/ri";
import { Link, NavLink } from "react-router"; // FIX: use react-router-dom
import { AuthContext } from "../providers/AuthProvider";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPageLoad, setisPageLoad] = useState(false);

  const menu = [
    { name: "Home", path: "/" },
    { name: "Add Food", path: "/add-food" },
    { name: "Available Foods", path: "/available-foods" },
    { name: "My Foods", path: "/my-foods" },
    { name: "Food Request", path: "/request" },
  ];

  return (
    <nav className="overflow-x-clip sticky top-0 z-50 bg-white">
     
      <div className="w-11/12 mx-auto py-5 flex justify-between items-center relative">
        <Link to="/" className="logo">
          <span className="text-xl font-bold text-stone-700">Food Sharing</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center gap-5">
          {menu.map((item) => (
            <NavLink key={item.path} to={item.path}>
              {item.name}
            </NavLink>
          ))}

          {user && user?.email ? (
            <>
              {/* Logout Button */}
              <button className="cursor-pointer" onClick={logOut}>
                Logout
              </button>

        <p className="text-center text-lg font-semibold text-white bg-gradient-to-r from-green-500 to-green-700 py-2 px-2 rounded-xl shadow-md mx-auto max-w-sm">
  <span className="font-bold">{user?.displayName }</span>!
</p>

              {/* Profile Image */}
              <div className="w-8 h-8 rounded-full overflow-hidden bg-orange-100 text-orange-700 flex items-center justify-center font-bold text-xs">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName}
                    className="w-full h-full object-cover"

                    
                  />


                ) : (
                  <span>{user.displayName?.charAt(0) || "U"}</span>
                )}
              </div>
            </>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/registration">Register</NavLink>
            </>
          )}
        </ul>

        {/* Mobile Menu */}
        <div className="lg:hidden">
          {!isMenuOpen ? (
            <RiMenuAddLine
              onClick={() => {
                setIsMenuOpen(true);
                setisPageLoad(true);
              }}
              className="text-2xl cursor-pointer"
            />
          ) : (
            <CgMenuMotion
              onClick={() => setIsMenuOpen(false)}
              className="text-2xl cursor-pointer"
            />
          )}

          <ul
            className={`flex animate__animated bg-white flex-col lg:hidden gap-5 absolute z-50 bg-opacity-70 w-full top-14 left-0 ${
              isMenuOpen
                ? "animate__fadeInRight"
                : isPageLoad
                ? "animate__fadeOutRight flex"
                : "hidden"
            }`}
          >
            {menu.map((item) => (
              <NavLink
                className="border-b-2 hover:border-orange-500 transition duration-200"
                key={item.path}
                to={item.path}
              >
                {item.name}
              </NavLink>
            ))}
            {user && user?.email ? (
              <>
                <button className="cursor-pointer" onClick={logOut}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/registration">Register</NavLink>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
