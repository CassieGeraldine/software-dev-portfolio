import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Firebase configuration using environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
}

// Validate configuration in development
if (process.env.NODE_ENV === 'development') {
  const requiredEnvVars = [
    'NEXT_PUBLIC_FIREBASE_API_KEY',
    'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
    'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
    'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
    'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
    'NEXT_PUBLIC_FIREBASE_APP_ID'
  ]

  const missingVars = requiredEnvVars.filter(envVar => !process.env[envVar])

  if (missingVars.length > 0) {
    console.error('Missing Firebase environment variables:', missingVars)
    console.error('Please check your .env.local file and ensure all Firebase environment variables are set.')
    console.error('Refer to .env.example for the required variables.')
  }
}

// Initialize Firebase only if we have the required config
let app: any = null
let db: any = null

try {
  if (firebaseConfig.apiKey && firebaseConfig.projectId) {
    app = initializeApp(firebaseConfig)
    db = getFirestore(app)
  } else {
    console.warn('Firebase not initialized: Missing required configuration')
  }
} catch (error) {
  console.error('Error initializing Firebase:', error)
}

export { db }
export default app
