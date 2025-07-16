import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";

const MyFoodRequests = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  console.log(requests);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/my-requests?email=${user.email}`)
        .then((res) => setRequests(res.data))
        .catch((err) => console.error(err));
    }
  }, [user]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-green-700">My Food Requests</h2>
      {requests.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Food Name</th>
                <th>Donor</th>
                <th>Pickup Location</th>
                <th>Expire Date</th>
                <th>Request Date</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req, index) => (
                <tr key={req._id}>
                  <td>{index + 1}</td>
                  <td>{req.foodName}</td>
                  <td>{req.donorName}</td>
                  <td>{req.pickupLocation}</td>
                  <td>{new Date(req.expireDate).toLocaleString()}</td>
                  <td>{new Date(req.requestDate).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-10">No food requests found.</p>
      )}
    </div>
  );
};

export default MyFoodRequests;
