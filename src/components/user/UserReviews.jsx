import { useFetch } from "@/hooks/useFetch";
import { Plus } from 'lucide-react';

export const UserReviews = () => {
  
  const [userDetails, isProfileLoading] = useFetch("/user/profile");
  const userId = userDetails?._id;
  
  // only fetch reviews once profile is loaded
  const [reviewData, isReviewLoading, reviewError] = useFetch(
    userId ? `/reviews/user-reviews/${userId}` : null
  )


  if (isProfileLoading || isReviewLoading || !userId) {
    return <div className="text-center">Loading reviews...</div>;
  }

  if (reviewError) {
    console.error("Error fetching reviews:", reviewError);
    return <div className="text-center">Something went wrong fetching reviews or no reviews found...</div>;
  }

  return (
    <div className="mx-auto max-w-7xl px-2 pb-2 sm:px-8">
        <h2 className="text-2xl font-semibold mb-2">My Reviews</h2>
        <ul role="list" className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {reviewData?.length > 0 ? (
          reviewData.map((review) => (
            <li
              key={review._id} // or some unique field
              className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white dark:bg-[#000000] text-center shadow-sm ring-1 ring-gray-900/5 dark:ring-gray-200/10"
            >
              <div className="flex flex-1 flex-col p-3">
                <img
                  alt="Reviewed item"
                  src={review?.movieId.image || "/placeholder.png"}
                  className="mx-auto size-44 shrink-0 rounded object-cover"
                />
                <h3 className="mt-6 text-sm font-semibold text-gray-900 dark:text-gray-200">{review.movieId.title}</h3>
                <dl className="mt-1 flex grow flex-col justify-between">
                  <dt className="sr-only">Rating</dt>
                  <dd className="text-sm text-gray-600 dark:text-gray-300 font-semibold">Your Rating: {review.rating}/5</dd>
                  {/* <dt className="sr-only">Review</dt>
                  <dd className="mt-3 text-sm text-gray-500 italic">{review.comment}</dd> */}
                </dl>
              </div>
              <div>
                <div className="-mt-px flex divide-x divide-gray-200">
                  <div className="flex w-0 flex-1">
                    <button
                      disabled
                      className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-xs font-semibold text-gray-900 dark:text-gray-100"
                    >
                      View More
                      <Plus className="size-4 text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))
        ) : (
          <p className="col-span-full text-left text-gray-500">You haven't posted any reviews yet.</p>
        )}
      </ul>
    </div>
  )
}
