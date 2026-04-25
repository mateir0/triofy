import { cn } from "@/lib/utils";
import type { SectionBackground } from "@/types";

interface SectionWrapperProps {
  children: React.ReactNode;
  background?: SectionBackground;
  className?: string;
  id?: string;
  innerClassName?: string;
}

const backgroundClasses: Record<SectionBackground, string> = {
  default: "bg-[#0E1A24]",
  muted: "bg-[#132331]",
  gradient: "bg-gradient-to-b from-[#0E1A24] to-[#132331]",
  mesh: "bg-[#0E1A24]",
};

export default function SectionWrapper({
  children,
  background = "default",
  className,
  id,
  innerClassName,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn("py-20 md:py-28", backgroundClasses[background], className)}
    >
      <div className={cn("max-w-7xl mx-auto px-6", innerClassName)}>
        {children}
      </div>
    </section>
  );
}
