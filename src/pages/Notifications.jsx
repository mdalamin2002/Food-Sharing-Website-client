import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../providers/AuthProvider";

const Notifications = () => {
  const { user } = useContext(AuthContext);
  const [preferences, setPreferences] = useState([]);
  const [newPreference, setNewPreference] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const API_BASE_URL = "https://assignment-11-server-wine.vercel.app"; 

  useEffect(() => {
    if (user?.email) {
      fetchPreferences();
    }
  }, [user]);

  const fetchPreferences = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/notifications/preferences/${user.email}`
      );
      if (response.data.foodPreferences) {
        setPreferences(response.data.foodPreferences);
        setIsSubscribed(true);
      }
    } catch (error) {
      console.error("Error fetching preferences:", error);
    }
  };

  const handleAddPreference = () => {
    if (newPreference.trim() && !preferences.includes(newPreference.trim())) {
      setPreferences([...preferences, newPreference.trim()]);
      setNewPreference("");
    }
  };

  const handleRemovePreference = (pref) => {
    setPreferences(preferences.filter((p) => p !== pref));
  };

  const handleSubscribe = async () => {
    if (preferences.length === 0) {
      Swal.fire("Error!", "Please add at least one food preference.", "error");
      return;
    }

    try {
      const response = await axios.post(
        "https://assigenment-11-server-wine.vercel.app/notifications/subscribe",
        {
          email: user.email,
          foodPreferences: preferences,
        },
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );

      if (response.data.success) {
        setIsSubscribed(true);
        Swal.fire(
          "Subscribed!",
          "You'll be notified when foods matching your preferences become available.",
          "success"
        );
      }
    } catch (error) {
      console.error("Error subscribing:", error);
      Swal.fire("Error!", "Failed to subscribe to notifications.", "error");
    }
  };

  const handleUnsubscribe = async () => {
    try {
      const response = await axios.delete(
        `https://assigenment-11-server-wine.vercel.app/notifications/unsubscribe/${user.email}`
      );

      if (response.data.success) {
        setIsSubscribed(false);
        setPreferences([]);
        Swal.fire("Unsubscribed!", "You've been unsubscribed.", "success");
      }
    } catch (error) {
      console.error("Error unsubscribing:", error);
      Swal.fire("Error!", "Failed to unsubscribe.", "error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center text-green-700 mb-8">
        Food Notifications
      </h1>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Get Notified About Available Foods
          </h2>
          <p className="text-gray-600">
            Subscribe to receive notifications when foods matching your
            preferences become available.
          </p>
        </div>

        {!isSubscribed ? (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-3">
                Add Food Preferences
              </h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newPreference}
                  onChange={(e) => setNewPreference(e.target.value)}
                  placeholder="e.g. rice, curry, bread..."
                  className="input input-bordered flex-grow"
                  onKeyPress={(e) => e.key === "Enter" && handleAddPreference()}
                />
                <button
                  onClick={handleAddPreference}
                  className="btn btn-success rounded-full"
                >
                  Add
                </button>
              </div>
            </div>

            {preferences.length > 0 && (
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-3">
                  Your Preferences
                </h3>
                <div className="flex flex-wrap gap-2">
                  {preferences.map((pref, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full"
                    >
                      <span>{pref}</span>
                      <button
                        onClick={() => handleRemovePreference(pref)}
                        className="ml-2 text-green-600 hover:text-green-900"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="text-center">
              <button
                onClick={handleSubscribe}
                className="btn btn-success px-8 rounded-full"
                disabled={preferences.length === 0}
              >
                Subscribe to Notifications
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <div className="text-green-600 text-5xl mb-4">🔔</div>
              <h3 className="text-xl font-semibold text-green-800 mb-2">
                You're Subscribed!
              </h3>
              <p className="text-green-700 mb-4">
                You'll receive notifications when foods matching your preferences
                become available.
              </p>
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {preferences.map((pref, index) => (
                  <span
                    key={index}
                    className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm"
                  >
                    {pref}
                  </span>
                ))}
              </div>
              <button
                onClick={handleUnsubscribe}
                className="btn btn-outline btn-error rounded-full"
              >
                Unsubscribe
              </button>
            </div>
          </div>
        )}

        <div className="mt-10 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-medium text-gray-700 mb-3">
            How It Works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-blue-600 text-2xl mb-2">1</div>
              <h4 className="font-medium text-gray-800 mb-1">Set Preferences</h4>
              <p className="text-sm text-gray-600">
                Add your favorite food types or specific dishes you're interested
                in.
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-purple-600 text-2xl mb-2">2</div>
              <h4 className="font-medium text-gray-800 mb-1">Get Notified</h4>
              <p className="text-sm text-gray-600">
                Receive notifications when foods matching your preferences are
                added.
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-green-600 text-2xl mb-2">3</div>
              <h4 className="font-medium text-gray-800 mb-1">Act Quickly</h4>
              <p className="text-sm text-gray-600">
                Request foods before they're gone to help reduce food waste.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;