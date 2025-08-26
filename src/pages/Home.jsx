import Banner from "../components/Banner";
import FoodReviews from "../components/FoodReviews";
import Footer from "../components/Footer";
import HowItWorks from "../components/HowItWorks";
import SalesPromotion from "../components/SalesPromotion";
import FeaturedFoods from "./FeaturedFoods";

const Home = () => {
  return (
    <>
      <Banner></Banner>
      <FeaturedFoods></FeaturedFoods>

      <FoodReviews></FoodReviews>

      <SalesPromotion></SalesPromotion>

      <HowItWorks></HowItWorks>

      <Footer></Footer>
    </>
  );
};

export default Home;
