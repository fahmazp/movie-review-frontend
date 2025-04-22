import React from "react";
import { useMovieSearch } from "@/hooks/useMovieSearch";
import { Link } from "react-router-dom"; 

export const NavSearch = () => {
  // const [searchText, setSearchText] = useState("");
  // const [allMovies] = useFetch("/movie/allMovies");
  // const [filteredMovies, setFilteredMovies] = useState([]);

  // const handleSearchChange = (e) => {
  //   const value = e.target.value;
  //   setSearchText(value);

  //   if (value.trim() !== "") {
  //     const filtered = allMovies?.filter((movie) =>
  //       movie.title.toLowerCase().includes(value.toLowerCase())
  //     );
  //     setFilteredMovies(filtered);
  //   } else {
  //     setFilteredMovies([]);
  //   }
  // }
  const { searchText, handleSearchChange, filteredMovies } = useMovieSearch();
  
  return (
    <div className="mt-1 ml-8 md:w-80">
      <div className="relative flex items-center rounded-sm bg-[#21242D] px-2 outline-1 -outline-offset-1 outline-gray-900 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-[#F8B319]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          className="size-4 text-[#F8B319]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            stroke="currentColor"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search Movies"
          value={searchText}
          onChange={handleSearchChange}
          className="w-full px-2 py-1.5 bg-[#21242D] text-sm text-white focus:outline-none"
        />

        {/* Command Box */}
        {searchText && (
          <div className="absolute left-0 top-full z-10 w-full bg-zinc-950 border border-gray-300 rounded-md mt-2 shadow-lg max-h-60 overflow-y-auto">
            {filteredMovies.length > 0 ? (
              filteredMovies.map((movie) => (
                <Link
                  to={`/moviesDetails/${movie._id}`}
                  key={movie._id}
                  className="block px-4 py-2 text-gray-200 hover:text-[#F8B319]"
                >
                  {movie.title}
                </Link>
              ))
            ) : (
              <div className="px-4 py-2 text-gray-300">No movies found</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
