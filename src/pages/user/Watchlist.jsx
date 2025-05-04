import { useEffect, useState } from "react";
import { axiosInstance } from "@/config/axiosInstance"; 
import { Link } from "react-router-dom"; 
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "react-hot-toast";
import { Clapperboard, Dot, LoaderCircle, Star, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

export const WatchlistPage = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [createdAt, setCreatedAt] = useState("");

  const fetchWatchlist = async () => {
    try {
      const response = await axiosInstance.get("/watchlist/viewWatchlists");
      const watchlistData = response.data.watchlist || [];
  
      const enrichedWatchlist = await Promise.all(
        watchlistData.map(async (movie) => {
          try {
            const ratingRes = await axiosInstance.get(`/reviews/avg-rating/${movie.movieId}`);
            return { ...movie, rating: ratingRes.data.data };
          } catch {
            return { ...movie, rating: 0 }; // fallback if rating fails
          }
        })
      );
  
      setWatchlist(enrichedWatchlist);
      setCreatedAt(response.data.createdAt);
    } catch (error) {
      console.error("Error fetching watchlist:", error);
      toast.error("Failed to load your watchlist.");
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchWatchlist();
  }, []);

  const watchlistRemove = async (movieId) => {
    try {
      await axiosInstance.delete(`/watchlist/remove/${movieId}`)
      toast.success("Removed from watchlist!")
      fetchWatchlist()
    } catch (error) {
      console.error("Failed to remove movie:", error);
      toast.error("Failed to remove from watchlist.");
    }
  }

  if (isLoading) return <p className="text-center mt-10 flex justify-center items-center gap-2">
    Loading your watchlist...
    <LoaderCircle className="w-5 h-5 animate-spin text-yellow-500" />
    </p>;

  if (watchlist.length === 0) {
    return <p className="text-center mt-10 text-gray-500 dark:text-gray-400">Your watchlist is empty!</p>;
  }

  return (
    <div className="max-w-screen-xl mx-auto mt-1.5 md:mt-8 p-6">
      
      <h1 className="text-2xl sm:text-4xl font-bold mb-2.5">My Watchlist 
        <Clapperboard size={18} className="inline-block ml-2"/>
      </h1>
      
      <div className="flex items-center sm:gap-1 mb-5">
      <span className="inline-flex items-center rounded-sm bg-yellow-100 dark:bg-yellow-400/20 px-2 py-1.5 text-sm font-semibold text-yellow-800 dark:text-yellow-500 ring-1 ring-inset ring-yellow-400/20">
      {watchlist.length} Titles
      </span>
      <span className="text-yellow-500">
        <Dot size={32}/>
      </span>
      <span className="inline-flex items-center gap-x-1.5 rounded-sm bg-gray-500/20 px-2 py-1.5 text-sm font-medium text-yellow-600">
        <svg viewBox="0 0 6 6" aria-hidden="true" className="size-1.5 fill-gray-400">
          <circle r={3} cx={3} cy={3} />
        </svg>
        Created at {new Date(createdAt).toLocaleDateString()}
      </span>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {watchlist.map((movie) => (
          <Card key={movie._id} className="py-1 rounded-sm  hover:drop-shadow-xl transition duration-300">
              <CardContent className="p-3 flex flex-col items-center">
              <Link to={`/moviesDetails/${movie.movieId}`} className="w-full">
              <div className="relative w-full h-60 mb-3">
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="w-full h-full object-cover rounded-sm"
                />
              </div>
              </Link>    
              
                <div className="flex flex-col items-center gap-2 w-full">
                  <h2 className="text-base text-center md:truncate md:w-full">{movie.title}</h2>

                  <div className="flex items-center justify-between w-full">  
                  <span className="inline-flex items-center bg-gradient-to-r from-amber-100 to-yellow-400 ring-1 ring-yellow-500/50 text-neutral-900 text-[13px] px-2 py-1 rounded-sm shadow-md" 
                  id="logo-name">
                    <Star size={16} className="mr-1" color="#d97706" />
                    {movie.rating?.toFixed(1) || "N/A"}
                  </span>

                  <Button variant="destructive" 
                  onClick={() => watchlistRemove(movie.movieId)}
                  className="h-full w-20 md:w-10 rounded flex items-center justify-center hover:bg-red-800"> 
                  <Trash/>
                  </Button>
                  </div>

                </div>
              </CardContent>
          </Card>
        ))}
      </div>

    </div>
  );
};
