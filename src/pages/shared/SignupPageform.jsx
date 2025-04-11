import { useForm } from "react-hook-form";
import { axiosInstance } from "@/config/axiosInstance";
import { useDispatch } from "react-redux";
import { saveUser } from "@/redux/features/userSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import logo from "../../assets/images/image 1.png";

export const SignupPageform = () => {

  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post("/user/signup", data);
      const userData = response.data.data;

      toast.success("Signup successful!");
      dispatch(saveUser(userData));

      if (userData.role === "admin") {
        navigate("/admin/profile");
      } else {
        navigate("/user/profile");
      }
    } catch (error) {
      console.error("Signup error:", error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-50">
        <body class="h-full">
        ```
      */}
      <div className="h-full">


      <div className="flex min-h-full flex-1 flex-col justify-center py-8 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            alt="Logo"
            src={logo}
            className="mx-auto h-12 w-auto"
          />
          <h2 className="mt-2 text-center text-2xl font-semibold tracking-tight">
            Create Your Account
          </h2>
        </div>

        <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-[480px] shadow-md dark:shadow-none rounded-2xl">
          <div className="bg-[#EDEEF0] dark:bg-[#DCDDDA] px-6 py-6 sm:rounded-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">

            <div>
                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                  First Name
                </label>
                <div className="">
                  <input
                    type="text"
                    placeholder="Name"
                    {...register("name")}
                    className="block w-full rounded-full bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-yellow-400 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                  Email address
                </label>
                <div className="">
                  <input
                    type="email"
                    placeholder="Email"
                    {...register("email")}
                    autoComplete="email"
                    className="block w-full rounded-full bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-yellow-400 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="mobile" className="block text-sm/6 font-medium text-gray-900">
                  Mobile
                </label>
                <div className="">
                <input
                  type="number"
                  placeholder="000-00-0000"
                  {...register("mobile")}
                  className="block w-full rounded-full bg-white py-1.5 pr-10 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-yellow-400 sm:pr-9 sm:text-sm/6"
                />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                  Password
                </label>
                <div className="">
                  <input
                    type="password"
                    placeholder="Password" 
                    {...register("password")}
                    className="block w-full rounded-full bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-yellow-400 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="confirm-password" className="block text-sm/6 font-medium text-gray-900">
                Confirm Password
                </label>
                <div className="">
                  <input
                    type="password"
                    placeholder="Confirm Password" 
                    {...register("confirmPassword")}
                    className="block w-full rounded-full bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-yellow-400 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="pt-1">
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-amber-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-yellow-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign Up
                </button>
              </div>
            </form>

            <div>
              <div className="relative mt-6">
                <div aria-hidden="true" className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>

              </div>
              <p className="text-center pt-2 text-sm/6 text-gray-500">
            Already have an account?{' '}
            <a href="#" className="text-indigo-600 hover:text-indigo-500">
                Login Here
              </a>
              </p>

            </div>

          </div>

          
        </div>
      </div>
      </div>
    </>
  )
}
