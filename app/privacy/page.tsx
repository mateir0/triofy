import type { Metadata } from "next";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata("Privacy Policy");

export default function PrivacyPage() {
  return (
    <SectionWrapper background="default" className="pt-32">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-black text-white mb-8">Privacy Policy</h1>
        <div className="space-y-8 text-[#A7B0B8] leading-relaxed">
          <p>Last updated: January 1, 2025</p>

          <section>
            <h2 className="text-white font-semibold text-xl mb-3">1. Information We Collect</h2>
            <p>
              We collect information you provide directly to us, such as when you fill out a contact form, subscribe to our newsletter, or communicate with us. This may include your name, email address, phone number, and any other information you choose to provide.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-xl mb-3">2. How We Use Your Information</h2>
            <p>
              We use the information we collect to respond to your inquiries, provide our services, send you marketing communications (with your consent), and improve our website and services.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-xl mb-3">3. Sharing of Information</h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website and conducting our business.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-xl mb-3">4. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at infoclientify@gmail.com.
            </p>
          </section>
        </div>
      </div>
    </SectionWrapper>
  );
}
