import { Helmet } from "react-helmet-async";
import Cover from "../../Shared/Cover/Cover";
import menuImg from "../../../assets/menu/banner3.jpg"
import dessertImg from "../../../assets/menu/dessert-bg.jpeg"
import pizzaImg from "../../../assets/menu/pizza-bg.jpg"
import saladImg from "../../../assets/menu/salad-bg.jpg"
import soupImg from "../../../assets/menu/salad-bg.jpg"
import useMenu from "../../../Hooks/useMenu";
import SectionTitle from "../../../Components/SectionTitle";
import MenuCategory from "../MenuCategory/MenuCategory";

const Menu = () => {
     const [menu] = useMenu();
     const desserts = menu.filter((item) => item.category === "dessert");
     const salad = menu.filter((item) => item.category === "salad");
     const soup = menu.filter((item) => item.category === "soup");
     const pizza = menu.filter((item) => item.category === "pizza");
     const offered = menu.filter((item) => item.category === "offered");
     
     return (
       <div>
         <Helmet>
           <title>Bistro Boss | Menu</title>
         </Helmet>
         <Cover title="Our Menu" img={menuImg} />
         {/* main cover */}
         <SectionTitle
           heading="Today's Offer"
           subHeading="Don't Miss"
         ></SectionTitle>
         {/* offered items */}
         <MenuCategory items={offered}></MenuCategory>
         {/* dessert items */}
         <MenuCategory
           coverImg={dessertImg}
           items={desserts}
           title="Dessert"
         ></MenuCategory>
         <MenuCategory
           coverImg={pizzaImg}
           items={pizza}
           title="Pizza"
         ></MenuCategory>
         <MenuCategory
           coverImg={saladImg}
           items={salad}
           title="salad"
         ></MenuCategory>
         <MenuCategory
           coverImg={soupImg}
           items={soup}
           title="soup"
         ></MenuCategory>
       </div>
     );
};

export default Menu;