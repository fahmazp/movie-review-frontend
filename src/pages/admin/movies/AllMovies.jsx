// src/pages/admin/movies/AllMovies.jsx

import { useEffect, useState } from "react";
import { axiosInstance } from "@/config/axiosInstance";
import { useNavigate } from "react-router-dom";

const MoviesDashboard = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axiosInstance.get("/movie/allMovies");
        setMovies(res.data.data || []);
      } catch (err) {
        console.error("Error fetching movies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <p className="p-4">Loading movies...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Movies List</h2>
      <div className="overflow-x-auto rounded border border-yellow-500">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-gray-200 dark:bg-gray-950 text-left">
            <tr>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Genre</th>
              <th className="px-4 py-2">Media Type</th>
              <th className="px-4 py-2">Release Year</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie._id} className="border-t bg-gray-100 dark:bg-gray-900">
                <td className="px-4 py-2">{movie.title}</td>
                <td className="px-4 py-2">{movie.genre}</td>
                <td className="px-4 py-2 capitalize">{movie.media_type}</td>
                <td className="px-4 py-2">
                  {new Date(movie.releaseDate).getFullYear()}
                </td>
                <td className="px-4 py-2">
                  {movie.isActive ? (
                    <span className="text-green-600 font-medium">Active</span>
                  ) : (
                    <span className="text-red-500 font-medium">Inactive</span>
                  )}
                </td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => navigate(`/admin/movies/edit/${movie._id}`)}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  {/* Optional view button or delete */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm text-gray-700 dark:text-gray-300">
        Total Movies: <strong>{movies.length}</strong>
      </p>
    </div>
  );
};

export default MoviesDashboard;
