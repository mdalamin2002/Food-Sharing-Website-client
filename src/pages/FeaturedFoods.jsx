import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../providers/AuthProvider";
import Loading from "./Loading";

const FeaturedFoods = () => {
  const [foods, setFoods] = useState([]);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://assigenment-11-server-wine.vercel.app/featured-foods")
      .then((res) => res.json())
      .then((data) => setFoods(data));
    setLoading(false);
  }, []);

  const handleDetails = (id) => {
    if (!user) {
      navigate("/login");
    } else {
      navigate(`/details/${id}`);
    }
  };

  if (loading) return <Loading />;

  return (
    <section className="py-10 max-w-7xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-8 text-green-700">
        🍱 Featured Foods
      </h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {foods.map((food) => (
          <motion.div
            whileHover={{ scale: 1.05 }}
            key={food._id}
            className="bg-white rounded-2xl shadow-lg p-4 border"
          >
            <img
              src={food.image}
              alt={food.foodName}
              className="h-40 w-full object-cover rounded-lg"
            />
            <div className="mt-4 space-y-1">
              <h3 className="text-lg font-bold text-green-800">
                {food.foodName}
              </h3>
              <p>Quantity: {food.quantity}</p>
              <p>Pickup: {food.pickupLocation}</p>
              <button
                onClick={() => handleDetails( food._id)}
                className="btn btn-outline btn-sm mt-2"
              >
                View Details
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-6">
        <Link to="/available-foods">
          <button className="btn btn-success btn-wide rounded-full">
            Show All Foods 🍽️
          </button>
        </Link>
      </div>
    </section>
  );
};

export default FeaturedFoods;
