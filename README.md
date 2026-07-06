# 🏕️ Camp Booking System

A production-style, full-stack **Camp Booking System** built with **ASP.NET Core 8**, **React (Vite)**, and **Clean Architecture** principles. The platform allows users to discover and book camps, manage their reservations, and rate completed stays — while admins get full control over camp listings, bookings, and platform analytics.

![.NET](https://img.shields.io/badge/.NET-8.0-512BD4?logo=dotnet)
![React](https://img.shields.io/badge/React-Vite-61DAFB?logo=react)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Supabase-336791?logo=postgresql)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Features](#features)
- [Folder Structure](#folder-structure)
- [Database](#database)
- [Environment Variables](#environment-variables)
- [Local Setup](#local-setup)
- [Running with Docker](#running-with-docker)
- [API Overview](#api-overview)
- [Testing](#testing)
- [CI/CD Pipeline](#cicd-pipeline)
- [Deployment](#deployment)
- [Default Admin Credentials](#default-admin-credentials)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

The Camp Booking System is designed to simulate a real-world reservation platform (similar to a scaled-down Airbnb/Booking.com for outdoor camps). It follows **Clean Architecture** to keep business logic decoupled from frameworks, enabling long-term maintainability, testability, and easy swapping of infrastructure (e.g., PostgreSQL ↔ SQL Server).

---

## Tech Stack

### Backend

| Layer                 | Technology                           |
| --------------------- | ------------------------------------ |
| API Framework         | ASP.NET Core 8 Web API               |
| ORM                   | Entity Framework Core 8              |
| Auth                  | ASP.NET Identity + JWT Bearer Tokens |
| Database (Primary)    | PostgreSQL (hosted on Supabase)      |
| Database (Dev/Backup) | SQL Server                           |
| Containerization      | Docker                               |
| CI/CD                 | GitHub Actions                       |
| Hosting               | Azure App Service                    |

### Frontend

| Layer            | Technology            |
| ---------------- | --------------------- |
| Framework        | React (Vite)          |
| State Management | Redux Toolkit         |
| Styling          | Tailwind CSS          |
| Hosting          | Azure Static Web Apps |

---

## Architecture

The backend follows **Clean Architecture**, separating concerns into four layers:

```
┌─────────────────────────────────────────┐
│              CampBooking.Api              │  ← Controllers, Middleware, DI, JWT config
├─────────────────────────────────────────┤
│         CampBooking.Application           │  ← Use cases, DTOs, Services, Validators
├─────────────────────────────────────────┤
│           CampBooking.Domain               │  ← Entities, Enums, Interfaces (no dependencies)
├─────────────────────────────────────────┤
│        CampBooking.Infrastructure          │  ← EF Core, Repositories, External services
└─────────────────────────────────────────┘
```

**Dependency rule:** Outer layers depend on inner layers — never the reverse. The `Domain` layer has zero external dependencies, making core business rules easy to test in isolation.

---

## Features

### 👤 User

- Register / Login with JWT-based authentication
- Search and filter camps (by location, date, price, availability)
- View camp details (amenities, photos, pricing, capacity)
- Book a camp for selected dates
- View booking history
- Cancel upcoming bookings (subject to cancellation policy)
- Rate and review completed bookings

### 🛠️ Admin

- Full Camp CRUD (create, update, delete, list camps)
- Manage camp availability and pricing
- Dashboard with key metrics (total bookings, revenue, occupancy rate)
- Booking management (approve, cancel, view all bookings)
- View user ratings and feedback per camp

### 🔐 Security

- Password hashing via ASP.NET Identity
- JWT access tokens with configurable expiry
- Role-based authorization (`User`, `Admin`)

---

## Folder Structure

```text
CampBookingSystem
├── client/                          # React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   ├── features/                # Redux slices
│   │   ├── pages/
│   │   ├── services/                # API clients
│   │   └── app/                     # Store config
│   ├── .env.local
│   └── .env.production
├── Database/
│   └── CampBookingDb.bak            # SQL Server backup
├── src/
│   ├── CampBooking.Api/             # Entry point, controllers, JWT/middleware
│   ├── CampBooking.Application/     # Business logic, DTOs, interfaces
│   ├── CampBooking.Domain/          # Entities, enums, domain rules
│   └── CampBooking.Infrastructure/  # EF Core, repositories, migrations
├── tests/
│   ├── CampBooking.UnitTests/
│   └── CampBooking.IntegrationTests/
├── .github/
│   └── workflows/                   # CI/CD pipelines
├── docker-compose.yml
└── README.md
```

---

## Database

The system is designed to support **two interchangeable database providers**:

| Environment          | Provider              |
| -------------------- | --------------------- |
| Production           | PostgreSQL (Supabase) |
| Development / Backup | SQL Server            |

A SQL Server backup file is provided for local restoration:

```text
Database/CampBookingDb.bak
```

### Restoring the SQL Server Backup

```sql
RESTORE DATABASE CampBookingDb
FROM DISK = 'Database/CampBookingDb.bak'
WITH MOVE 'CampBookingDb' TO 'C:\SQLData\CampBookingDb.mdf',
     MOVE 'CampBookingDb_log' TO 'C:\SQLData\CampBookingDb_log.ldf';
```

### Core Entities (typical schema)

- **User** — Id, Name, Email, PasswordHash, Role
- **Camp** — Id, Name, Location, Description, PricePerNight, Capacity, ImageUrls
- **Booking** — Id, UserId, CampId, CheckIn, CheckOut, Status, TotalPrice
- **Rating** — Id, BookingId, UserId, CampId, Score, Comment

### Migrations

```bash
dotnet ef migrations add InitialCreate --project src/CampBooking.Infrastructure --startup-project src/CampBooking.Api
dotnet ef database update --project src/CampBooking.Infrastructure --startup-project src/CampBooking.Api
```

---

## Environment Variables

### Backend (`appsettings.json` or environment/user-secrets)

| Variable                               | Description                    | Example                                                   |
| -------------------------------------- | ------------------------------ | --------------------------------------------------------- |
| `ConnectionStrings__DefaultConnection` | DB connection string           | `Host=...;Database=campbooking;Username=...;Password=...` |
| `Jwt__Issuer`                          | JWT issuer name                | `CampBookingApi`                                          |
| `Jwt__Audience`                        | JWT audience                   | `CampBookingClient`                                       |
| `Jwt__SecretKey`                       | Secret used to sign JWT tokens | _(use a strong 256-bit secret)_                           |

> ⚠️ Never commit real secrets to source control. Use `dotnet user-secrets` locally and Azure App Service **Configuration → Application Settings** in production.

```bash
dotnet user-secrets init --project src/CampBooking.Api
dotnet user-secrets set "Jwt:SecretKey" "your-secret-key" --project src/CampBooking.Api
```

### Frontend

**`.env.local`** (development)

```env
VITE_API_BASE_URL=http://localhost:5284/api
```

**`.env.production`**

```env
VITE_API_BASE_URL=https://YOUR_BACKEND.azurewebsites.net/api
```

---

## Local Setup

### Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/download)
- [Node.js 18+](https://nodejs.org/)
- PostgreSQL or SQL Server instance
- (Optional) Docker Desktop

### Backend

```bash
# Restore NuGet packages
dotnet restore

# Apply EF Core migrations
dotnet ef database update --project src/CampBooking.Infrastructure --startup-project src/CampBooking.Api

# Run the API
dotnet run --project src/CampBooking.Api
```

The API will be available at `http://localhost:5284` (Swagger UI at `/swagger`).

### Frontend

```bash
cd client
npm install
npm run dev
```

The app will be available at `http://localhost:5173` by default.

---

## Running with Docker

```bash
docker-compose up --build
```

This spins up:

- The ASP.NET Core API container
- The React frontend container
- A PostgreSQL container (for local testing)

To stop:

```bash
docker-compose down
```

---

## API Overview

Base URL: `/api`

| Method | Endpoint           | Description                 | Auth   |
| ------ | ------------------ | --------------------------- | ------ |
| POST   | `/auth/register`   | Register a new user         | Public |
| POST   | `/auth/login`      | Login and receive JWT       | Public |
| GET    | `/camps`           | Search/list camps           | Public |
| GET    | `/camps/{id}`      | Get camp details            | Public |
| POST   | `/camps`           | Create a camp               | Admin  |
| PUT    | `/camps/{id}`      | Update a camp               | Admin  |
| DELETE | `/camps/{id}`      | Delete a camp               | Admin  |
| POST   | `/bookings`        | Create a booking            | User   |
| GET    | `/bookings/me`     | Get current user's bookings | User   |
| DELETE | `/bookings/{id}`   | Cancel a booking            | User   |
| POST   | `/ratings`         | Rate a completed booking    | User   |
| GET    | `/admin/dashboard` | Get admin dashboard metrics | Admin  |

> Full interactive documentation is available via Swagger at `/swagger` when running the API locally.

---

## Testing

```bash
# Run all backend tests
dotnet test

# Run frontend tests (if configured)
cd client
npm run test
```

Test projects are located under `/tests`, split into:

- **Unit tests** — domain logic and application services (mocked dependencies)
- **Integration tests** — API endpoints tested against an in-memory or test database

---

## CI/CD Pipeline

GitHub Actions workflows (under `.github/workflows/`) automate:

1. **Build & Test** — on every push/PR, restore, build, and run backend + frontend tests
2. **Docker Build** — build and push API image to a container registry
3. **Deploy Backend** — deploy to Azure App Service
4. **Deploy Frontend** — deploy static build to Azure Static Web Apps

---

## Deployment

| Component   | Platform              |
| ----------- | --------------------- |
| Backend API | Azure App Service     |
| Frontend    | Azure Static Web Apps |
| Database    | Supabase (PostgreSQL) |

### Backend Deployment Notes

- Set connection strings and JWT secrets in **Azure App Service → Configuration**
- Enable `ASPNETCORE_ENVIRONMENT=Production`
- Apply migrations via a release pipeline step or manual `dotnet ef database update`

### Frontend Deployment Notes

- Set `VITE_API_BASE_URL` in the Azure Static Web Apps configuration to point to the deployed API
- Build output (`client/dist`) is served via Azure Static Web Apps' CDN

---

## Default Admin Credentials

For local development and demo purposes, a seeded admin account is available:

```
Email:    admin@campbooking.com
Password: Admin@123
```

> 🔒 **Security note:** Change or remove these default credentials before deploying to any production environment.

---

## Roadmap

- [ ] Payment gateway integration (Stripe/Razorpay)
- [ ] Email notifications for booking confirmations/cancellations
- [ ] Multi-image gallery and map view for camps
- [ ] Wishlist/favorites feature
- [ ] Admin analytics charts (revenue trends, occupancy heatmap)
- [ ] Multi-language support

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

Please ensure new backend logic includes corresponding unit/integration tests, and run `dotnet format` before submitting.

---

## License

This project is licensed under the [MIT License](LICENSE).
