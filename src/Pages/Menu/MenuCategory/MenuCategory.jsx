import Cover from "../../Shared/Cover/Cover";
import MenuItem from "../../Shared/MenuItem/MenuItem";

const MenuCategory = ({items, title, coverImg}) => {
   

    return (
      <div className="my-4">
        { title && <Cover title="Our Menu" img={coverImg} />}

        <div className="grid md:grid-cols-2 gap-5 my-16">
          {items.map((item) => (
            <MenuItem key={item._id} item={item}></MenuItem>
          ))}
        </div>
      </div>
    );
};

export default MenuCategory;