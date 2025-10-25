import { useEffect, useState } from "react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Food Donor",
      content: "This platform has made it so easy for me to share excess food from my events. Knowing it goes to people who need it brings me joy!",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      rating: 5
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Community Volunteer",
      content: "As a volunteer, I've seen firsthand how this service connects donors with recipients. The impact on our community is incredible.",
      avatar: "https://randomuser.me/api/portraits/men/54.jpg",
      rating: 5
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      role: "Recipient",
      content: "During tough times, finding free meals through this platform was a blessing. The food is always fresh and delivered with care.",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      rating: 5
    },
    {
      id: 4,
      name: "David Wilson",
      role: "Restaurant Owner",
      content: "Our restaurant now donates surplus food daily. It's reduced our waste and helped feed families in need. A win-win situation!",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const renderStars = (count) => {
    return Array.from({ length: count }, (_, i) => (
      <FaStar key={i} className="text-yellow-400" />
    ));
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-green-800">
          Community Stories 💬
        </h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-green-50 rounded-2xl shadow-lg p-8 md:p-12">
            <div className="absolute top-6 left-6 text-green-500">
              <FaQuoteLeft className="text-4xl" />
            </div>
            
            <div className="pt-8">
              <div className="text-gray-700 text-lg md:text-xl mb-6 min-h-[120px] flex items-center">
                "{testimonials[currentIndex].content}"
              </div>
              
              <div className="flex items-center">
                <img 
                  src={testimonials[currentIndex].avatar} 
                  alt={testimonials[currentIndex].name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-green-500"
                />
                <div className="ml-4">
                  <h4 className="font-bold text-lg text-green-800">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-gray-600">
                    {testimonials[currentIndex].role}
                  </p>
                  <div className="flex mt-1">
                    {renderStars(testimonials[currentIndex].rating)}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full ${
                  index === currentIndex ? "bg-green-600" : "bg-gray-300"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;