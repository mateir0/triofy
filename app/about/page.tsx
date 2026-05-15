import type { Metadata } from "next";
import { aboutContent } from "@/content/about";
import { team } from "@/content/team";
import SectionWrapper from "@/components/ui/SectionWrapper";
import TeamCard from "@/components/ui/TeamCard";
import Button from "@/components/ui/Button";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata(
  "About",
  "Learn about Triofy Agency — our story, mission, values, and the team behind the work."
);

export default function AboutPage() {
  return (
    <>
      <SectionWrapper background="default" className="pt-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-8">Our Story</h1>
          <div className="space-y-6">
            {aboutContent.story.map((paragraph, i) => (
              <p key={i} className="text-[#A7B0B8] text-lg leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper background="muted">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-[#F4C542] mb-4">Our Mission</h2>
          <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-snug">
            {aboutContent.mission}
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper background="default">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-[#F4C542] mb-4">Our Vision</h2>
          <p className="text-2xl sm:text-3xl font-bold text-white leading-snug">
            {aboutContent.vision}
          </p>
        </div>
        <div className="bg-[#132331] rounded-2xl border border-white/10 p-6 sm:p-8 mb-12">
          <h3 className="text-2xl font-black text-white mb-4">{aboutContent.operatingModel.heading}</h3>
          <p className="text-[#A7B0B8] leading-relaxed mb-6">{aboutContent.operatingModel.description}</p>
          <ul className="space-y-3">
            {aboutContent.operatingModel.pillars.map((pillar) => (
              <li key={pillar} className="flex items-start gap-3 text-[#A7B0B8]">
                <span className="text-[#F4C542] mt-0.5">✓</span>
                <span>{pillar}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-white mb-4">Our Values</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {aboutContent.values.map((value) => (
            <div key={value.title} className="bg-[#132331] rounded-2xl p-8 border border-white/10">
              <div className="text-3xl mb-4">{value.icon}</div>
              <h3 className="text-white font-semibold text-xl mb-3">{value.title}</h3>
              <p className="text-[#A7B0B8] text-sm leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper background="muted">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-white mb-4">{aboutContent.teamIdentity.heading}</h2>
          <p className="text-[#A7B0B8] text-lg">{aboutContent.teamIdentity.description}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>
        <p className="text-[#A7B0B8] text-sm text-center mt-8">
          {aboutContent.trustNarrative}
        </p>
      </SectionWrapper>

      <SectionWrapper background="gradient">
        <div className="text-center">
          <h2 className="text-4xl font-black text-white mb-4">Ready to Work Together?</h2>
          <p className="text-[#A7B0B8] mb-8 max-w-xl mx-auto">
            Let&apos;s build something remarkable with a core team and specialist partners aligned to your goals.
          </p>
          <Button href="/contact" variant="primary" size="lg">Book a Call</Button>
        </div>
      </SectionWrapper>
    </>
  );
}
