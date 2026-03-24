# Fannu Varin Setup Guide 🚀

This guide helps you set up Fannu Varin locally with Firebase + Cloudinary.

## 📋 Prerequisites

- Node.js 18+ installed
- npm installed (comes with Node.js)

## 🛠️ Step 1: Install dependencies

### 1.1 Install Dependencies
```bash
npm install
```

## 🧪 Step 2: Run locally

### 3.1 Start Development Server
```bash
npm run dev
```

### 3.2 Test the Application
1. Open http://localhost:5173
2. Sign up or sign in with email/password or Google
3. Choose role: Seeker / Provider
4. Provider: publish a skill listing
5. Seeker: browse skills and send booking requests

## 🔐 Required Environment Variables

Create `.env.local`:

```bash
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_unsigned_upload_preset
```

## 🔥 Firebase Setup

1. Create a Firebase project.
2. Enable Authentication providers:
   - Email/Password
   - Google (optional but supported)
3. Enable Firestore.
4. Add Firestore rules:

```txt
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /profiles/{uid} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
    match /listings/{id} {
      allow read: if true;
      allow create, update: if request.auth != null
        && request.resource.data.providerId == request.auth.uid;
      allow delete: if false;
    }
    match /bookings/{id} {
      allow read: if request.auth != null
        && (resource.data.seekerId == request.auth.uid || resource.data.providerId == request.auth.uid);
      allow create: if request.auth != null
        && request.resource.data.seekerId == request.auth.uid;
      allow update: if request.auth != null
        && (resource.data.seekerId == request.auth.uid || resource.data.providerId == request.auth.uid);
      allow delete: if false;
    }
  }
}
```

## ☁️ Cloudinary Setup

1. Create a Cloudinary account.
2. Create an **unsigned** upload preset.
3. Set:
   - `VITE_CLOUDINARY_CLOUD_NAME`
   - `VITE_CLOUDINARY_UPLOAD_PRESET`

## 🧹 Reset App Data

For local testing, clear browser site storage:
- Chrome/Edge: DevTools -> Application -> Storage -> Clear site data

## 📱 Step 5: Mobile Testing

The application is fully responsive. Test on:
- Mobile browsers (Safari on iOS, Chrome on Android)
- Tablet devices
- Different screen sizes

## 🔧 Step 6: Optional Enhancements

### 6.1 Enable Email Notifications
1. Configure an email provider (SendGrid, Resend, etc.)
2. Trigger emails from backend functions (Firebase Functions or server)
3. Create email templates for:
   - New booking notifications
   - Booking status updates
   - Review requests

### 6.3 Add Analytics
1. Sign up for Vercel Analytics
2. Enable in your Vercel project dashboard
3. Track user engagement and popular services

## 🐛 Troubleshooting

### Common Issues

**Blank screen on Vercel**
- Usually missing `VITE_FIREBASE_*` variables in Vercel
- Add env vars and redeploy

**Image upload fails**
- Check Cloudinary cloud name and upload preset
- Ensure preset is unsigned

## 📞 Support

If you encounter issues:
1. Check browser console (F12) for error messages
2. Verify all setup steps were completed
3. Check Firebase/Firestore logs and browser console errors
4. Review Vercel deployment logs for deployment issues

## 🎉 You're Ready!

Your Fannu Varin app is ready! You can test:
- Provider skill listing publishing
- Seeker listing browse + request
- Firebase auth flow (email/google)
- Cloudinary image uploads
