"use client"

import type React from "react"
import { Menu, X, ArrowUpRight } from "lucide-react"
import { useState, useRef } from "react"
import gsap from "gsap"

const navItems = [
  { name: "ABOUT ME", href: "#about" },
  { name: "WORKS", href: "#projects" },
  { name: "SERVICES", href: "#services" },
  { name: "CONNECT", href: "#connect" },
]

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const flashRef = useRef<HTMLDivElement>(null)

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()

    if (flashRef.current) {
      gsap.to(flashRef.current, {
        opacity: 1,
        duration: 0.2,
        onComplete: () => {
          const element = document.querySelector(href)
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" })
            setMobileMenuOpen(false)
          }
          gsap.to(flashRef.current, {
            opacity: 0,
            duration: 0.3,
            delay: 0.1,
          })
        },
      })
    }
  }

  const handleLinkHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = e.currentTarget
    const text = target.textContent || ""
    const letters = text.split("")

    target.innerHTML = letters
      .map((letter) => `<span class="inline-block">${letter === " " ? "&nbsp;" : letter}</span>`)
      .join("")

    const spans = target.querySelectorAll("span")
    gsap.to(spans, {
      y: -5,
      duration: 0.2,
      stagger: 0.02,
      yoyo: true,
      repeat: 1,
      ease: "power1.inOut",
    })
  }

  const handleLinkLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = e.currentTarget
    const originalText = target.getAttribute("data-text") || ""
    target.textContent = originalText
  }

  return (
    <>
      <div ref={flashRef} className="fixed inset-0 z-[60] bg-white pointer-events-none opacity-0" />

      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm">
        <div className="max-w-[1800px] mx-auto px-8 lg:px-16">
          <div className="flex items-center justify-between h-20">
            <a
              href="#home"
              onClick={(e) => scrollToSection(e, "#home")}
              className="text-sm font-bold tracking-tight hover:opacity-60 transition-opacity"
            >
              GERALDINE C MAKAZA
            </a>

            {/* Desktop Navigation - Centered */}
            <div className="hidden md:flex items-center justify-center gap-8 flex-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  data-text={`[ ${item.name} ]`}
                  onClick={(e) => scrollToSection(e, item.href)}
                  onMouseEnter={handleLinkHover}
                  onMouseLeave={handleLinkLeave}
                  className="text-xs font-medium tracking-wider transition-opacity hover:opacity-60"
                >
                  [ {item.name} ]
                </a>
              ))}
            </div>

            {/* Contact Me Button - Right aligned */}
            <a
              href="#connect"
              onClick={(e) => scrollToSection(e, "#connect")}
              className="hidden md:flex items-center gap-2 text-xs font-medium tracking-wider hover:opacity-60 transition-opacity border-b border-black pb-1"
            >
              CONTACT ME
              <ArrowUpRight className="w-4 h-4" />
            </a>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-6 border-t border-black/10">
              <div className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => scrollToSection(e, item.href)}
                    className="text-sm font-medium tracking-wider transition-opacity hover:opacity-60"
                  >
                    [ {item.name} ]
                  </a>
                ))}
                <a
                  href="#connect"
                  onClick={(e) => scrollToSection(e, "#connect")}
                  className="text-sm font-medium tracking-wider hover:opacity-60 transition-opacity border-b border-black pb-1 inline-flex items-center gap-2 w-fit"
                >
                  CONTACT ME
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  )
}
