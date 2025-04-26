import { useState } from "react"
import { axiosInstance } from "@/config/axiosInstance"
import toast from "react-hot-toast"
import { Star } from "lucide-react"
import confetti from "canvas-confetti"

export const PostReview = ({ movieId, onReviewSubmitted }) => {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [comment, setComment] = useState("")
  const [loading, setLoading] = useState(false)

  const triggerStarConfetti = () => {
    const defaults = {
      spread: 180,
      ticks: 120,
      gravity: 0,
      decay: 0.92,
      startVelocity: 30,
      colors: ["#FFE400", "#FFBD00", "#E89400", "#FFCA6C", "#FDFFB8"],
    };

    const shoot = () => {
      confetti({
        ...defaults,
        particleCount: 15,
        scalar: 1.2,
        shapes: ["star"],
      });

      confetti({
        ...defaults,
        particleCount: 10,
        scalar: 0.75,
        shapes: ["circle"],
      });
    };

    // shoot();
    // setTimeout(shoot, 100);
    // setTimeout(shoot, 200);
    const intervals = [0, 100, 200];

    intervals.forEach((delay) => {
      setTimeout(shoot, delay);
    });
        
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      const response = await axiosInstance.post("/reviews/add-review", {
        movieId,
        rating,
        comment,
      })

      toast.success("Review submitted successfully!")
      setComment("")
      setRating(0)

      // setShowConfetti(true);
      // setTimeout(() => {
      //   setShowConfetti(false);
      // }, 3000);
      triggerStarConfetti()

      // Optional: Refresh the review list
      onReviewSubmitted?.()

    } catch (error) {
      console.error("Submit review error:", error.response?.data?.message || error.message)
      toast.error(error.response?.data?.message || "Failed to submit review. Try again later.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative">

    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Rating input */}
      <div>
        <label className="block text-sm font-medium">Rating (1–5)</label>
        <div className="flex items-center space-x-1">
          {[...Array(5)].map((_, index) => {
            const currentRating = index + 1
            return (
              <button
              key={index}
                type="button"
                onClick={() => setRating(currentRating)}
                onMouseEnter={() => setHover(currentRating)}
                onMouseLeave={() => setHover(0)}
                className=" focus:outline-none"
                >
                <Star
                  className={`
                    w-8 h-8
                    transition-colors duration-200 
                    ${currentRating <= (hover || rating)
                      ? 'text-amber-400'
                      : 'text-gray-400'}
                      `}
                      />
              </button>
            )
          })}
        </div>
      </div>

      {/* Comment input */}
      <div>
        <label className="block text-sm font-medium">Comment</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="border-2 p-2 rounded-md w-full h-24 border-amber-500 focus:outline-none focus:border-zinc-600"
          placeholder="Write your thoughts..."
          required
          />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </form>
    </div>
  )
}
