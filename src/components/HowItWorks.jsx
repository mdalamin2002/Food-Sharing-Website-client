const HowItWorks = () => {
  const steps = [
    {
      title: "Donate Extra Food",
      desc: "Share your surplus meals to reduce waste and help others.",
      img: "https://img.icons8.com/color/96/donation.png",
    },
    {
      title: "Request Food",
      desc: "Browse available food and request what you need.",
      img: "https://img.icons8.com/color/96/meal.png",
    },
    {
      title: "Pickup & Enjoy",
      desc: "Collect your food easily from the donor.",
      img: "https://img.icons8.com/color/96/food.png",
    },
  ];

  return (
    <section className="bg-green-50 py-16">
      <div className="max-w-7xl mx-auto text-center px-4">
        {/* Section Heading */}
        <h2 className="text-4xl font-bold mb-4 text-green-700">
          How It Works
        </h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          Our process is simple and transparent. Follow these 3 easy steps to share and request food.
        </p>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-10">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition hover:scale-105 h-full"
            >
              {/* Step Number Badge */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                {index + 1}
              </div>

              <img
                src={step.img}
                alt={step.title}
                className="mx-auto mb-4 w-20"
              />
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
