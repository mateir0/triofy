import Image from "next/image";
import logoOne from "@/public/logos/1000300970.jpg";
import logoTwo from "@/public/logos/1000300971.jpg";
import logoThree from "@/public/logos/1000300972.jpg";
import logoFour from "@/public/logos/1000300973.jpg";

const logos = [
  { src: logoOne },
  { src: logoTwo },
  { src: logoThree },
  { src: logoFour },
] as const;

export default function LogoMarquee() {
  return (
    <div className="logo-marquee overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
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
                className="group/logo relative flex h-12 w-28 shrink-0 items-center justify-center sm:h-14 sm:w-32 md:h-16 md:w-40 lg:h-20 lg:w-48"
              >
                <Image
                  src={logo.src}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 112px, (max-width: 768px) 128px, (max-width: 1024px) 160px, 192px"
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
