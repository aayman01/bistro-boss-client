import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";

const SignUp = () => {
    const { createUser } = useAuth();
    const {
       register,
       handleSubmit,
       formState: { errors },
    } = useForm();
     

    const onSubmit = (data) => {
        console.log(data)
        createUser(data.email,data.password)
        .then(result => {
            console.log(result.user)
        })
        .catch(err => {
            console.log(err.message)
        })
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
                Provident cupiditate voluptatem et in. Quaerat fugiat ut
                assumenda excepturi exercitationem quasi. In deleniti eaque aut
                repudiandae et a id nisi.
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
                      Password should have one upper vase one lower case a
                      number and a special character
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
            </div>
          </div>
        </div>
      </>
    );
};

export default SignUp;