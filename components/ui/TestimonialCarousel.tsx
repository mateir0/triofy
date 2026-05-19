'use client'

import {useState, useEffect, useCallback} from 'react'
import {motion, AnimatePresence} from 'framer-motion'
import type {Testimonial} from '@/types'

interface TestimonialCarouselProps {
  testimonials: Testimonial[]
}

export default function TestimonialCarousel({testimonials}: TestimonialCarouselProps) {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const [direction, setDirection] = useState(1)

  const next = useCallback(() => {
    setDirection(1)
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }, [testimonials.length])

  const prev = useCallback(() => {
    setDirection(-1)
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }, [testimonials.length])

  useEffect(() => {
    if (paused || testimonials.length === 0) return
    const interval = setInterval(next, 5000)
    return () => clearInterval(interval)
  }, [paused, next, testimonials.length])

  if (testimonials.length === 0) {
    return null
  }

  const testimonial = testimonials[current]

  const variants = {
    enter: (dir: number) => ({x: dir * 60, opacity: 0}),
    center: {x: 0, opacity: 1},
    exit: (dir: number) => ({x: dir * -60, opacity: 0}),
  }

  return (
    <div
      className="relative max-w-3xl mx-auto"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="overflow-hidden rounded-2xl bg-[#132331] border border-white/10 p-8 md:p-12 min-h-[280px] flex items-center">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{duration: 0.4, ease: 'easeInOut'}}
            className="w-full"
          >
            <div className="flex gap-1 mb-6">
              {Array.from({length: testimonial.rating}).map((_, i) => (
                <span key={i} className="text-[#F4C542] text-lg">
                  ★
                </span>
              ))}
            </div>
            <blockquote className="text-white text-lg md:text-xl leading-relaxed mb-8 font-medium">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>
            <div className="flex items-center gap-4">
              {testimonial.avatar ? (
                <img
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#F4C542] to-[#e6b83c] flex items-center justify-center text-[#0E1A24] font-bold text-lg">
                  {testimonial.author[0]}
                </div>
              )}
              <div>
                <p className="text-white font-semibold">{testimonial.author}</p>
                <p className="text-[#A7B0B8] text-sm">
                  {testimonial.role}
                  {testimonial.role && testimonial.company ? ', ' : ''}
                  {testimonial.company}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={prev}
          className="p-2 rounded-full border border-white/20 text-[#A7B0B8] hover:text-white hover:border-[#F4C542] transition-colors"
          aria-label="Previous testimonial"
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > current ? 1 : -1)
                setCurrent(i)
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current ? 'bg-[#F4C542] w-6' : 'bg-white/30 w-2'
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
        <button
          onClick={next}
          className="p-2 rounded-full border border-white/20 text-[#A7B0B8] hover:text-white hover:border-[#F4C542] transition-colors"
          aria-label="Next testimonial"
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  )
}
