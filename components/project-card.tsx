"use client"

import type React from "react"

import type { Project } from "./projects-grid"
import { Button } from "@/components/ui/button"
import { ExternalLink, Edit, Trash2 } from "lucide-react"
import Image from "next/image"
import { useRef } from "react"
import gsap from "gsap"

interface ProjectCardProps {
  project: Project
  onEdit: (project: Project) => void
  onDelete: (id: string) => void
}

export function ProjectCard({ project, onEdit, onDelete }: ProjectCardProps) {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  const handleTitleHover = () => {
    if (!titleRef.current) return

    const originalText = project.title
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let iteration = 0

    const interval = setInterval(() => {
      if (!titleRef.current) return

      titleRef.current.textContent = originalText
        .split("")
        .map((char, index) => {
          if (index < iteration) {
            return originalText[index]
          }
          return chars[Math.floor(Math.random() * chars.length)]
        })
        .join("")

      iteration += 1 / 3

      if (iteration >= originalText.length) {
        clearInterval(interval)
        if (titleRef.current) {
          titleRef.current.textContent = originalText
        }
      }
    }, 30)
  }

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return

    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = (y - centerY) / 20
    const rotateY = (centerX - x) / 20

    gsap.to(imageRef.current, {
      rotateX,
      rotateY,
      duration: 0.3,
      ease: "power2.out",
    })
  }

  const handleCardMouseLeave = () => {
    if (!imageRef.current) return

    gsap.to(imageRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "power2.out",
    })
  }

  return (
    <div
      className="project-card group bg-background rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:scale-105"
      onMouseMove={handleCardMouseMove}
      onMouseLeave={handleCardMouseLeave}
    >
      {/* Project Image/Video */}
      <div
        ref={imageRef}
        className="relative aspect-video bg-muted overflow-hidden"
        style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
      >
        {project.videoUrl ? (
          <video src={project.videoUrl} className="w-full h-full object-cover" controls />
        ) : (
          <Image
            src={project.imageUrl || "/placeholder.svg?height=400&width=600&query=project placeholder"}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        )}
      </div>

      {/* Project Content */}
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <h3
            ref={titleRef}
            onMouseEnter={handleTitleHover}
            className="text-xl font-bold text-card-foreground cursor-default"
          >
            {project.title}
          </h3>
          <p className="text-sm text-card-foreground/70 leading-relaxed line-clamp-3">{project.description}</p>
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          {project.demoLink && (
            <Button asChild variant="outline" size="sm" className="flex-1 bg-transparent">
              <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Demo
              </a>
            </Button>
          )}
          <Button onClick={() => onEdit(project)} variant="outline" size="sm">
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            onClick={() => onDelete(project.id)}
            variant="outline"
            size="sm"
            className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
