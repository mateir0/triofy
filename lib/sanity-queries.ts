import {sanityClient} from '@/lib/sanity'
import type {CaseStudy, Testimonial} from '@/types'

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

type SanityProject = {
  _id: string
  slug?: string
  title: string
  client: string
  category: string
  tags?: string[]
  description: string
  challenge: string
  solution: string
  results?: string[]
  heroImageUrl?: string
  galleryUrls?: string[]
  featured?: boolean
  year: number
}

const projectFields = `
  _id,
  "slug": slug.current,
  title,
  client,
  category,
  tags,
  description,
  challenge,
  solution,
  results,
  "heroImageUrl": heroImage.asset->url,
  "galleryUrls": gallery[].asset->url,
  featured,
  year
`

const projectsQuery = `*[_type == "project" && (!defined(publishedAt) || publishedAt <= now())] | order(order asc, publishedAt desc){
  ${projectFields}
}`

const projectSlugsQuery = `*[_type == "project" && defined(slug.current) && (!defined(publishedAt) || publishedAt <= now())] | order(order asc, publishedAt desc){
  "slug": slug.current
}`

const projectBySlugQuery = `*[_type == "project" && slug.current == $slug && (!defined(publishedAt) || publishedAt <= now())] | order(order asc, publishedAt desc)[0]{
  ${projectFields}
}`

function mapProject(project: SanityProject & {slug: string}): CaseStudy {
  return {
    id: project._id,
    slug: project.slug,
    title: project.title,
    client: project.client,
    category: project.category,
    tags: project.tags ?? [],
    description: project.description,
    challenge: project.challenge,
    solution: project.solution,
    results: project.results ?? [],
    heroImage: project.heroImageUrl ?? '',
    gallery: project.galleryUrls ?? [],
    featured: project.featured ?? false,
    year: project.year,
  }
}

export async function getProjects(): Promise<CaseStudy[]> {
  if (!sanityClient) {
    return []
  }

  const projects = await sanityClient.fetch<SanityProject[]>(projectsQuery)
  return projects
    .filter((project): project is SanityProject & {slug: string} => Boolean(project.slug))
    .map(mapProject)
}

export async function getProjectBySlug(slug: string): Promise<CaseStudy | null> {
  if (!sanityClient) {
    return null
  }

  const project = await sanityClient.fetch<SanityProject | null>(projectBySlugQuery, {slug})
  if (!project || !project.slug) {
    return null
  }

  return mapProject(project)
}

export async function getProjectSlugs(): Promise<string[]> {
  if (!sanityClient) {
    return []
  }

  const projects = await sanityClient.fetch<Array<{slug?: string}>>(projectSlugsQuery)
  return projects.map((project) => project.slug).filter((slug): slug is string => Boolean(slug))
}
