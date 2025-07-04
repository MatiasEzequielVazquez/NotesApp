#!/bin/bash

# === Check required dependencies ===

command -v dotnet >/dev/null 2>&1 || { echo "dotnet is not installed. Install it from https://dotnet.microsoft.com/download"; exit 1; }
command -v npm >/dev/null 2>&1 || { echo "npm is not installed. Install it from https://nodejs.org/"; exit 1; }
command -v node >/dev/null 2>&1 || { echo "node is not installed. Install it from https://nodejs.org/"; exit 1; }
command -v npx >/dev/null 2>&1 || { echo "npx is not installed. Install it with npm from https://nodejs.org/"; exit 1; }

echo "All required dependencies are installed (dotnet, npm, node, npx)"

# === Define project folders ===
FRONTEND_DIR="frontend"
BACKEND_DIR="backend"

echo "Starting setup..."

# --- Backend setup ---
echo "Restoring backend dependencies..."
cd "$BACKEND_DIR" || { echo "Backend folder not found"; exit 1; }
dotnet restore

echo "Applying Entity Framework migrations..."
dotnet ef database update

# --- Frontend setup ---
echo "Installing frontend dependencies..."
cd ../"$FRONTEND_DIR" || { echo "Frontend folder not found"; exit 1; }
npm install

# --- Start backend ---
echo "Starting backend..."
cd ../"$BACKEND_DIR"
dotnet run &

BACKEND_PID=$!

# --- Start frontend ---
echo "Starting frontend..."
cd ../"$FRONTEND_DIR"
npm run dev

# --- Stop backend when frontend stops ---
echo "Stopping backend..."
kill $BACKEND_PID

echo "Setup completed successfully"
