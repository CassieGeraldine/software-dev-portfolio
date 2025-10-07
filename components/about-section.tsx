"use client"

import { useEffect, useRef } from "react"
import { CVManager } from "@/components/cv-manager"
import { GraduationCap, Award, Code2, Sparkles } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function AboutSection() {
  const headerRef = useRef<HTMLHeadingElement>(null)
  const bioRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (headerRef.current) {
      const text = "About Me"
      const letters = text.split("")
      headerRef.current.innerHTML = letters
        .map(
          (letter, i) =>
            `<span class="inline-block opacity-0" style="transform: translateY(-50px)">${letter === " " ? "&nbsp;" : letter}</span>`,
        )
        .join("")

      const spans = headerRef.current.querySelectorAll("span")

      ScrollTrigger.create({
        trigger: headerRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.to(spans, {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.05,
            ease: "power2.out",
          })
        },
        once: true,
      })
    }

    if (bioRef.current) {
      const paragraphs = bioRef.current.querySelectorAll("p")
      paragraphs.forEach((p) => {
        const words = p.textContent?.split(" ") || []
        p.innerHTML = words.map((word) => `<span class="inline-block opacity-0">${word}&nbsp;</span>`).join("")

        const wordSpans = p.querySelectorAll("span")
        ScrollTrigger.create({
          trigger: p,
          start: "top 85%",
          onEnter: () => {
            gsap.to(wordSpans, {
              opacity: 1,
              duration: 0.3,
              stagger: 0.03,
              ease: "power1.out",
            })
          },
          once: true,
        })

        p.addEventListener("mouseenter", () => {
          gsap.to(wordSpans, {
            y: -3,
            duration: 0.3,
            stagger: {
              each: 0.02,
              from: "start",
            },
            ease: "power1.out",
          })
        })

        p.addEventListener("mouseleave", () => {
          gsap.to(wordSpans, {
            y: 0,
            duration: 0.3,
            ease: "power1.out",
          })
        })
      })
    }
  }, [])

  return (
    <section id="about" className="bg-secondary text-secondary-foreground py-20">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 space-y-12">
        <h2 ref={headerRef} className="text-3xl lg:text-5xl font-bold min-h-[3rem]"></h2>

        <div ref={bioRef} className="space-y-6">
          <div className="space-y-4 text-lg leading-relaxed">
            <p>
              I'm currently studying Computer Science at WeThinkCode_, where I'm honing my skills in software
              development, algorithms, and problem-solving. My journey in tech has been driven by curiosity and a desire
              to build solutions that make a difference.
            </p>

            <p>
              I completed the intensive Le Wagon coding bootcamp, where I gained hands-on experience in full-stack web
              development, learning modern frameworks and best practices that I apply to every project I work on.
            </p>

            <p>
              As a multiple hackathon winner, I thrive in fast-paced, collaborative environments where innovation and
              creativity are key. These experiences have taught me to think quickly, work effectively in teams, and
              deliver functional solutions under pressure.
            </p>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-8 pt-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[var(--color-accent-blue)] rounded-lg flex items-center justify-center">
                <Code2 className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-bold">Technical Skills</h3>
            </div>
            <ul className="space-y-2 text-secondary-foreground/80">
              <li>• Full-Stack Web Development</li>
              <li>• JavaScript, TypeScript, Python</li>
              <li>• React, Next.js, Node.js</li>
              <li>• Database Design & Management</li>
              <li>• RESTful APIs & GraphQL</li>
            </ul>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[var(--color-accent-yellow)] rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-bold">Soft Skills</h3>
            </div>
            <ul className="space-y-2 text-secondary-foreground/80">
              <li>• Problem Solving & Critical Thinking</li>
              <li>• Team Collaboration</li>
              <li>• Agile Development</li>
              <li>• Project Management</li>
              <li>• Communication & Presentation</li>
            </ul>
          </div>
        </div>

        {/* Education */}
        <div className="space-y-8 pt-8">
          <h3 className="text-2xl font-bold">Education & Achievements</h3>

          <div className="space-y-6">
            <div className="flex gap-6 p-6 rounded-xl bg-background/10">
              <div className="w-12 h-12 bg-[var(--color-accent-blue)] rounded-lg flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-6 h-6 text-background" />
              </div>
              <div className="space-y-2">
                <h4 className="text-xl font-bold">WeThinkCode_</h4>
                <p className="text-secondary-foreground/80">Computer Science Student</p>
              </div>
            </div>

            <div className="flex gap-6 p-6 rounded-xl bg-background/10">
              <div className="w-12 h-12 bg-[var(--color-accent-green)] rounded-lg flex items-center justify-center flex-shrink-0">
                <Code2 className="w-6 h-6 text-background" />
              </div>
              <div className="space-y-2">
                <h4 className="text-xl font-bold">Le Wagon</h4>
                <p className="text-secondary-foreground/80">Full-Stack Web Development Bootcamp</p>
              </div>
            </div>

            <div className="flex gap-6 p-6 rounded-xl bg-background/10">
              <div className="w-12 h-12 bg-[var(--color-accent-red)] rounded-lg flex items-center justify-center flex-shrink-0">
                <Award className="w-6 h-6 text-background" />
              </div>
              <div className="space-y-2">
                <h4 className="text-xl font-bold">Hackathon Winner</h4>
                <p className="text-secondary-foreground/80">Multiple Competition Victories</p>
              </div>
            </div>
          </div>
        </div>

        {/* CV Manager */}
        <div className="pt-8">
          <CVManager />
        </div>
      </div>
    </section>
  )
}
