# Developer Setup Guide - Manipur Wetlands Project

This guide helps collaborators set up the backend and database locally.

## 1. Database Setup (PostgreSQL)

You need to recreate the `manipur_wetlands` database on your local machine.

1.  **Install PostgreSQL**: Ensure you have PostgreSQL 16+ installed.
2.  **Create Database**: Create a new database named `manipur_wetlands`.
3.  **Import Data**: Use the provided SQL dump at the project root to import all tables and data:
    ```bash
    psql -U postgres -d manipur_wetlands -f database_setup.sql
    ```
    *(Alternatively, use pgAdmin: Right-click database > Restore)*

## 2. Backend Configuration

1.  Navigate to the `/backend` directory.
2.  Copy `appsettings.Example.json` to `appsettings.json`.
3.  Open `appsettings.json` and update the `DefaultConnection` with your local PostgreSQL credentials:
    ```json
    "DefaultConnection": "Host=localhost;Database=manipur_wetlands;Username=postgres;Password=YOUR_OWN_PASSWORD"
    ```

## 3. Running the App

Run the following commands in the `/backend` folder:
```bash
dotnet restore
dotnet build
dotnet run
```

---
**Note:** Do not commit your personal `appsettings.json` with your password to Git. Only update `appsettings.Example.json` if the structure changes.
