"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  getContactSubmissions,
  markAsRead,
  markAsReplied,
  deleteSubmission,
  getUnreadCount
} from "@/lib/services/contactService"
import { formatTimestamp } from "@/lib/utils/contactUtils"
import type { ContactSubmission } from "@/lib/types/contact"
import { Mail, Clock, CheckCircle2, Reply, Trash2, RefreshCw } from "lucide-react"

export function ContactSubmissionsAdmin() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  const loadSubmissions = async () => {
    setLoading(true)
    try {
      const [submissionsData, unreadCountData] = await Promise.all([
        getContactSubmissions(),
        getUnreadCount()
      ])
      setSubmissions(submissionsData)
      setUnreadCount(unreadCountData)
    } catch (error) {
      console.error("Error loading submissions:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadSubmissions()
  }, [])

  const handleMarkAsRead = async (id: string) => {
    setActionLoading(id)
    const success = await markAsRead(id)
    if (success) {
      await loadSubmissions()
    }
    setActionLoading(null)
  }

  const handleMarkAsReplied = async (id: string) => {
    setActionLoading(id)
    const success = await markAsReplied(id)
    if (success) {
      await loadSubmissions()
    }
    setActionLoading(null)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this submission?")) return

    setActionLoading(id)
    const success = await deleteSubmission(id)
    if (success) {
      await loadSubmissions()
    }
    setActionLoading(null)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800'
      case 'read': return 'bg-yellow-100 text-yellow-800'
      case 'replied': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <RefreshCw className="w-6 h-6 animate-spin" />
        <span className="ml-2">Loading submissions...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold">Contact Submissions</h2>
          <Badge variant="secondary">
            {unreadCount} unread
          </Badge>
        </div>
        <Button onClick={loadSubmissions} variant="outline" size="sm">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      {submissions.length === 0 ? (
        <Card className="p-8 text-center">
          <Mail className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No submissions yet</h3>
          <p className="text-gray-500">Contact form submissions will appear here.</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {submissions.map((submission) => (
            <Card key={submission.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">{submission.name}</h3>
                    <Badge className={getStatusColor(submission.status)}>
                      {submission.status}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  {formatTimestamp(submission.timestamp)}
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div>
                  <span className="text-sm font-medium text-gray-600">Email:</span>
                  <p className="text-gray-900">{submission.email}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Subject:</span>
                  <p className="text-gray-900">{submission.subject}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Message:</span>
                  <p className="text-gray-900 whitespace-pre-wrap">{submission.message}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-4 border-t">
                {submission.status === 'new' && (
                  <Button
                    onClick={() => handleMarkAsRead(submission.id!)}
                    disabled={actionLoading === submission.id}
                    variant="outline"
                    size="sm"
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Mark as Read
                  </Button>
                )}

                {(submission.status === 'new' || submission.status === 'read') && (
                  <Button
                    onClick={() => handleMarkAsReplied(submission.id!)}
                    disabled={actionLoading === submission.id}
                    variant="outline"
                    size="sm"
                  >
                    <Reply className="w-4 h-4 mr-2" />
                    Mark as Replied
                  </Button>
                )}

                <Button
                  onClick={() => handleDelete(submission.id!)}
                  disabled={actionLoading === submission.id}
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
