"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Pencil, Trash2, X, Calendar, Award, ArrowLeft } from "lucide-react"

interface HackathonEvent {
  id: string
  title: string
  date: string
  description: string
  media: string
  mediaType: "image" | "video"
}

export default function HackathonsPage() {
  const [events, setEvents] = useState<HackathonEvent[]>([
    {
      id: "1",
      title: "AI Innovation Hackathon Winner",
      date: "2024-03-15",
      description: "Built an AI-powered code review assistant that won first place among 50+ teams.",
      media: "/hackathon-team-celebrating.jpg",
      mediaType: "image",
    },
    {
      id: "2",
      title: "FinTech Challenge 2024",
      date: "2024-01-20",
      description: "Developed a mobile payment solution for underbanked communities, securing 2nd place.",
      media: "/fintech-mobile-app-demo.jpg",
      mediaType: "image",
    },
  ])

  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingEvent, setEditingEvent] = useState<HackathonEvent | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    description: "",
    media: "",
    mediaType: "image" as "image" | "video",
  })

  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingEvent) {
      setEvents(events.map((event) => (event.id === editingEvent.id ? { ...formData, id: event.id } : event)))
    } else {
      setEvents([...events, { ...formData, id: Date.now().toString() }])
    }

    resetForm()
  }

  const handleEdit = (event: HackathonEvent) => {
    setEditingEvent(event)
    setFormData({
      title: event.title,
      date: event.date,
      description: event.description,
      media: event.media,
      mediaType: event.mediaType,
    })
    setIsFormOpen(true)
  }

  const handleDelete = (id: string) => {
    setEvents(events.filter((event) => event.id !== id))
  }

  const resetForm = () => {
    setFormData({ title: "", date: "", description: "", media: "", mediaType: "image" })
    setEditingEvent(null)
    setIsFormOpen(false)
  }

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      const type = file.type.startsWith("video/") ? "video" : "image"
      setFormData({ ...formData, media: url, mediaType: type })
    }
  }

  const handleBackToProjects = () => {
    router.push("/#projects")
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      <main className="pt-32 pb-20 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <Button
              onClick={handleBackToProjects}
              variant="ghost"
              className="text-white hover:text-gray-300 hover:bg-white/10 font-medium text-lg group"
            >
              <ArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
              BACK TO PROJECTS
            </Button>
          </div>

          {/* Header */}
          <div className="mb-16 space-y-6">
            <h1 className="text-6xl lg:text-8xl font-black tracking-tight">
              TECH EVENTS
              <br />& HACKATHONS
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl">
              A collection of my achievements and experiences from various hackathons and tech competitions.
            </p>
          </div>

          {/* Add New Button */}
          <div className="mb-12">
            <Button
              onClick={() => setIsFormOpen(true)}
              className="bg-white text-black hover:bg-gray-200 font-bold"
              size="lg"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add New Event
            </Button>
          </div>

          {/* Events Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {events.map((event) => (
              <Card key={event.id} className="bg-gray-900 border-gray-800 overflow-hidden group">
                {/* Media */}
                <div className="relative aspect-video overflow-hidden">
                  {event.mediaType === "video" ? (
                    <video src={event.media} className="w-full h-full object-cover" controls />
                  ) : (
                    <img
                      src={event.media || "/placeholder.svg"}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  )}

                  {/* Action Buttons */}
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleEdit(event)}
                      className="bg-white/90 hover:bg-white"
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(event.id)}
                      className="bg-red-500/90 hover:bg-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(event.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold flex items-start gap-2">
                    <Award className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
                    {event.title}
                  </h3>

                  <p className="text-gray-400 leading-relaxed">{event.description}</p>
                </div>
              </Card>
            ))}
          </div>

          {/* Form Modal */}
          {isFormOpen && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
              <Card className="bg-gray-900 border-gray-800 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">{editingEvent ? "Edit Event" : "Add New Event"}</h2>
                    <Button variant="ghost" size="sm" onClick={resetForm}>
                      <X className="w-5 h-5" />
                    </Button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="title">Event Title</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="AI Innovation Hackathon Winner"
                        required
                        className="bg-gray-800 border-gray-700"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        required
                        className="bg-gray-800 border-gray-700"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Describe your achievement and experience..."
                        rows={4}
                        required
                        className="bg-gray-800 border-gray-700"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="media">Upload Image or Video</Label>
                      <Input
                        id="media"
                        type="file"
                        accept="image/*,video/*"
                        onChange={handleMediaUpload}
                        className="bg-gray-800 border-gray-700"
                      />
                      {formData.media && (
                        <p className="text-sm text-gray-400">
                          {formData.mediaType === "video" ? "Video" : "Image"} uploaded
                        </p>
                      )}
                    </div>

                    <div className="flex gap-4">
                      <Button type="submit" className="flex-1 bg-white text-black hover:bg-gray-200 font-bold">
                        {editingEvent ? "Update Event" : "Add Event"}
                      </Button>
                      <Button type="button" variant="outline" onClick={resetForm} className="flex-1 bg-transparent">
                        Cancel
                      </Button>
                    </div>
                  </form>
                </div>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
