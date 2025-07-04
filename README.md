# SPA Notes Manager

This is a full-stack web application to manage notes. It allows users to create, edit, delete, archive, and unarchive notes.  
The frontend is a Single Page Application (SPA) built with React + Vite, and the backend is built with ASP.NET Core and Entity Framework Core using a layered architecture.

---

## Technologies Used

### Backend
- **.NET SDK**: 9.0.101
- **Entity Framework Core CLI**: 9.0.6
- **ORM**: Entity Framework Core
- **Database**: SQLite
- **Architecture**: Layered (Controllers, Services, Repositories)

### Frontend
- **Node.js**: v22.17.0
- **npm**: 10.9.2
- **React**: 19.1.0
- **React DOM**: 19.1.0
- **Framework**: Vite

---
## Project Sructure
```plaintext
spa-notes-manager/
├── backend/         # ASP.NET Core Web API (REST)
│   ├── Controllers/
│   ├── Services/
│   ├── Repositories/
│   ├── Models/
│   └── Data/
├── frontend/        # React + Vite SPA
│   ├── src/
│   └── App.jsx
├── setup.sh         # One-command setup script
└── README.md
```
---

## How to Run the App

> The application includes a `setup.sh` script to automate setup and execution in Linux/macOS environments.  
> This script restores dependencies, applies DB migrations, installs frontend packages, and starts both servers.

### 1. Requirements

- Node.js `v22.17.0` and npm `10.9.2`
- .NET SDK `9.0.101`
- EF Core CLI `9.0.6`
- Bash shell (`bash`, `zsh`, or WSL for Windows)

---

### 2. Run the App

In the root folder (where `setup.sh` is located), run:

```bash
./setup.sh
