<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/C%23-.NET_9-512BD4?style=for-the-badge&logo=dotnet&logoColor=white" alt="C#" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  
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

## 🚀 Post-Clone Instructions (Getting Started)

Because the project includes sensitive settings and dynamic file paths, some specific configuration files are explicitly ignored in Git. **Please follow these exact steps after cloning the repository to your computer.**

### ✅ Prerequisites
Before you begin, ensure you have the following installed on your machine:
1. **Node.js**: (v18.0 or newer)
2. **.NET 9 SDK**: For building and running the backend API.
3. **PostgreSQL**: The database engine is strictly required (See *Database Configuration* below).

### 🛠️ 1. Database Configuration (PostgreSQL Required)
> **⚠️ Question: Can I run this without PostgreSQL?**
> **No.** The backend relies explicitly on Entity Framework Core's Npgsql provider (`Npgsql.EntityFrameworkCore.PostgreSQL`). Without a running Postgres instance, the backend API will crash on launch, which will silently break the React Frontend.

1. Open pgAdmin or your terminal and create a database named `manipur_wetlands`:
   ```sql
   CREATE DATABASE manipur_wetlands;
   ```
2. The `backend/appsettings.json` file is ignored by Git to keep your passwords secure. You must recreate it! 
3. Go to the `backend/` folder. Copy the `appsettings.Example.json` file and rename the copy to `appsettings.json`.
4. Open your new `appsettings.json` and configure it to match your local PostgreSQL root username and password.
   ```json
   "ConnectionStrings": {
     "DefaultConnection": "Host=localhost;Database=manipur_wetlands;Username=postgres;Password=YOUR_LOCAL_PASSWORD"
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
3. The server should start cleanly on `http://localhost:5171`. **(Keep this terminal running)**.

### 🎨 3. Starting the Frontend (React UI)
1. Open a *second* terminal and navigate to the `frontend/` directory.
2. Install the necessary dependencies (React, Vite, Axios, React-Leaflet, Tailwind):
   ```bash
   cd frontend
   npm install
   ```
3. Launch the development server:
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
