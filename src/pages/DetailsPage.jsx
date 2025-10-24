import axios from "axios";
import { useContext, useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../providers/AuthProvider";

const DetailsPage = () => {
    const data = useLoaderData();
    // console.log(data);

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const [hover, setHover] = useState(0);

    const handleRequest = async () => {
  try {
    await axios.patch(`https://assigenment-11-server-wine.vercel.app/request/${data._id}`, {}, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    });
    //sweet alert2
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Request Sent Successfully",
      showConfirmButton: false,
      timer: 1500,
    })
    navigate(`/request`); 
    // ✅ navigate after request success
  } catch (error) {
    console.error(error);
  }
};

    const handleRatingSubmit = async (e) => {
        e.preventDefault();
        
        if (rating === 0) {
            Swal.fire("Error!", "Please select a rating.", "error");
            return;
        }
        
        try {
            const ratingData = {
                rating,
                review,
                userName: user?.displayName,
                userPhoto: user?.photoURL
            };
            
            await axios.post(
                `https://assigenment-11-server-wine.vercel.app/foods/${data._id}/rating`,
                ratingData,
                {
                    headers: {
                        Authorization: `Bearer ${user?.accessToken}`,
                    },
                }
            );
            
            Swal.fire("Success!", "Thank you for your rating!", "success");
            // Reset form
            setRating(0);
            setReview("");
            // Refresh the page to show new rating
            window.location.reload();
        } catch (error) {
            console.error(error);
            Swal.fire("Error!", "Failed to submit rating.", "error");
        }
    };


    return (
        <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="grid md:grid-cols-2 gap-8 bg-white rounded-2xl shadow-xl p-6">
        {/* Food Image */}
        <img
          src={data.image}
          alt={data.foodName}
          className="w-full h-72 object-cover rounded-lg"
        />

        {/* Food Info */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-green-800">{data.foodName}</h1>

          <div className="text-gray-700 space-y-1">
            <p>
              <strong>Quantity:</strong> {data.quantity}
            </p>
            <p>
              <strong>Pickup Location:</strong> {data.pickupLocation}
            </p>
            <p>
              <strong>Expire Date:</strong>{" "}
              <span className="text-red-600">
                {new Date(data.expireDate).toLocaleString()}
              </span>
            </p>
            {data.notes && (
              <p>
                <strong>Notes:</strong> {data.notes}
              </p>
            )}
          </div>

          {/* Donor Info
          <div className="mt-4 flex items-center gap-4">
            <img
              src={data.donorImage}
              alt="donor"
              className="w-14 h-14 rounded-full border-2 border-green-600"
            />
            <div>
              <p className="font-semibold text-gray-800">{data.donorName}</p>
              <p className="text-sm text-gray-500">{data.donorEmail}</p>
            </div>
          </div> */}

          {/* Request Button */}
       <button onClick={handleRequest}
            
            className="btn btn-success mt-6 w-full rounded-full"
          >
            Request  Food 🍽️
          </button>
          
          {/* Rating Section */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-xl font-bold text-green-800 mb-4">Rate this Food</h3>
            
            <form onSubmit={handleRatingSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Your Rating</label>
                <div className="flex">
                  {[...Array(5)].map((_, i) => {
                    const ratingValue = i + 1;
                    return (
                      <button
                        type="button"
                        key={i}
                        className={`text-2xl ${ratingValue <= (hover || rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                        onClick={() => setRating(ratingValue)}
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(0)}
                      >
                        ★
                      </button>
                    );
                  })}
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Your Review</label>
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  className="textarea textarea-bordered w-full"
                  rows="3"
                  placeholder="Share your experience with this food..."
                ></textarea>
              </div>
              
              <button type="submit" className="btn btn-success rounded-full">
                Submit Rating
              </button>
            </form>
          </div>
          
          {/* Display existing ratings */}
          {data.ratings && data.ratings.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-xl font-bold text-green-800 mb-4">Reviews</h3>
              <div className="space-y-4">
                {data.ratings.map((rating, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      {rating.userPhoto ? (
                        <img 
                          src={rating.userPhoto} 
                          alt={rating.userName} 
                          className="w-10 h-10 rounded-full object-cover" 
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                          {rating.userName.charAt(0)}
                        </div>
                      )}
                      <div>
                        <p className="font-semibold">{rating.userName}</p>
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <span key={i}>
                              {i < rating.rating ? '★' : '☆'}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600">{rating.review}</p>
                    <p className="text-sm text-gray-400 mt-1">
                      {new Date(rating.date).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    );
};

export default DetailsPage;