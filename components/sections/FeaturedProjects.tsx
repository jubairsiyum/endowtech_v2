"use client";

/**
 * Featured projects – 3D scroll carousel (anubi.io style).
 * Same motion model as index.html, which was checked frame-by-frame against the reference video.
 * No framer-motion needed: one rAF loop writes transforms straight to the DOM (no React re-renders while scrolling).
 */
import { featuredProjects } from "@/data/featuredProjects"; // { id, title, image, category, client }
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import FeaturedWorkCta from "@/components/sections/FeaturedWorkCta";

const REF_W = 874;
const ASPECT = 16 / 9;
const BG = "#ffff";
const STRIPS = 32; // more strips = smoother bend
const SW_REF = REF_W / STRIPS;

/* ---------- Catmull-Rom Spline Helper ---------- */
function catmullRom(
  p0: number,
  p1: number,
  p2: number,
  p3: number,
  t: number,
): number {
  const v0 = (p2 - p0) * 0.5;
  const v1 = (p3 - p1) * 0.5;
  const t2 = t * t;
  const t3 = t2 * t;
  return (
    (2 * p1 - 2 * p2 + v0 + v1) * t3 +
    (-3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 +
    v0 * t +
    p1
  );
}

// Knots along the incoming circular path (u = -1 to 4):
// u = 0: Center active card (formed, flat, full scale 1.0)
// u = 1: Next card sweeping wide (sweeps slightly outside right screen edge, scale 0.76)
// u = 2: 4th card waiting at the mark position (behind in circular arc, scale 0.46)
// u = 3: Deep queue fading in from behind (scale 0.28)
const KNOTS = {
  // u:   -1,   0,   1,    2,    3,    4
  x:    [-900, 0,  920,  250,  40,   0],
  y:    [20,   0,  -20,  -28,  -22, -10],
  s:    [1.25, 1.0, 0.76, 0.46, 0.28, 0.18],
  ry:   [18,   0,  -23,  -20,  -14, -8],
  rz:   [-6.0, 0,  6.5,  4.0,  2.0, 0],
  bend: [-95,  0,  95,   65,   35,  15],
};

function spline(arr: number[], u: number): number {
  if (u <= 0) return arr[1];
  const i = Math.min(arr.length - 3, Math.floor(u));
  const f = Math.min(1, Math.max(0, u - i));
  const p0 = arr[i];
  const p1 = arr[i + 1];
  const p2 = arr[i + 2];
  const p3 = arr[Math.min(arr.length - 1, i + 3)];
  return catmullRom(p0, p1, p2, p3, f);
}

interface CardPose {
  x: number;
  y: number;
  rz: number;
  ry: number;
  s: number;
  bend: number;
  txt: number;
  op: number;
  visible: boolean;
}

/* ---------- unified motion model (px @ card width 874) ---------- */
function poseFor(u: number): CardPose {
  // u < 0: Exiting off to the left (smooth and gradual, not rushed)
  if (u < 0) {
    const a = -u;
    const x = -(950 * a + 1400 * a * a);
    return {
      x,
      y: 0.05 * Math.abs(x),
      rz: Math.max(-10, Math.min(10, 0.005 * x)),
      ry: Math.min(24, 0.01 * Math.abs(x) + 0.000015 * x * x) * -1,
      s: Math.min(1.25, 1 + 0.00012 * Math.abs(x)),
      txt: Math.max(0, 1 - Math.pow(Math.abs(x) / 700, 1.3)),
      bend: -Math.min(75, 0.05 * Math.abs(x)),
      op: 1,
      visible: Math.abs(x) <= 2600,
    };
  }

  // u >= 0: Coming animation from behind along a 3D circular track
  if (u > 3.2) {
    return {
      x: 0,
      y: 0,
      rz: 0,
      ry: 0,
      s: 0,
      bend: 0,
      txt: 0,
      op: 0,
      visible: false,
    };
  }

  const x = spline(KNOTS.x, u);
  const y = spline(KNOTS.y, u);
  const s = spline(KNOTS.s, u);
  const ry = spline(KNOTS.ry, u);
  const rz = spline(KNOTS.rz, u);
  const bend = spline(KNOTS.bend, u);
  // Text fades out when moving away from center, invisible when coming from behind
  const txt = Math.max(0, 1 - Math.pow(u / 0.35, 1.4));
  // Smoothly fade in cards coming into the background (u: 2.2 to 3.0)
  const op = u > 2.2 ? Math.max(0, 1 - (u - 2.2) / 0.8) : 1;

  return {
    x,
    y,
    rz,
    ry,
    s,
    bend,
    txt,
    op,
    visible: op > 0.005,
  };
}

/** Lay the strips out along a circular arc so the card behaves like a bent sheet of paper. */
function bendCard(strips: HTMLElement[], b: number, F: number) {
  if (Math.abs(b) < 0.05) {
    for (let i = 0; i < STRIPS; i++) {
      if (strips[i]) strips[i].style.transform = 'translate3d(0,0,0) rotateY(0rad)';
    }
    return;
  }
  const kappa = (8 * b) / (REF_W * REF_W);
  const out: [number, number, number][] = new Array(STRIPS);
  for (let dir = -1; dir <= 1; dir += 2) {
    let X = 0,
      Z = 0,
      sPrev = 0;
    const start = dir > 0 ? Math.floor(STRIPS / 2) : Math.ceil(STRIPS / 2) - 1;
    for (let i = start; i >= 0 && i < STRIPS; i += dir) {
      const sC = (i + 0.5) * SW_REF - REF_W / 2;
      const ds = sC - sPrev;
      const phiMid = (kappa * (sC + sPrev)) / 2;
      X += ds * Math.cos(phiMid);
      Z -= ds * Math.sin(phiMid);
      out[i] = [X - sC, Z, kappa * sC];
      sPrev = sC;
    }
  }
  for (let i = 0; i < STRIPS; i++) {
    const o = out[i];
    if (!o || !strips[i]) continue;
    strips[i].style.transform =
      `translate3d(${(o[0] * F).toFixed(2)}px,0,${(o[1] * F).toFixed(2)}px) rotateY(${o[2].toFixed(4)}rad)`;
  }
}

export default function FeaturedProjects({
  onOpenScheduler,
}: {
  onOpenScheduler?: () => void;
} = {}) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const curRef = useRef<HTMLSpanElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  const N = featuredProjects.length;

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;

    let F = 1;
    let target = 0;
    let current = 0;
    let last = performance.now();
    let lastIdx = -1;
    let raf = 0;
    let isVisible = false;
    let isRunning = false;
    const cachedStrips: HTMLElement[][] = [];

    const getStrips = (i: number, el: HTMLAnchorElement) => {
      if (!cachedStrips[i] || cachedStrips[i].length === 0) {
        cachedStrips[i] = Array.from(el.children) as HTMLElement[];
      }
      return cachedStrips[i];
    };

    const resize = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const isMobile = vw < 768;
      const aspect = isMobile ? 1.36 : ASPECT;
      const maxWFromHeight = Math.max(280, (vh - 270) * aspect);
      const W = Math.min(
        maxWFromHeight,
        isMobile
          ? Math.min(vw * 0.92, 440)
          : vw < 1100
            ? Math.min(vw * 0.52, 680)
            : Math.min(vw * 0.4, 780),
      );
      const H = W / aspect;
      stage.style.setProperty("--w", `${W}px`);
      stage.style.setProperty("--h", `${H}px`);
      stage.style.setProperty("--sw", `${W / STRIPS}px`);
      // On mobile: vertically balance the card and text between header and footer
      const cardTop = isMobile
        ? `${Math.max(195, Math.round((vh + 130 - (H + 75)) / 2))}px`
        : `calc(51% - ${H / 2}px)`;
      stage.style.setProperty("--card-top", cardTop);
      F = W / REF_W;
      if (isVisible) {
        render();
      }
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const render = () => {
      const t = current * (N - 1);
      for (let i = 0; i < N; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;
        const u = i - t;
        const P = poseFor(u);
        if (!P.visible) {
          el.style.visibility = "hidden";
          continue;
        }
        el.style.visibility = "visible";
        el.style.opacity = P.op.toFixed(3);
        el.style.transform =
          `translate3d(${(P.x * F).toFixed(2)}px, ${(P.y * F).toFixed(2)}px, 0) ` +
          `rotateZ(${P.rz.toFixed(3)}deg) rotateY(${P.ry.toFixed(3)}deg) scale(${P.s.toFixed(4)})`;
        el.style.setProperty("--txt", P.txt.toFixed(3));
        bendCard(getStrips(i, el), P.bend, F);
        el.style.zIndex = String(
          u < 0 ? 60 + Math.round(u * 10) : 50 - Math.round(u * 10),
        );
      }
      const idx = Math.min(N - 1, Math.max(0, Math.round(t)));
      if (idx !== lastIdx && curRef.current) {
        curRef.current.textContent = String(idx + 1).padStart(2, "0");
        lastIdx = idx;
      }
      if (fillRef.current)
        fillRef.current.style.width = `${(((t + 1) / N) * 100).toFixed(2)}%`;
    };

    const stopLoop = () => {
      isRunning = false;
      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    const tick = (now: number) => {
      if (!isVisible) {
        stopLoop();
        return;
      }
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const r = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;
      target = Math.min(1, Math.max(0, -r.top / total));

      // Crisp, responsive tracking without sluggish secondary drag
      current += (target - current) * (1 - Math.exp(-dt * 16));
      const diff = Math.abs(target - current);
      if (diff < 0.0001) {
        current = target;
      }

      render();

      if (diff < 0.0001) {
        // Settled: pause RAF loop until next scroll or resize event
        stopLoop();
      } else {
        raf = requestAnimationFrame(tick);
      }
    };

    const startLoop = () => {
      if (isRunning || !isVisible) return;
      isRunning = true;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      if (isVisible && !isRunning) {
        startLoop();
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // IntersectionObserver: sleep completely when outside viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          startLoop();
        } else {
          stopLoop();
        }
      },
      { rootMargin: "200px 0px 200px 0px" }
    );
    observer.observe(section);

    return () => {
      stopLoop();
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, [N]);

  return (
    <>
      <section
        id="featured-projects"
        ref={sectionRef}
        aria-label="Featured Projects Showcase"
        className="relative w-full"
        style={{ height: `${N * 100}vh`, background: BG, color: "#111" }}
      >
        <div
          ref={stageRef}
          className="sticky top-0 h-screen w-full overflow-hidden"
          style={{
            background: BG,
            perspective: 1200,
            perspectiveOrigin: "50% 50%",
          }}
        >
          {/* Ambient Red Watermark Branding in Middle of Section */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none select-none w-[240px] sm:w-[380px] md:w-[520px] lg:w-[680px] xl:w-[780px] max-w-[85vw] opacity-[0.12] sm:opacity-[0.14] transition-opacity duration-300"
        >
          <Image
            src="/images/watermark_red.webp"
            alt=""
            width={640}
            height={748}
            className="w-full h-auto object-contain"
            priority
          />
        </div>

        {/* header */}
        <header className="absolute inset-x-0 top-0 z-[200] px-5 sm:px-8 lg:px-12 pt-7 sm:pt-8 lg:pt-10 pointer-events-none">
          {/* Mobile Top Bar */}
          <div className="flex md:hidden items-center justify-between w-full mb-3 pointer-events-auto">
            <span className="font-mono text-[12px] uppercase tracking-[0.2em] text-accent font-semibold">
              Featured Work
            </span>
            <a
              href="#products"
              className="inline-flex items-center gap-1.5 font-mono text-[12px] text-neutral-600 hover:text-black transition-colors"
            >
              <span className="text-[#0f0000]">Beyond the projects</span>
              <span className="text-[16px] leading-none">↘</span>
            </a>
          </div>

          {/* Title & Copy: Left-aligned on mobile, centered on desktop */}
          <div className="relative flex items-start justify-between w-full">
            {/* Left balance spacer (desktop only) */}
            <div className="hidden md:block w-[180px]" />

            {/* Title & Text */}
            <div className="text-left md:text-center md:mx-auto max-w-2xl pointer-events-auto">
              <span className="hidden md:block font-semibold text-sm uppercase tracking-[0.2em] text-accent mb-2">
                Featured Work
              </span>
              <h2 className="text-[clamp(24px,2.5vw,38px)] font-bold leading-[1.14] tracking-[-0.035em] text-[#0f0000]">
                Built for scale. Proven in production.
              </h2>
              <p className="mt-2 text-[clamp(13px,0.95vw,15px)] leading-relaxed text-neutral-600 max-w-lg md:mx-auto">
                We measure enterprise engineering by what the system has to
                handle, how critical it becomes, and what changes for the
                business after it ships.
              </p>
            </div>

            {/* Right: Beyond the projects link (desktop only) */}
            <div className="hidden md:flex w-[180px] justify-end">
              <a
                href="#products"
                className="pointer-events-auto inline-flex items-center gap-2 font-mono text-[13px] sm:text-[14px] text-neutral-600 hover:text-black transition-colors whitespace-nowrap"
              >
                <span>Beyond the projects</span>
                <span className="text-[20px] leading-none">↘</span>
              </a>
            </div>
          </div>
        </header>

        {/* cards */}
        {featuredProjects.map((p, i) => (
          <Link
            key={p.id}
            href={`/projects/${p.id}`}
            draggable={false}
            aria-label={p.title}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className="absolute block select-none"
            style={{
              left: "50%",
              width: "var(--w)",
              height: "var(--h)",
              transformStyle: "preserve-3d",
              marginLeft: "calc(var(--w) / -2)",
              top: "var(--card-top, calc(51% - var(--h) / 2))",
              transformOrigin: "50% calc(var(--h) / 2)",
            }}
          >
            {Array.from({ length: STRIPS }, (_, k) => (
              <div
                key={k}
                aria-hidden="true"
                className="absolute top-0 overflow-hidden"
                style={{
                  left: `calc(var(--sw) * ${k})`,
                  width: "calc(var(--sw) + 3px)",
                  height: "calc(var(--h) + var(--w) * .24)",
                  transformOrigin: "50% 50%",
                  backfaceVisibility: "hidden",
                }}
              >
                <div
                  className="absolute top-0 h-full"
                  style={{ left: `calc(var(--sw) * ${-k})`, width: "var(--w)" }}
                >
                  <div
                    className="w-full bg-neutral-900 bg-cover bg-center"
                    style={{
                      height: "var(--h)",
                      backgroundImage: `url("${encodeURI(p.image)}")`,
                    }}
                  />
                  <div
                    className="relative"
                    style={{
                      marginTop: "calc(var(--w) * .018)",
                      opacity: "var(--txt, 1)",
                    }}
                  >
                    <h3
                      className="font-medium leading-[1.1] tracking-[-0.04em] pr-[12%]"
                      style={{ fontSize: "max(18px, calc(var(--w) * .042))" }}
                    >
                      {p.title}
                    </h3>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.9}
                      strokeLinecap="square"
                      className="absolute text-[#222]"
                      style={{
                        right: "calc(var(--w) * .014)",
                        top: "calc(var(--w) * .004)",
                        width: "max(20px, calc(var(--w) * .027))",
                      }}
                    >
                      <path d="M6 18 18 6M8 6h10v10" />
                    </svg>
                    <div
                      className="flex items-center flex-wrap font-mono leading-none"
                      style={{
                        gap: "calc(var(--w) * .01)",
                        marginTop: "calc(var(--w) * .016)",
                        fontSize: "max(9px, calc(var(--w) * .012))",
                      }}
                    >
                      {p.techStack.slice(0, 4).map((tech, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center text-xs px-2 py-0.5 rounded bg-neutral-100 text-neutral-700 font-medium border border-neutral-200/80"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Link>
        ))}

        {/* footer */}
        <footer className="absolute inset-x-0 bottom-0 z-[200] grid grid-cols-[1fr_auto_1fr] items-end px-4 sm:px-6 lg:px-12 pb-5 sm:pb-7 lg:pb-8 pointer-events-none">
          <div className="flex items-center gap-3 sm:gap-4">
            <span
              ref={curRef}
              className="w-[30px] sm:w-[34px] font-light leading-none tracking-[-0.02em] tabular-nums text-[clamp(20px,1.4vw,28px)]"
            >
              01
            </span>
            <div className="relative h-px w-[70px] sm:w-[140px] bg-[#dcdcd8]">
              <div
                ref={fillRef}
                className="absolute left-0 -top-[0.5px] h-[2px] bg-[#111]"
                style={{ width: 0 }}
              />
            </div>
            <span className="font-mono text-[11px] sm:text-[12px] leading-none text-neutral-500">
              {String(N).padStart(2, "0")}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-3 font-mono text-[12px] sm:text-[13px] text-neutral-600 whitespace-nowrap">
            <span>Scroll to see the projects</span>
            <span className="text-[13px] leading-none text-neutral-800">↓</span>
            <i className="block h-3.5 w-px bg-neutral-300" />
          </div>

          <div />
        </footer>
      </div>
    </section>

    {/* ── BOTTOM OF FEATURED WORK SECTION: ENGINEERING CHALLENGE BANNER ── */}
    <FeaturedWorkCta onOpenScheduler={onOpenScheduler} />
  </>
  );
}
