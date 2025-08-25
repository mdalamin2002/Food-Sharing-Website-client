import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../providers/AuthProvider";

const MyFoods = () => {
  const { user } = useContext(AuthContext);
  const [myFoods, setMyFoods] = useState([]);

  useEffect(() => {
    if (user) {
      axios
        .get("https://assigenment-11-server-wine.vercel.app/my-foods", {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        })
        .then((res) => {
          setMyFoods(res.data);
        });
    }
  }, [user]);

  const handleDeleteFood = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`https://assigenment-11-server-wine.vercel.app/delete-food/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Your food has been deleted.", "success");

            setMyFoods(myFoods.filter((item) => item._id !== id));
          }
        });
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
        🍽️ My Added Foods
      </h2>

      {myFoods.length === 0 ? (
        <p className="text-center text-gray-500">
          You have not added any food yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border rounded-xl shadow">
            <thead className="bg-green-100 text-green-800">
              <tr>
                <th>#</th>
                <th>Food</th>
                <th>Quantity</th>
                <th>Pickup</th>
                <th>Expires</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {myFoods.map((food, index) => (
                <tr key={food._id} className="hover:bg-gray-50">
                  <td>{index + 1}</td>
                  <td className="font-semibold">{food.foodName}</td>
                  <td>{food.quantity}</td>
                  <td>{food.pickupLocation}</td>
                  <td className="text-red-600">
                    {new Date(food.expireDate).toLocaleString()}
                  </td>
                  <td className="capitalize">{food.status}</td>
                  <td className="space-x-2">
                    <Link
                      to={`/update-food/${food._id}`}
                      className="btn btn-sm btn-info rounded-md"
                    >
                      Update
                    </Link>

                    <button
                      onClick={() => handleDeleteFood(food._id)}
                      className="btn btn-sm btn-error rounded-md"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyFoods;
