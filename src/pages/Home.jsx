import Banner from "../components/Banner";
import Footer from "../components/Footer";
import HowItWorks from "../components/HowItWorks";
import FeaturedFoods from "./FeaturedFoods";

const Home = () => {
  return (
    <>
      <Banner></Banner>
      <FeaturedFoods></FeaturedFoods>

      <HowItWorks></HowItWorks>

      <Footer></Footer>
    </>
  );
};

export default Home;
