import axios from "axios";
import { toast } from "react-hot-toast";
import { useLoaderData, useNavigate } from "react-router";

const UpdateFood = () => {
  const food = useLoaderData();
  const navigate = useNavigate();

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedFood = {
      foodName: form.foodName.value,
      image: form.image.value,
      quantity: form.quantity.value,
      pickupLocation: form.pickupLocation.value,
      expireDate: form.expireDate.value,
      notes: form.notes.value,
    };

    axios
      .put(`https://assigenment-11-server-wine.vercel.app/update-food/${food._id}`, updatedFood)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          toast.success("Food updated successfully!");
          navigate("/my-foods");
        } else {
          toast.error("No changes were made.");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to update food!");
      });
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-lg">
  <h2 className="text-2xl font-bold text-center mb-6 text-green-700">
    Update Food
  </h2>
  <form onSubmit={handleUpdate} className="space-y-4">
    
    {/* Food Name */}
    <div>
      <label className="block mb-1 font-semibold text-gray-700">
        Food Name
      </label>
      <input
        name="foodName"
        defaultValue={food.foodName}
        className="input input-bordered w-full"
        placeholder="Enter Food Name"
        required
      />
    </div>

    {/* Food Image */}
    <div>
      <label className="block mb-1 font-semibold text-gray-700">
        Food Image URL
      </label>
      <input
        name="image"
        defaultValue={food.image}
        className="input input-bordered w-full"
        placeholder="Enter Image URL"
        required
      />
    </div>

    {/* Quantity */}
    <div>
      <label className="block mb-1 font-semibold text-gray-700">
        Quantity
      </label>
      <input
        name="quantity"
        defaultValue={food.quantity}
        className="input input-bordered w-full"
        placeholder="Enter Quantity"
        required
      />
    </div>

    {/* Pickup Location */}
    <div>
      <label className="block mb-1 font-semibold text-gray-700">
        Pickup Location
      </label>
      <input
        name="pickupLocation"
        defaultValue={food.pickupLocation}
        className="input input-bordered w-full"
        placeholder="Enter Pickup Location"
        required
      />
    </div>

    {/* Expire Date */}
    <div>
      <label className="block mb-1 font-semibold text-gray-700">
        Expire Date & Time
      </label>
      <input
        name="expireDate"
        type="datetime-local"
        defaultValue={
          food.expireDate
            ? new Date(food.expireDate).toISOString().slice(0, 16)
            : ""
        }
        className="input input-bordered w-full"
        required
      />
    </div>

    {/* Additional Notes */}
    <div>
      <label className="block mb-1 font-semibold text-gray-700">
        Additional Notes
      </label>
      <textarea
        name="notes"
        defaultValue={food.notes}
        className="textarea textarea-bordered w-full"
        placeholder="Write any extra details..."
      />
    </div>

    {/* Submit Button */}
    <button type="submit" className="btn btn-success w-full text-lg font-semibold">
      Update
    </button>
  </form>
</div>

  );
};

export default UpdateFood;
