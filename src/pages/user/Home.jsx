import EmblaCarousel from "@/components/user/MovieCarousel"
import HomePage from "@/components/user/TopRated"
// import { PosterCarousel } from "@/components/user/PosterCarousel"
import React from "react"

const slides = [0, 1, 2, 3, 4]
export const Home = () => {
  return (

      <div className="mx-auto py-8 md:py-16 antialiased">
      {/* <PosterCarousel /> */}
      <EmblaCarousel slides={slides}/>
      <HomePage/>
      </div>
  )
}