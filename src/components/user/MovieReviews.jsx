import { useFetch } from "@/hooks/useFetch";
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Star } from "lucide-react";

export const MovieReviews = ({ movieId }) => {
  console.log("movieId passed to MovieReviews:", movieId)
  const [reviews, isLoading, error] = useFetch(`/reviews/movie-reviews/${movieId}`);

  const [open, setOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
//   const reviews = data || [];
    
    if (isLoading) return <p className="text-center">Loading reviews...</p>
    if (error) return <p className="text-red-500 text-center">Error loading reviews</p>
    if (!Array.isArray(reviews) || reviews.length === 0) return <p className="text-center">No reviews yet!</p>

    const handleOpenReview = (review) => {
        setSelectedReview(review);
        setOpen(true);
      };

  return (
    <div className="mt-12 px-4 mx-auto 2xl:px-0">
      <h2 className="text-2xl text-center font-bold mb-4">Featured Reviews</h2>
      <Carousel className="w-full max-w-4xl mx-auto px-2 sm:px-4">
        <CarouselContent className="-ml-1">
          {reviews.map((review, index) => (
            <CarouselItem key={review._id || index} className="pl-1 md:basis-1/2 lg:basis-1/3 cursor-grab active:cursor-grabbing">
              <div className="p-2">
                <Card className="h-full">
                  <CardContent className="p-4 flex flex-col gap-2">

                    <div className="flex items-center gap-1.5">
                    <Star size={16} color="#f8b319" strokeWidth={1.5} />
                    <p className="text-base font-medium text-gray-900 dark:text-white">
                      {review?.userId?.name || "Anonymous"}
                    </p>
                    </div>  

                    <p className="text-sm text-gray-700 dark:text-gray-300 italic line-clamp-3">
                      "{review?.comment}"
                    </p>
                    <p className="text-sm text-[#f8b319] mt-auto">
                      Rated <strong>: {review.rating}/5</strong>
                    </p>
                    
                    <Button
                    variant="link"
                    className="mt-2 p-0 text-xs text-blue-600 hover:underline"
                    onClick={() => handleOpenReview(review)}
                  >
                    View Full Review
                    </Button>
                    
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />

      </Carousel>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl">
                Full Review by {selectedReview?.userId?.name || "Anonymous"}
            </DialogTitle>
          </DialogHeader>
          <div className="text-sm text-gray-800 dark:text-gray-300 whitespace-pre-wrap">
            {selectedReview?.comment}
          </div>

          <div className="text-xs font-semibold text-gray-600 dark:text-gray-500 mt-1.5">
          {new Date(selectedReview?.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
           })}
          </div>

        </DialogContent>
      </Dialog>

    </div>
  )
}
