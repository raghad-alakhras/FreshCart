import { FaStar, FaRegStar, FaRegStarHalf } from "react-icons/fa";

interface StarRatingProps {
  rating: number; 
  maxStars?: number; 
}

export default function StarRating({ rating, maxStars = 5 }: StarRatingProps) {
  const stars = Array.from({ length: maxStars }, (_, i) => {
    const starIndex = i + 1;

    if (starIndex <= Math.floor(rating)) {
      // Full star
      return <FaStar key={i} className="text-yellow-400" />;
    } else if (starIndex === Math.ceil(rating) && rating % 1 >= 0.5) {
      // Half star (fraction >= 0.5)
      return <FaRegStarHalf key={i} className="text-yellow-400" />;
    } else {
      // Empty star
      return <FaRegStar key={i} className="text-yellow-400" />;
    }
  });

  return <div className="flex items-center gap-1">{stars}</div>;
}