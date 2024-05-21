import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import Category from "../Category/Category";
import Featured from "../Featured/Featured";
import PopularMenu from "../PopularMenu/PopularMenu";
import Testimonial from "../Testimonial/Testimonial";
import useAuth from "../../../Hooks/useAuth";

const Home = () => {
  const {user} = useAuth();
  console.log(user)
    return (
      <div>
        <Helmet>
          <title>Bistro Boss | Home</title>
        </Helmet>
        <Banner />
        <div className="max-w-6xl mx-auto px-4">
          <Category />
          <PopularMenu />
        </div>
        <Featured />
        <div className="max-w-6xl mx-auto px-4">
          <Testimonial />
        </div>
      </div>
    );
};

export default Home;