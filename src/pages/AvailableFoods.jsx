import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";

const AvailableFoods = () => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/available-foods")
      .then((res) => setFoods(res.data));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center text-green-700 mb-8">
        🍲 Available Foods
      </h1>

      {foods.length === 0 ? (
        <p className="text-center text-gray-500">No available food found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {foods.map((food) => (
            <div
              key={food._id}
              className="bg-white rounded-2xl shadow-md border hover:shadow-xl transition-all duration-300"
            >
              <img
                src={food.image}
                alt={food.foodName}
                className="h-52 w-full object-cover rounded-t-2xl"
              />

              <div className="p-5 space-y-2">
                {/* <div className="flex items-center gap-3 mb-3">
                  <img
                    src={food.donorImage}
                    alt="donor"
                    className="w-10 h-10 rounded-full border-2 border-green-500"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-700">
                      {food.donorName}
                    </p>
                    <p className="text-xs text-gray-400">Donor</p>
                  </div>
                </div>

                <h2 className="text-xl font-bold text-green-700">
                  {food.foodName}
                </h2> */}

                <p className="text-sm text-gray-600">
                  <span className="font-medium">Quantity:</span>{" "}
                  {food.quantity}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Pickup:</span>{" "}
                  {food.pickupLocation}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Expires:</span>{" "}
                  <span className="text-red-600">
                    {new Date(food.expireDate).toLocaleString()}
                  </span>
                </p>

                <Link to={`/details/${food._id}`}>
                  <button className="mt-4 w-full btn btn-success btn-sm rounded-full">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AvailableFoods;
