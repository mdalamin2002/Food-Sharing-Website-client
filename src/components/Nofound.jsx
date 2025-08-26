import { FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router"; // fixed import

const Nofound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-50 to-white text-center px-6">
      {/* Icon */}
      <FaExclamationTriangle className="text-yellow-500 text-7xl mb-6 animate-bounce" />

      {/* Error Code */}
      <h1 className="text-6xl font-extrabold text-gray-800 mb-3">404</h1>

      {/* Message */}
      <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-md">
        Oops! The page you’re looking for doesn’t exist or may have been moved.
      </p>

      {/* Back to Home Button */}
      <Link to="/">
        <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition transform hover:scale-105">
          ⬅ Back to Home
        </button>
      </Link>
    </div>
  );
};

export default Nofound;
