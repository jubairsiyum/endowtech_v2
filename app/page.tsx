'use client'

import React, { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import HeroSection from '@/components/sections/HeroSection'
import TrustEcosystem from '@/components/sections/TrustEcosystem'
import FlagshipProducts from '@/components/sections/FlagshipProducts'
import ServicesSection from '@/components/sections/ServicesSection'
import ProcessSection from '@/components/sections/ProcessSection'
import TechStackSection from '@/components/sections/TechStackSection'
import CaseStudiesSection from '@/components/sections/CaseStudiesSection'
import ComparisonSection from '@/components/sections/ComparisonSection'
import GlobalPresence from '@/components/sections/GlobalPresence'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import FAQSection from '@/components/sections/FAQSection'
import ContactSection from '@/components/sections/ContactSection'
import WhatsAppButton from '@/components/layout/WhatsAppButton'
import Footer from '@/components/layout/Footer'

export default function HomePage() {
  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false)

  return (
    <>
      <Navbar
        isSchedulerOpen={isSchedulerOpen}
        setIsSchedulerOpen={setIsSchedulerOpen}
      />
      <main>
        <HeroSection onOpenScheduler={() => setIsSchedulerOpen(true)} />
        <TrustEcosystem />
        <FlagshipProducts />
        <ServicesSection />
        <ProcessSection />
        <TechStackSection />
        <CaseStudiesSection />
        <ComparisonSection />
        <GlobalPresence />
        <TestimonialsSection />
        <FAQSection />
        <ContactSection onOpenScheduler={() => setIsSchedulerOpen(true)} />
      </main>
      <WhatsAppButton />
      <Footer />
    </>
  )
}
