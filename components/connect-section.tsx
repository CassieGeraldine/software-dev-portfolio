"use client"

import { useEffect, useRef } from "react"
import { ContactForm } from "@/components/contact-form"
import { Linkedin, Github, Mail, Phone } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const contactLinks = [
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://www.linkedin.com/in/geraldine-c-makaza-a524b9216/",
    label: "Connect on LinkedIn",
    color: "var(--color-accent-blue)",
  },
  {
    name: "GitHub",
    icon: Github,
    href: "https://github.com/CassieGeraldine",
    label: "View GitHub Profile",
    color: "var(--color-accent-green)",
  },
  {
    name: "Email",
    icon: Mail,
    href: "mailto:cassiemakaza447@gmail.com",
    label: "cassiemakaza447@gmail.com",
    color: "var(--color-accent-yellow)",
  },
  {
    name: "Phone",
    icon: Phone,
    href: "tel:+27698210150",
    label: "+27 698 210 150",
    color: "var(--color-accent-red)",
  },
]

export function ConnectSection() {
  const linksRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (linksRef.current) {
      const links = linksRef.current.querySelectorAll(".contact-link")

      links.forEach((link, index) => {
        const angle = index * 90 - 180 // Start from left side

        gsap.fromTo(
          link,
          {
            opacity: 0,
            rotateY: angle,
            z: -200,
          },
          {
            opacity: 1,
            rotateY: 0,
            z: 0,
            duration: 1,
            delay: index * 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: linksRef.current,
              start: "top 75%",
              once: true,
            },
          },
        )
      })
    }
  }, [])

  return (
    <section id="connect" className="bg-background py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-6">
            <h2 className="text-4xl lg:text-6xl font-bold tracking-tight">Let's Connect</h2>
            <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed">
              I'm always excited to collaborate on new projects and connect with fellow developers.
            </p>
          </div>

          <div ref={linksRef} className="grid md:grid-cols-2 gap-6" style={{ perspective: "1000px" }}>
            {contactLinks.map((link) => {
              const Icon = link.icon
              return (
                <a
                  key={link.name}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="contact-link group flex items-center gap-6 p-6 bg-secondary rounded-xl hover:shadow-lg transition-all duration-300 border border-transparent hover:border-primary/20"
                >
                  <div
                    className="w-14 h-14 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: link.color }}
                  >
                    <Icon className="w-7 h-7 text-background" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1">{link.name}</h3>
                    <p className="text-muted-foreground">{link.label}</p>
                  </div>
                </a>
              )
            })}
          </div>

          <div className="pt-12">
            <div className="text-center space-y-4 mb-8">
              <h3 className="text-3xl font-bold">Send Me a Message</h3>
              <p className="text-lg text-muted-foreground">
                Have a project in mind? Fill out the form below and I'll get back to you soon.
              </p>
            </div>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
