import Image from "next/image";
import logoOne from "@/public/logos/1000300970.jpg";
import logoTwo from "@/public/logos/1000300971.jpg";
import logoThree from "@/public/logos/1000300972.jpg";
import logoFour from "@/public/logos/1000300973.jpg";

const LOGO_FRAME_CLASS_NAME =
  "group/logo relative flex h-12 w-28 shrink-0 items-center justify-center sm:h-14 sm:w-32 md:h-16 md:w-40 lg:h-20 lg:w-48";

const LOGO_SIZES = {
  mobile: 112,
  small: 128,
  medium: 160,
  large: 192,
} as const;

const logoSizes = `(max-width: 640px) ${LOGO_SIZES.mobile}px, (max-width: 768px) ${LOGO_SIZES.small}px, (max-width: 1024px) ${LOGO_SIZES.medium}px, ${LOGO_SIZES.large}px`;

const logos = [
  { src: logoOne, alt: "Trusted company logo 1" },
  { src: logoTwo, alt: "Trusted company logo 2" },
  { src: logoThree, alt: "Trusted company logo 3" },
  { src: logoFour, alt: "Trusted company logo 4" },
] as const;

export default function LogoMarquee() {
  return (
    <div
      role="region"
      aria-label="Trusted company logos"
      className="logo-marquee overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]"
    >
      <div className="logo-marquee-track flex w-max items-center">
        {Array.from({ length: 2 }).map((_, groupIndex) => (
          <div
            key={groupIndex}
            className="logo-marquee-group flex shrink-0 items-center justify-center"
            aria-hidden={groupIndex === 1}
          >
            {logos.map((logo, logoIndex) => (
              <div
                key={`${groupIndex}-${logoIndex}`}
                className={LOGO_FRAME_CLASS_NAME}
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  sizes={logoSizes}
                  className="object-contain object-center opacity-75 saturate-[0.35] transition-[filter,opacity] duration-300 ease-out group-hover/logo:opacity-100 group-hover/logo:saturate-100"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
