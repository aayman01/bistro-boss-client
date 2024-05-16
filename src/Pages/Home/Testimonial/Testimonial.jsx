import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SectionTitle from "../../../Components/SectionTitle";
import { useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";

// Import styles
import "swiper/css";
import "swiper/css/navigation";
import "@smastrom/react-rating/style.css";


const Testimonial = () => {
  const [reviews, setReviews] = useState([]);
  console.log(reviews);
  useEffect(() => {
    fetch("reviews.json")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);
  return (
    <section className="my-20">
      <SectionTitle
        heading={"Testimonial"}
        subHeading={"What Our Client Say"}
      ></SectionTitle>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {reviews.map((review) => (
          <SwiperSlide key={review._id} review={review}>
            <div className="mx-24 my-16 flex flex-col items-center space-y-4">
              <Rating
                style={{ maxWidth: 180 }}
                value={review.rating}
                readOnly
              />
              <p className="my-6" >{review.details}</p>
              <h3 className="text-2xl text-orange-400">{review.name}</h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Testimonial;
