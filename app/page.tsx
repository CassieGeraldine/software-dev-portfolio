import { Preloader } from "@/components/preloader"
import { PageWrapper } from "@/components/page-wrapper"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ProjectsSection } from "@/components/projects-section"
import { ServicesSection } from "@/components/services-section"
import { ConnectSection } from "@/components/connect-section"

export default function HomePage() {
  return (
    <>
      <Preloader />

      <PageWrapper>
        <main className="scroll-smooth">
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <ServicesSection />
          <ConnectSection />
        </main>
      </PageWrapper>
    </>
  )
}
