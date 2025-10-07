"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true)
  const preloaderRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const innerCircleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (textRef.current && innerCircleRef.current) {
      const tl = gsap.timeline({ repeat: -1 })

      // Main rotation
      tl.to(
        textRef.current,
        {
          rotation: 360,
          duration: 6,
          ease: "none",
        },
        0,
      )

      // 3D perspective distortion
      tl.to(
        textRef.current,
        {
          rotationY: 360,
          duration: 8,
          ease: "power1.inOut",
        },
        0,
      )

      // Scale pulsing with distortion
      tl.to(
        textRef.current,
        {
          scale: 1.15,
          duration: 1,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        },
        0,
      )

      // Skew morphing effect
      tl.to(
        textRef.current,
        {
          skewX: 10,
          skewY: 5,
          duration: 0.8,
          yoyo: true,
          repeat: -1,
          ease: "power2.inOut",
        },
        0,
      )

      // Inner circle counter-rotation
      gsap.to(innerCircleRef.current, {
        rotation: -360,
        duration: 4,
        repeat: -1,
        ease: "none",
      })
    }

    // Hide preloader after 3 seconds
    const timer = setTimeout(() => {
      if (preloaderRef.current) {
        gsap.to(preloaderRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: "power2.inOut",
          onComplete: () => setIsLoading(false),
        })
      }
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (!isLoading) return null

  return (
    <div ref={preloaderRef} className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
      <div className="relative w-[400px] h-[400px]" style={{ perspective: "1000px" }}>
        <div
          ref={textRef}
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transformOrigin: "center",
            transformStyle: "preserve-3d",
          }}
        >
          <svg viewBox="0 0 400 400" className="w-full h-full">
            <defs>
              <path id="circlePath" d="M 200, 200 m -150, 0 a 150,150 0 1,1 300,0 a 150,150 0 1,1 -300,0" />
            </defs>
            <text className="text-[14px] font-bold fill-white tracking-[0.3em]">
              <textPath href="#circlePath">
                GERALDINE C MAKAZA • CREATIVE SOFTWARE DEVELOPER • GERALDINE C MAKAZA • CREATIVE SOFTWARE DEVELOPER •
              </textPath>
            </text>
          </svg>
        </div>

        <div
          ref={innerCircleRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-white/30 rounded-full"
          style={{ transformStyle: "preserve-3d" }}
        />

        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full animate-pulse" />
      </div>
    </div>
  )
}
