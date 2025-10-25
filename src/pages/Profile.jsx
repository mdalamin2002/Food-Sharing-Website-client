import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../providers/AuthProvider";

const Profile = () => {
  const { user } = useContext(AuthContext);
  console.log(user)
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    photoURL: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const API_BASE_URL = "https://assignment-11-server-wine.vercel.app"; 

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/profile/${user.email}`
      );
      
      // The server now returns a default profile structure even if it doesn't exist
      setProfile({
        name: response.data.name || user.displayName || "",
        email: response.data.email || user.email,
        phone: response.data.phone || "",
        address: response.data.address || "",
        photoURL: response.data.photoURL || user.photoURL || "",
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
      // Initialize with user data if fetch fails
      setProfile({
        name: user.displayName || "",
        email: user.email,
        phone: "",
        address: "",
        photoURL: user.photoURL || "",
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_BASE_URL}/profile`,
        profile
      );
      if (response.data.success) {
        Swal.fire("Success!", "Profile updated successfully!", "success");
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      Swal.fire("Error!", "Failed to update profile.", "error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center text-green-700 mb-8">
        User Profile
      </h1>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Your Information</h2>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="btn btn-success btn-sm rounded-full"
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">
                  <span className="label-text font-medium">Full Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-medium">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                  required
                  disabled
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-medium">Phone</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={profile.phone}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-medium">Photo URL</span>
                </label>
                <input
                  type="text"
                  name="photoURL"
                  value={profile.photoURL}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
              </div>

              <div className="md:col-span-2">
                <label className="label">
                  <span className="label-text font-medium">Address</span>
                </label>
                <textarea
                  name="address"
                  value={profile.address}
                  onChange={handleInputChange}
                  className="textarea textarea-bordered w-full"
                  rows="3"
                ></textarea>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button type="submit" className="btn btn-success rounded-full">
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0">
                <img
                  src={profile.photoURL || "https://placehold.co/150x150"}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-green-500"
                />
              </div>

              <div className="flex-grow">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-600">Name</h3>
                    <p className="text-xl">{profile.name || "Not provided"}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-600">Email</h3>
                    <p className="text-xl">{profile.email}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-600">Phone</h3>
                    <p className="text-xl">
                      {profile.phone || "Not provided"}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-600">
                      Address
                    </h3>
                    <p className="text-xl">
                      {profile.address || "Not provided"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;