import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, orderBy, where, Timestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { ContactFormData, ContactSubmission, ContactSubmissionResponse } from '@/lib/types/contact'

const COLLECTION_NAME = 'contact_submissions'

// Submit a new contact form
export async function submitContactForm(
  formData: ContactFormData,
  additionalData?: { ipAddress?: string; userAgent?: string }
): Promise<ContactSubmissionResponse> {
  try {
    const submission: Omit<ContactSubmission, 'id'> = {
      ...formData,
      timestamp: new Date(),
      status: 'new',
      ...(additionalData?.ipAddress && { ipAddress: additionalData.ipAddress }),
      ...(additionalData?.userAgent && { userAgent: additionalData.userAgent }),
    }

    // Convert to Firestore-compatible data by removing undefined values
    const firestoreData = {
      ...submission,
      timestamp: Timestamp.fromDate(submission.timestamp)
    }

    // Remove any undefined fields before sending to Firestore
    Object.keys(firestoreData).forEach(key => {
      if (firestoreData[key as keyof typeof firestoreData] === undefined) {
        delete firestoreData[key as keyof typeof firestoreData]
      }
    })

    const docRef = await addDoc(collection(db, COLLECTION_NAME), firestoreData)

    return {
      success: true,
      message: 'Contact form submitted successfully!',
      id: docRef.id,
    }
  } catch (error) {
    console.error('Error submitting contact form:', error)
    return {
      success: false,
      message: 'Failed to submit contact form. Please try again.',
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

// Get all contact submissions (for admin dashboard)
export async function getContactSubmissions(): Promise<ContactSubmission[]> {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      orderBy('timestamp', 'desc')
    )
    const querySnapshot = await getDocs(q)

    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp.toDate(),
    })) as ContactSubmission[]
  } catch (error) {
    console.error('Error fetching contact submissions:', error)
    return []
  }
}

// Get unread contact submissions count
export async function getUnreadCount(): Promise<number> {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('status', '==', 'new')
    )
    const querySnapshot = await getDocs(q)
    return querySnapshot.size
  } catch (error) {
    console.error('Error fetching unread count:', error)
    return 0
  }
}

// Mark submission as read
export async function markAsRead(submissionId: string): Promise<boolean> {
  try {
    const docRef = doc(db, COLLECTION_NAME, submissionId)
    await updateDoc(docRef, {
      status: 'read',
    })
    return true
  } catch (error) {
    console.error('Error marking submission as read:', error)
    return false
  }
}

// Mark submission as replied
export async function markAsReplied(submissionId: string): Promise<boolean> {
  try {
    const docRef = doc(db, COLLECTION_NAME, submissionId)
    await updateDoc(docRef, {
      status: 'replied',
    })
    return true
  } catch (error) {
    console.error('Error marking submission as replied:', error)
    return false
  }
}

// Delete a submission
export async function deleteSubmission(submissionId: string): Promise<boolean> {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, submissionId))
    return true
  } catch (error) {
    console.error('Error deleting submission:', error)
    return false
  }
}

// Get submissions by status
export async function getSubmissionsByStatus(status: 'new' | 'read' | 'replied'): Promise<ContactSubmission[]> {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('status', '==', status),
      orderBy('timestamp', 'desc')
    )
    const querySnapshot = await getDocs(q)

    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp.toDate(),
    })) as ContactSubmission[]
  } catch (error) {
    console.error('Error fetching submissions by status:', error)
    return []
  }
}
