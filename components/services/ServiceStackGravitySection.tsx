"use client";

import { FadeIn } from "@/components/motion/FadeIn";
import { TechIcon } from "@/components/sections/TechStackIcons";
import type { ServiceEngineeringStandard } from "@/data/serviceDetails";
import { cn } from "@/lib/utils";
import type { TechItem } from "@/types";
import {
  CheckCircle2,
  Clock,
  Code2,
  GripHorizontal,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";

const STANDARD_ICONS = {
  code: Code2,
  shield: ShieldCheck,
  clock: Clock,
  check: CheckCircle2,
} as const;

const ENGAGEMENT_MODELS = [
  {
    badge: "Model 01 · Bounded Delivery",
    title: "Fixed-Scope Milestone Delivery",
    summary:
      "Lock budget, deliverables, and release dates upfront across transparent 2-week agile sprints — ideal for greenfield portals, SaaS MVPs, and targeted system integrations.",
    points: [
      "Detailed schema & route architecture locked pre-sprint",
      "Weekly staging builds with stakeholder verification",
      "Predictable milestone billing & 30-day launch warranty",
    ],
  },
  {
    badge: "Model 02 · Continuous Velocity",
    title: "Dedicated Engineering Squad",
    summary:
      "Embed senior full-stack engineers directly alongside your leadership team via Slack, GitHub, and Seoul–Dhaka overlap hours for rapid roadmap iteration.",
    points: [
      "Direct communication with principal engineers (no relay)",
      "Flexible sprint prioritization as customer needs evolve",
      "100% source code commits directly into your private repo",
    ],
  },
] as const;

interface Vec2 {
  x: number;
  y: number;
}

interface RigidBody {
  index: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  omega: number;
  w: number;
  h: number;
  hw: number;
  hh: number;
  mass: number;
  invMass: number;
  inertia: number;
  invInertia: number;
}

interface ContactPoint {
  point: Vec2;
  pen: number;
}

interface CollisionManifold {
  a: RigidBody;
  b: RigidBody;
  normal: Vec2; // points from A -> B
  overlap: number;
  contacts: ContactPoint[];
}

interface DragState {
  bodyIndex: number;
  pointerId: number;
  localAnchor: Vec2;
  target: Vec2;
  startClient: Vec2;
  moved: boolean;
}

const GRAVITY = 1700;
const LINEAR_DAMPING = 0.992;
const ANGULAR_DAMPING = 0.97;
const RESTITUTION = 0.22;
const FRICTION = 0.5;
const SUBSTEPS = 2;
const SOLVER_ITERATIONS = 7;

const INITIAL_ANGLES = [
  -0.22, 0.16, -0.1, 0.25, -0.17, 0.13, -0.26, 0.08,
];

function dot(a: Vec2, b: Vec2): number {
  return a.x * b.x + a.y * b.y;
}

function getBoxAxes(b: RigidBody): [Vec2, Vec2] {
  const c = Math.cos(b.angle);
  const s = Math.sin(b.angle);
  return [
    { x: c, y: s },
    { x: -s, y: c },
  ];
}

function getBoxCorners(b: RigidBody): [Vec2, Vec2, Vec2, Vec2] {
  const [ux, uy] = getBoxAxes(b);
  const wxX = ux.x * b.hw;
  const wxY = ux.y * b.hw;
  const hyX = uy.x * b.hh;
  const hyY = uy.y * b.hh;

  return [
    { x: b.x - wxX - hyX, y: b.y - wxY - hyY },
    { x: b.x + wxX - hyX, y: b.y + wxY - hyY },
    { x: b.x + wxX + hyX, y: b.y + wxY + hyY },
    { x: b.x - wxX + hyX, y: b.y - wxY + hyY },
  ];
}

function getFaceVertices(
  b: RigidBody,
  faceNormal: Vec2,
): { center: Vec2; v1: Vec2; v2: Vec2 } {
  const [ux, uy] = getBoxAxes(b);
  const dX = dot(faceNormal, ux);
  const dY = dot(faceNormal, uy);

  if (Math.abs(dX) >= Math.abs(dY)) {
    const sign = dX >= 0 ? 1 : -1;
    const center = {
      x: b.x + ux.x * sign * b.hw,
      y: b.y + ux.y * sign * b.hw,
    };
    return {
      center,
      v1: { x: center.x - uy.x * b.hh, y: center.y - uy.y * b.hh },
      v2: { x: center.x + uy.x * b.hh, y: center.y + uy.y * b.hh },
    };
  }

  const sign = dY >= 0 ? 1 : -1;
  const center = {
    x: b.x + uy.x * sign * b.hh,
    y: b.y + uy.y * sign * b.hh,
  };
  return {
    center,
    v1: { x: center.x - ux.x * b.hw, y: center.y - ux.y * b.hw },
    v2: { x: center.x + ux.x * b.hw, y: center.y + ux.y * b.hw },
  };
}

function getMostAntiParallelFace(
  b: RigidBody,
  refNormal: Vec2,
): { v1: Vec2; v2: Vec2 } {
  const [ux, uy] = getBoxAxes(b);
  const candidates: Array<{ n: Vec2; v1: Vec2; v2: Vec2 }> = [
    {
      n: ux,
      v1: {
        x: b.x + ux.x * b.hw - uy.x * b.hh,
        y: b.y + ux.y * b.hw - uy.y * b.hh,
      },
      v2: {
        x: b.x + ux.x * b.hw + uy.x * b.hh,
        y: b.y + ux.y * b.hw + uy.y * b.hh,
      },
    },
    {
      n: { x: -ux.x, y: -ux.y },
      v1: {
        x: b.x - ux.x * b.hw - uy.x * b.hh,
        y: b.y - ux.y * b.hw - uy.y * b.hh,
      },
      v2: {
        x: b.x - ux.x * b.hw + uy.x * b.hh,
        y: b.y - ux.y * b.hw + uy.y * b.hh,
      },
    },
    {
      n: uy,
      v1: {
        x: b.x + uy.x * b.hh - ux.x * b.hw,
        y: b.y + uy.y * b.hh - ux.y * b.hw,
      },
      v2: {
        x: b.x + uy.x * b.hh + ux.x * b.hw,
        y: b.y + uy.y * b.hh + ux.y * b.hw,
      },
    },
    {
      n: { x: -uy.x, y: -uy.y },
      v1: {
        x: b.x - uy.x * b.hh - ux.x * b.hw,
        y: b.y - uy.y * b.hh - ux.y * b.hw,
      },
      v2: {
        x: b.x - uy.x * b.hh + ux.x * b.hw,
        y: b.y - uy.y * b.hh + ux.y * b.hw,
      },
    },
  ];

  let best = candidates[0];
  let minDot = dot(candidates[0].n, refNormal);
  for (let i = 1; i < candidates.length; i++) {
    const d = dot(candidates[i].n, refNormal);
    if (d < minDot) {
      minDot = d;
      best = candidates[i];
    }
  }
  return { v1: best.v1, v2: best.v2 };
}

function clipSegmentToPlane(
  v0: Vec2,
  v1: Vec2,
  normal: Vec2,
  offset: number,
): Vec2[] {
  const out: Vec2[] = [];
  const d0 = dot(v0, normal) - offset;
  const d1 = dot(v1, normal) - offset;

  if (d0 >= 0) out.push(v0);
  if (d1 >= 0) out.push(v1);

  if (d0 * d1 < 0) {
    const t = d0 / (d0 - d1);
    out.push({
      x: v0.x + t * (v1.x - v0.x),
      y: v0.y + t * (v1.y - v0.y),
    });
  }

  return out;
}

function detectOBBCollision(a: RigidBody, b: RigidBody): CollisionManifold | null {
  const [uxA, uyA] = getBoxAxes(a);
  const [uxB, uyB] = getBoxAxes(b);
  const axes = [uxA, uyA, uxB, uyB];
  const d: Vec2 = { x: b.x - a.x, y: b.y - a.y };

  let minOverlap = Infinity;
  let bestAxisIndex = 0;

  for (let i = 0; i < 4; i++) {
    const axis = axes[i];
    const projA =
      a.hw * Math.abs(dot(axis, uxA)) + a.hh * Math.abs(dot(axis, uyA));
    const projB =
      b.hw * Math.abs(dot(axis, uxB)) + b.hh * Math.abs(dot(axis, uyB));
    const dist = Math.abs(dot(d, axis));
    const overlap = projA + projB - dist;

    if (overlap <= 0) return null;

    if (overlap < minOverlap) {
      minOverlap = overlap;
      bestAxisIndex = i;
    }
  }

  let normal = axes[bestAxisIndex];
  if (dot(d, normal) < 0) {
    normal = { x: -normal.x, y: -normal.y };
  }

  const refIsA = bestAxisIndex < 2;
  const refBody = refIsA ? a : b;
  const incBody = refIsA ? b : a;
  const refNormal = refIsA ? normal : { x: -normal.x, y: -normal.y };

  const refFace = getFaceVertices(refBody, refNormal);
  const incFace = getMostAntiParallelFace(incBody, refNormal);

  const faceVec = {
    x: refFace.v2.x - refFace.v1.x,
    y: refFace.v2.y - refFace.v1.y,
  };
  const faceLen = Math.hypot(faceVec.x, faceVec.y) || 1;
  const tangent = { x: faceVec.x / faceLen, y: faceVec.y / faceLen };

  const p1 = dot(refFace.v1, tangent);
  const p2 = dot(refFace.v2, tangent);
  const minProj = Math.min(p1, p2);
  const maxProj = Math.max(p1, p2);

  let clipped = clipSegmentToPlane(incFace.v1, incFace.v2, tangent, minProj);
  if (clipped.length >= 2) {
    clipped = clipSegmentToPlane(
      clipped[0],
      clipped[1],
      { x: -tangent.x, y: -tangent.y },
      -maxProj,
    );
  }

  const contacts: ContactPoint[] = [];
  for (const c of clipped) {
    const sep =
      (c.x - refFace.center.x) * refNormal.x +
      (c.y - refFace.center.y) * refNormal.y;
    if (sep <= 0.6) {
      contacts.push({ point: c, pen: Math.max(0, -sep) });
    }
  }

  if (contacts.length === 0) {
    contacts.push({
      point: {
        x: (incFace.v1.x + incFace.v2.x) * 0.5,
        y: (incFace.v1.y + incFace.v2.y) * 0.5,
      },
      pen: minOverlap,
    });
  }

  return {
    a,
    b,
    normal,
    overlap: minOverlap,
    contacts,
  };
}

function resolveBoundaryContact(
  body: RigidBody,
  contact: Vec2,
  nx: number,
  ny: number,
  penetration: number,
) {
  const rx = contact.x - body.x;
  const ry = contact.y - body.y;

  const vx = body.vx - body.omega * ry;
  const vy = body.vy + body.omega * rx;
  const vn = vx * nx + vy * ny;

  if (vn < 0) {
    const rn = rx * ny - ry * nx;
    const denom = body.invMass + rn * rn * body.invInertia;
    const e = vn < -105 ? RESTITUTION : 0;
    const jn = Math.max(0, (-(1 + e) * vn) / denom);

    body.vx += jn * nx * body.invMass;
    body.vy += jn * ny * body.invMass;
    body.omega += rn * jn * body.invInertia;

    // Wall/floor Coulomb friction
    const nvx = body.vx - body.omega * ry;
    const nvy = body.vy + body.omega * rx;
    const tx = -ny;
    const ty = nx;
    const vt = nvx * tx + nvy * ty;
    const rt = rx * ty - ry * tx;
    const denomT = body.invMass + rt * rt * body.invInertia;
    let jt = -vt / denomT;
    const maxFriction = jn * FRICTION;
    jt = Math.max(-maxFriction, Math.min(maxFriction, jt));

    body.vx += jt * tx * body.invMass;
    body.vy += jt * ty * body.invMass;
    body.omega += rt * jt * body.invInertia;
  }

  const corr = Math.max(0, penetration - 0.15) * 0.55;
  body.x += nx * corr;
  body.y += ny * corr;
}

export interface ServiceStackGravitySectionProps {
  techItems: TechItem[];
  standards: ServiceEngineeringStandard[];
}

export default function ServiceStackGravitySection({
  techItems,
  standards,
}: ServiceStackGravitySectionProps) {
  const arenaRef = useRef<HTMLDivElement>(null);
  const pillRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const bodiesRef = useRef<RigidBody[]>([]);
  const dragRef = useRef<DragState | null>(null);
  const suppressClickIdxRef = useRef<number | null>(null);
  const rafRef = useRef<number>(0);
  const arenaSizeRef = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const hasDroppedRef = useRef<boolean>(false);

  const [isReady, setIsReady] = useState(false);
  const [draggingIdx, setDraggingIdx] = useState<number | null>(null);

  const syncDOM = useCallback(() => {
    const bodies = bodiesRef.current;
    for (let i = 0; i < bodies.length; i++) {
      const b = bodies[i];
      const el = pillRefs.current[b.index];
      if (!el) continue;
      el.style.transform = `translate3d(${(b.x - b.w * 0.5).toFixed(2)}px, ${(b.y - b.h * 0.5).toFixed(2)}px, 0) rotate(${b.angle.toFixed(4)}rad)`;
    }
  }, []);

  const initializeBodies = useCallback(
    (mode: "drop" | "settled") => {
      const arena = arenaRef.current;
      if (!arena) return;

      const W = arena.clientWidth;
      const H = arena.clientHeight;
      if (W <= 0 || H <= 0) return;

      arenaSizeRef.current = { w: W, h: H };

      const count = techItems.length;
      const measured: RigidBody[] = [];

      // First pass: measure actual pill widths & heights from DOM
      for (let i = 0; i < count; i++) {
        const el = pillRefs.current[i];
        const w = el ? el.offsetWidth : 128;
        const h = el ? el.offsetHeight : 44;
        const hw = Math.max(20, w * 0.5 - 1);
        const hh = Math.max(14, h * 0.5 - 1);
        const mass = Math.max(0.8, (w * h) / 4200);
        const inertia = (mass * (w * w + h * h)) / 12;

        measured.push({
          index: i,
          x: W * 0.5,
          y: H * 0.5,
          vx: 0,
          vy: 0,
          angle: INITIAL_ANGLES[i % INITIAL_ANGLES.length],
          omega: 0,
          w,
          h,
          hw,
          hh,
          mass,
          invMass: 1 / mass,
          inertia,
          invInertia: 1 / inertia,
        });
      }

      if (mode === "settled") {
        // Reduced-motion static natural pile near the bottom floor
        const cols = Math.min(3, Math.max(2, Math.floor(W / 170)));
        measured.forEach((b, idx) => {
          const col = idx % cols;
          const row = Math.floor(idx / cols);
          const span = Math.max(120, W - 32);
          const colX = 16 + ((col + 0.5) / cols) * span;
          b.x = Math.max(b.hw + 12, Math.min(W - b.hw - 12, colX));
          b.y = Math.max(b.hh + 12, H - b.hh - 10 - row * (b.h + 8));
          b.angle = INITIAL_ANGLES[idx % INITIAL_ANGLES.length] * 0.55;
        });
      } else {
        // Staggered top-drop entry biased nicely across center-to-right like skeleton
        const cols = Math.min(4, Math.max(2, Math.floor(W / 150)));
        measured.forEach((b, idx) => {
          const col = idx % cols;
          const row = Math.floor(idx / cols);
          const usableLeft = Math.max(b.hw + 12, W * (W > 480 ? 0.14 : 0.06));
          const usableRight = Math.min(W - b.hw - 12, W - 16);
          const span = Math.max(20, usableRight - usableLeft);
          const jitter = ((idx * 37) % 24) - 12;
          const rawX =
            usableLeft + ((col + (row % 2 ? 0.65 : 0.35)) / cols) * span + jitter;

          b.x = Math.max(b.hw + 12, Math.min(W - b.hw - 12, rawX));
          b.y = 22 - row * 56 - (idx % 2) * 18;
          b.vx = ((idx % 2 === 0 ? 1 : -1) * 45) + (W * 0.56 - b.x) * 0.25;
          b.vy = 60 + row * 25;
          b.angle = INITIAL_ANGLES[idx % INITIAL_ANGLES.length];
          b.omega = (idx % 2 === 0 ? 1 : -1) * 0.75;
        });
      }

      bodiesRef.current = measured;
      syncDOM();
      setIsReady(true);
    },
    [syncDOM, techItems.length],
  );

  // Trigger initial gravity drop when section enters viewport (or immediately for reduced motion)
  useEffect(() => {
    const arena = arenaRef.current;
    if (!arena) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      hasDroppedRef.current = true;
      initializeBodies("settled");
      return;
    }

    let isDisposed = false;
    let lastTime = performance.now();

    const stepPhysics = (now: number) => {
      if (isDisposed) return;
      const rawDt = Math.min(0.032, Math.max(0.001, (now - lastTime) / 1000));
      lastTime = now;

      const { w: W, h: H } = arenaSizeRef.current;
      const bodies = bodiesRef.current;

      if (W > 0 && H > 0 && bodies.length > 0) {
        const subDt = rawDt / SUBSTEPS;

        for (let step = 0; step < SUBSTEPS; step++) {
          // 1. Forces: gravity + spring drag coupling
          const drag = dragRef.current;

          for (let i = 0; i < bodies.length; i++) {
            const b = bodies[i];
            b.vy += GRAVITY * subDt;

            if (drag && drag.bodyIndex === i) {
              const cosA = Math.cos(b.angle);
              const sinA = Math.sin(b.angle);
              const anchorX =
                b.x + drag.localAnchor.x * cosA - drag.localAnchor.y * sinA;
              const anchorY =
                b.y + drag.localAnchor.x * sinA + drag.localAnchor.y * cosA;
              const rx = anchorX - b.x;
              const ry = anchorY - b.y;

              const ex = drag.target.x - anchorX;
              const ey = drag.target.y - anchorY;
              const vax = b.vx - b.omega * ry;
              const vay = b.vy + b.omega * rx;

              // Spring-damper pulls grabbed point while still allowing OBB collisions
              const fx = (ex * 390 - vax * 26) * b.mass;
              const fy = (ey * 390 - vay * 26) * b.mass - GRAVITY * b.mass;

              b.vx += fx * b.invMass * subDt;
              b.vy += fy * b.invMass * subDt;
              b.omega += (rx * fy - ry * fx) * 0.45 * b.invInertia * subDt;
            }

            b.vx *= LINEAR_DAMPING;
            b.vy *= LINEAR_DAMPING;
            b.omega *= ANGULAR_DAMPING;

            // Clamp extreme throw speeds for stability
            const speed = Math.hypot(b.vx, b.vy);
            if (speed > 1750) {
              const s = 1750 / speed;
              b.vx *= s;
              b.vy *= s;
            }
            if (Math.abs(b.omega) > 12) {
              b.omega = Math.sign(b.omega) * 12;
            }
          }

          // 2. Integrate positions
          for (let i = 0; i < bodies.length; i++) {
            const b = bodies[i];
            b.x += b.vx * subDt;
            b.y += b.vy * subDt;
            b.angle += b.omega * subDt;
          }

          // 3. Collect OBB-vs-OBB collisions
          const manifolds: CollisionManifold[] = [];
          for (let i = 0; i < bodies.length; i++) {
            for (let j = i + 1; j < bodies.length; j++) {
              const manifold = detectOBBCollision(bodies[i], bodies[j]);
              if (manifold) manifolds.push(manifold);
            }
          }

          // 4. Iterative sequential impulse resolution (bodies + walls/floor)
          for (let iter = 0; iter < SOLVER_ITERATIONS; iter++) {
            // Body pairs
            for (let mIdx = 0; mIdx < manifolds.length; mIdx++) {
              const m = manifolds[mIdx];
              const { a, b, normal, contacts } = m;
              const countInv = 1 / contacts.length;

              for (let cIdx = 0; cIdx < contacts.length; cIdx++) {
                const contact = contacts[cIdx].point;
                const rAx = contact.x - a.x;
                const rAy = contact.y - a.y;
                const rBx = contact.x - b.x;
                const rBy = contact.y - b.y;

                const vxA = a.vx - a.omega * rAy;
                const vyA = a.vy + a.omega * rAx;
                const vxB = b.vx - b.omega * rBy;
                const vyB = b.vy + b.omega * rBx;

                const rvx = vxB - vxA;
                const rvy = vyB - vyA;
                const velAlongNormal = rvx * normal.x + rvy * normal.y;

                if (velAlongNormal < 0) {
                  const rnA = rAx * normal.y - rAy * normal.x;
                  const rnB = rBx * normal.y - rBy * normal.x;
                  const denom =
                    a.invMass +
                    b.invMass +
                    rnA * rnA * a.invInertia +
                    rnB * rnB * b.invInertia;

                  const e = velAlongNormal < -105 ? RESTITUTION : 0;
                  const jn = Math.max(
                    0,
                    (-(1 + e) * velAlongNormal * countInv) / denom,
                  );

                  const impX = jn * normal.x;
                  const impY = jn * normal.y;

                  a.vx -= impX * a.invMass;
                  a.vy -= impY * a.invMass;
                  a.omega -= rnA * jn * a.invInertia;

                  b.vx += impX * b.invMass;
                  b.vy += impY * b.invMass;
                  b.omega += rnB * jn * b.invInertia;

                  // Friction along tangent
                  const nvxA = a.vx - a.omega * rAy;
                  const nvyA = a.vy + a.omega * rAx;
                  const nvxB = b.vx - b.omega * rBy;
                  const nvyB = b.vy + b.omega * rBx;
                  const tx = -normal.y;
                  const ty = normal.x;
                  const vt = (nvxB - nvxA) * tx + (nvyB - nvyA) * ty;
                  const rtA = rAx * ty - rAy * tx;
                  const rtB = rBx * ty - rBy * tx;
                  const denomT =
                    a.invMass +
                    b.invMass +
                    rtA * rtA * a.invInertia +
                    rtB * rtB * b.invInertia;

                  let jt = (-vt * countInv) / denomT;
                  const maxF = jn * FRICTION;
                  jt = Math.max(-maxF, Math.min(maxF, jt));

                  const impTX = jt * tx;
                  const impTY = jt * ty;

                  a.vx -= impTX * a.invMass;
                  a.vy -= impTY * a.invMass;
                  a.omega -= rtA * jt * a.invInertia;

                  b.vx += impTX * b.invMass;
                  b.vy += impTY * b.invMass;
                  b.omega += rtB * jt * b.invInertia;
                }
              }
            }

            // Boundary walls & floor (alternating corner order eliminates sequential flat-rest bias)
            for (let i = 0; i < bodies.length; i++) {
              const b = bodies[i];
              const corners = getBoxCorners(b);
              for (let k = 0; k < 4; k++) {
                const c = iter % 2 === 0 ? k : 3 - k;
                const corner = corners[c];
                if (corner.y > H - 6) {
                  resolveBoundaryContact(
                    b,
                    corner,
                    0,
                    -1,
                    corner.y - (H - 6),
                  );
                } else if (corner.y < 6 && b.vy < 0) {
                  resolveBoundaryContact(b, corner, 0, 1, 6 - corner.y);
                }

                if (corner.x < 6) {
                  resolveBoundaryContact(b, corner, 1, 0, 6 - corner.x);
                } else if (corner.x > W - 6) {
                  resolveBoundaryContact(b, corner, -1, 0, corner.x - (W - 6));
                }
              }
            }
          }

          // 5. Gentle positional overlap correction between stacked bodies
          for (let mIdx = 0; mIdx < manifolds.length; mIdx++) {
            const { a, b, normal, overlap } = manifolds[mIdx];
            const slop = 0.45;
            const percent = 0.3;
            const corr =
              (Math.max(0, overlap - slop) / (a.invMass + b.invMass)) * percent;

            a.x -= normal.x * corr * a.invMass;
            a.y -= normal.y * corr * a.invMass;
            b.x += normal.x * corr * b.invMass;
            b.y += normal.y * corr * b.invMass;
          }

          // Calm tiny micro-jitter when nearly settled
          for (let i = 0; i < bodies.length; i++) {
            const b = bodies[i];
            if (dragRef.current?.bodyIndex === i) continue;
            if (
              Math.abs(b.vx) < 2.2 &&
              Math.abs(b.vy) < 4.5 &&
              Math.abs(b.omega) < 0.05
            ) {
              b.vx *= 0.8;
              b.omega *= 0.8;
            }
          }
        }

        syncDOM();
      }

      rafRef.current = requestAnimationFrame(stepPhysics);
    };

    const startDrop = () => {
      if (hasDroppedRef.current || isDisposed) return;
      hasDroppedRef.current = true;
      initializeBodies("drop");
      lastTime = performance.now();
      rafRef.current = requestAnimationFrame(stepPhysics);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          startDrop();
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(arena);

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => {
            const W = arena.clientWidth;
            const H = arena.clientHeight;
            if (W <= 0 || H <= 0) return;

            arenaSizeRef.current = { w: W, h: H };

            // Update dynamic pill widths/heights if viewport breakpoint changed capsule padding
            for (const b of bodiesRef.current) {
              const el = pillRefs.current[b.index];
              if (el) {
                b.w = el.offsetWidth;
                b.h = el.offsetHeight;
                b.hw = Math.max(20, b.w * 0.5 - 1);
                b.hh = Math.max(14, b.h * 0.5 - 1);
              }
              b.x = Math.max(b.hw + 8, Math.min(W - b.hw - 8, b.x));
              b.y = Math.max(b.hh + 8, Math.min(H - b.hh - 8, b.y));
              b.vy += 10;
            }
            syncDOM();
          })
        : null;

    resizeObserver?.observe(arena);

    return () => {
      isDisposed = true;
      observer.disconnect();
      resizeObserver?.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [initializeBodies, syncDOM]);

  const getArenaCoords = (clientX: number, clientY: number): Vec2 => {
    const arena = arenaRef.current;
    if (!arena) return { x: 0, y: 0 };
    const rect = arena.getBoundingClientRect();
    return {
      x: Math.max(12, Math.min(rect.width - 12, clientX - rect.left)),
      y: Math.max(12, Math.min(rect.height - 12, clientY - rect.top)),
    };
  };

  const handleCapsulePointerDown = (
    idx: number,
    e: React.PointerEvent<HTMLButtonElement>,
  ) => {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    const body = bodiesRef.current[idx];
    if (!body) return;

    const ptr = getArenaCoords(e.clientX, e.clientY);
    const dx = ptr.x - body.x;
    const dy = ptr.y - body.y;
    const cosA = Math.cos(-body.angle);
    const sinA = Math.sin(-body.angle);

    dragRef.current = {
      bodyIndex: idx,
      pointerId: e.pointerId,
      localAnchor: {
        x: dx * cosA - dy * sinA,
        y: dx * sinA + dy * cosA,
      },
      target: ptr,
      startClient: { x: e.clientX, y: e.clientY },
      moved: false,
    };

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}

    setDraggingIdx(idx);
  };

  const handleCapsulePointerMove = (
    idx: number,
    e: React.PointerEvent<HTMLButtonElement>,
  ) => {
    const drag = dragRef.current;
    if (!drag || drag.bodyIndex !== idx || drag.pointerId !== e.pointerId) {
      return;
    }

    if (
      !drag.moved &&
      Math.hypot(
        e.clientX - drag.startClient.x,
        e.clientY - drag.startClient.y,
      ) > 4
    ) {
      drag.moved = true;
    }

    drag.target = getArenaCoords(e.clientX, e.clientY);
  };

  const releaseCapsuleDrag = (
    idx: number,
    e: React.PointerEvent<HTMLButtonElement>,
  ) => {
    const drag = dragRef.current;
    if (!drag || drag.bodyIndex !== idx || drag.pointerId !== e.pointerId) {
      return;
    }

    if (drag.moved) {
      suppressClickIdxRef.current = idx;
    }

    dragRef.current = null;
    setDraggingIdx(null);

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
  };

  const nudgeCapsule = (idx: number) => {
    if (suppressClickIdxRef.current === idx) {
      suppressClickIdxRef.current = null;
      return;
    }
    const body = bodiesRef.current[idx];
    if (!body) return;
    body.vy = Math.min(body.vy, -360);
    body.omega += (idx % 2 === 0 ? 1 : -1) * 2.8;
  };

  const handleReplayDrop = () => {
    dragRef.current = null;
    suppressClickIdxRef.current = null;
    setDraggingIdx(null);
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    initializeBodies(prefersReducedMotion ? "settled" : "drop");
  };

  return (
    <section
      id="service-stack"
      aria-labelledby="service-stack-heading"
      className="bg-[#fafafa] py-16 sm:py-24 border-y border-neutral-200/70"
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* ══════════════════════════════════════════════════════════════════════
            SKELETON STACKS CONTAINER: LEFT "STACKS" + RIGHT DRAGGABLE GRAVITY BOX
        ══════════════════════════════════════════════════════════════════════ */}
        <FadeIn>
          <div className="rounded-3xl bg-white border border-neutral-200/90 shadow-[0_24px_70px_-28px_rgba(15,0,0,0.09)] overflow-hidden grid grid-cols-1 lg:grid-cols-12">
            {/* Left Side: Clean "Stacks" Title & Replay Controls (matches skeleton) */}
            <div className="lg:col-span-4 p-7 sm:p-10 lg:p-12 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-neutral-200/80 bg-white">
              <span className="font-semibold text-xs sm:text-sm uppercase tracking-[0.2em] text-accent">
                Technology Stack
              </span>

              <h2
                id="service-stack-heading"
                className="mt-2 text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#0f0000] tracking-[-0.035em] leading-[1.08]"
              >
                Stacks
              </h2>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleReplayDrop}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#fafafa] hover:bg-red-50 border border-neutral-200/90 hover:border-red-200 text-xs font-sans font-semibold text-neutral-600 hover:text-accent transition-colors cursor-pointer"
                  aria-label="Replay gravity drop animation"
                >
                  <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Drop Again</span>
                </button>

                <span className="inline-flex items-center gap-1.5 text-xs text-neutral-500 font-medium">
                  <GripHorizontal
                    className="w-4 h-4 text-accent shrink-0"
                    aria-hidden="true"
                  />
                  <span>Drag or toss capsules</span>
                </span>
              </div>
            </div>

            {/* Right Side: Interactive Gravity & Collisions Capsule Arena */}
            <div
              ref={arenaRef}
              className="lg:col-span-8 relative min-h-[240px] sm:min-h-[260px] lg:min-h-[280px] bg-gradient-to-br from-[#fafafd] via-[#f7f7fa] to-[#f4eff2] overflow-hidden select-none touch-pan-y"
              aria-label="Interactive stack capsules with gravity and drag physics"
            >
              {/* Subtle Graph-Paper / Blueprint Grid inside Gravity Box */}
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none opacity-65"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(220, 38, 38, 0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(220, 38, 38, 0.035) 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                }}
              />

              {/* Subtle Soft Floor Shadow Band */}
              <div
                aria-hidden="true"
                className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-black/[0.03] to-transparent pointer-events-none"
              />

              {/* Draggable Physics Stack Capsules */}
              {techItems.map((tech, idx) => {
                const isDragging = draggingIdx === idx;

                return (
                  <button
                    key={tech.name}
                    ref={(el) => {
                      pillRefs.current[idx] = el;
                    }}
                    type="button"
                    draggable={false}
                    onPointerDown={(e) => handleCapsulePointerDown(idx, e)}
                    onPointerMove={(e) => handleCapsulePointerMove(idx, e)}
                    onPointerUp={(e) => releaseCapsuleDrag(idx, e)}
                    onPointerCancel={(e) => releaseCapsuleDrag(idx, e)}
                    onClick={() => nudgeCapsule(idx)}
                    aria-label={`${tech.name}${tech.role ? ` (${tech.role})` : ""}`}
                    className={cn(
                      "absolute top-0 left-0 touch-none inline-flex items-center gap-2.5 px-4 py-2.5 sm:px-5 sm:py-3 rounded-full border transition-[border-color,box-shadow,background-color] duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent will-change-transform",
                      isReady ? "opacity-100" : "opacity-0",
                      isDragging
                        ? "z-30 cursor-grabbing bg-white border-accent shadow-[0_18px_36px_-10px_rgba(220,38,38,0.28)] ring-2 ring-accent/25"
                        : "z-10 cursor-grab bg-white/95 border-neutral-200/95 hover:border-red-300 shadow-[0_10px_22px_-12px_rgba(15,0,0,0.18)]",
                    )}
                  >
                    <span className="pointer-events-none flex items-center justify-center shrink-0">
                      <TechIcon
                        name={tech.name}
                        icon={tech.icon}
                        tintRed={tech.tintRed}
                        wideIcon={tech.wideIcon}
                        className="w-5 h-5 sm:w-[22px] sm:h-[22px]"
                      />
                    </span>
                    <span className="pointer-events-none text-xs sm:text-[15px] font-bold text-[#0f0000] whitespace-nowrap">
                      {tech.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </FadeIn>

        {/* ══════════════════════════════════════════════════════════════════════
            FLEXIBLE ENGAGEMENT MODELS & ENGINEERING STANDARDS
        ══════════════════════════════════════════════════════════════════════ */}
        <FadeIn delay={0.08} className="mt-14 sm:mt-16">
          <div className="text-xs font-sans font-semibold uppercase tracking-[0.18em] text-neutral-500 mb-4">
            Flexible Engagement Models
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {ENGAGEMENT_MODELS.map((model) => (
              <div
                key={model.title}
                className="rounded-2xl sm:rounded-3xl bg-white border border-neutral-200/90 p-6 sm:p-8 flex flex-col justify-between hover:border-red-200 transition-colors shadow-xs"
              >
                <div>
                  <span className="text-[11px] font-sans font-bold uppercase tracking-[0.14em] text-accent">
                    {model.badge}
                  </span>
                  <h3 className="mt-2 text-xl font-bold text-[#0f0000] tracking-tight">
                    {model.title}
                  </h3>
                  <p className="mt-2.5 text-sm text-neutral-600 leading-relaxed">
                    {model.summary}
                  </p>
                </div>

                <ul className="mt-6 pt-5 border-t border-neutral-100 space-y-2.5">
                  {model.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-[#0f0000] leading-snug"
                    >
                      <CheckCircle2
                        className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* 4-Column Hairline Engineering Standards Bar */}
        <FadeIn delay={0.12} className="mt-8">
          <div className="bg-neutral-200/80 p-px rounded-2xl overflow-hidden grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px shadow-xs">
            {standards.map((std) => {
              const Icon = STANDARD_ICONS[std.iconKey] ?? CheckCircle2;
              return (
                <div
                  key={std.label}
                  className="bg-white p-5 sm:p-6 flex flex-col justify-between gap-4 hover:bg-[#fffafa] transition-colors"
                >
                  <div className="w-9 h-9 rounded-xl bg-red-50 border border-red-200/80 text-accent flex items-center justify-center">
                    <Icon className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="text-[11px] font-sans font-semibold uppercase tracking-[0.12em] text-neutral-500">
                      {std.label}
                    </div>
                    <div className="mt-1 text-base font-bold text-[#0f0000] leading-snug">
                      {std.value}
                    </div>
                    <p className="mt-1 text-xs text-neutral-600 leading-relaxed">
                      {std.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
