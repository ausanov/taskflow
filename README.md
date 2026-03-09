# TaskFlow 🗂️

A full-stack Kanban task management app built with React, .NET Core, and SQL Server.

![CI](https://github.com/YOUR_USERNAME/taskflow/actions/workflows/ci.yml/badge.svg)

## ✨ Features

- 🔐 JWT Authentication (register/login)
- 📋 Drag-and-drop Kanban board (Todo → In Progress → Done)
- ⚡ Optimistic UI updates with Zustand
- 🐳 One-command Docker setup
- 🏛️ Clean Architecture (.NET Core)

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, TypeScript, Zustand, react-beautiful-dnd |
| Backend | .NET 10, Clean Architecture, EF Core, JWT |
| Database | SQL Server 2022 |
| DevOps | Docker, Docker Compose, GitHub Actions |

## 🚀 Getting Started (60 seconds)

```bash
git clone https://github.com/YOUR_USERNAME/taskflow
cd taskflow
cp .env.example .env
docker compose up --build
```

- Frontend: http://localhost:3000
- API + Swagger: http://localhost:5000/swagger

## 🏗️ Architecture

```
taskflow/
├── backend/          # .NET 8 Clean Architecture
│   └── src/
│       ├── TaskFlow.API/           # Controllers, Middleware
│       ├── TaskFlow.Application/   # Services, DTOs, Interfaces
│       ├── TaskFlow.Domain/        # Entities
│       └── TaskFlow.Infrastructure/# EF Core, Repositories
└── frontend/         # React + TypeScript + Zustand
    └── src/
        ├── api/      # Axios client
        ├── store/    # Zustand store
        ├── components/
        └── types/
```

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login, returns JWT |
| GET | /api/tasks | Get all user tasks |
| POST | /api/tasks | Create task |
| PUT | /api/tasks/:id | Update/move task |
| DELETE | /api/tasks/:id | Delete task |

## 🔧 Local Dev (without Docker)

```bash
# SQL Server
> Use password from "C:\Work\Web Training\TaskFlow\backend\src\TaskFlow.API\appsettings.json" or create your own.
docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=YourStrong@Passw0rd" -p 1433:1433 -d mcr.microsoft.com/mssql/server:2022-latest

# Backend
cd backend/src/TaskFlow.API
dotnet run

# Frontend
cd frontend
npm install && npm run dev
```

## 📸 Screenshots

> Add screenshots here after first run!

## 📄 License

MIT
