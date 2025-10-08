"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"

export function HeroSection() {
  const taglineRef = useRef<HTMLParagraphElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const videoRef = useRef<HTMLDivElement>(null)
  const [videoFile, setVideoFile] = useState<string | null>(null)

  useEffect(() => {
    if (headlineRef.current) {
      const words = headlineRef.current.querySelectorAll(".headline-word")

      // Initial 3D setup
      gsap.set(words, {
        transformPerspective: 1000,
        transformStyle: "preserve-3d",
      })

      // Create continuous 3D spinning and morphing effect
      words.forEach((word, index) => {
        const tl = gsap.timeline({ repeat: -1 })

        tl.to(word, {
          rotationY: 360,
          rotationX: 15,
          scale: 1.05,
          duration: 4,
          ease: "power1.inOut",
          delay: index * 0.3,
        }).to(word, {
          rotationY: 0,
          rotationX: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
        })

        // Add distortion effect
        gsap.to(word, {
          skewX: 5,
          duration: 0.5,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          delay: index * 0.2,
        })
      })
    }

    if (taglineRef.current) {
      const text = "Building the Future with Code."
      const letters = text.split("")
      taglineRef.current.innerHTML = letters
        .map(
          (letter, i) =>
            `<span class="inline-block opacity-0" style="transform: translateY(-100px)">${letter === " " ? "&nbsp;" : letter}</span>`,
        )
        .join("")

      const spans = taglineRef.current.querySelectorAll("span")
      gsap.to(spans, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: "bounce.out",
        delay: 0.5,
      })
    }

    // Video container fade in
    if (videoRef.current) {
      gsap.fromTo(
        videoRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 1.2, delay: 1, ease: "power2.out" },
      )
    }
  }, [])

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setVideoFile(url)
    }
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-white text-black pt-20 pb-16">
      <div className="max-w-[1800px] mx-auto px-8 lg:px-16 w-full">
        <div className="relative">
          <div className="text-center mb-8">
            <h1
              ref={headlineRef}
              className="text-[9vw] md:text-[7vw] lg:text-[6.5rem] xl:text-[8rem] font-black leading-[0.85] tracking-tighter"
              style={{ fontFamily: "var(--font-sans)", perspective: "1000px" }}
            >
              <span className="headline-word inline-block">CREATIVE</span>
              <br />
              <span className="headline-word inline-block">SOFTWARE</span>
              <br />
              <span className="headline-word inline-block">DEVELOPER</span>
            </h1>
          </div>

          {/* Grid Layout for Skills, Video, and Location */}
          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr_300px] gap-8 lg:gap-16 items-start mt-16">
            {/* Left: Skills List */}
            <div className="space-y-3 text-sm tracking-wide font-medium order-2 lg:order-1">
              <div>/COMPUTER SCIENCE</div>
              <div>/WEB DEVELOPMENT</div>
              <div>/HACKATHON WINNER</div>
            </div>

            {/* Center: Video Placeholder */}
            <div
              ref={videoRef}
              className="relative aspect-[3/4] max-w-md mx-auto w-full bg-gray-100 overflow-hidden opacity-0 order-1 lg:order-2"
            >
              {videoFile ? (
                <video src={videoFile} autoPlay loop muted playsInline className="w-full h-full object-cover" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                  <label className="cursor-pointer text-center space-y-4 p-8">
                    <div className="w-16 h-16 mx-auto bg-black/10 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-black/60" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-black/80">HeyGen Video Placeholder</p>
                    <p className="text-xs text-black/60">upload</p>
                    <input type="file" accept="video/*" onChange={handleVideoUpload} className="hidden" />
                  </label>
                </div>
              )}
            </div>

            {/* Right: Location and Tagline */}
            <div className="space-y-8 order-3">
              <div className="text-right">
                <div className="text-xs tracking-[0.3em] font-medium">BASED IN CAPE TOWN</div>
              </div>
              <div className="text-right">
                <p ref={taglineRef} className="text-sm font-medium min-h-[2rem]"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
