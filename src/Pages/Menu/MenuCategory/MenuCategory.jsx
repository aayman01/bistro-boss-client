import { Link } from "react-router-dom";
import Cover from "../../Shared/Cover/Cover";
import MenuItem from "../../Shared/MenuItem/MenuItem";

const MenuCategory = ({items, title, coverImg}) => {
   

    return (
      <div className="my-4">
        {title && <Cover title={title} img={coverImg} />}

        <div className="grid md:grid-cols-2 gap-5 my-16">
          {items.map((item) => (
            <MenuItem key={item._id} item={item}></MenuItem>
          ))}
        </div>
        <Link to={`/oder/${title}`}>
          <button className="btn btn-outline border-0 border-b-4 text-white">
            Oder Now
          </button>
        </Link>
      </div>
    );
};

export default MenuCategory;