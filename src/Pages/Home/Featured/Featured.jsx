import SectionTitle from "../../../Components/SectionTitle";
import featuredImg from "../../../assets/home/featured.jpg";
import '../Featured/featured.css';

const Featured = () => {
  return (
    <div className="featured-item bg-fixed text-white my-20">
      <SectionTitle
        subHeading="Check Out Now"
        heading="Featured item"
      ></SectionTitle>
      <div className="md:flex justify-center items-center gap-8 p-8 px-16">
        <div>
          <img src={featuredImg} alt="" />
        </div>
        <div className="md:ml-10 space-y-3">
          <p>Aug 20, 2029</p>
          <p className="uppercase">WHERE CAN I GET SOME?</p>
          <p>
            orem ipsum dolor sit amet consectetur adipisicing elit. Error
            voluptate facere, deserunt dolores maiores quod nobis quas quasi.
            Eaque repellat recusandae ad laudantium tempore consequatur
            consequuntur omnis ullam maxime tenetur.
          </p>
          <button className="btn btn-outline border-0 border-b-4 text-white">Read More</button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
