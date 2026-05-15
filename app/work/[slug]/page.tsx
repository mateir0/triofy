import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { caseStudies } from "@/content/work";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Button from "@/components/ui/Button";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);
  if (!study) return {};
  return {
    title: `${study.title} | Triofy Agency`,
    description: study.description,
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.slug === slug);
  if (!study) notFound();

  return (
    <>
      <SectionWrapper background="default" className="pt-32">
        <div className="mb-4">
          <Link href="/work" className="text-[#A7B0B8] hover:text-[#F4C542] text-sm transition-colors">
            ← Back to Work
          </Link>
        </div>
        <div className="max-w-4xl">
          <span className="text-xs font-semibold bg-[#F4C542] text-[#0E1A24] px-3 py-1 rounded-full">
            {study.category}
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white mt-4 mb-4">{study.title}</h1>
          <p className="text-[#A7B0B8] text-lg sm:text-xl">{study.client} · {study.clientType} · {study.year}</p>
          {study.tools?.length ? (
            <p className="text-[#A7B0B8] text-sm mt-3">
              <span className="text-white font-semibold">Tech / Tools:</span> {study.tools.join(", ")}
            </p>
          ) : null}
        </div>
      </SectionWrapper>

      <SectionWrapper background="default" className="pt-0">
        <div className="relative w-full h-56 sm:h-80 md:h-[420px] rounded-2xl overflow-hidden border border-white/10">
          <Image
            src={study.heroImage}
            alt={`${study.title} hero visual`}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1120px"
            priority
          />
        </div>
      </SectionWrapper>

      <SectionWrapper background="muted">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Problem</h2>
            <p className="text-[#A7B0B8] leading-relaxed">{study.challenge}</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Solution</h2>
            <p className="text-[#A7B0B8] leading-relaxed">{study.solution}</p>
          </div>
        </div>
      </SectionWrapper>

      {study.gallery.length > 0 && (
        <SectionWrapper background="muted">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-6">Project Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {study.gallery.map((image, index) => (
              <div key={`${image}-${index}`} className="relative h-52 sm:h-64 rounded-xl overflow-hidden border border-white/10">
                <Image
                  src={image}
                  alt={`${study.title} gallery image ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
            ))}
          </div>
        </SectionWrapper>
      )}

      <SectionWrapper background="default">
        <h2 className="text-3xl font-black text-white mb-8">Result</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {study.results.map((result, i) => (
            <div key={i} className="bg-[#132331] rounded-2xl p-6 border border-white/10">
              <span className="text-[#F4C542] text-2xl font-bold">✓</span>
              <p className="text-white mt-2 font-medium">{result}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper background="gradient">
        <div className="text-center">
          <h2 className="text-3xl font-black text-white mb-4">Want Similar Results?</h2>
          <p className="text-[#A7B0B8] mb-8">Let&apos;s discuss your project goals.</p>
          <Button href="/contact" variant="primary" size="lg">Start a Project</Button>
        </div>
      </SectionWrapper>
    </>
  );
}
