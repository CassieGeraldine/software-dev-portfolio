"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Send, CheckCircle2 } from "lucide-react"

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would send this data to a backend
    console.log("Form submitted:", formData)
    setIsSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "", message: "" })
      setIsSubmitted(false)
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  if (isSubmitted) {
    return (
      <div className="bg-secondary rounded-xl p-12 text-center space-y-6">
        <div className="w-20 h-20 mx-auto bg-[var(--color-accent-green)] rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-10 h-10 text-background" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-secondary-foreground">Message Sent!</h3>
          <p className="text-secondary-foreground/70">
            Thank you for reaching out. I'll get back to you as soon as possible.
          </p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-secondary rounded-xl p-8 space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-secondary-foreground">
            Name *
          </Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            required
            className="bg-background text-card-foreground"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-secondary-foreground">
            Email *
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your.email@example.com"
            required
            className="bg-background text-card-foreground"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject" className="text-secondary-foreground">
          Subject *
        </Label>
        <Input
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="What's this about?"
          required
          className="bg-background text-card-foreground"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-secondary-foreground">
          Message *
        </Label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell me about your project or inquiry..."
          rows={6}
          required
          className="bg-background text-card-foreground"
        />
      </div>

      <Button type="submit" className="w-full bg-primary text-primary-foreground hover:opacity-90">
        <Send className="w-4 h-4 mr-2" />
        Send Message
      </Button>
    </form>
  )
}
