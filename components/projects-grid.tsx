"use client"

import { useState } from "react"
import { ProjectCard } from "./project-card"
import { ProjectForm } from "./project-form"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export interface Project {
  id: string
  title: string
  description: string
  techStack: string[]
  imageUrl?: string
  videoUrl?: string
  demoLink?: string
}

const initialProjects: Project[] = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce solution with payment integration, inventory management, and admin dashboard.",
    techStack: ["React", "Node.js", "PostgreSQL", "Stripe"],
    imageUrl: "/modern-ecommerce-dashboard.png",
    demoLink: "https://example.com",
  },
  {
    id: "2",
    title: "Task Management App",
    description:
      "Collaborative task management tool with real-time updates, team workspaces, and productivity analytics.",
    techStack: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS"],
    imageUrl: "/task-management-app.png",
    demoLink: "https://example.com",
  },
  {
    id: "3",
    title: "Weather Forecast Dashboard",
    description: "Real-time weather dashboard with interactive maps, forecasts, and location-based alerts.",
    techStack: ["React", "OpenWeather API", "Chart.js", "CSS"],
    imageUrl: "/weather-dashboard-maps.png",
    demoLink: "https://example.com",
  },
]

export function ProjectsGrid() {
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)

  const handleAddProject = (project: Omit<Project, "id">) => {
    const newProject = {
      ...project,
      id: Date.now().toString(),
    }
    setProjects([newProject, ...projects])
    setIsFormOpen(false)
  }

  const handleUpdateProject = (updatedProject: Project) => {
    setProjects(projects.map((p) => (p.id === updatedProject.id ? updatedProject : p)))
    setEditingProject(null)
    setIsFormOpen(false)
  }

  const handleDeleteProject = (id: string) => {
    setProjects(projects.filter((p) => p.id !== id))
  }

  const handleEdit = (project: Project) => {
    setEditingProject(project)
    setIsFormOpen(true)
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setEditingProject(null)
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl lg:text-3xl font-bold">All Projects</h2>
        <Button onClick={() => setIsFormOpen(true)} className="bg-primary text-primary-foreground hover:opacity-90">
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </div>

      {isFormOpen && (
        <ProjectForm
          project={editingProject}
          onSubmit={editingProject ? handleUpdateProject : handleAddProject}
          onCancel={handleCloseForm}
        />
      )}

      {projects.length === 0 ? (
        <div className="text-center py-20 space-y-4">
          <p className="text-xl text-secondary-foreground/60">No projects yet</p>
          <p className="text-secondary-foreground/40">Click "Add Project" to create your first project</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} onEdit={handleEdit} onDelete={handleDeleteProject} />
          ))}
        </div>
      )}
    </div>
  )
}
