"use client"

import { useEffect, useRef } from "react"
import { Code2, FileText, CheckCircle2 } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (sectionRef.current) {
      const icons = sectionRef.current.querySelectorAll(".service-icon")
      const textElements = sectionRef.current.querySelectorAll(".service-text")

      icons.forEach((icon) => {
        gsap.fromTo(
          icon,
          { opacity: 0, rotateY: -90, rotateX: 20 },
          {
            opacity: 1,
            rotateY: 0,
            rotateX: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: icon,
              start: "top 80%",
              once: true,
            },
          },
        )

        icon.addEventListener("mouseenter", () => {
          gsap.to(icon, {
            rotation: 360,
            duration: 0.6,
            ease: "power2.inOut",
          })
        })

        icon.addEventListener("mouseleave", () => {
          gsap.set(icon, { rotation: 0 })
        })
      })

      textElements.forEach((text) => {
        const children = text.children
        gsap.fromTo(
          children,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power1.out",
            scrollTrigger: {
              trigger: text,
              start: "top 80%",
              once: true,
            },
          },
        )
      })
    }
  }, [])

  return (
    <section ref={sectionRef} id="services" className="bg-secondary text-secondary-foreground py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-4xl space-y-6 mb-12">
          <h2 className="text-4xl lg:text-6xl font-bold tracking-tight">Services</h2>
          <p className="text-xl lg:text-2xl text-secondary-foreground/80 leading-relaxed">
            Professional web development and CV creation services tailored to your needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Web Development Service */}
          <div className="group bg-background rounded-2xl p-8 lg:p-10 space-y-6 hover:shadow-2xl transition-all duration-300">
            <div
              className="service-icon w-16 h-16 bg-[var(--color-accent-blue)] rounded-xl flex items-center justify-center cursor-pointer"
              style={{ perspective: "1000px" }}
            >
              <Code2 className="w-8 h-8 text-background" />
            </div>

            <div className="service-text space-y-4">
              <h3 className="text-3xl lg:text-4xl font-bold text-card-foreground">Web Development</h3>
              <p className="text-lg text-card-foreground/70 leading-relaxed">
                Custom web applications built with modern technologies, responsive design, and best practices.
              </p>
              <ul className="space-y-3 pt-4">
                {[
                  "Full-stack web applications",
                  "Responsive & mobile-first design",
                  "E-commerce solutions",
                  "API development & integration",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-card-foreground/80">
                    <CheckCircle2 className="w-5 h-5 text-[var(--color-accent-green)] flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CV Creation Service */}
          <div className="group bg-background rounded-2xl p-8 lg:p-10 space-y-6 hover:shadow-2xl transition-all duration-300">
            <div
              className="service-icon w-16 h-16 bg-[var(--color-accent-green)] rounded-xl flex items-center justify-center cursor-pointer"
              style={{ perspective: "1000px" }}
            >
              <FileText className="w-8 h-8 text-background" />
            </div>

            <div className="service-text space-y-4">
              <h3 className="text-3xl lg:text-4xl font-bold text-card-foreground">CV Creation</h3>
              <p className="text-lg text-card-foreground/70 leading-relaxed">
                Professional CV design and writing services to help you stand out in the job market.
              </p>
              <ul className="space-y-3 pt-4">
                {[
                  "Custom CV design & layout",
                  "ATS-optimized formatting",
                  "Content writing & editing",
                  "LinkedIn profile optimization",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-card-foreground/80">
                    <CheckCircle2 className="w-5 h-5 text-[var(--color-accent-green)] flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
