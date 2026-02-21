<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/C%23-.NET_9-512BD4?style=for-the-badge&logo=dotnet&logoColor=white" alt="C#" />
  <img src="https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" />
  
  <br />
  
  <h1>🌱 Manipur Wetlands Biodiversity Archive</h1>
  <p>A full-stack geographic and biological cataloguing platform designed to preserve and showcase the intricate ecosystems of Manipur’s wetlands.</p>
</div>

---

## 📖 Overview
The **Manipur Wetlands Biodiversity Archive** is a high-performance, responsive web application that serves as a digital library for researchers and enthusiasts. It offers an interactive UI to explore native wildlife—including animals, birds, flora, fish, and insects—geographically tied to specific wetland ecosystems across the state.

## ✨ Key Features
- **Dynamic Interactive Maps:** Built with Leaflet.js to securely fly to precise geographic coordinates of protected wetland regions.
- **Visual Masonry Archive:** A dual-state, animated thumbnail gallery supporting rich imagery.
- **Deep Linking Engine:** Unique URL parameters (e.g., `?focus=WL-002`) allow users to seamlessly link directly to specific regions on the map from anywhere on the platform.
- **Modern Glassmorphism UI:** Tailored with bespoke Tailwind CSS components, dark-mode support, and fluid responsive layouts for mobile and desktop.
- **Robust C# API:** A lightning-fast .NET backend providing scalable endpoints to query biodiversity and location metadata.

<br />

---

## 🚀 Getting Started

To run this application locally on your machine, you must configure both the **C# Backend** and the **Vite + React Frontend**.

### ✅ Prerequisites
Before you begin, ensure you have the following installed on your machine:
1. **Node.js**: (v18.0 or newer)
2. **.NET 9 SDK**: For building and running the backend API.
3. **MySQL Server**: The database engine is strictly required (See *Database Configuration* below).

### 🛠️ 1. Database Configuration (MySQL Required)
> **⚠️ Question: Can I run this without MySQL?**
> **No.** The backend relies explicitly on Entity Framework Core's MySQL provider (`Pomelo.EntityFrameworkCore.MySql`). Without a running MySQL instance, the backend API will crash on launch, which will silently break the React Frontend.

1. Open MySQL Workbench or your terminal and create a database named `manipur_wetlands`:
   ```sql
   CREATE DATABASE manipur_wetlands;
   ```
2. Navigate to `backend/appsettings.json` and ensure the `ConnectionStrings` section matches your local root password:
   ```json
   "ConnectionStrings": {
     "DefaultConnection": "Server=localhost;Database=manipur_wetlands;User=root;Password=YOUR_LOCAL_PASSWORD;"
   }
   ```

### ⚙️ 2. Starting the Backend (API & Database Sync)
The C# backend uses Entity Framework to automatically create its own tables and populate the wetlands database with thousands of species records the first time you run it.

1. Open a new terminal and navigate to the `backend/` directory.
2. Build and run the project:
   ```bash
   cd backend
   dotnet build
   dotnet run
   ```
3. The server should start cleanly on `http://localhost:5171`. (Keep this terminal running).

### 🎨 3. Starting the Frontend (React UI)
1. Open a *second* terminal and navigate to the `frontend/` directory.
2. Install the rigid dependency tree (React, Vite, Axios, React-Leaflet, Tailwind):
   ```bash
   cd frontend
   npm install
   ```
3. Launch the hot-reloading development server:
   ```bash
   npm run dev
   ```
4. Access the platform in your browser at: **`http://localhost:5173`**

---

## 📂 Project Architecture

```plaintext
/manipur_wetlands_project
├── backend/                       # C# .NET 9 Web API
│   ├── Controllers/               # Handling HTTP GET requests
│   ├── Data/                      # Entity Framework DB Context & Data Seeding
│   ├── Models/                    # C# Classes (Wetland, Animal, Bird, Flora, etc.)
│   └── appsettings.json           # Database configuration
│
└── frontend/                      # React SPA (Vite)
    ├── public/assets/             # Static imagery and mapping icons
    └── src/
        ├── components/            # Reusable UI elements (Hero, Navbar, Map Controller)
        ├── pages/                 # Full screen views (Home, Explorer, Map, Details)
        ├── index.css              # Global Tailwind logic & Animations
        └── App.jsx                # React Router definitions
```

## 🤝 License & Modification
This project is open-architecture. If you are a developer looking to swap the database from MySQL to a local **SQLite** file to avoid database installations, you must rewrite the provider string inside `backend/Program.cs` and replace the Pomelo EF Packages.
