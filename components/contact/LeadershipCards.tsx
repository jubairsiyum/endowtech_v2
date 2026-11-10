import React from "react";
import Image from "next/image";
import { User } from "lucide-react";
import AnimatedContent from "@/components/AnimatedContent";
import { leadershipContacts } from "@/data/contact";
import { cn } from "@/lib/utils";
import type { LeadershipProfile } from "@/types";

function PortraitFrame({ profile }: { profile: LeadershipProfile }) {
  const isCeo = profile.variant === "ceo";

  return (
    <div
      className={cn(
        "relative z-20 shrink-0 overflow-hidden bg-white flex items-center justify-center shadow-[0_10px_25px_-10px_rgba(15,0,0,0.22)]",
        isCeo
          ? "w-[82px] h-[82px] sm:w-[96px] sm:h-[96px] rounded-[20px] border-[2.5px] border-[#0f0000]"
          : "w-[64px] h-[64px] sm:w-[74px] sm:h-[74px] rounded-[16px] border-[2px] border-[#0f0000]",
      )}
    >
      {profile.image ? (
        <Image
          src={profile.image}
          alt={`${profile.name} — ${profile.role}`}
          fill
          quality={95}
          sizes={
            isCeo
              ? "(max-width: 640px) 88px, 108px"
              : "(max-width: 640px) 68px, 84px"
          }
          className={cn(
            "object-cover",
            isCeo ? "object-[50%_18%]" : "object-top",
          )}
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-neutral-50 to-neutral-100 text-[#0f0000] select-none">
          <User
            className={cn(
              "text-neutral-400/80 mb-0.5",
              isCeo ? "w-6 h-6 sm:w-7 sm:h-7" : "w-5 h-5",
            )}
            strokeWidth={1.75}
          />
          <span
            className={cn(
              "font-black tracking-tight text-[#0f0000]",
              isCeo ? "text-xs sm:text-sm" : "text-[10px] sm:text-xs",
            )}
          >
            {profile.initials}
          </span>
        </div>
      )}
    </div>
  );
}

function LeaderBannerCard({ profile }: { profile: LeadershipProfile }) {
  const isCeo = profile.variant === "ceo";

  return (
    <div
      className={cn(
        "group relative flex items-end",
        isCeo ? "w-full max-w-[440px]" : "w-full max-w-[365px]",
      )}
    >
      <PortraitFrame profile={profile} />

      {/* Right Role Title + Solid Primary Red Ribbon */}
      <div
        className={cn(
          "relative z-10 flex-1 min-w-0",
          isCeo ? "-ml-4 pb-0.5" : "-ml-3.5 pb-0.5",
        )}
      >
        {/* Solid Primary Red Role Label Above Ribbon */}
        <div
          className={cn(
            "font-black uppercase tracking-[-0.02em] leading-none text-accent select-none",
            isCeo
              ? "pl-6 sm:pl-7 mb-1.5 text-2xl sm:text-[32px]"
              : "pl-5 sm:pl-6 mb-1 text-lg sm:text-[22px]",
          )}
        >
          {profile.role}
        </div>

        {/* Solid Primary Red Name Ribbon Extending Behind Portrait */}
        <div
          className={cn(
            "bg-accent shadow-[0_12px_28px_-10px_rgba(220,38,38,0.45)] transition-transform duration-300 group-hover:translate-x-0.5",
            isCeo
              ? "rounded-r-2xl pl-7 sm:pl-8 pr-5 sm:pr-7 py-3 sm:py-3.5"
              : "rounded-r-xl pl-6 sm:pl-7 pr-4 sm:pr-5 py-2 sm:py-2.5",
          )}
        >
          <div
            className={cn(
              "font-extrabold uppercase tracking-[0.02em] text-white leading-tight truncate",
              isCeo ? "text-sm sm:text-[17px]" : "text-xs sm:text-sm",
            )}
          >
            {profile.name}
          </div>
        </div>
      </div>
    </div>
  );
}

export function LeadershipCards({
  profiles = leadershipContacts,
}: {
  profiles?: LeadershipProfile[];
}) {
  const ceo = profiles.find((p) => p.variant === "ceo") ?? profiles[0];
  const techLead =
    profiles.find((p) => p.variant === "tech-lead") ?? profiles[1];

  return (
    <AnimatedContent
      trigger="mount"
      direction="horizontal"
      reverse
      distance={24}
      stagger={0.09}
      duration={0.62}
      delay={0.06}
      ease="power2.out"
      className="flex flex-col items-start gap-5 sm:gap-6"
      aria-label="Direct leadership contacts"
    >
      {ceo && <LeaderBannerCard profile={ceo} />}
      {techLead && <LeaderBannerCard profile={techLead} />}
    </AnimatedContent>
  );
}

export default LeadershipCards;
