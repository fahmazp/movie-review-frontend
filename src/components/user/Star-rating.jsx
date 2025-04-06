import { Star, StarHalf, StarOff } from "lucide-react";

export const StarRating = ({ rating, max = 5 }) => {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 !== 0;
  const emptyStars = max - fullStars - (hasHalf ? 1 : 0);

  return (
    <div className="flex items-center justify-center gap-0.5 text-yellow-500">
      {Array(fullStars).fill().map((_, i) => (
        <Star key={`full-${i}`} size={16} fill="currentColor" stroke="none" />
      ))}
      {hasHalf && <StarHalf size={16} />}
      {Array(emptyStars).fill().map((_, i) => (
        <StarOff key={`empty-${i}`} size={16} />
      ))}
    </div>
  );
};
