"use client";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import HeroSection from "@/components/sections/HeroSection";
import TrustEcosystem from "@/components/sections/TrustEcosystem";
import dynamic from "next/dynamic";
import { useState } from "react";

// Code-split below-the-fold sections to drastically reduce initial main-thread work & TBT
const FeaturedProjects = dynamic(
  () => import("@/components/sections/FeaturedProjects"),
);
const ServicesSection = dynamic(
  () => import("@/components/sections/ServicesSection"),
);
const IndustriesSection = dynamic(
  () => import("@/components/sections/IndustriesSection"),
);
const ProcessSection = dynamic(
  () => import("@/components/sections/ProcessSection"),
);
const TechStackSection = dynamic(
  () => import("@/components/sections/TechStackSection"),
);
const ComparisonSection = dynamic(
  () => import("@/components/sections/ComparisonSection"),
);
const GlobalPresence = dynamic(
  () => import("@/components/sections/GlobalPresence"),
);
const TestimonialsSection = dynamic(
  () => import("@/components/sections/TestimonialsSection"),
);
const FAQSection = dynamic(() => import("@/components/sections/FAQSection"));
const ContactSection = dynamic(
  () => import("@/components/sections/ContactSection"),
);

export default function HomeClient() {
  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);

  return (
    <>
      <Navbar
        isSchedulerOpen={isSchedulerOpen}
        setIsSchedulerOpen={setIsSchedulerOpen}
      />
      <main id="main">
        <HeroSection onOpenScheduler={() => setIsSchedulerOpen(true)} />
        <TrustEcosystem />
        <FeaturedProjects onOpenScheduler={() => setIsSchedulerOpen(true)} />
        {/* <FlagshipProducts /> */}
        <ServicesSection />
        <IndustriesSection onOpenScheduler={() => setIsSchedulerOpen(true)} />
        <ProcessSection />
        <TechStackSection />
        {/* <CaseStudiesSection /> */}
        <ComparisonSection />
        <GlobalPresence />
        <TestimonialsSection />
        <FAQSection onOpenScheduler={() => setIsSchedulerOpen(true)} />
        <ContactSection onOpenScheduler={() => setIsSchedulerOpen(true)} />
      </main>
      <WhatsAppButton />
      <Footer />
    </>
  );
}
