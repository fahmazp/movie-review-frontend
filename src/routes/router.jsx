import { RootLayout } from "@/layout/RootLayout";
import { About } from "@/pages/user/About";
import { Home } from "@/pages/user/Home";
import { Profile } from "@/pages/user/Profile";
import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { ErrorPage } from "@/pages/shared/Error-page";
import { Movies } from "@/pages/user/Movies";
import { MoviesDetails } from "@/pages/user/MoviesDetails";
import { AdminLayout } from "@/layout/AdminLayout";
import { LoginPageform } from "@/components/shared/login-form";


export const router = createBrowserRouter([

  {
    path:"",
    element: <RootLayout/>,
    errorElement: <ErrorPage/>,
    children:[

        {
          path: "",
          element: <Home />,
        },
        {
          path: "about",
          element: <About/>
        },
        {
          path: "login",
          element: <LoginPageform/>
        },
        {
          path: "signup",
          element: <h1>Sign up</h1>
        },
        {
          path: "movies",
          element: <Movies/>
        },
        {
          path: "moviesDetails/:id",
          element: <MoviesDetails/>
        },
        {
          path: "user",
          element: <ProtectedRoutes/>,
          children: [
            {
              path: "profile",
              element: <Profile/>
            },
            {
              path: "watchlist",
              element: <h1>watchlist</h1>
            },
            {
              path: "password-change",
              element: <h1>passwordchange</h1>
            },
          ]
        },

    ],
  },

  {
    path:"admin",
    element: <AdminLayout/>,

    children:[
      {
        path: "login",
        element: <LoginPageform role="admin"/>
      },
      
    ]
  }
])