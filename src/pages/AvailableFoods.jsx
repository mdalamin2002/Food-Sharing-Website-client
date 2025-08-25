import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router";

const AvailableFoods = () => {
  const [search, setSearch] = useState("");
  const [isThreeCol, setIsThreeCol] = useState(true);

  // ✅ Fetch that uses search param
  const fetchFoods = async () => {
    const res = await axios.get(
      `https://assigenment-11-server-wine.vercel.app/available-foods?search=${encodeURIComponent(search)}`
    );
    return res.data;
  };

  // ✅ TanStack Query
  const {
    data: foods = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["availableFoods", search], // refetch on search
    queryFn: fetchFoods,
    keepPreviousData: true,
  });

  // 🔁 remove old useEffect fetch — no longer needed!

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <span className="loading loading-spinner loading-lg text-success" />
        <p className="mt-2 text-gray-500">Loading foods...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-red-600">
        Failed to load foods: {error?.message || "Something went wrong."}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center text-green-700 mb-8">
        🍲 Available Foods
      </h1>

      {/* ✅ Search & Layout Toggle */}
      <div className="flex justify-between items-center mb-6 gap-4">
        <input
          type="text"
          name="search"                       // ✅ input name
          placeholder="Search by food name..."
          className="input input-bordered w-full max-w-xs"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={() => setIsThreeCol(!isThreeCol)}
          className="btn btn-outline btn-success"
        >
          {isThreeCol ? "2-Column Layout" : "3-Column Layout"}
        </button>
      </div>

      {foods.length === 0 ? (
        <p className="text-center text-gray-500">No available food found.</p>
      ) : (
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 ${
            isThreeCol ? "md:grid-cols-3" : "md:grid-cols-2"
          } gap-6`}
        >
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
                {/* ✅ Food Name (You asked to add) */}
                <h2 className="text-xl font-bold text-green-700">
                  {food.foodName}
                </h2>

                <p className="text-sm text-gray-600">
                  <span className="font-medium">Quantity:</span> {food.quantity}
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
