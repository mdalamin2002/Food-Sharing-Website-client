import { useContext, useEffect, useState } from "react";
import { CgMenuMotion } from "react-icons/cg";
import { RiMenuAddLine } from "react-icons/ri";
import { Link, NavLink } from "react-router"; // FIX: react-router-dom
import { AuthContext } from "../providers/AuthProvider";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPageLoad, setIsPageLoad] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(false);

  useEffect(() => {
    // In a real implementation, this would check for actual notifications
    // For now, we'll just set it to true if user is logged in
    if (user?.email) {
      setHasNotifications(true);
    } else {
      setHasNotifications(false);
    }
  }, [user]);

  const menu = [
    { name: "Home", path: "/" },
    { name: "Add Food", path: "/add-food" },
    { name: "Available Foods", path: "/available-foods" },
    { name: "My Foods", path: "/my-foods" },
    { name: "Food Request", path: "/request" },
    { name: "Profile", path: "/profile" },
    { name: "Notifications", path: "/notifications" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="w-11/12 mx-auto py-4 flex justify-between items-center relative">
        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold text-green-700">
          Food <span className="text-orange-500">Sharing</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center gap-8 font-medium text-gray-700">
          {menu.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `hover:text-orange-500 transition flex items-center ${
                  isActive ? "text-orange-600 font-semibold" : ""
                }`
              }
            >
              {item.name}
              {item.name === "Notifications" && hasNotifications && (
                <span className="ml-2 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </NavLink>
          ))}

          {user?.email ? (
            <>
              <button
                onClick={logOut}
                className="px-4 py-1 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition shadow-md"
              >
                Logout
              </button>

              {/* Username */}
            <p className="text-center text-lg font-semibold text-white bg-gradient-to-r from-green-500 to-green-700 py-1 px-2 rounded-xl shadow-md mx-auto max-w-sm"> <span className="font-bold">{user?.displayName }</span>! </p>

              {/* Profile Image */}
              <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-green-500 shadow-sm">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="flex items-center justify-center w-full h-full text-green-700 font-bold">
                    {user.displayName?.charAt(0) || "U"}
                  </span>
                )}
              </div>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="px-4 py-1 rounded-lg bg-green-600 text-white hover:bg-green-700 transition shadow-md"
              >
                Login
              </NavLink>
              <NavLink
                to="/registration"
                className="px-4 py-1 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition shadow-md"
              >
                Register
              </NavLink>
            </>
          )}
        </ul>

        {/* Mobile Menu Icon */}
        <div className="lg:hidden">
          {!isMenuOpen ? (
            <RiMenuAddLine
              onClick={() => {
                setIsMenuOpen(true);
                setIsPageLoad(true);
              }}
              className="text-3xl cursor-pointer text-green-700"
            />
          ) : (
            <CgMenuMotion
              onClick={() => setIsMenuOpen(false)}
              className="text-3xl cursor-pointer text-green-700"
            />
          )}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <ul
        className={`lg:hidden flex flex-col gap-5 bg-white shadow-md px-6 py-6 absolute w-full z-40 top-16 left-0 transition-all duration-300 ${
          isMenuOpen
            ? "animate__animated animate__fadeInRight"
            : isPageLoad
            ? "animate__animated animate__fadeOutRight"
            : "hidden"
        }`}
      >
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className="border-b pb-2 hover:text-orange-500 transition flex items-center"
          >
            {item.name}
            {item.name === "Notifications" && hasNotifications && (
              <span className="ml-2 w-2 h-2 bg-red-500 rounded-full"></span>
            )}
          </NavLink>
        ))}

        {user?.email ? (
          <button
            onClick={logOut}
            className="px-4 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition shadow-md w-fit"
          >
            Logout
          </button>
        ) : (
          <>
            <NavLink
              to="/login"
              className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition shadow-md w-fit"
            >
              Login
            </NavLink>
            <NavLink
              to="/registration"
              className="px-4 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition shadow-md w-fit"
            >
              Register
            </NavLink>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Header;
