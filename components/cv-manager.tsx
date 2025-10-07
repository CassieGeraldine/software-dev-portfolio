"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, Upload, Trash2, FileText } from "lucide-react"

export function CVManager() {
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [cvUrl, setCvUrl] = useState<string | null>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type === "application/pdf") {
      setCvFile(file)
      const url = URL.createObjectURL(file)
      setCvUrl(url)
    } else {
      alert("Please upload a PDF file")
    }
  }

  const handleDelete = () => {
    if (cvUrl) {
      URL.revokeObjectURL(cvUrl)
    }
    setCvFile(null)
    setCvUrl(null)
  }

  const handleDownload = () => {
    if (cvUrl && cvFile) {
      const link = document.createElement("a")
      link.href = cvUrl
      link.download = cvFile.name
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-3xl lg:text-4xl font-bold">Download My CV</h2>
        <p className="text-lg text-secondary-foreground/80">
          Get a detailed overview of my experience, skills, and achievements.
        </p>
      </div>

      <div className="bg-background/10 rounded-xl p-8 space-y-6">
        {cvFile ? (
          <div className="space-y-6">
            {/* CV Preview */}
            <div className="flex items-center gap-4 p-4 bg-background/20 rounded-lg">
              <div className="w-12 h-12 bg-[var(--color-accent-blue)] rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-secondary" />
              </div>
              <div className="flex-1">
                <p className="font-medium">{cvFile.name}</p>
                <p className="text-sm text-secondary-foreground/60">{(cvFile.size / 1024).toFixed(2)} KB</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-4 justify-center">
              <Button onClick={handleDownload} className="bg-primary text-primary-foreground hover:opacity-90">
                <Download className="w-4 h-4 mr-2" />
                Download CV
              </Button>
              <Button
                onClick={handleDelete}
                variant="outline"
                className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground bg-transparent"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete CV
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 mx-auto bg-background/20 rounded-full flex items-center justify-center">
              <Upload className="w-10 h-10 text-secondary-foreground/60" />
            </div>
            <div className="space-y-2">
              <p className="font-medium">No CV uploaded yet</p>
              <p className="text-sm text-secondary-foreground/60">Upload your CV to make it available for download</p>
            </div>
            <div>
              <label htmlFor="cv-upload">
                <Button asChild className="bg-primary text-primary-foreground hover:opacity-90 cursor-pointer">
                  <span>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload CV (PDF)
                  </span>
                </Button>
              </label>
              <input id="cv-upload" type="file" accept=".pdf" onChange={handleFileUpload} className="hidden" />
            </div>
          </div>
        )}
      </div>

      <p className="text-sm text-center text-secondary-foreground/60">
        For recruiters: Click the download button to get my latest CV
      </p>
    </div>
  )
}
