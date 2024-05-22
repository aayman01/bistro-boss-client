import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useCart from "../Hooks/useCart";

const FoodCard = ({item}) => {
    const {name, image, recipe, price, _id} =item;
    const {user} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const [, refetch] = useCart();

    const handleAddCart = () => {
      // console.log(food)
      if(user && user.email){
        // add item to database
        const cartItem = {
          menuId : _id,
          email : user?.email,
          name,
          price,
          image
        }
        // console.log(cartItem)
        axiosSecure
          .post("/carts", cartItem)
          .then((res) => {
            console.log(res.data);
            if (res.data.insertedId) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: `${name} added your cart`,
                showConfirmButton: false,
                timer: 1500,
              });
              refetch();
            }
          });
      }
      else{
        Swal.fire({
          title: "You are not logged in",
          text: "Please login to add to the cart",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Login",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/login", { state: { from : location } });
          }
        });
      }
    }
    return (
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure>
          <img src={image} alt="item pic" />
        </figure>
        <p className="absolute bg-slate-900 text-white right-0 mt-4 mr-4 p-2 rounded-lg">
          ${price}
        </p>
        <div className="card-body flex flex-col items-center">
          <h2 className="card-title">{name}</h2>
          <p>{recipe}</p>
          <div className="card-actions justify-end">
            <button
              onClick={handleAddCart}
              className="btn btn-outline border-orange-400 bg-slate-100 border-0 border-b-2 mt-4"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    );
};

export default FoodCard;