import Lottie from "lottie-react";
import { Link } from "react-router";
import animation from "../assets/cooking.json"; // ✅ Change to your food sharing Lottie file

const Banner = () => {
  return (
    <section className="bg-gradient-to-r from-green-100 to-green-200 min-h-screen flex items-center justify-center">
      <div className="flex flex-col md:flex-row items-center justify-between w-11/12 mx-auto py-10">
        {/* Left Text Section */}
        <div className="space-y-6 text-center md:text-left max-w-xl">
         <h1 className="text-5xl font-extrabold leading-tight text-green-700">
  Share Food, Spread Love ❤️
</h1>
          <p className="text-lg text-gray-700">
            Donate extra food to help others and reduce waste.  
            Together we can fight hunger and create a better world.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">

            <Link to={"/add-food"}>
             <button className="btn bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full shadow-lg">
              Start Donating 🍲
            </button>
            
            </Link>
            
            <Link to={"/available-foods"}>
             <button className="btn bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full shadow-lg">
              See Available Foods
            </button>
            
            </Link>
            
           
          </div>
        </div>

        {/* Right Animation Section */}
        <div className="max-w-md mt-10 md:mt-0">
          <Lottie animationData={animation} loop={true} />
        </div>
      </div>
    </section>
  );
};

export default Banner;
