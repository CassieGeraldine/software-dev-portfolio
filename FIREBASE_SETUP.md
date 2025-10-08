# Environment Setup

This project uses Firebase for contact form submissions. You'll need to set up your own Firebase project and configure the environment variables.

## Firebase Setup

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use an existing one
3. Enable Firestore Database
4. Go to Project Settings > General > Your apps
5. Add a web app if you haven't already
6. Copy the Firebase configuration values

## Environment Variables

1. Copy the `.env.example` file to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Replace the placeholder values in `.env.local` with your actual Firebase configuration:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your_actual_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_actual_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_actual_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_actual_app_id
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_actual_measurement_id
   ```

## Firestore Security Rules

In your Firebase Console, go to Firestore Database > Rules and add:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /contact_submissions/{document} {
      allow write: if true; // Allows contact form submissions
      allow read: if false; // Restricts reading for security
    }
  }
}
```

## Deployment

When deploying to platforms like Vercel, Netlify, or others:

1. Add all the environment variables in your deployment platform's settings
2. Make sure to use the same variable names as in `.env.example`
3. The values should be the same as in your local `.env.local` file

## Security Notes

- Never commit `.env.local` or any file containing actual API keys
- The `.env*` pattern in `.gitignore` prevents accidental commits
- Firebase API keys for web apps are safe to expose on the client side, but Firestore security rules should be properly configured
- For production, consider implementing server-side validation and rate limiting
