import axios from "axios";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { AuthContext } from "../providers/AuthProvider";
import Loading from "./Loading";

const MyFoodRequests = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`https://assigenment-11-server-wine.vercel.app/my-requests?email=${user.email}`)
        .then((res) => setRequests(res.data))
        .catch((err) => console.error(err));
      setLoading(false);
    }
  }, [user]);

  // ✅ Delete Request Handler
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://assigenment-11-server-wine.vercel.app/delete-request/${id}`)
          .then(() => {
            setRequests((prev) => prev.filter((req) => req._id !== id));
            toast.success("Request deleted successfully!");
          })
          .catch(() => {
            toast.error("Failed to delete request!");
          });
      }

    });


  };

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-green-700">
        My Food Requests
      </h2>
      {requests.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Food Name</th>
                <th>Donor</th>
                <th>Pickup Location</th>
                <th>Expire Date</th>
                <th>Request Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req, index) => (
                <tr key={req._id}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={req.image}
                      alt={req.foodName}
                      className="w-16 h-16 rounded object-cover"
                    />
                  </td>
                  <td>{req.foodName}</td>
                  <td>{req.donorName}</td>
                  <td>{req.pickupLocation}</td>
                  <td>{new Date(req.expireDate).toLocaleString()}</td>
                  <td>{new Date(req.requestDate).toLocaleString()}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(req._id)}
                      className="btn btn-error btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-10">
          No food requests found.
        </p>
      )}
    </div>
  );
};

export default MyFoodRequests;
