import { RootLayout } from "@/layout/RootLayout";
import { Home } from "@/pages/user/Home";
import { Profile } from "@/pages/user/Profile";
import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { ErrorPage } from "@/pages/shared/Error-page";
import { Movies } from "@/pages/user/Movies";
import { MoviesDetails } from "@/pages/user/MoviesDetails";
import { LoginPageform } from "@/components/shared/login-form";
import { SignupPageform } from "@/pages/shared/SignupPageform";
import { AdminLayout } from "@/layout/AdminLayout";
import { AdminProfile } from "@/pages/admin/AdminProfile";
import { AdminProtectedRoutes } from "./AdminProtectedRoutes";
import { EditProfile } from "@/pages/user/EditProfile";
import { WatchlistPage } from "@/pages/user/Watchlist";
import { AdminDashboard } from "@/pages/admin/AdminDashboard";

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
          path: "login",
          element: <LoginPageform/>
        },
        {
          path: "signup",
          element: <SignupPageform />
        },
        {
          path: "movies",
          element: <Movies type="film" />
        },
        {
          path: "tv-shows",
          element: <Movies type="tv_show" />
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
              path: "edit-profile",
              element: <EditProfile />
            },
            {
              path: "watchlist",
              element: <WatchlistPage />
            },
            {
              path: "password-change",
              element: <h1>passwordchange</h1>
            },
          ]
        },

    ],
  },

  // {
  //   path:"admin",
  //   element: <AdminLayout/>,

  //   children:[
  //     {
  //       path: "login",
  //       element: <LoginPageform role="admin"/>
  //     },
  //     {
  //       element: <AdminProtectedRoutes />,
  //       children: [
  //         {
  //           path: "profile",
  //           element: <AdminProfile />,
  //         },
  //         {
  //           path: "users",
  //           element: <UsersManagementPage />,
  //         },
  //         {
  //           path: "movies",
  //           element: <MoviesManagementPage />,
  //         },
          
  //       ],
  //     },
      
  //   ]
  // }
  
  {
    path: "admin/login",
    element: <LoginPageform role="admin" />,
  },
  {
    path: "admin",
    element: (
      // <AdminProtectedRoutes>
        <AdminLayout />
      // </AdminProtectedRoutes>
    ),
    children: [
      {
        path: "",
        element: <AdminDashboard />
      },  
      {
        path: "profile",
        element: <AdminProfile />,
      },

    ],
  },

])