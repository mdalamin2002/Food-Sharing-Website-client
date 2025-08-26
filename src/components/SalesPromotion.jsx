import React from "react";

const salesData = [
  {
    id: 1,
    title: "Summer Special Discount",
    description: "Get up to 30% off on all fresh foods this summer season.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    title: "Buy 2 Get 1 Free",
    description: "Buy any two canned goods and get one absolutely free!",
    image: "https://i.ibb.co.com/0jK9xmtw/360-F-1422936301-cx0a1fqnr-Hexy1x2-F7-Jq6fwq-Y9c5b6u-S.jpg",
  },
  {
    id: 3,
    title: "Free Delivery Over $50",
    description: "Enjoy free delivery when you shop for more than $50 worth of food items.",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=600&q=80",
  },
];

const SalesPromotion = () => {
  return (
    <section className="bg-white py-12 px-4 md:px-10 lg:px-20">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">Sales Promotions</h2>

      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {salesData.map(({ id, title, description, image }) => (
          <div
            key={id}
            className="bg-gray-50 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="h-48 w-full overflow-hidden">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
              <p className="text-gray-600">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SalesPromotion;