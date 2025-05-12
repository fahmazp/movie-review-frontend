import React, { useState, useEffect } from "react"
import { Moviescard } from "@/components/user/MoviesCard"
import { MoviecardSkeltons } from "@/components/user/Skeltons"
import { BreadcrumbsLink } from "@/components/user/Breadcrumbs"
import { CircleHelp } from "lucide-react"
import { PaginationDemo } from "@/components/user/MoviesPagination"
import { axiosInstance } from "@/config/axiosInstance"

export const Movies = ({ type }) => {
  const [movieData, setMovieData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMovies = async (page = 1) => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.get(`/movie/allMovies?type=${type}&page=${page}&limit=20`);
      setMovieData(res.data.data);
      setTotalPages(res.data.totalPages);
      setCurrentPage(res.data.currentPage);
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage, type]);

  if (isLoading) return <MoviecardSkeltons />;

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <h2 className="text-xl sm:text-2xl font-bold text-red-500">
          Oops! Something went wrong <CircleHelp className="inline-block ml-1.5" />
        </h2>
        <p className="text-xl font-bold text-red-500 mb-3">Try again</p>
        <p className="text-gray-600 dark:text-gray-400">{error.message || "Failed to load movies."}</p>
      </div>
    );
  }

  return (
    <>
      <BreadcrumbsLink />
      <div className="mx-auto mt-16 max-w-7xl grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 mb-2 md:mb-5 sm:gap-5 px-2.5 sm:px-4">
        {movieData.map((value) => (
          <Moviescard movies={value} key={value._id} />
        ))}
      </div>
      <PaginationDemo
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </>
  );
};
