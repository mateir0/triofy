import type { Metadata } from "next";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata("Terms of Service");

export default function TermsPage() {
  return (
    <SectionWrapper background="default" className="pt-32">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-black text-white mb-8">Terms of Service</h1>
        <div className="space-y-8 text-[#A7B0B8] leading-relaxed">
          <p>Last updated: January 1, 2025</p>

          <section>
            <h2 className="text-white font-semibold text-xl mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing and using the Triofy Agency website, you accept and agree to be bound by the terms and provisions of this agreement.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-xl mb-3">2. Services</h2>
            <p>
              Triofy Agency provides digital marketing services including branding, performance marketing, web design, content creation, and marketing automation. Specific services and terms are outlined in individual service agreements.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-xl mb-3">3. Intellectual Property</h2>
            <p>
              All content on this website, including text, graphics, logos, and images, is the property of Triofy Agency and is protected by applicable intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-xl mb-3">4. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at hello@triofy.com.
            </p>
          </section>
        </div>
      </div>
    </SectionWrapper>
  );
}
