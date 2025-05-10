import { useFetch } from "@/hooks/useFetch";
import { Plus, Star } from 'lucide-react';
import { useState } from "react";
import { ReviewDialog } from "./ReviewDialog";
import { axiosInstance } from "@/config/axiosInstance";
import toast from "react-hot-toast";

export const UserReviews = () => {
  
  const [userDetails, isProfileLoading] = useFetch("/user/profile");
  const userId = userDetails?._id;
  
  // only fetch reviews once profile is loaded
  const [reviewData, isReviewLoading, reviewError] = useFetch(
    userId ? `/reviews/user-reviews/${userId}` : null
  )

  const [open, setOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  const handleOpenReview = (review) => {
    setSelectedReview(review);
    setOpen(true);
  };

  const deleteReview = async (reviewId) => {
    try {
    const confirm = window.confirm("Are you sure you want to delete this review?")
    if (!confirm) return
      
      await axiosInstance.delete(`reviews/delete-review/${reviewId}`)
      toast.success("Review deleted successfully")
      window.location.reload()
    } catch (error) {
      console.error("Failed to delete review:", error)
      toast.error("Failed to delete review. Try again!")
    }
  }

  if (isProfileLoading || isReviewLoading || !userId) {
    return <div className="text-center">Loading reviews...</div>;
  }

  if (reviewError) {
    console.error("Error fetching reviews:", reviewError);
    return <div className="text-center">Error loading reviews or no reviews found...</div>;
  }

  return (
    <div className="mx-auto max-w-7xl px-2 pb-2 sm:px-8">
        <h2 className="text-2xl font-semibold mb-1">My Reviews</h2>
        <span className="inline-flex items-center rounded-md bg-yellow-100 px-2 py-1 text-sm font-medium text-yellow-700 ring-1 ring-yellow-600/20 ring-inset">{reviewData.length} reviews</span>
        <ul role="list" className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-2">
        {reviewData?.length > 0 ? (
          reviewData.map((review) => (
            <li
              key={review._id} // or some unique field
              className="col-span-1 flex flex-col divide-y divide-yellow-300 rounded-lg bg-white dark:bg-[#000000] text-center shadow-sm ring-1 ring-gray-900/5 dark:ring-gray-200/10 border border-amber-200"
            >
              <div className="flex flex-1 flex-col p-3">
                <img
                  alt="Reviewed item"
                  src={review?.movieId.image || "/placeholder.png"}
                  className="mx-auto size-44 shrink-0 rounded object-cover"
                />
                <h3 className="mt-2 text-base font-semibold text-gray-900 dark:text-gray-200">{review.movieId.title}</h3>
                <dl className="mt-0.5 flex grow flex-col justify-between">
                  <dt className="sr-only">Rating</dt>
                  <dd className="text-sm text-gray-600 dark:text-gray-300 font-semibold"> 
                  Your Rating <Star fill="yellow" color="#f8b319" size={13} className="inline-block"/> : {review.rating}/5</dd>
                  {/* <dt className="sr-only">Review</dt>
                  <dd className="mt-3 text-sm text-gray-500 italic">{review.comment}</dd> */}
                </dl>
              </div>
              <div className="mb-1">
                <div className="-mt-px flex">
                  <div className="flex w-0 flex-1">
                    <button
                      onClick={() => handleOpenReview(review)}
                      className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-2 rounded-bl-lg border border-transparent py-2 text-sm font-semibold text-blue-800 dark:text-blue-400"
                    >View Review
                      <Plus className="size-4 text-blue-800 dark:text-blue-400"/>
                    </button>
                  </div>
                </div>

                  <button className="text-sm text-red-400"
                  onClick={() => deleteReview(review._id)}
                  >Delete Review
                  <svg className="ml-1 inline-block w-[22px] h-[22px] text-red-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z" clipRule="evenodd"/>
                  </svg>
                  </button>
              </div>
            </li>
          ))
        ) : (
          <p className="col-span-full text-left text-gray-500">You haven't posted any reviews yet.</p>
        )}
      </ul>

      <ReviewDialog open={open} onOpenChange={setOpen} review={selectedReview}/>  

    </div>
  )
}
