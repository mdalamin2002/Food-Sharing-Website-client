import { useState } from "react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import Swal from "sweetalert2";

// --- Initial example reviews (Food Sharing context) ---
const initialReviews = [
  {
    name: "Hasan Ahmed",
    role: "Donor",
    rating: 5,
    text: "I used to waste extra restaurant meals. Now I donate through Food Sharing every week!",
  },
  {
    name: "Nusrat Jahan",
    role: "Receiver",
    rating: 4,
    text: "As a student living in a hostel, I’ve saved so much by requesting surplus meals. Easy & helpful!",
  },
  {
    name: "Rafiul Islam",
    role: "Volunteer",
    rating: 5,
    text: "Coordinating pickups has never been this simple. The platform keeps everything organized.",
  },
  {
    name: "Shila Akter",
    role: "Receiver",
    rating: 5,
    text: "Fresh home-cooked meals from nearby families—what a kind community!",
  },
  {
    name: "Kamal Uddin",
    role: "Donor",
    rating: 4,
    text: "I love how I can schedule pickup times and track who received the food.",
  },
];

export default function FoodReviews() {
  const [reviews, setReviews] = useState(initialReviews);
  const [showAll, setShowAll] = useState(false);
  const [newReview, setNewReview] = useState({
    name: "",
    role: "Receiver",
    rating: 5,
    text: "",
  });

  // handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prev) => ({ ...prev, [name]: value }));
  };

  // rating change (select)
  const handleRatingChange = (e) => {
    setNewReview((prev) => ({ ...prev, rating: Number(e.target.value) }));
  };

  // submit new review
  const handleSubmit = (e) => {
    e.preventDefault();

    // basic validation (already required in JSX)
    const formatted = {
      ...newReview,
      rating: Number(newReview.rating),
      name: newReview.name.trim() || "Anonymous",
    };

    setReviews((prev) => [formatted, ...prev]);

    Swal.fire("Submitted!", "Your review has been submitted.", "success");

    setNewReview({
      name: "",
      role: "Receiver",
      rating: 5,
      text: "",
    });
  };

  // which reviews to show?
  const visibleReviews = showAll ? reviews : reviews.slice(0, 3);

  return (
    <section className="py-16 my-32 bg-green-50 text-green-900">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
         Donation <span className="text-orange-500">Reviews</span>
        </h2>

        {/* Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {visibleReviews.map((review, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md flex flex-col items-start hover:shadow-lg transition"
            >
              <FaQuoteLeft className="text-orange-500 text-2xl mb-4" />
              <p className="text-sm mb-4 opacity-80 leading-relaxed">
                “{review.text}”
              </p>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar
                    key={i}
                    className={
                      i < review.rating
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>

              <div className="mt-auto">
                <h4 className="font-semibold">{review.name}</h4>
                <span className="text-xs text-orange-500">{review.role}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Add Review Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-md space-y-4 max-w-3xl mx-auto mb-8"
        >
          <h3 className="text-xl font-semibold mb-2 text-center text-green-800">
            Share Your Experience
          </h3>

          {/* Text */}
          <textarea
            name="text"
            placeholder="Write your review..."
            value={newReview.text}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
            rows={3}
            required
          ></textarea>

          {/* Name + Role + Rating */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input
              name="name"
              type="text"
              placeholder="Your Name (optional)"
              value={newReview.name}
              onChange={handleChange}
              className="input input-bordered w-full"
            />

            <select
              name="role"
              value={newReview.role}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="Donor">Donor</option>
              <option value="Receiver">Receiver</option>
              <option value="Volunteer">Volunteer</option>
            </select>

            <select
              name="rating"
              value={newReview.rating}
              onChange={handleRatingChange}
              className="select select-bordered w-full"
            >
              <option value={5}>★★★★★ (5)</option>
              <option value={4}>★★★★☆ (4)</option>
              <option value={3}>★★★☆☆ (3)</option>
              <option value={2}>★★☆☆☆ (2)</option>
              <option value={1}>★☆☆☆☆ (1)</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Submit Review
          </button>
        </form>

        {/* Show All / Show Less */}
        <div className="text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="btn btn-outline btn-secondary"
          >
            {showAll ? "Show Less" : "Show All Reviews"}
          </button>
        </div>
      </div>
    </section>
  );
}
