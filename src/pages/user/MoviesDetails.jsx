import React, { useState } from "react"
import { useFetch } from "@/hooks/useFetch"
import { useParams } from "react-router-dom"
import { BreadcrumbsLink } from "@/components/user/Breadcrumbs"
import { axiosInstance } from "@/config/axiosInstance"
import { MovieReviews } from "@/components/user/MovieReviews"
import { PostReview } from "@/components/user/PostReview"
import RippleButton from "@/components/user/ripple-btn"
import { Check, Dot, Play, Plus } from 'lucide-react';
import toast from "react-hot-toast"
import { Confetti } from "@/components/magicui/confetti"

export const MoviesDetails = () => {

  const params = useParams()

  const [movieDetails, isLoading, error] = useFetch(`/movie/movieDetails/${params?.id}`) //url from backend 
  const [avgRating, isRatingLoading, ratingError] = useFetch(`/reviews/avg-rating/${params?.id}`)
  const [reviews, isReviewsLoading, reviewsError] = useFetch(`/reviews/movie-reviews/${params?.id}`);

  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // const confettiRef = useRef(null);

  const handleAddToWatchlist = async () => {
    try {
      const payload = {
        movieId: movieDetails._id,
        title: movieDetails.title,     
        posterUrl: movieDetails.image, //passing movie image as posterUrl
      }
  
      const response = await axiosInstance.post("/watchlist/addToWatchlist", payload);
      console.log("Watchlist Response:", response.data);

      toast.success("Added to Watchlist!");
      setIsInWatchlist(true);
      
      setShowConfetti(true); 
      setTimeout(() => {
        setShowConfetti(false);
      }, 3000);

    } catch (error) {
      console.error("Error adding to watchlist:", error.response?.data?.message || error.message)

      if (error.response?.status === 401) {
        toast.error("Please login to add movies to your Watchlist!");
      }
      else {
        toast.error(error.response?.data?.message || "Failed to add to Watchlist. Try again later.");
      }
    }
  }

  return (
    <div className="relative">

  {showConfetti && (
      <Confetti className="absolute left-0 top-0 z-0 size-full" />
  )}
      <BreadcrumbsLink />

      <section className="py-8 md:py-16 antialiased">
        <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
          <div className="lg:grid lg:grid-cols-2 mb-5">

            <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
              <div className="w-full h-116 lg:w-80 lg:h-96 overflow-hidden rounded-3xl">
                <img className="p-0.5 w-full rounded-3xl h-full object-cover" src={movieDetails.image} loading="lazy" alt="" />
              </div>
            </div>

            <div className="mt-6 sm:mt-8 lg:mt-0 lg:-m-4">
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
              <p className="text-base sm:text-lg font-extrabold text-gray-900 dark:text-white">{movieDetails.genre}</p>

                <div className="flex items-center gap-2 sm:gap-3.5 mt-1">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} 
                      className={`w-5 h-5 ${
                        avgRating >= star ? "text-yellow-400" : "text-gray-300"
                      }`}
                      fill="currentColor"
                       viewBox="0 0 24 24">
                        <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>
                      </svg>
                    ))}
                  </div>

                  {isRatingLoading ? (
                    <span className="text-sm text-gray-500 dark:text-gray-300">Loading rating...</span>
                  ) : ratingError ? (
                    <span className="text-sm text-red-500">Rating unavailable</span>
                  ) : (
                    <span className="text-base font-bold text-gray-900 dark:text-white">
                      {avgRating?.toFixed(1)} / 5
                    </span>
                  )}
                </div>

                <div>
                  <span className="text-yellow-600 dark:text-yellow-300"> ({reviews?.length ?? 0} reviews)</span>
                </div>

              </div>

              <div className="">
                <p className="text-gray-700 dark:text-gray-300 first-letter:uppercase md:max-w-[95%]">
                  {movieDetails.description}
                </p>
              </div>

              <div className="my-2.5">
                {movieDetails?.directedBy && (
                  <p className="text-base text-[#2a2c32] font-semibold dark:text-gray-300 mt-1 md:max-w-[95%]">
                    <span className="font-semibold text-[#f8b319]">Director :</span> {movieDetails.directedBy}
                  </p>
                )}
                {movieDetails?.cast && Array.isArray(movieDetails.cast) && (
                  <p className="text-base text-[#2a2c32] font-semibold dark:text-gray-300 md:max-w-[95%]">
                    <span className="font-semibold text-[#f8b319]">Cast :</span> {movieDetails.cast.join(", ")}
                  </p>
                )}
              </div>

              <div className="flex gap-4">
                <RippleButton 
                bgColor="border-[#F8B319] hover:bg-yellow-600" 
                textColor="text-[#F8B319] hover:text-white" 
                onClick={handleAddToWatchlist}
                disabled={isInWatchlist}
                > 
               {isInWatchlist ? (
                 <>
                   <Check size={20} strokeWidth={2.25} className="inline-block mr-1" /> {/* tick icon */}
                   Added
                 </>
               ) : (
                 <>
                   <Plus size={20} strokeWidth={2.25} className="inline-block mr-1" /> {/* plus icon */}
                   Watchlist
                 </>
               )}
                </RippleButton>

                <RippleButton textColor="text-white"> 
                  <Play size={16} strokeWidth={2} className="inline-block mr-1" />
                  Watch Trailer</RippleButton>
              </div>

            </div>

          </div>

          {/*reviews carousel  */}
          <MovieReviews movieId={params.id} />

          <div className="mt-12 w-full max-w-lg mx-auto">
          <h2 className="text-2xl text-center font-bold mb-4">Drop Your Review</h2>

           {/* post review and rating */}
          <PostReview  movieId={params.id} />

          </div>

        </div>
      </section>


    </div>

  )
}