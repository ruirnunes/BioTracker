# BioTracker — Local Biodiversity Platform

## Description
BioTracker is a web application that allows users to record and explore local biodiversity observations.  
Users can register sightings of animals, plants, and fungi, contributing to a collaborative dataset that helps build a regional biodiversity atlas.

This project demonstrates a full-stack application using Angular, Node.js, and Supabase.

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

```
projeto-final/
  frontend/     # Angular application
  backend/      # Node.js + Express API
  docker-compose.yml
```

---

## Database Configuration (Supabase)

The application uses **Supabase (PostgreSQL)** as the database.

### Main Table: `sightings`

| Field        | Type      | Description |
|-------------|----------|-------------|
| id          | UUID (PK) | Unique identifier |
| user_id     | UUID      | Reference to user |
| common_name | TEXT      | Common species name |
| genus       | TEXT      | Genus |
| species     | TEXT      | Species |
| type        | TEXT      | animal / plant / fungi |
| location    | TEXT      | Observation location |
| date        | DATE      | Observation date |
| image_url   | TEXT      | Optional image |
| created_at  | TIMESTAMP | Auto-generated |

---

## API (CRUD Operations)

The backend exposes REST endpoints for managing sightings:

### Create
```
POST /sightings
```

### Read
```
GET /sightings
GET /sightings/:id
```

### Update
```
PUT /sightings/:id
```

### Delete
```
DELETE /sightings/:id
```

---

## Statistics Endpoint

Provides aggregated biodiversity data:

```
GET /sightings/stats/:id
```

Returns:
- Total observations
- Distinct species count
- User-related statistics

---

## Running the project locally

### 1. Clone the repository

```
git clone https://github.com/ruirnunes/BioTracker.git
cd BioTracker
```

---

### 2. Run with Docker

```
docker compose up --build
```

---

### 3. Access the application

- Frontend → http://localhost:4200  
- Backend → http://localhost:3000  

---

## Environment Variables

Create a `.env` file in the root:

```
API_URL=http://localhost:3000
SUPABASE_URL=YOUR_SUPABASE_URL
SUPABASE_KEY=YOUR_SUPABASE_KEY
```

---

## Features

✔ User authentication (Supabase)  
✔ Create biodiversity observations  
✔ List all observations  
✔ View observation details  
✔ Update observations  
✔ Delete observations  
✔ Statistics dashboard  

---

## CI/CD

This project uses **GitHub Actions** for:

- Linting
- Build validation
- Automatic deployment

---

## Current Status

✔ Frontend and backend connected  
✔ Supabase database integrated  
✔ CRUD operations implemented  
✔ Docker environment working  
✔ API endpoints functional  

🚧 Next steps:
- Improve UI/UX
- Add filters and search
- Enhance statistics dashboard

---

## How to run without Docker (optional)

### Frontend

```
cd frontend
npm install
ng serve
```

### Backend

```
cd backend
npm install
npm run dev
```

---

## Design Decision

The project uses a **separated frontend/backend architecture** to ensure scalability and maintainability.  
Angular handles the UI, while Node.js exposes a REST API that communicates with Supabase.

---

## License

This project is for educational purposes.

---

## Author

Rui Nunes
