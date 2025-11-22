# Synapse – Student Alumni Networking Platform
A modern, responsive, and intuitive user interface built with **React**, **Vite**, and **Tailwind CSS**. This repository contains the complete frontend of **Synapse**, a student–alumni networking platform designed to simplify communication, mentorship, job discovery, event management, and resource sharing.

---

## 📑 Table of Contents
- [About the Frontend](#about-the-frontend)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Environment Variables](#environment-variables)
- [Installation & Setup](#installation--setup)
- [Available Scripts](#available-scripts)
- [Screenshots](#screenshots)
- [Deployment](#deployment)
- [API Integration Overview](#api-integration-overview)
- [Future Enhancements](#future-enhancements)
- [License](#license)
- [Contact](#contact)

---

## 🧩 About the Frontend
The **Synapse Frontend** provides an engaging and fluid interface for students, alumni, and administrators. This is the primary touchpoint for user interaction, offering a smooth experience across social features, mentorship workflows, communication, and content sharing.

It handles:
- Authentication flows (login, registration, password reset)
- User profile management
- Post creation and interaction
- Real‑time chat interface
- Mentorship request and approval system
- Connection management
- Events, jobs, and resources UI
- Admin dashboards and data visualization

---

## 🚀 Features

### **User-Facing Features**
- **Create and manage posts** with comment section
- **Update profile information**, change password, delete account
- Send, accept, or reject **connection requests**
- **Real-time notifications** for connection requests and mentorship updates
- **Chat** with connected users
- Browse **upcoming events** or create new ones
- View **job listings**; alumni can post new jobs
- Read or publish **resources/blog content**

### **Admin UI Features**
- **Manage users, events, jobs, resources, and mentorship records**
- View **platform analytics** using clean visual charts

---

## 🛠 Tech Stack
### **Frontend Framework & Tools**
- **React 19** — Component‑based UI
- **Vite** — Fast dev environment
- **Tailwind CSS** — Utility-first styling
- **React Query** — API state management
- **Firebase Authentication** — Secure auth handling
- **Axios** — API communication
- **React Router DOM** — Routing management
- **Motion** — Smooth animations
- **Recharts** — Analytics charts

### **Supporting Libraries**
- React Icons
- React Hot Toast
- SweetAlert2
- React Spinners
- React Datepicker
- Tailwind Scrollbar

---

## 📂 Folder Structure
```
src/
├── assets/              # Images, icons, static files
├── components/          # Reusable UI components
├── contexts/            # React context providers
├── firebase/            # Firebase configuration and services
├── functions/           # Cloud functions or utility functions
├── hooks/               # Custom React hooks
├── layouts/             # App layout wrappers
├── navigation_links/    # Navigation menu components
├── pages/               # Route pages and views
├── providers/           # Additional context providers
├── routes/              # Routing configuration and logic
├── index.css            # Global styles
└── main.jsx             # Application entry point
```

---

## 🔐 Environment Variables

To run the frontend locally, several environment variables are required.  
These configure the connection to the backend API and Firebase authentication.

You have two options:

1. **Generate your own Firebase project:**  
   - Create a Firebase project at [https://firebase.google.com](https://firebase.google.com).  
   - Add a web app and copy the configuration keys.  
   - Set your backend API URL if running a local or separate backend.

2. **Use the existing Synapse environment (optional):**  
   - Contact me on LinkedIn to get the environment variables for the live project:  
     👉 **LinkedIn:** https://www.linkedin.com/in/mehedi0101/

After you have the values, create a `.env.local` file in the project root:
```
VITE_apiKey=
VITE_authDomain=
VITE_projectId=
VITE_storageBucket=
VITE_messagingSenderId=
VITE_appId=
VITE_measurementId=
```

---

## ⚙ Installation & Setup
### **1. Clone the Repository**
```
git clone https://github.com/Mehedi0101/synapse-client.git

cd synapse-client
```

### **2. Install Dependencies**
```
npm install
```

### **3. Configure Environment Variables**
Add all required keys to `.env.local`.

### **4. Start the Development Server**
```
npm run dev
```

### **5. Build for Production**
```
npm run build
```

---

## 📜 Available Scripts
| Script | Description |
|--------|-------------|
| `npm run dev` | Starts the development server |
| `npm run build` | Builds the project for production |
| `npm run lint` | Lints project files |
| `npm run preview` | Previews the production build |

---

## 🖼 Screenshots

### **Home Page**
```
<!-- ![Home Page](your-image-link) -->
```

### **User Profile Page**
```
<!-- ![Profile Page](your-image-link) -->
```

### **Post Feed & Post Creation**
```
<!-- ![Posts Page](your-image-link) -->
```

### **Chat Interface**
```
<!-- ![Chat Page](your-image-link) -->
```

### **Mentorship Page**
```
<!-- ![Mentorship Page](your-image-link) -->
```

### **Connections Page**
```
<!-- ![Connections Page](your-image-link) -->
```

### **Events Page**
```
<!-- ![Events Page](your-image-link) -->
```

### **Jobs Page**
```
<!-- ![Jobs Page](your-image-link) -->
```

### **Resources Page**
```
<!-- ![Resources Page](your-image-link) -->
```

### **Admin Dashboard**
```
<!-- ![Admin Dashboard](your-image-link) -->
```

---

## 🌐 Deployment
The frontend of Synapse is live and publicly available.

### **Live URL**

https://synapse-0101.web.app/


### **Hosting Platform**
- **Frontend**: Firebase Hosting
- **Backend**: Vercel

---

## 🔗 API Integration Overview
The frontend interacts with the backend through a dedicated Axios configuration. Key characteristics:

- Automatically attaches **JWT access tokens**
- Protects routes using custom logic
- Uses **React Query** for caching, loading states, and background refetching

### **Integrated API Modules:**
- Auth
- Posts & Comments
- Chat
- Mentorship
- Connections
- Events
- Jobs
- Resources
- Admin Controls

---

## 📈 Future Enhancements
- Dark mode support
- Real‑time chat using WebSockets
- Optimistic UI updates for posts and comments
- Enhanced admin analytics
- Infinite scrolling for posts and resources

---

## 📄 License
Licensed under the **MIT License**.

---

## 📬 Contact
**Developer:** Mehedi Hasan

### **Links:**
- GitHub: [https://github.com/Mehedi0101](https://github.com/Mehedi0101)  
- LinkedIn: [https://www.linkedin.com/in/mehedi0101/](https://www.linkedin.com/in/mehedi0101/)  
- Email: [mehedih2909@gmail.com](mailto:mehedih2909@gmail.com)
