import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import SocialLogin from "../../Components/SocialLogin";

const SignUp = () => {
  const axiosPublic = useAxiosPublic();
  const { createUser, updateUserProfile } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password)
      .then(() => {
        updateUserProfile(data.name, data.photoURL)
          .then(() => {
            // create user entry to database
            const userInfo = {
              name: data.name,
              email: data.email,
            };
            axiosPublic.post("/users", userInfo).then((res) => {
              if (res?.data?.insertedId) {
                console.log("user added to the database")
                reset();
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Succesfully Logged in",
                  showConfirmButton: false,
                  timer: 1500,
                });
              }
            });
          })
          .catch();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <>
      <Helmet>
        <title>Bistro Boss || SignUp</title>
      </Helmet>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Sign Up Now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  name="name"
                  {...register("name", { required: true })}
                  type="text"
                  placeholder="Type your name"
                  className="input input-bordered"
                />
                {errors.name && (
                  <span className="text-red-500 mt-2">Name is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  {...register("photoURL", { required: true })}
                  type="text"
                  placeholder="PhotoURL"
                  className="input input-bordered"
                />
                {errors.photoURL && (
                  <span className="text-red-500 mt-2">
                    photo url is required
                  </span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  name="email"
                  {...register("email", { require: true })}
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                />
                {errors.name && (
                  <span className="text-red-500 mt-2">Email is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  name="password"
                  {...register("password", {
                    require: true,
                    minLength: 6,
                    maxLength: 20,
                    pattern:
                      /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/,
                  })}
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                {errors.password?.type === "required" && (
                  <p className="text-red-600 mt-2">Password is required</p>
                )}
                {errors.password?.type === "maxLength" && (
                  <p className="text-red-600 mt-2">
                    Password should be max 20 character
                  </p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-red-600 mt-2">
                    Password should be minimum 6 character
                  </p>
                )}
                {errors.password?.type === "pattern" && (
                  <p className="text-red-600 mt-2">
                    Password should have one upper vase one lower case a number
                    and a special character
                  </p>
                )}
              </div>
              <div className="form-control mt-6">
                <input
                  className="btn btn-primary"
                  type="submit"
                  value="Sign Up"
                />
              </div>
            </form>
            <div className="flex items-center justify-center">
              <SocialLogin />
            </div>
            <p className="text-center mb-4">
              <small>
                Already have an account?<Link to="/login">Log in</Link>
              </small>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
