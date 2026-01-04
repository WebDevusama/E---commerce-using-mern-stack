import { useState, useEffect } from 'react'
import '../ui/imageslider.css'

export default function ImageSlider({ slides, interval = 3000 }) {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    if (!slides?.length) return
    const id = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, interval)
    return () => clearInterval(id)
  }, [slides, interval])

  if (!slides?.length) return null

  return (
    <div className="image-slider">
      <img
        src={slides[currentSlide].url}
        alt={slides[currentSlide].title}
      />
    </div>
  )
}
