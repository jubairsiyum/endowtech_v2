import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import TechStack from '@/components/TechStack'
import IndustryCoverage from '@/components/IndustryCoverage'
import Portfolio from '@/components/Portfolio'
import About from '@/components/About'
import Testimonials from '@/components/Testimonials'
import ComparisonTable from '@/components/ComparisonTable'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <TechStack />
        <IndustryCoverage />
        <Portfolio />
        <About />
        <Testimonials />
        <ComparisonTable />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
