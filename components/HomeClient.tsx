"use client";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import ComparisonSection from "@/components/sections/ComparisonSection";
import ContactSection from "@/components/sections/ContactSection";
import FAQSection from "@/components/sections/FAQSection";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import GlobalPresence from "@/components/sections/GlobalPresence";
import HeroSection from "@/components/sections/HeroSection";
import IndustriesSection from "@/components/sections/IndustriesSection";
import ProcessSection from "@/components/sections/ProcessSection";
import ServicesSection from "@/components/sections/ServicesSection";
import TechStackSection from "@/components/sections/TechStackSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import TrustEcosystem from "@/components/sections/TrustEcosystem";
import { useState } from "react";

export default function HomeClient() {
  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);

  return (
    <>
      <Navbar
        isSchedulerOpen={isSchedulerOpen}
        setIsSchedulerOpen={setIsSchedulerOpen}
      />
      <main>
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
