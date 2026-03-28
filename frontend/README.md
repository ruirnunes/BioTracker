# BioTracker — Local Biodiversity Platform

## Description
BioTracker is a full-stack web application that allows users to record and explore local biodiversity observations.

Users can register sightings of animals, plants, and fungi, contributing to a collaborative dataset that helps build a regional biodiversity atlas.

This project demonstrates a complete end-to-end application using Angular, Node.js, and Supabase.

---

## Sustainable Development Goal (ODS 15 — Life on Land)

This project contributes to **ODS 15 — Life on Land** by encouraging citizens to document biodiversity in their local environment.

By collecting structured data on species observations, the platform helps raise awareness and supports environmental monitoring.

---

## Tech Stack

| Layer      | Technology                         |
|-----------|-----------------------------------|
| Frontend  | Angular 21 (TypeScript)           |
| Backend   | Node.js + Express                 |
| Database  | Supabase (PostgreSQL)             |
| Auth      | Supabase Auth (JWT)               |
| CI/CD     | GitHub Actions                    |
| Deployment| Vercel (frontend) + Render (backend) |
| DevOps    | Docker + Docker Compose           |

---

## Project Structure

```bash
projeto-final/
  frontend/     # Angular application
  backend/      # Node.js + Express API
  docker-compose.yml
```

---

## Frontend Features (Angular)

- Standalone components (no NgModules)
- Reactive Forms with validation
- Route protection (Auth Guard)
- HTTP Interceptor (JWT token)
- Lazy-loaded routes
- Reusable UI components (Navbar, Loading)
- Modern Angular control flow (`@if`, `@for`)

### Main Pages

- `/auth` → Login / Register
- `/sightings` → List of sightings
- `/sightings/new` → Create sighting
- `/sightings/:id` → Sighting detail
- `/species` → Species list
- `/dashboard` → Statistics

---

## Database Configuration (Supabase)

### Table: `sightings`

| Field       | Type        | Description                |
|------------|------------|----------------------------|
| id         | UUID (PK)  | Unique identifier          |
| user_id    | UUID       | Reference to user          |
| species_id | UUID       | Reference to species       |
| location   | TEXT       | Observation location       |
| date       | DATE       | Observation date           |
| image_url  | TEXT       | Optional image             |
| created_at | TIMESTAMP  | Auto-generated             |

---

## API (CRUD Operations)

### Sightings

```bash
POST   /sightings
GET    /sightings
GET    /sightings/:id
PUT    /sightings/:id
DELETE /sightings/:id
```

---

## Statistics Endpoint

```bash
GET /sightings/stats
```

### Returns:

- Total observations
- Distinct species count
- Most active user

---

## Running the Project Locally

### 1. Clone the repository

```bash
git clone https://github.com/ruirnunes/BioTracker.git
cd BioTracker
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

## Run Without Docker (Optional)

### Frontend

```bash
cd frontend
npm install
ng serve
```

---

### Backend

```bash
cd backend
npm install
npm run dev
```

---

## Features

- ✔ User authentication (Supabase JWT)
- ✔ Create biodiversity sightings
- ✔ List sightings
- ✔ View sighting details
- ✔ Update sightings
- ✔ Delete sightings
- ✔ Species listing
- ✔ Statistics dashboard
- ✔ Protected routes (Auth Guard)
- ✔ Reactive forms with validation

---

## CI/CD

This project uses **GitHub Actions** for:

- Linting
- Build validation
- Continuous Integration pipeline

---

## Current Status

- ✔ Frontend and backend fully integrated
- ✔ Supabase database connected
- ✔ CRUD operations implemented
- ✔ Authentication working
- ✔ Angular standalone architecture
- ✔ Docker environment configured

---

## Next Steps

- Improve UI/UX design
- Add filters (species type, date)
- Add search functionality
- Enhance statistics dashboard
- Add pagination

---

## Design Decision

The project follows a **separated frontend/backend architecture**:

- Angular handles the UI and client logic
- Node.js exposes a REST API
- Supabase manages authentication and database

This ensures:
- scalability
- maintainability
- clear separation of concerns

---

## License

This project is for educational purposes.

---

## Author

Rui Nunes