// Utility function to get client information
export function getClientInfo() {
  if (typeof window === 'undefined') {
    return {
      userAgent: undefined,
      ipAddress: undefined,
    }
  }

  return {
    userAgent: navigator.userAgent,
    // Note: Getting real IP address requires a third-party service or server-side implementation
    // For now, we'll leave it undefined and you can add IP detection later if needed
    ipAddress: undefined,
  }
}

// Format timestamp for display
export function formatTimestamp(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

// Validate email format
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Sanitize form input
export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '')
}
