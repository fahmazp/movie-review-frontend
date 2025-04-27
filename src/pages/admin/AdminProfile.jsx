// import React from "react";
// import { useSelector } from "react-redux";

// export const AdminProfile = () => {
//   const { userDetails } = useSelector((state) => state.user);

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-4">Welcome, Admin 👑</h1>
//       <p className="text-lg">Name: {userDetails?.name}</p>
//       <p className="text-lg">Email: {userDetails?.email}</p>
//       <p className="text-lg text-green-600 font-semibold">Role: {userDetails?.role}</p>
//     </div>
//   );
// };
export const AdminProfile = () => {
  return (
    <>
    <div className="fixed top-0 left-0 h-full w-full 
    bg-no-repeat bg-cover bg-center 
    opacity-8 dark:opacity-15 -z-10 
    dark:bg-gradient-to-r dark:from-black dark:via-black/70 dark:to-transparent
    bg-gradient-to-r from-white via-white/50 to-transparent"
    style={{ backgroundImage: "url('/images/Hexagon-bg.svg')", backdropFilter: "blur(4px)"}} />
      <h2 className="">AdminProfile123</h2>

      
      </>
  )
}