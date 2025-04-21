import { useEffect, useState } from 'react';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
//   const m_year = 2025;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const API_KEY = '313f8af1';
        
        // List of IMDb IDs
        const imdbIDs = ['tt4154796', 'tt10505918', 'tt6208148', 'tt31193180', 'tt3566834', 'tt12299608', 'tt0388629', 'tt10676052', 'tt4154756',]; // Replace with the IDs you want

        // Fetching movie data in parallel using Promise.all
        const movieData = await Promise.all(
          imdbIDs.map(id =>
            fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`).then(res => res.json())
          )
        );

        // Update state with the fetched movie data
        setMovies(movieData);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="flex flex-col gap-12 p-6 xl:p-10">
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-3xl text-[#e69e03] font-bold">Trending Now</h2>
          <a href="#" className="text-sm hover:underline">See all</a>
        </div>
        <div className="flex gap-6 overflow-x-auto scrollbar-hide">
          {movies.map((movie) => (
            <div
              key={movie.imdbID}
              className="min-w-[200px] flex-shrink-0 rounded-lg overflow-hidden bg-gray-700 hover:scale-105 transition-transform duration-300"
            >
              <img
                src={movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/400x400?text=No+Image'}
                alt={movie.Title}
                className="h-64 w-full object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Recommended for You */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-3xl text-[#e69e03] font-bold">Top Rated</h2>
          <a href="#" className="text-sm hover:underline">See all</a>
        </div>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 xl:grid-cols-6">
          {Array.from({ length: 12 }).map((_, idx) => (
            <div
              key={idx}
              className="rounded-lg overflow-hidden bg-gray-700 hover:scale-105 transition-transform duration-300"
            >
              <img
                src={`https://picsum.photos/id/${idx + 50}/300/400`}
                alt="Movie Thumbnail"
                className="h-48 w-full object-cover"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
