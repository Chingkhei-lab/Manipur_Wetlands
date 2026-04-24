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

## 📋 Local Development Setup Guide

Follow these steps to get a full local copy of the Manipur Wetlands application running, complete with the database schema, seeded data, and local authentication secrets.

### 1. Prerequisites
Before cloning, ensure you have the following installed on your machine:
* **PostgreSQL & pgAdmin 4** (For the database)
* **.NET 8.0 SDK** (For the backend API)
* **Node.js (v18+) & npm** (For the frontend React app)
* **Python 3.x** (To run the database seeding scripts)

### 2. Clone the Repository
```bash
git clone [YOUR_GITHUB_REPO_URL_HERE]
cd manipur_wetlands_project
```

### 3. Database Setup (The Data)
Because the database engine runs locally on your machine, you must build the tables and inject the data yourself using the provided scripts.
1. Open **pgAdmin**.
2. Create a brand new database named `manipur_wetlands`.
3. Open the Query Tool and run the `database_reference_schema.sql` file from the project root to create all the empty tables.
4. Open the Query Tool again and run `seed_data.sql` to import the species data.
5. Finally, open a terminal in the project root and run the Python wetlands seeder to convert map coordinates and insert the lakes:
   ```bash
   python seed_wetlands.py
   ```

### 4. Backend Configuration (User Secrets)
We use .NET User Secrets to keep passwords off GitHub. You must configure your local backend to connect to your local PostgreSQL database and set up your admin login.
Open a terminal in the `backend` folder and run these commands (replace the placeholder values with your own):

```bash
dotnet user-secrets init

# 1. Database Connection (Replace YOUR_PGADMIN_PASSWORD)
dotnet user-secrets set "ConnectionStrings:DefaultConnection" "Host=localhost;Database=manipur_wetlands;Username=postgres;Password=YOUR_PGADMIN_PASSWORD"

# 2. JWT Security Key (Keep this as-is, or make your own 32+ char string)
dotnet user-secrets set "Jwt:Key" "ThisIsASuperSecretKeyThatNeedsToBeAtLeast32CharactersLong2026!"

# 3. Local Admin Login (Set your own test email/password)
dotnet user-secrets set "AdminAuth:Email" "admin@local.com"
dotnet user-secrets set "AdminAuth:Password" "TestAdmin123!"
```

### 5. Frontend Configuration
Open a terminal in the `frontend` folder and set up your environment variables:
1. Duplicate the `.env.example` file and rename it to `.env.local`.
2. Run `npm install` to download the required Node packages.

### 6. Run the Application
You need two terminals open to run both halves of the app.
* **Terminal 1 (Backend):** `cd backend` -> run `dotnet run`
* **Terminal 2 (Frontend):** `cd frontend` -> run `npm run dev`

Open `http://localhost:5173` in your browser. You can now log into the Admin portal using the email and password you set in Step 4!

---

## 📂 Project Architecture

```plaintext
/manipur_wetlands_project
├── database_reference_schema.sql  # SQL schema (tables & relationships)
├── seed_data.sql                  # All 288 catalog items + junction table data
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
