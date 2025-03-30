import { Link } from "react-router-dom";
import React from "react"

  export const Moviescard = ({ movies }) => {


    return (
      <div className="relative w-72 max-w-sm bg-white border overflow-hidden border-gray-200 rounded-3xl drop-shadow-2xl dark:drop-shadow-none dark:bg-neutral-950 dark:border-neutral-900 mb-6">

        <span className="absolute top-0 right-0 bg-[#F8B319] text-zinc-900 text-xl font-extrabold px-4 py-1.5 rounded-tr-2xl rounded-bl-2xl shadow-md">
        4.1
        </span>

        <div className="w-full h-64 overflow-hidden rounded-t-3xl mb-2">
        <Link to={`/moviesDetails/${movies?._id}`}>
          <img className="rounded-b-xs w-full h-full object-cover" 
          src={movies?.image} alt={movies?.title} />
        </Link>
        </div>

        <div className="px-5 pb-4">
          <Link to={`/moviesDetails/${movies?._id}`}>
            <h5 className="text-lg tracking-wide text-gray-900 dark:text-white">
              {movies.title}
            </h5>
          </Link>
          <div className="flex items-center justify-between">
            <span className="text-[13px] pt-1 font-bold text-gray-900 dark:text-[#f9f9f9] first-letter:uppercase">{movies?.genre}</span>
          </div>
          <div className="flex items-center justify-between">
          <span className="text-[13px] text-[#f9f9f96a] pt-1">{movies?.formattedReleaseDate}</span>
          </div>
        </div>
      </div>
    )
  }
  


