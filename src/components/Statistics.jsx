import { useEffect, useState } from "react";
import { FaHeart, FaRecycle, FaUsers, FaUtensils } from "react-icons/fa";

const Statistics = () => {
  const [counts, setCounts] = useState({
    users: 0,
    foodsShared: 0,
    livesImpacted: 0,
    co2Saved: 0
  });

  const targetCounts = {
    users: 5000,
    foodsShared: 12000,
    livesImpacted: 8500,
    co2Saved: 2500
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCounts(prev => {
        const newCounts = {...prev};
        let updated = false;
        
        Object.keys(targetCounts).forEach(key => {
          if (newCounts[key] < targetCounts[key]) {
            const increment = Math.ceil(targetCounts[key] / 100);
            newCounts[key] = Math.min(newCounts[key] + increment, targetCounts[key]);
            updated = true;
          }
        });
        
        if (!updated) {
          clearInterval(interval);
        }
        
        return newCounts;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const stats = [
    { icon: <FaUsers className="text-3xl" />, label: "Users", value: counts.users },
    { icon: <FaUtensils className="text-3xl" />, label: "Foods Shared", value: counts.foodsShared },
    { icon: <FaHeart className="text-3xl" />, label: "Lives Impacted", value: counts.livesImpacted },
    { icon: <FaRecycle className="text-3xl" />, label: "CO2 Saved (kg)", value: counts.co2Saved }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-green-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-green-800">
          Our Impact So Far ❤️
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-lg p-6 text-center flex flex-col items-center justify-center transition-transform hover:scale-105"
            >
              <div className="text-green-600 mb-4">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-green-700 mb-2">
                {stat.value.toLocaleString()}+
              </div>
              <div className="text-gray-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;