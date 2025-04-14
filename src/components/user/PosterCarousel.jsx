import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import { useState } from "react"
// import poster1 from "@/assets/posters/crown.jpg"
// import poster2 from "@/assets/posters/interstellar.jpg"
// import poster3 from "@/assets/posters/inception.jpg"

const movies = [
    { title: "DeadPool 3", poster: "deadpool-and-wolverine.jpg" },
    { title: "Rick and Morty", poster: "rick-and-morty.jpg" },
    { title: "Avatar", poster: "avatar.jpg" },
]

export const PosterCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <Carousel
      className="w-full max-w-4xl mx-auto"
      opts={{ align: "start", loop: true }}
      onSlideChange={(index) => setActiveIndex(index)}
    >
      <CarouselContent>
        {movies.map((movie, index) => (
          <CarouselItem key={index} className="relative h-[400px]">
            <div className="w-full h-full rounded-xl overflow-hidden relative">

    
            {/* Background poster */}
            <img
              src={`/posters/${movie.poster}`}
              alt={movie.title}
              className="w-full h-full object-cover rounded-xl"
            />

            {/* Gradient overlay for bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10 rounded-xl" />

            {/* Movie title */}
            <h2 className="absolute top-4 left-4 z-20 text-white text-3xl font-semibold">{movie.title}</h2>

            {/* Buttons */}
            <div className="absolute bottom-6 left-4 z-20 flex space-x-4">
              <Button variant="secondary" className="bg-white/20 text-white backdrop-blur px-4">
                + Watchlist
              </Button>
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-black px-6">
                Watch Now
              </Button>
            </div>

            {/* Pagination Dots */}
            <div className="absolute bottom-6 right-6 flex space-x-2 z-20">
              {movies.map((_, dotIndex) => (
                <span
                  key={dotIndex}
                  className={`w-3 h-3 rounded-full ${
                    activeIndex === dotIndex ? "bg-yellow-400" : "bg-white/30"
                  }`}
                />
              ))}
            </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-2 z-30" />
      <CarouselNext className="right-2 z-30" />
    </Carousel>
  )
}
