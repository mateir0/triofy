import TestimonialCarousel from '@/components/ui/TestimonialCarousel'
import type {homeContent} from '@/content/home'
import {getTestimonials} from '@/lib/sanity-queries'

type TestimonialsSection = typeof homeContent.sections.testimonials

interface TestimonialsSectionProps {
  content: TestimonialsSection
}

export default async function TestimonialsSection({content}: TestimonialsSectionProps) {
  const testimonials = await getTestimonials()

  return (
    <section className="py-20 md:py-28 bg-[#132331]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">{content.heading}</h2>
        </div>
        {testimonials.length === 0 ? (
          <p className="text-center text-[#A7B0B8]">No testimonials yet</p>
        ) : (
          <TestimonialCarousel testimonials={testimonials} />
        )}
      </div>
    </section>
  )
}
