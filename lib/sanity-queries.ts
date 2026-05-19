import {sanityClient} from '@/lib/sanity'
import type {Testimonial} from '@/types'

type SanityTestimonial = {
  _id: string
  name: string
  role?: string
  company?: string
  quote: string
  rating: number
  photoUrl?: string
}

const testimonialsQuery = `*[_type == "testimonial" && (!defined(publishedAt) || publishedAt <= now())] | order(order asc, publishedAt desc){
  _id,
  name,
  role,
  company,
  quote,
  rating,
  "photoUrl": photo.asset->url
}`

export async function getTestimonials(): Promise<Testimonial[]> {
  if (!sanityClient) {
    return []
  }

  const testimonials = await sanityClient.fetch<SanityTestimonial[]>(testimonialsQuery)

  return testimonials.map((testimonial) => ({
    id: testimonial._id,
    author: testimonial.name,
    role: testimonial.role ?? '',
    company: testimonial.company ?? '',
    avatar: testimonial.photoUrl ?? '',
    quote: testimonial.quote,
    rating: testimonial.rating,
  }))
}
