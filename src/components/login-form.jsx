import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { saveUser, clearUser } from "@/redux/userSlice";
// import axiosInstance from "@/utils/axiosInstance";
// import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginPageform({ role = "user", className, ...props }) {
  const { register, handleSubmit } = useForm();
  //   const navigate = useNavigate();
  // const dispatch = useDispatch();

  const user =
    role === "admin"
      ? {
          role: "admin",
          loginAPI: "/admin/login",
          profileRoute: "/admin/profile",
          signupRoute: "/admin/signup",
        }
      : {
          role: "user",
          loginAPI: "/user/login",
          profileRoute: "/user/profile",
          signupRoute: "/signup",
        };

  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    // try {
    //     const response = await axiosInstance.put(user.loginAPI, data);
    //     console.log("response====", response);
    //     dispatch(saveUser(response?.data?.data));
    //     toast.success("Login success");
    //     navigate(user.profileRoute);
    // } catch (error) {
    //     dispatch(clearUser());
    //     toast.error("Login Failed");
    //     console.log(error);
    // }
  };

  return (
    <div className={`flex flex-col gap-6 ${className}`} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground">Login to Honey Popcorn</p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="user@example.com"
                  {...register("email", { required: true })}
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  {...register("password", { required: true })}
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
              <div className="relative text-center text-sm">
                <span className="bg-card text-muted-foreground px-2">
                  Or continue with
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <Button variant="outline" type="button" className="w-full">
                  <span className="sr-only">Login with Google</span>
                  <svg
                    width="256"
                    height="262"
                    viewBox="0 0 256 262"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMidYMid"
                  >
                    <path
                      d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                      fill="#4285F4"
                    />
                    <path
                      d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                      fill="#34A853"
                    />
                    <path
                      d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                      fill="#FBBC05"
                    />
                    <path
                      d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                      fill="#EB4335"
                    />
                  </svg>
                </Button>
                <Button variant="outline" type="button" className="w-full">
                  <span className="sr-only">Login with Apple</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xml:space="preserve"
                    width="209"
                    height="256"
                    viewBox="0 0 814 1000"
                  >
                    <path
                      fill="#fff"
                      d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57-155.5-127C46.7 
                      790.7 0 663 0 541.8c0-194.4 126.4-297.5 250.8-297.5 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6
                       1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z"
                    />
                  </svg>
                </Button>
                <Button variant="outline" type="button" className="w-full">
                  <span className="sr-only">Login with Meta</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="256"
                    height="171"
                    preserveAspectRatio="xMidYMid"
                    viewBox="0 0 256 171"
                  >
                    <defs>
                      <linearGradient
                        id="a"
                        x1="13.878%"
                        x2="89.144%"
                        y1="55.934%"
                        y2="58.694%"
                      >
                        <stop offset="0%" stop-color="#0064E1" />
                        <stop offset="40%" stop-color="#0064E1" />
                        <stop offset="83%" stop-color="#0073EE" />
                        <stop offset="100%" stop-color="#0082FB" />
                      </linearGradient>
                      <linearGradient
                        id="b"
                        x1="54.315%"
                        x2="54.315%"
                        y1="82.782%"
                        y2="39.307%"
                      >
                        <stop offset="0%" stop-color="#0082FB" />
                        <stop offset="100%" stop-color="#0064E0" />
                      </linearGradient>
                    </defs>
                    <path
                      fill="#0081FB"
                      d="M27.651 112.136c0 9.775 2.146 17.28 4.95 21.82 3.677 5.947 9.16 8.466 14.751 8.466 7.211 0 13.808-1.79 26.52-19.372 10.185-14.092 22.186-33.874 30.26-46.275l13.675-21.01c9.499-14.591 20.493-30.811 33.1-41.806C161.196 4.985 172.298 0 183.47 0c18.758 0 36.625 10.87 
                      50.3 31.257C248.735 53.584 256 81.707 256 110.729c0 17.253-3.4 29.93-9.187 39.946-5.591 9.686-16.488 19.363-34.818 19.363v-27.616c15.695 0 19.612-14.422 19.612-30.927 0-23.52-5.484-49.623-17.564-68.273-8.574-13.23-19.684-21.313-31.907-21.313-13.22 0-23.859 9.97-35.815
                       27.75-6.356 9.445-12.882 20.956-20.208 33.944l-8.066 14.289c-16.203 28.728-20.307 35.271-28.408 46.07-14.2 18.91-26.324 26.076-42.287 26.076-18.935 0-30.91-8.2-38.325-20.556C2.973 139.413 0 126.202 0 111.148l27.651.988Z"
                    />
                    <path
                      fill="url(#a)"
                      d="M21.802 33.206C34.48 13.666 52.774 0 73.757 0 85.91 0 97.99 3.597 110.605 13.897c13.798 11.261 28.505 29.805 46.853 60.368l6.58 10.967c15.881 26.459 24.917 40.07 30.205 46.49 6.802 8.243 11.565 10.7 17.752 10.7 15.695
                       0 19.612-14.422 19.612-30.927l24.393-.766c0 17.253-3.4 29.93-9.187 39.946-5.591 9.686-16.488 19.363-34.818 19.363-11.395 0-21.49-2.475-32.654-13.007-8.582-8.083-18.615-22.443-26.334-35.352l-22.96-38.352C118.528 64.08 107.96 49.73 101.845 43.23c-6.578-6.988-15.036-15.428-28.532-15.428-10.923 0-20.2 7.666-27.963 19.39L21.802 33.206Z"
                    />
                    <path
                      fill="url(#b)"
                      d="M73.312 27.802c-10.923 0-20.2 7.666-27.963 19.39-10.976 16.568-17.698 41.245-17.698 64.944 0 9.775 2.146 17.28 4.95 21.82L9.027 149.482C2.973 139.413 0 126.202 0 111.148 0 83.772 7.514 55.24 21.802 33.206 34.48 13.666 52.774 0 73.757 0l-.445 27.802Z"
                    />
                  </svg>
                </Button>
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a
                  href={user.signupRoute}
                  className="underline underline-offset-4"
                >
                  Sign up
                </a>
              </div>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src="/images/Hexagon-login-svg.svg"
              alt="Background Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.5]"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground text-center text-xs">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
