import { FadeIn } from "@/components/motion/FadeIn";
import { coreServices } from "@/data/services";

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="relative section-padding bg-[#fafafa] overflow-hidden"
      aria-labelledby="services-heading"
    >
      {/* ── Tall Circular Ambient Red Glow Rising from Bottom (Soft & Atmospheric) ── */}
      {/* Giant outer circular glow reaching almost to the top */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[1200px] sm:w-[1600px] lg:w-[1950px] aspect-square rounded-full bg-accent/[0.05] sm:bg-accent/[0.06] blur-[150px] sm:blur-[220px] pointer-events-none z-0"
      />
      {/* Mid circular glow providing smooth radial gradient */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[800px] sm:w-[1100px] lg:w-[1350px] aspect-square rounded-full bg-red-600/[0.04] sm:bg-red-600/[0.05] blur-[110px] sm:blur-[160px] pointer-events-none z-0"
      />
      {/* Subtle core circle at bottom anchor */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/3 w-[450px] sm:w-[650px] aspect-square rounded-full bg-accent/[0.06] blur-[90px] pointer-events-none z-0"
      />

      {/* ── Abstract Precision Ring Arcs (Concentric Circles Aligned with Glow) ── */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[1100px] sm:w-[1500px] lg:w-[2000px] aspect-square pointer-events-none select-none z-0 opacity-40 sm:opacity-50"
      >
        <svg className="w-full h-full" viewBox="0 0 1000 1000" fill="none">
          <circle
            cx="500"
            cy="500"
            r="470"
            stroke="currentColor"
            className="text-red-500/10"
            strokeWidth="1"
            strokeDasharray="4 8"
          />
          <circle
            cx="500"
            cy="500"
            r="370"
            stroke="currentColor"
            className="text-red-500/15"
            strokeWidth="1"
          />
          <circle
            cx="500"
            cy="500"
            r="270"
            stroke="currentColor"
            className="text-red-500/20"
            strokeWidth="1"
            strokeDasharray="3 6"
          />
          <circle
            cx="500"
            cy="500"
            r="170"
            stroke="currentColor"
            className="text-red-500/25"
            strokeWidth="1"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header — matching previous section's title style */}
        <FadeIn className="text-left md:text-center md:mx-auto max-w-2xl mb-14 sm:mb-16">
          <span className="block font-semibold text-sm uppercase tracking-[0.2em] text-accent mb-2">
            Core Capabilities
          </span>
          <h2
            id="services-heading"
            className="text-[clamp(24px,2.5vw,38px)] font-bold leading-[1.14] tracking-[-0.035em] text-[#0f0000]"
          >
            Full-stack engineering built for scale, speed &amp; reliability.
          </h2>
          <p className="mt-2 text-[clamp(13px,0.95vw,15px)] leading-relaxed text-neutral-600 max-w-lg md:mx-auto">
            From greenfield architecture to high-concurrency production
            platforms, we handle every layer of your software product — design,
            engineering, and continuous SLA delivery.
          </p>
        </FadeIn>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreServices.map((service, idx) => (
            <FadeIn key={service.id} delay={idx * 0.08}>
              <article className="group h-full flex flex-col justify-between rounded-2xl bg-white border border-gray-200/80 p-7 shadow-sm hover:shadow-md hover:border-accent/40 transition-all duration-300">
                <div>
                  {/* Category icon container */}
                  <div className="w-11 h-11 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-6 group-hover:scale-105 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="16 18 22 12 16 6" />
                      <polyline points="8 6 2 12 8 18" />
                    </svg>
                  </div>

                  <h3 className="text-xl font-bold text-text-primary mb-3">
                    {service.title}
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Deliverables Checklist */}
                  <div className="space-y-2 mb-6">
                    {service.deliverables.map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-2 text-xs text-text-muted"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-accent/80 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-gray-100">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-xs rounded bg-gray-50 border border-gray-200 text-text-muted font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
