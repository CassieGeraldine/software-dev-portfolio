"use client"

import type React from "react"

import { useRef, useEffect } from "react"
import gsap from "gsap"

export function PageWrapper({ children }: { children: React.ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window

      const xPercent = (clientX / innerWidth - 0.5) * 2
      const yPercent = (clientY / innerHeight - 0.5) * 2

      gsap.to(wrapper, {
        rotateY: xPercent * 2,
        rotateX: -yPercent * 2,
        duration: 0.5,
        ease: "power2.out",
      })
    }

    const handleMouseLeave = () => {
      gsap.to(wrapper, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.8,
        ease: "power2.out",
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    wrapper.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      wrapper.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <div
      ref={wrapperRef}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </div>
  )
}
