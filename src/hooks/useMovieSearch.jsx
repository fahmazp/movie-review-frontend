import { useState } from "react";
import { useFetch } from "@/hooks/useFetch";

export const useMovieSearch = () => {
  const [searchText, setSearchText] = useState("");
  const [allMovies] = useFetch("/movie/allMovies?limit=100");
  const [filteredMovies, setFilteredMovies] = useState([]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchText(value);

    if (value.trim() !== "") {
      const filtered = allMovies?.filter((movie) =>
        movie.title.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredMovies(filtered);
    } else {
      setFilteredMovies([]);
    }
  };

  return { searchText, handleSearchChange, filteredMovies };
};
