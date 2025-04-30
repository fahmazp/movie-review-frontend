import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Fade from 'embla-carousel-fade'
import {
  NextButton,
  PrevButton,
  usePrevNextButtons
} from './EmblaCarouselArrowButtons'
import { DotButton, useDotButton } from './EmblaCarouselDotButton'

const moviesSlides = [
  { title: "Rick and Morty", src: "/posters/rick-and-morty.jpg" },
  { title: "Star Wars", src: "/posters/star-wars.jpg" },
  { title: "The Avengers", src: "/posters/avengers.jpg" },
  { title: "Naruto", src: "/posters/naruto.jpg" },
  { title: "Game of Thrones", src: "/posters/got.jpg" },
  { title: "Captain America: Civil War", src: "/posters/civilwar.jpg" },
  { title: "Interstellar", src: "/posters/interstellar-movie.jpg" },
]

const EmblaCarousel = ({ options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Fade()])

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {moviesSlides.map((slide,index) => (
            <div className="embla__slide relative" key={index}>
              <img
                className="embla__slide__img "
                src={slide.src}
                alt={slide.title}
              />

          <div className="absolute top-4 left-8  bg-black/40 px-3 py-1 rounded">
          <h2 className='text-white text-xl md:text-3xl font-bold'>
            {slide.title}
          </h2>
          </div>              

            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={`embla__dot${
                index === selectedIndex ? ' embla__dot--selected' : ''
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default EmblaCarousel
