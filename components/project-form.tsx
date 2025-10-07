"use client"

import type React from "react"

import { useState } from "react"
import type { Project } from "./projects-grid"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { X } from "lucide-react"

interface ProjectFormProps {
  project?: Project | null
  onSubmit: (project: Omit<Project, "id"> | Project) => void
  onCancel: () => void
}

export function ProjectForm({ project, onSubmit, onCancel }: ProjectFormProps) {
  const [formData, setFormData] = useState({
    title: project?.title || "",
    description: project?.description || "",
    techStack: project?.techStack.join(", ") || "",
    imageUrl: project?.imageUrl || "",
    videoUrl: project?.videoUrl || "",
    demoLink: project?.demoLink || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const projectData = {
      ...formData,
      techStack: formData.techStack
        .split(",")
        .map((tech) => tech.trim())
        .filter(Boolean),
    }

    if (project) {
      onSubmit({ ...projectData, id: project.id })
    } else {
      onSubmit(projectData)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="bg-background rounded-xl border border-border p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold text-card-foreground">{project ? "Edit Project" : "Add New Project"}</h3>
        <Button onClick={onCancel} variant="ghost" size="sm">
          <X className="w-5 h-5" />
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Project Title *</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="My Awesome Project"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description *</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your project..."
            rows={4}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="techStack">Tech Stack (comma-separated) *</Label>
          <Input
            id="techStack"
            name="techStack"
            value={formData.techStack}
            onChange={handleChange}
            placeholder="React, Node.js, PostgreSQL"
            required
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="videoUrl">Video URL</Label>
            <Input
              id="videoUrl"
              name="videoUrl"
              value={formData.videoUrl}
              onChange={handleChange}
              placeholder="https://example.com/video.mp4"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="demoLink">Demo Link</Label>
          <Input
            id="demoLink"
            name="demoLink"
            value={formData.demoLink}
            onChange={handleChange}
            placeholder="https://example.com"
          />
        </div>

        <div className="flex gap-4 pt-4">
          <Button type="submit" className="flex-1 bg-primary text-primary-foreground hover:opacity-90">
            {project ? "Update Project" : "Add Project"}
          </Button>
          <Button type="button" onClick={onCancel} variant="outline" className="flex-1 bg-transparent">
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
