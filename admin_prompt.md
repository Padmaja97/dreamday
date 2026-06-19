# Dream Day Events - Admin Panel Development Prompt

You are tasked with building the "Dream Day Admin", a separate React/Vite project that acts as the Content Management System (CMS) for the main Dream Day Events website. The main website is already integrated with Firebase and pulls its data dynamically. Your job is to build the secure dashboard that edits this data.

## Tech Stack
- React (Vite)
- TailwindCSS or Vanilla CSS (Luxurious, Dark-mode aesthetic with Gold accents to match the main brand)
- Firebase SDK (Auth, Firestore, Storage)
- React Router DOM

## Core Requirements & Features

### 1. Authentication
- Create a secure login screen (`/login`).
- Use Firebase Authentication (Email/Password).
- Protect all dashboard routes so that unauthenticated users are redirected back to `/login`.

### 2. Global Pricing Editor
- Build a form to edit the base starting prices of event packages (e.g., Royal Elite Wedding, Vibrant Haldi, Catering per plate).
- Fetch current values from Firestore: Collection `content`, Document `packages`.
- Allow the user to update and save these values back to Firestore instantly.

### 3. Gallery & Portfolio Manager
- Build an image management interface.
- Must upload images to Firebase Storage (`dream-day-events-sw.firebasestorage.app`).
- Keep track of uploaded image URLs in a Firestore document so the main website can fetch them.
- Features: Upload new image, assign a category (Haldi, Wedding, Corporate), and delete old images.

### 4. About / Manager Content Editor
- The "Portfolio Person" (Mr. Ayush Kale - Event Manager) section needs to be editable.
- Create a tab to update the Manager's profile image (upload to Storage) and update their bio/content text (save to Firestore).

### 5. Testimonials & Reviews
- Form to add, edit, or delete client testimonials.
- Fields: Client Name, Event Type, Star Rating (1-5), and Review Text.
- Store this list in Firestore so the main website can display them in the Testimonials slider.

### 6. Leads & Inquiries CRM
- A read-only dashboard tab that fetches data from the `inquiries` Firestore collection.
- Display form submissions from the main website in a clean data table (Name, Email, Phone, Event Date, Guest Count, Selected Packages).

## Design Guidelines
Make the admin panel look professional and premium. Use a dark theme (`#070d1e`) with sleek gold accents to reflect the luxury event management brand. Ensure the dashboard is responsive and easy to navigate on both desktop and mobile devices.

## Setup Instructions for the Agent
1. Initialize the project using `npm create vite@latest dream-day-admin -- --template react`.
2. Install `firebase`, `react-router-dom`, and any necessary UI libraries.
3. Configure `firebase.js` using the existing `dream-day-events-sw` project credentials.
4. Build the layout (Sidebar/Navbar) and start implementing the tabs listed above.
