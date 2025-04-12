import React from "react"
import { useFetch } from "@/hooks/useFetch"
import { Link, useParams } from "react-router-dom"
import { BreadcrumbsLink } from "@/components/user/Breadcrumbs"
import RippleButton from "@/components/user/ripple-btn"
import { Dot, DotIcon, Plus } from 'lucide-react';

export const MoviesDetails = () => {

  const params = useParams()
  console.log(params, "===use params");
  
  const [movieDetails, isLoading, error] = useFetch(`/movie/movieDetails/${params?.id}`) //url from backend 

  return (
    <div>
    <BreadcrumbsLink/>

<section className="py-8 md:py-16 antialiased">
<div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
  <div className="lg:grid lg:grid-cols-2 lg:gap-8">

    
    <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
      <div className="w-96 h-96 overflow-hidden rounded-2xl">
      <img className="p-0.5 w-full rounded-2xl h-full object-cover" src={movieDetails.image} alt="" />
      </div>
    </div>

    <div className="mt-6 sm:mt-8 lg:mt-0">
      <h1 className="text-xl font-semibold text-gray-900 sm:text-3xl dark:text-white">
    {movieDetails.title}
      </h1>

    <div className="flex mt-1.5">
      <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset">
      {movieDetails.duration}
      </span>
      {/* <Dot /> */}
      <Dot size={20} strokeWidth={2.75} />
      <span className="inline-flex items-center rounded-full bg-yellow-50 px-2 py-0.5 text-xs font-medium text-yellow-700 ring-1 ring-yellow-600/50 ring-inset">
      {movieDetails.formattedReleaseDate}
      </span>
    </div>

      <div className="my-2">
        <p className="text-xl font-extrabold text-gray-900 dark:text-white">{movieDetails.genre}</p>

        <div className="flex items-center gap-2 mt-1">
          <div className="flex items-center gap-1">
            <svg
              className="w-4 h-4 text-yellow-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
              />
            </svg>
            <svg
              className="w-4 h-4 text-yellow-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
              />
            </svg>
            <svg
              className="w-4 h-4 text-yellow-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
              />
            </svg>
            <svg
              className="w-4 h-4 text-yellow-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
              />
            </svg>
            <svg
              className="w-4 h-4 text-yellow-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
              />
            </svg>
          </div>
          <Link to={"/"}
            className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white"
          >
            345 Reviews
          </Link>
        </div>
      </div>

      <h3 className="underline underline-offset-4 mb-1">Description :</h3>
      <p className="mb-6 text-gray-700 dark:text-gray-300 first-letter:uppercase">
        {movieDetails.description}
      </p>

        <div className="mt-3">
          {movieDetails?.directedBy && (
            <p className="text-base text-[#2a2c32] font-semibold dark:text-gray-300 mt-1">
              <span className="font-semibold text-[#f8b319]">Director :</span> {movieDetails.directedBy}
            </p>
          )}
          {movieDetails?.cast && Array.isArray(movieDetails.cast) && (
            <p className="text-base text-[#2a2c32] font-semibold dark:text-gray-300">
              <span className="font-semibold text-[#f8b319]">Cast :</span> {movieDetails.cast.join(", ")}
            </p>
          )}
        </div>

      <div className="flex gap-4">
      <RippleButton textColor="dark:text-white"> <Plus size={20} strokeWidth={2.25} className="inline-block mr-1" />Watchlist</RippleButton>
      <RippleButton bgColor="border-[#F8B319] hover:bg-yellow-600" textColor="text-[#F8B319] hover:text-white" > Watch Trailer</RippleButton>
      </div>

    </div>

  </div>
</div>
</section>


    </div>

  
) }