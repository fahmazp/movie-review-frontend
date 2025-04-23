import { useEffect, useState } from "react";
import { axiosInstance } from "@/config/axiosInstance"; 
import { Link } from "react-router-dom"; 
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "react-hot-toast";
import { Clapperboard, Dot } from "lucide-react";
// import { Info } from "lucide-react";

export const WatchlistPage = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [createdAt, setCreatedAt] = useState("");

  const fetchWatchlist = async () => {
    try {
      const response = await axiosInstance.get("/watchlist/viewWatchlists");
      setWatchlist(response.data.watchlist || []);
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

  if (isLoading) return <p className="text-center mt-10">Loading your watchlist...</p>;

  if (watchlist.length === 0) {
    return <p className="text-center mt-10 text-gray-500 dark:text-gray-400">Your watchlist is empty!</p>;
  }

  return (
    <div className="max-w-screen-xl mx-auto mt-10 p-6">
      
      <h1 className="text-2xl sm:text-4xl font-bold mb-2.5">My Watchlist 
        <Clapperboard size={18} className="inline-block ml-2"/>
      </h1>
      
      <div className="flex items-center sm:gap-1 mb-5">
      <span className="inline-flex items-center rounded-md bg-yellow-100 dark:bg-yellow-400/20 px-2 py-1.5 text-sm font-semibold text-yellow-800 dark:text-yellow-500 ring-1 ring-inset ring-yellow-400/20">
      {watchlist.length} Titles
      </span>
      <span className="text-yellow-500">
        <Dot size={32}/>
      </span>
      {/* <span className="text-yellow-600 dark:text-yellow-500">Created at {new Date(createdAt).toLocaleDateString()}</span> */}
      <span className="inline-flex items-center gap-x-1.5 rounded-md bg-gray-500/20 px-2 py-1.5 text-sm font-medium text-yellow-600">
        <svg viewBox="0 0 6 6" aria-hidden="true" className="size-1.5 fill-gray-400">
          <circle r={3} cx={3} cy={3} />
        </svg>
        Created at {new Date(createdAt).toLocaleDateString()}
      </span>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {watchlist.map((movie) => (
          <Card key={movie._id} className="">
            <Link to={`/movies/${movie.movieId}`}>
              <CardContent className="p-4 flex flex-col items-center">
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="w-full h-60 object-cover rounded-md mb-3"
                />
                <h2 className="text-lg font-semibold text-center">{movie.title}</h2>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>

    </div>
  );
};
