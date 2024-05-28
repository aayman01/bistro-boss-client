import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../../Components/SectionTitle";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateItem = () => {
  const { name, category, recipe, price, _id } = useLoaderData();
  console.log(name)
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    // image upload to imagebb and get url
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log(res.data);
    if (res.data.success) {
      // now send the menu item data to the server with the img url
      const menuItem = {
        name: data.name,
        category: data.category,
        price: parseFloat(data.price),
        recipe: data.recipe,
        image: res?.data?.data?.display_url,
      };
      const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem);
      console.log(menuRes.data);
      if (menuRes.data.modifiedCount >0) {
        reset();
        // show a success a popPup
        Swal.fire({
          title: "Added!",
          text: `${data.name} Updated in menu`,
          icon: "success",
        });
      }
    }
  };

  return (
    <div>
      <SectionTitle
        heading="update an item"
        subHeading="Refresh Info"
      ></SectionTitle>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="form-control w-full my-6">
            <div className="label">
              <span className="label-text">Recipe name*</span>
            </div>
            <input
              type="text"
              defaultValue={name}
              placeholder="Recipe name"
              {...register("name", { required: true })}
              className="input input-bordered w-full"
            />
            {errors.name && (
              <span className="text-red-500 mt-2">Name is required</span>
            )}
          </label>
          <div className="flex items-center gap-5">
            {/* category */}
            <label className="form-control w-full mb-4">
              <div className="label">
                <span className="label-text">Category name*</span>
              </div>
              <select
                defaultValue={category}
                {...register("category", { required: true })}
                className="select select-bordered w-full"
              >
                <option disabled value="default">
                  Select a Category
                </option>
                <option value="Salad">Salad</option>
                <option value="Pizza">Pizza</option>
                <option value="Soup">Soup</option>
                <option value="Desert">Desert</option>
                <option value="Drinks">Drinks</option>
              </select>
            </label>

            {/* price */}
            <label className="form-control w-full mb-4">
              <div className="label">
                <span className="label-text">Price*</span>
              </div>
              <input
                type="number"
                defaultValue={price}
                placeholder="Price"
                {...register("price", { required: true })}
                className="input input-bordered w-full"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="form-control">
              <div className="label">
                <span className="label-text">Recipe Deatils</span>
              </div>
              <textarea
                defaultValue={recipe}
                {...register("recipe", { required: true })}
                className="textarea textarea-bordered h-24"
                placeholder="Recipe Deatils"
              ></textarea>
            </label>
          </div>
          <div className="mb-4">
            <input
              {...register("image", { required: true })}
              type="file"
              className="file-input w-full max-w-xs"
            />
          </div>
          <input
            className="bg-orange-400 p-3 btn rounded-lg text-white w-full font-bold"
            type="submit"
            value="Add"
          />
        </form>
      </div>
    </div>
  );
};

export default UpdateItem;
