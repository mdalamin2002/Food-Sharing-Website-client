import { useState } from "react";
import { FaBell, FaEnvelope } from "react-icons/fa";
import Swal from "sweetalert2";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter your email address!",
      });
      return;
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Email",
        text: "Please enter a valid email address!",
      });
      return;
    }

    // In a real app, you would send this to your backend
    // For now, we'll just simulate a successful subscription
    setIsSubscribed(true);
    setEmail("");
    
    Swal.fire({
      icon: "success",
      title: "Subscribed!",
      text: "Thank you for joining our community! You'll receive updates about food sharing opportunities.",
    });
    
    // Reset after 5 seconds
    setTimeout(() => {
      setIsSubscribed(false);
    }, 5000);
  };

  return (
    <section className="py-16 bg-gradient-to-r from-green-600 to-green-800 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-white bg-opacity-20 p-4 rounded-full">
              <FaBell className="text-3xl" />
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join Our Community 🤝
          </h2>
          
          <p className="text-green-100 text-lg mb-8">
            Subscribe to our newsletter and be the first to know about new food donations, 
            community events, and ways to make a difference.
          </p>
          
          {isSubscribed ? (
            <div className="bg-white bg-opacity-20 rounded-xl p-6">
              <FaEnvelope className="text-4xl mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Check Your Email!</h3>
              <p className="mb-4">
                We've sent a confirmation to your inbox. Please confirm your subscription to complete the process.
              </p>
              <p className="text-green-100">
                Thank you for joining our mission to reduce food waste and fight hunger!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <div className="flex-grow">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-6 py-4 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-300"
                />
              </div>
              <button
                type="submit"
                className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full shadow-lg transition duration-300 whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          )}
          
          <p className="text-green-100 text-sm mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;