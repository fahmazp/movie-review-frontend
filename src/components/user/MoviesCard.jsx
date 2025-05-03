import { Link } from "react-router-dom";
import React from "react"

  export const Moviescard = ({ movies }) => {


    return (
      <div className="relative w-full max-w-xs mx-auto bg-white border overflow-hidden border-gray-200 rounded-sm drop-shadow-2xl dark:drop-shadow-none dark:bg-neutral-950 dark:border-neutral-900 mb-6">

        <span className="absolute top-0 right-0 bg-[#F8B319] text-zinc-900 text-xl font-extrabold px-4 py-1.5 rounded-tr-sm rounded-bl-2xl shadow-md">
        {movies?.avgRating > 0 ? movies.avgRating.toFixed(1) : "N/A"}
        </span>

        <div className="w-full h-64 overflow-hidden rounded-t-sm mb-2">
        <Link to={`/moviesDetails/${movies?._id}`}>
          <img className="rounded-b-xs w-full h-full object-cover" 
          src={movies?.image} alt={movies?.title} />
        </Link>
        </div>

        <div className="px-2 pb-2">
          <Link to={`/moviesDetails/${movies?._id}`} className="group">
            <h5 className="text-lg tracking-wide text-gray-900 dark:text-white group-hover:text-yellow-700 dark:group-hover:text-orange-200 
                 transition-colors duration-200">
              {movies.title}
            </h5>
          </Link>
          <div className="flex items-center justify-between">
            <span className="text-[13px] pt-1 font-bold text-gray-900 dark:text-[#f9f9f9] first-letter:uppercase">{movies?.genre}</span>
          </div>
          <div className="flex items-center justify-between">
          <span className="text-[13px] text-stone-700 dark:text-[#f5c518] pt-1">{new Date(movies?.releaseDate).getFullYear()}</span>
          </div>
        </div>
      </div>
    )
  }
  


