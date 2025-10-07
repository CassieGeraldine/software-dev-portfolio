"use client"

import { useEffect, useRef } from "react"
import { ProjectsGrid } from "@/components/projects-grid"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const hackathonRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (sectionRef.current) {
      const cards = sectionRef.current.querySelectorAll(".project-card")

      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              once: true,
            },
          },
        )
      })
    }

    if (hackathonRef.current) {
      const element = hackathonRef.current

      element.addEventListener("mousemove", (e) => {
        const rect = element.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const centerX = rect.width / 2
        const centerY = rect.height / 2

        const rotateX = ((y - centerY) / centerY) * -10
        const rotateY = ((x - centerX) / centerX) * 10

        gsap.to(element, {
          rotateX,
          rotateY,
          duration: 0.3,
          ease: "power2.out",
        })
      })

      element.addEventListener("mouseleave", () => {
        gsap.to(element, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.5,
          ease: "power2.out",
        })
      })
    }
  }, [])

  return (
    <section ref={sectionRef} id="projects" className="bg-background py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-4xl space-y-6 mb-12">
          <h2 className="text-4xl lg:text-6xl font-bold tracking-tight">My Projects</h2>
          <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed">
            A showcase of my work, from hackathon wins to personal experiments and client projects.
          </p>
        </div>

        <Link href="/hackathons" className="block mb-16">
          <div
            ref={hackathonRef}
            className="relative h-[400px] rounded-2xl overflow-hidden cursor-pointer group"
            style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
          >
            {/* Dark corridor effect with gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black">
              {/* Grid lines for depth effect */}
              <div className="absolute inset-0 opacity-20">
                <div
                  className="h-full w-full"
                  style={{
                    backgroundImage: `
                    linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
                  `,
                    backgroundSize: "50px 50px",
                  }}
                />
              </div>

              {/* Center frame/portal */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-[600px] h-[300px] border-4 border-white/30 rounded-lg transform transition-all duration-500 group-hover:scale-110 group-hover:border-white/60">
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-8">
                    <h3 className="text-4xl font-black tracking-tight mb-4">TECH EVENTS</h3>
                    <h3 className="text-4xl font-black tracking-tight mb-6">& HACKATHONS</h3>
                    <div className="flex items-center gap-2 text-sm tracking-wider opacity-80 group-hover:opacity-100 transition-opacity">
                      <span>EXPLORE GALLERY</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />
                </div>
              </div>

              {/* Ambient light effect */}
              <div className="absolute inset-0 bg-gradient-radial from-blue-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>
        </Link>

        <ProjectsGrid />
      </div>
    </section>
  )
}
