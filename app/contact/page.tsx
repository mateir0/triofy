import type { Metadata } from "next";
import { contactContent } from "@/content/contact";
import SectionWrapper from "@/components/ui/SectionWrapper";
import ContactForm from "@/components/ui/ContactForm";
import { createMetadata } from "@/lib/metadata";
import { site } from "@/config/site";

export const metadata: Metadata = createMetadata(
  "Contact",
  "Get in touch with Triofy Agency. Let's discuss your brand growth goals."
);

export default function ContactPage() {
  return (
    <SectionWrapper background="default" className="pt-32 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              {contactContent.heading}
            </h1>
            <p className="text-[#A7B0B8] text-lg mb-12">{contactContent.subheading}</p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#F4C542]/10 flex items-center justify-center text-[#F4C542]">
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[#A7B0B8] text-xs font-medium uppercase tracking-wider">Email</p>
                  <a href={`mailto:${site.email}`} className="text-white hover:text-[#F4C542] transition-colors">
                    {site.email}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#F4C542]/10 flex items-center justify-center text-[#F4C542]">
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[#A7B0B8] text-xs font-medium uppercase tracking-wider">Phone</p>
                  <a href={`tel:${site.phone}`} className="text-white hover:text-[#F4C542] transition-colors">
                    {site.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#132331] rounded-2xl p-8 border border-white/10">
            <ContactForm />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
