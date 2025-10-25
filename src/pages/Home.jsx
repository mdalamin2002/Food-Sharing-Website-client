import Banner from "../components/Banner";
import FoodReviews from "../components/FoodReviews";
import Footer from "../components/Footer";
import HowItWorks from "../components/HowItWorks";
import JoinMission from "../components/JoinMission";
import Newsletter from "../components/Newsletter";
import SalesPromotion from "../components/SalesPromotion";
import Statistics from "../components/Statistics";
import Testimonials from "../components/Testimonials";
import FeaturedFoods from "./FeaturedFoods";

const Home = () => {
  return (
    <>
      <Banner></Banner>
      <Statistics></Statistics>
      <FeaturedFoods></FeaturedFoods>
      <Testimonials></Testimonials>
      <FoodReviews></FoodReviews>
      <SalesPromotion></SalesPromotion>
      <HowItWorks></HowItWorks>
      <Newsletter></Newsletter>
      <JoinMission></JoinMission>
      <Footer></Footer>
    </>
  );
};

export default Home;