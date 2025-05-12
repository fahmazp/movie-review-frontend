import { useEffect, useState } from "react";
import { axiosInstance } from "@/config/axiosInstance";
import { useNavigate } from "react-router-dom";
import AddMovieDialog from "@/components/admin/AddMovieDialog";
import toast from "react-hot-toast";

const MoviesDashboard = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchMovies = async () => {
    try {
      const res = await axiosInstance.get("/movie/allMovies?limit=200");
      setMovies(res.data.data || []);
    } catch (err) {
      console.error("Error fetching movies:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [])

const handleDelete = async (movieId, title) => {
  const confirm = window.confirm(`Are you sure you want to delete "${title}"?`)
  if (!confirm) return

    try {
      await axiosInstance.delete(`movie/delete-movie/${movieId}`)
      toast.success(`"${title}" deleted successfully!`)
      fetchMovies();
    } catch (error) {
    console.error("Error deleting movie:", error);
    toast.error("Failed to delete movie. Check console.");
    }
}


  if (loading) return <p className="p-4">Loading movies...</p>;

  return (
    <div className="sm:p-6">
      <h2 className="text-2xl font-bold mb-4">Movies List</h2>
      <div className="w-full overflow-x-auto rounded border border-yellow-500">
        <table className="min-w-[700px] w-full table-auto text-sm">
          <thead className="bg-gray-200 dark:bg-gray-950 text-left">
            <tr>
              <th className="px-3 py-2">Title</th>
              <th className="px-3 py-2">Genre</th>
              <th className="px-3 py-2">Media Type</th>
              <th className="px-3 py-2">Release Year</th>
              <th className="px-3 py-2">Image</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2 text-center" colSpan="2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie._id} className="border-t bg-gray-100 dark:bg-gray-900">
                <td className="px-3 py-2 whitespace-nowrap">{movie.title}</td>
                <td className="px-3 py-2 whitespace-nowrap">{movie.genre}</td>
                <td className="px-3 py-2 whitespace-nowrap capitalize">{movie.media_type}</td>
                <td className="px-3 py-2 whitespace-nowrap">
                  {new Date(movie.releaseDate).getFullYear()}
                </td>
                <td className="px-4 py-2">
                  <img src={movie?.image} className="inline-block object-cover size-10 rounded" alt="" />
                </td>
                <td className="px-4 py-2">
                  {movie.isActive ? (
                    <span className="text-green-600 font-medium">Active</span>
                  ) : (
                    <span className="text-red-500 font-medium">Inactive</span>
                  )}
                </td>
                <td className="px-2 py-2 space-x-2">
                  <button
                    onClick={() => navigate(`/admin/movies/edit/${movie._id}`)}
                    className="px-2.5 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Edit
                  </button>
                </td>

                <td className="px-2 py-2 space-x-2">
                  <button
                    onClick={() => handleDelete(movie._id, movie.title)}
                    className="px-1.5 py-1 bg-red-500 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>

            
      <div className="flex sm:flex-row mt-3 justify-between gap-4">
      <p className="text-sm sm:text-base ">
        Total Movies: <strong>{movies.length}</strong>
      </p>

      <AddMovieDialog onMovieAdded={fetchMovies}/>
      </div>

    </div>
  );
};

export default MoviesDashboard;
