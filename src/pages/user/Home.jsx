import EmblaCarousel from "@/components/user/MovieCarousel"
import HomePage from "@/components/user/TopRated"
import React from "react"

// const slides = [0, 1, 2, 3, 4]
const OPTIONS = { loop: true, duration: 30 }
const SLIDE_COUNT = 5
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

export const Home = () => {
  return (

      <div className="mx-auto py-8 md:py-10 antialiased">
      {/* <EmblaCarousel slides={slides}/> */}
      <EmblaCarousel options={OPTIONS} />
      <HomePage/>
      </div>
  )
}