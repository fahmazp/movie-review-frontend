import { useSelector } from "react-redux";
import { useFetch } from "@/hooks/useFetch";
import { SquareUser, Calendar, Smartphone } from 'lucide-react';
import { SkeletonUser } from "@/components/user/UserSkelton";
import { UserReviews } from "@/components/user/UserReviews";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export const Profile = () => {

  useEffect(() => {
    const adminInfo = localStorage.getItem("adminInfo");
    if (adminInfo) {
      navigate("/admin"); // or redirect them to dashboard
    }
  }, []);  

  const { isUserAuth, isCheckingAuth } = useSelector((state) => state.user);
  if (isCheckingAuth) return null

  if (!isUserAuth) return null

const [userDetails, isLoading, error] = useFetch("/user/profile")

    if (isLoading) {
     return <SkeletonUser/>
    }


//Date formatting function
const formatJoinDate = (dateString) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
  });
}


  return   (
    <div>
      
    <div className="mx-auto max-w-7xl lg:col-start-3 lg:row-end-1 mt-2 sm:mt-10 mb-8 px-2 sm:px-8">
      <h2 className="sr-only">Summary</h2>
      <div className="rounded-sm bg-gray-100 dark:bg-[#000000] ring-1 shadow-xs ring-gray-900/5 dark:ring-gray-100/10">
        <dl className="flex flex-wrap">
          <div className="pt-6 pl-6">
            <dt className="text-2xl/6 font-semibold pb-3">Profile</dt>
            {/* <dd className="mt-1 text-base font-semibold text-gray-900">$10,560.00</dd> */}
            <div className="flex sm:items-end gap-5 flex-col sm:flex-row">
              
            <img
              alt="profile pic"
              src={userDetails?.profiePic}
              className="inline-block size-24 rounded-full ring-2 ring-yellow-400 ring-offset-2 ring-offset-white dark:ring-offset-black"
            />
            <dt className="sr-only">Email</dt>
            <dd className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-base font-bold text-yellow-700 ring-1 ring-yellow-600/20 ring-inset">
            {userDetails?.email}
            </dd>
            </div>

          </div>

          <div className="mt-6 flex w-full flex-none gap-x-4 border-t border-gray-600/20 px-6 pt-6">
            <dt className="flex-none">
              <span className="sr-only">Name</span>
              <SquareUser aria-hidden="true" className="h-6 w-5 text-gray-400" />
            </dt>
            <dd className="text-base/6 font-medium text-gray-900 dark:text-gray-300">{userDetails?.name}</dd>
          </div>
          <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
            <dt className="flex-none">
              <span className="sr-only">Due date</span>
              <Calendar aria-hidden="true" className="h-6 w-5 text-gray-400" />
            </dt>
            <dd className="text-base/6 text-gray-500 dark:text-gray-400">
              <time dateTime="2023-01-31">Joined {formatJoinDate(userDetails?.createdAt)}</time>
            </dd>
          </div>
          <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
            <dt className="flex-none">
              <span className="sr-only">Mobile number</span>
              <Smartphone aria-hidden="true" className="h-6 w-5 text-gray-400" />
            </dt>
            <dd className="text-base/6 text-gray-500 dark:text-gray-400">{userDetails?.mobile}</dd>
          </div>
        </dl>
        <div className="mt-6 border-t border-gray-900/5 px-6 py-6">
          <Link to="/user/edit-profile" className="text-base font-bold text-gray-900 dark:text-gray-400 underline underline-offset-2 hover:text-amber-600 dark:hover:text-amber-500">
            Edit Profile 
            {/* <ArrowRight className="inline-block ml-0.5" size={20} strokeWidth={2} /> */}
          </Link>
        </div>
      </div>
    </div>
    
    <UserReviews />

    </div>
  )
}