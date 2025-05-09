import React from "react"
import { Moviescard } from "@/components/user/MoviesCard"
import { MoviecardSkeltons } from "@/components/user/Skeltons"
import { BreadcrumbsLink } from "@/components/user/Breadcrumbs"
import { useFetch } from "@/hooks/useFetch"
import { CircleHelp } from "lucide-react"
import Pagination from "@/components/user/MoviesPagination"

export const Movies = ({ type }) => {
  
  const [movieData, isLoading, error] = useFetch(`/movie/allMovies?type=${type}`)

  
    if (isLoading) {
     return <MoviecardSkeltons/>
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-96">
          <h2 className="text-xl sm:text-2xl font-bold text-red-500">Oops! Something went wrong 
            <CircleHelp className="inline-block ml-1.5"/>
          </h2>
          <p className="text-xl font-bold text-red-500 mb-3">Try again</p>
          <p className="text-gray-600 dark:text-gray-400">{error.message || "Failed to load movies."}</p>
        </div>
      );
    }

  return (
    <>
      <BreadcrumbsLink/>
      <div className="mx-auto mt-16 max-w-7xl grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-5 px-2 sm:px-4">
      {movieData?.map((value)=>(
        <Moviescard movies={value} key={value?._id} />
      ))}
      </div>

      {/* <div className="flex justify-center mt-4">
      <button className="flex items-end gap-2">
      <span className="text-[#F8B319] underline underline-offset-2">Load more</span>
      <svg className="w-5 h-5 text-[#F8B319]  -mr-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7"/>
      </svg>
      <svg className="w-5 h-5 text-[#F8B319]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7"/>
      </svg>
      </button>
      </div> */}
      <Pagination />
    </>
  )
}
