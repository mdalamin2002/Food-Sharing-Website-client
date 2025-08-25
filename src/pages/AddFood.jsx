import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../providers/AuthProvider";
import Loading from "./Loading";
const AddFood = () => {
  const { user } = useContext(AuthContext); 
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleAddFood = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const foodName = form.foodName.value;
    const image = form.image.value;
    const quantity = form.quantity.value;
    const pickupLocation = form.pickupLocation.value;
    const expireDate = form.expireDate.value;
    const notes = form.notes.value;

    const newFood = {
      foodName,
      image,
      quantity,
      pickupLocation,
      expireDate,
      notes,
      status: "available",
      donorName: user?.displayName,
      donorEmail: user?.email,
      donorImage: user?.photoURL,
      createdAt: new Date(),
    };
    

    try {
      await axios.post("https://assigenment-11-server-wine.vercel.app/add-food", newFood);
    
      Swal.fire({
        icon: "success",
        title: "Food Added Successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
    
      navigate("/my-foods");
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to add food. Try again!",
      });
    }

    setLoading(false);
  };

   if(loading) return <Loading></Loading>

  return (
    <div className="max-w-4xl mx-auto my-10 bg-white p-10 rounded-2xl shadow-xl border border-gray-200">
      <h2 className="text-3xl font-bold mb-6 text-center text-green-700">🍲 Add a New Food Item</h2>

      <form onSubmit={handleAddFood} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block font-medium text-gray-700">Food Name</label>
          <input type="text" name="foodName" required placeholder="e.g. Fried Rice" className="input input-bordered w-full mt-1" />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Food Image URL</label>
          <input type="text" name="image" required placeholder="Image URL" className="input input-bordered w-full mt-1" />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Quantity (Servings)</label>
          <input type="number" name="quantity" required placeholder="e.g. 10" className="input input-bordered w-full mt-1" />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Pickup Location</label>
          <input type="text" name="pickupLocation" required placeholder="e.g. Dhanmondi, Dhaka" className="input input-bordered w-full mt-1" />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Expired Date & Time</label>
          <input type="datetime-local" name="expireDate" required className="input input-bordered w-full mt-1" />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Additional Notes</label>
          <textarea name="notes" placeholder="e.g. Handle with care, spicy item..." className="textarea textarea-bordered w-full mt-1" rows={3}></textarea>
        </div>

        {/* Donor Info */}
        <div className="md:col-span-2 border-t pt-6 mt-4">
          <h4 className="text-lg font-semibold text-green-600 mb-2">👤 Donor Info</h4>
          <div className="flex items-center gap-4">
            <img src={user?.photoURL} alt="donor" className="w-14 h-14 rounded-full border" />
            <div>
              <p className="font-medium">Name: {user?.displayName}</p>
              <p className="text-sm text-gray-600">Email: {user?.email}</p>
              <p className="text-sm text-gray-600">Status: <span className="font-bold text-green-600">Available</span></p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2 text-center">
          <button type="submit" className="btn btn-success px-8">
            Add Food
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFood;
