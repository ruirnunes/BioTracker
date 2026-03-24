# BioTracker — Local Biodiversity Platform

## Description
BioTracker is a web application that allows users to record and explore local biodiversity observations.  
Users can register sightings of animals, plants, and fungi, contributing to a collaborative dataset that helps build a regional biodiversity atlas.

This project is part of a full-stack development course and demonstrates a complete end-to-end application using Angular, Node.js, and Supabase.

---

## Sustainable Development Goal (ODS 15 — Life on Land)
This project contributes to **ODS 15 — Life on Land** by encouraging citizens to document biodiversity in their local environment.  
By collecting structured data on species observations, the platform helps raise awareness and supports environmental monitoring.

---

## Tech Stack

| Layer       | Technology |
|------------|-----------|
| Frontend   | Angular (TypeScript) |
| Backend    | Node.js + Express |
| Database   | Supabase (PostgreSQL) |
| Auth       | Supabase Auth (JWT) |
| CI/CD      | GitHub Actions |
| Deployment | Vercel (frontend) + Render (backend) |
| DevOps     | Docker + Docker Compose |

---

## Project Structure

```bash
projeto-final/
  frontend/     # Angular application
  backend/      # Node.js + Express API
  docker-compose.yml
```

---

## Running the project locally

### 1. Clone the repository

```bash
git clone <repo-url>
cd projeto-final
```

---

### 2. Run with Docker

```bash
docker compose up --build
```

---

### 3. Access the application

- Frontend → http://localhost:4200  
- Backend → http://localhost:3000  

---

## Environment Variables

Create a `.env` file in the root:

```bash
API_URL=http://localhost:3000
SUPABASE_URL=YOUR_SUPABASE_URL
SUPABASE_KEY=YOUR_SUPABASE_KEY
```

---

## Features (Planned)

- User authentication (register/login)
- Create biodiversity observations
- List and filter observations by type
- Observation detail page
- Search by species name
- Statistics dashboard:
  - Total observations
  - Distinct species
  - Most active user

---

## CI/CD

This project uses **GitHub Actions** for:

- Linting
- Build validation
- Automatic deployment (frontend)

---

## Current Status

✔ Initial project setup  
✔ Angular frontend initialized  
✔ Node.js backend configured  
✔ Docker setup completed  
✔ CI/CD pipelines configured  

🚧 Next steps:
- Database design (Supabase)
- API endpoints (CRUD)
- Frontend pages and services

---

## How to run without Docker (optional)

### Frontend

```bash
cd frontend
npm install
ng serve
```

### Backend

```bash
cd backend
npm install
npm run dev
```

---

## Screenshot

*(to be added)*

---

## Design Decision

The project uses a **separated frontend/backend architecture** to ensure scalability and maintainability.  
Angular handles the UI and client-side logic, while Node.js provides a REST API that communicates with Supabase.

---

## License

This project is for educational purposes.

---

## Author 

Rui Nunes
