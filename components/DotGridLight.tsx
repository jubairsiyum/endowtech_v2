'use client';
import React, { useRef, useEffect, useCallback, useMemo } from 'react';
import { gsap } from 'gsap';
import { InertiaPlugin } from 'gsap/InertiaPlugin';

gsap.registerPlugin(InertiaPlugin);

// ── helpers ──────────────────────────────────────────────────────────────────

const throttle = (func: (...args: any[]) => void, limit: number) => {
  let lastCall = 0;
  return function (this: any, ...args: any[]) {
    const now = performance.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      func.apply(this, args);
    }
  };
};

function hexToRgb(hex: string) {
  const m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!m) return { r: 0, g: 0, b: 0 };
  return {
    r: parseInt(m[1], 16),
    g: parseInt(m[2], 16),
    b: parseInt(m[3], 16),
  };
}

// ── types ─────────────────────────────────────────────────────────────────────

interface Dot {
  cx: number;
  cy: number;
  xOffset: number;
  yOffset: number;
  _inertiaApplied: boolean;
  baseAlpha: number;
  baseColorStr: string;
}

export interface DotGridLightProps {
  dotSize?: number;
  gap?: number;
  baseColor?: string;
  activeColor?: string;
  baseOpacity?: number;
  activeOpacity?: number;
  sizeBoost?: number;
  vignetteRange?: number;
  proximity?: number;
  speedTrigger?: number;
  shockRadius?: number;
  shockStrength?: number;
  maxSpeed?: number;
  resistance?: number;
  returnDuration?: number;
  className?: string;
  style?: React.CSSProperties;
}

// ── component ─────────────────────────────────────────────────────────────────

const DotGridLight: React.FC<DotGridLightProps> = ({
  dotSize = 3,              // Fine, refined dots
  gap = 24,                 // Tighter grid for density
  baseColor = '#FF9999',    // Subtle cool slate-blue base
  activeColor = '#d86a6a',  // Soft indigo accent when active
  baseOpacity = 0.32,       // Low base opacity for elegance
  activeOpacity = 0.88,     // High opacity on hover for contrast
  sizeBoost = 1.4,          // Max size multiplier near cursor
  vignetteRange = 140,      // Distance from edge before dots fully appear
  proximity = 160,
  speedTrigger = 100,
  shockRadius = 220,
  shockStrength = 3.5,
  maxSpeed = 4000,
  resistance = 820,
  returnDuration = 1.8,
  className = '',
  style,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const dimensionsRef = useRef({ width: 0, height: 0 });

  const isVisibleRef = useRef(false);
  const isRunningRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);
  const activeTweensRef = useRef(0);
  const lastInteractionTimeRef = useRef(0);

  const pointerRef = useRef({
    x: -9999,
    y: -9999,
    vx: 0,
    vy: 0,
    speed: 0,
    lastTime: 0,
    lastX: 0,
    lastY: 0,
  });

  const baseRgb = useMemo(() => hexToRgb(baseColor), [baseColor]);
  const activeRgb = useMemo(() => hexToRgb(activeColor), [activeColor]);
  const baseR = dotSize / 2;
  const PI2 = Math.PI * 2;

  // ── draw frame (no save/restore, precomputed vignette) ───────────────────

  const drawFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const wrap = wrapperRef.current;
    const width = wrap ? wrap.clientWidth : canvas.width;
    const height = wrap ? wrap.clientHeight : canvas.height;

    ctx.clearRect(0, 0, width, height);

    const { x: px, y: py } = pointerRef.current;
    const proxSq = proximity * proximity;

    const dots = dotsRef.current;
    const len = dots.length;

    for (let i = 0; i < len; i++) {
      const dot = dots[i];
      if (dot.baseAlpha <= 0) continue;

      const ox = dot.cx + dot.xOffset;
      const oy = dot.cy + dot.yOffset;
      const dx = dot.cx - px;
      const dy = dot.cy - py;
      const distSq = dx * dx + dy * dy;

      if (distSq < proxSq) {
        // Active dot near cursor: smoothstep proximity curve
        const raw = 1 - Math.sqrt(distSq) / proximity;
        const t = raw * raw * (3 - 2 * raw);
        const alpha = dot.baseAlpha + (activeOpacity - dot.baseAlpha) * t;
        const cr = Math.round(baseRgb.r + (activeRgb.r - baseRgb.r) * t);
        const cg = Math.round(baseRgb.g + (activeRgb.g - baseRgb.g) * t);
        const cb = Math.round(baseRgb.b + (activeRgb.b - baseRgb.b) * t);
        const radius = baseR * (1 + t * (sizeBoost - 1));

        ctx.fillStyle = `rgba(${cr},${cg},${cb},${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(ox, oy, radius, 0, PI2);
        ctx.fill();
      } else if (dot.xOffset !== 0 || dot.yOffset !== 0) {
        // Displaced dot moving back with inertia
        ctx.fillStyle = dot.baseColorStr;
        ctx.beginPath();
        ctx.arc(ox, oy, baseR, 0, PI2);
        ctx.fill();
      } else {
        // Pure resting dot with precomputed color and opacity
        ctx.fillStyle = dot.baseColorStr;
        ctx.beginPath();
        ctx.arc(ox, oy, baseR, 0, PI2);
        ctx.fill();
      }
    }
  }, [proximity, activeOpacity, baseRgb, activeRgb, baseR, sizeBoost, PI2]);

  // ── loop management (on-demand rendering) ─────────────────────────────────

  const stopLoop = useCallback(() => {
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
    isRunningRef.current = false;
  }, []);

  const startLoop = useCallback(() => {
    if (isRunningRef.current || !isVisibleRef.current) return;
    isRunningRef.current = true;

    const tick = () => {
      if (!isVisibleRef.current) {
        isRunningRef.current = false;
        rafIdRef.current = null;
        return;
      }

      drawFrame();

      const now = performance.now();
      const isPointerActive = now - lastInteractionTimeRef.current < 150;
      const hasActiveTweens = activeTweensRef.current > 0;

      if (hasActiveTweens || isPointerActive) {
        rafIdRef.current = requestAnimationFrame(tick);
      } else {
        // Render final resting frame and idle
        drawFrame();
        isRunningRef.current = false;
        rafIdRef.current = null;
      }
    };

    rafIdRef.current = requestAnimationFrame(tick);
  }, [drawFrame]);

  // ── build the dot grid ────────────────────────────────────────────────────

  const buildGrid = useCallback(() => {
    const wrap = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const { width, height } = wrap.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext('2d');
    if (ctx) ctx.scale(dpr, dpr);

    dimensionsRef.current = { width, height };

    const cols = Math.floor((width + gap) / (dotSize + gap));
    const rows = Math.floor((height + gap) / (dotSize + gap));
    const cell = dotSize + gap;

    const gridW = cell * cols - gap;
    const gridH = cell * rows - gap;
    const startX = (width - gridW) / 2 + dotSize / 2;
    const startY = (height - gridH) / 2 + dotSize / 2;

    const dots: Dot[] = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cx = startX + c * cell;
        const cy = startY + r * cell;

        // Precompute vignette and base opacity once at grid build time
        const edgeDist = Math.min(cx, cy, width - cx, height - cy);
        const vignette = Math.min(1, edgeDist / vignetteRange);
        const vignetteEased = vignette * vignette * (3 - 2 * vignette);
        const baseAlpha = Number((baseOpacity * vignetteEased).toFixed(3));
        const baseColorStr = `rgba(${baseRgb.r},${baseRgb.g},${baseRgb.b},${baseAlpha})`;

        dots.push({
          cx,
          cy,
          xOffset: 0,
          yOffset: 0,
          _inertiaApplied: false,
          baseAlpha,
          baseColorStr,
        });
      }
    }
    dotsRef.current = dots;
    activeTweensRef.current = 0;

    if (isVisibleRef.current) {
      drawFrame();
    }
  }, [dotSize, gap, vignetteRange, baseOpacity, baseRgb, drawFrame]);

  // ── viewport visibility (pause offscreen) ─────────────────────────────────

  useEffect(() => {
    const wrap = wrapperRef.current;
    if (!wrap) return;

    if (typeof IntersectionObserver !== 'undefined') {
      const io = new IntersectionObserver(
        ([entry]) => {
          const visible = entry.isIntersecting;
          isVisibleRef.current = visible;
          if (visible) {
            drawFrame();
            if (activeTweensRef.current > 0 || performance.now() - lastInteractionTimeRef.current < 150) {
              startLoop();
            }
          } else {
            stopLoop();
          }
        },
        { rootMargin: '100px 0px 100px 0px', threshold: 0 }
      );
      io.observe(wrap);
      return () => {
        io.disconnect();
        stopLoop();
      };
    } else {
      isVisibleRef.current = true;
      drawFrame();
    }
  }, [drawFrame, startLoop, stopLoop]);

  // ── grid build + resize ───────────────────────────────────────────────────

  useEffect(() => {
    buildGrid();

    let ro: ResizeObserver | null = null;
    if ('ResizeObserver' in window) {
      ro = new ResizeObserver(buildGrid);
      if (wrapperRef.current) ro.observe(wrapperRef.current);
    } else {
      (globalThis as typeof globalThis & Window).addEventListener('resize', buildGrid);
    }
    return () => {
      if (ro) ro.disconnect();
      else (globalThis as typeof globalThis & Window).removeEventListener('resize', buildGrid);
    };
  }, [buildGrid]);

  // ── pointer interaction ───────────────────────────────────────────────────

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!isVisibleRef.current) return;

      const now = performance.now();
      const pr = pointerRef.current;
      const dt = pr.lastTime ? now - pr.lastTime : 16;
      const dx = e.clientX - pr.lastX;
      const dy = e.clientY - pr.lastY;
      let vx = (dx / dt) * 1000;
      let vy = (dy / dt) * 1000;
      let speed = Math.hypot(vx, vy);

      if (speed > maxSpeed) {
        const scale = maxSpeed / speed;
        vx *= scale;
        vy *= scale;
        speed = maxSpeed;
      }

      pr.lastTime = now;
      pr.lastX = e.clientX;
      pr.lastY = e.clientY;
      pr.vx = vx;
      pr.vy = vy;
      pr.speed = speed;

      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      pr.x = e.clientX - rect.left;
      pr.y = e.clientY - rect.top;

      lastInteractionTimeRef.current = now;

      for (let i = 0; i < dotsRef.current.length; i++) {
        const dot = dotsRef.current[i];
        const dist = Math.hypot(dot.cx - pr.x, dot.cy - pr.y);
        if (speed > speedTrigger && dist < proximity && !dot._inertiaApplied) {
          dot._inertiaApplied = true;
          activeTweensRef.current++;
          gsap.killTweensOf(dot);
          const pushX = dot.cx - pr.x + vx * 0.005;
          const pushY = dot.cy - pr.y + vy * 0.005;
          gsap.to(dot, {
            inertia: { xOffset: pushX, yOffset: pushY, resistance },
            onComplete: () => {
              gsap.to(dot, {
                xOffset: 0,
                yOffset: 0,
                duration: returnDuration,
                ease: 'elastic.out(1,0.75)',
                onComplete: () => {
                  dot._inertiaApplied = false;
                  activeTweensRef.current = Math.max(0, activeTweensRef.current - 1);
                },
              });
            },
          });
        }
      }

      startLoop();
    };

    const onClick = (e: MouseEvent) => {
      if (!isVisibleRef.current) return;

      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;

      lastInteractionTimeRef.current = performance.now();

      for (let i = 0; i < dotsRef.current.length; i++) {
        const dot = dotsRef.current[i];
        const dist = Math.hypot(dot.cx - cx, dot.cy - cy);
        if (dist < shockRadius && !dot._inertiaApplied) {
          dot._inertiaApplied = true;
          activeTweensRef.current++;
          gsap.killTweensOf(dot);
          const falloff = Math.max(0, 1 - dist / shockRadius);
          const pushX = (dot.cx - cx) * shockStrength * falloff;
          const pushY = (dot.cy - cy) * shockStrength * falloff;
          gsap.to(dot, {
            inertia: { xOffset: pushX, yOffset: pushY, resistance },
            onComplete: () => {
              gsap.to(dot, {
                xOffset: 0,
                yOffset: 0,
                duration: returnDuration,
                ease: 'elastic.out(1,0.75)',
                onComplete: () => {
                  dot._inertiaApplied = false;
                  activeTweensRef.current = Math.max(0, activeTweensRef.current - 1);
                },
              });
            },
          });
        }
      }

      startLoop();
    };

    const onLeave = () => {
      pointerRef.current.x = -9999;
      pointerRef.current.y = -9999;
      lastInteractionTimeRef.current = performance.now();
      startLoop();
    };

    const throttledMove = throttle(onMove, 40);
    window.addEventListener('mousemove', throttledMove, { passive: true });
    window.addEventListener('click', onClick);
    document.addEventListener('mouseleave', onLeave);

    return () => {
      window.removeEventListener('mousemove', throttledMove);
      window.removeEventListener('click', onClick);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, [maxSpeed, speedTrigger, proximity, resistance, returnDuration, shockRadius, shockStrength, startLoop]);

  // ── render ────────────────────────────────────────────────────────────────

  return (
    <div
      className={`flex items-center justify-center h-full w-full relative ${className}`}
      style={style}
    >
      <div ref={wrapperRef} className="w-full h-full relative">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
      </div>
    </div>
  );
};

export default DotGridLight;
