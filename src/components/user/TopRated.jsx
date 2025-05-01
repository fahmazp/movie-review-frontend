import { ChevronRight, Disc3 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Moviescard } from './MoviesCard';
import { useFetch } from '@/hooks/useFetch';
import { MoviecardSkeltons } from './Skeltons';

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const API_KEY = '313f8af1';
        
        // List of IMDb IDs
        const imdbIDs = ['tt4154756', 'tt31193180', 'tt10505918', 'tt3566834', 'tt12299608',  'tt31945132', 'tt0388629', 'tt20969586', 'tt10676052', 'tt6208148',  ];

        // Fetching movie data using Promise.all
        const movieData = await Promise.all(
          imdbIDs.map(id =>
            fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`).then(res => res.json())
          )
        );
        setMovies(movieData);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);


// top-rated section
  // const [topRatedMovies, setTopRatedMovies] = useState([]);
  // useEffect(() => {
  //   const fetchTopRated = async () => {
  //     try {
  //       const res = await fetch('/api/reviews/top-rated-movies'); // fix needed here for url
  //       const data = await res.json();
  //       setTopRatedMovies(data.data);
  //     } catch (err) {
  //       console.error("Error fetching top-rated movies", err);
  //     }
  //   };
  
  //   fetchTopRated();
  // }, []);
  const [topRatedMovies, isLoading, error] = useFetch("/reviews/top-rated-movies");

  if (isLoading) return <div> <p className='text-center text-yellow-500'>Fetching movies....
    <Disc3 color="#e69e03" className='inline-block size-6 ml-1 motion-safe:animate-spin'/>
  </p>
  <MoviecardSkeltons />
  </div>

  if (error) return <p className="text-center text-red-500">Failed to load top rated movies.</p>

  return (
    <div className="flex flex-col gap-12 p-6 xl:p-10">
      <section>
        <div className="flex items-center justify-between mb-0">
          <h2 className="text-3xl text-[#e69e03] font-bold">Trending Now</h2>
          <Link to="/movies" className="text-sm text-[#eca308] font-semibold hover:underline hover:underline-offset-3">See all</Link>
        </div>
        
        <div className='flex gap-1'>
        <span className="dark:text-[#FFFFFFB3]">Scroll right</span>
        <ChevronRight color="#F8B319"/>
        </div>

        <div className="flex gap-6 overflow-x-auto scrollbar-hide mt-2 snap-x snap-mandatory">
          {movies.map((movie) => (
            <div
              key={movie.imdbID}
              className="min-w-[200px] flex-shrink-0 rounded-lg overflow-hidden bg-zinc-900"
              style={{ scrollSnapAlign: "start" }}
            >
              <img
                src={movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/400x400?text=No+Image'}
                alt={movie.Title}
                loading="lazy"
                className="h-64 w-full object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      <section>
  <div className="flex items-center justify-between mb-4">
    <h2 className="text-3xl text-[#e69e03] font-bold">Top Rated</h2>
    <Link to="/movies" className="text-sm text-[#eca308] font-semibold hover:underline hover:underline-offset-3">See all</Link>
  </div>
  <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
    {topRatedMovies.map((movie) => (
      <Moviescard movies={movie} key={movie._id} />
    ))}
  </div>
</section>



    </div>
  );
}
