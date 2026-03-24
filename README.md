# Fannu Varin - Skills Marketplace

[![Live Demo](https://img.shields.io/badge/Live%20Demo-fannu--verin.vercel.app-blue)](https://fannu-verin.vercel.app/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Fannu Varin is a modern marketplace where people can find skills and skilled people can offer services.

Live: https://fannu-verin.vercel.app/

## Core Features

- Seeker / Provider / Admin role-based experience
- Firebase Authentication (email + Google)
- Firestore-backed profiles, listings, and bookings
- Provider skill listings with Cloudinary image upload
- Seeker browsing and booking requests
- PWA support and responsive UI

## Tech Stack

- React 18 + TypeScript + Vite
- Tailwind CSS
- Firebase (Auth + Firestore)
- Cloudinary (image uploads)
- Vercel (deployment)

## Quick Start

```bash
git clone https://github.com/retteygold/Fannu-Verin.git
cd Maraamathu
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:5173

## Environment Variables

Set these in `.env.local`:

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

Also set the same variables in Vercel project settings.

## Firebase Setup (Required)

1. Enable Authentication providers you use (Email/Password and Google).
2. Enable Firestore Database.
3. Add Firestore rules for `profiles`, `listings`, and `bookings`.

See `SETUP.md` for complete setup steps and a rules template.

## Documentation

- [Setup Guide](./SETUP.md)
- [Changelog](./CHANGELOG.md)
- [User Handbook](./HANDBOOK.md)
- [Video Script](./docs/VIDEO_SCRIPT.md)

## Contributing

1. Create branch
2. Make changes
3. Run `npm run build`
4. Open PR

## Support

- Issues: https://github.com/retteygold/Fannu-Verin/issues

---

Fannu Varin - Find skills. Offer skills.
