# MedPanel — Multi-tenant Healthcare SaaS Admin Panel

A production-grade micro-frontend application demonstrating enterprise React architecture patterns. MedPanel simulates a real-world B2B SaaS platform where multiple hospitals (tenants) manage patients and appointments through a shared platform with role-based access control.

## 🌐 Live Demo

| App                          | URL                                      |
| ---------------------------- | ---------------------------------------- |
| **Full Application (Shell)** | https://medpanel-shell.vercel.app        |
| Dashboard MFE                | https://medpanel-dashboard.vercel.app    |
| Patients MFE                 | https://medpanel-patients.vercel.app     |
| Appointments MFE             | https://medpanel-appointments.vercel.app |

> Open the **Full Application** link to see all MFEs working together. Each MFE link above is also independently deployable and accessible as a standalone app.

---

## Architecture

MedPanel is built using **Micro-Frontend Architecture** with Vite Module Federation. The application is split into four independently deployable units:

```
shell-app            → Host application, routing, layout, tenant & role switching
mfe-dashboard        → Analytics, KPI cards, patient admission charts
mfe-patients         → Patient records, search, gender filter, detail view
mfe-appointments     → Appointment management, status updates with optimistic UI
shared-lib           → Shared TypeScript types, components, and React contexts
```

Each MFE is a standalone React application that can be developed, tested, and deployed independently. The shell loads them at runtime via Module Federation — if one MFE is down, only that section of the app is affected, not the entire platform.

```
Browser loads shell-app
    ↓
Shell fetches remoteEntry.js from each MFE at runtime
    ↓
MFEs are lazy-loaded only when the user navigates to that route
    ↓
Shared dependencies (React, React Query) are provided once by the shell
```

---

## Key Technical Decisions

**Why Micro-Frontend Architecture?**
MedPanel mirrors the architecture used by large healthcare SaaS platforms where separate teams own separate product areas. Module Federation allows true runtime composition — MFEs are deployed independently without a shared build pipeline.

**Why TypeScript throughout?**
Shared types defined in `@hareharun/medpanel-shared` (published to npm) act as a contract between all MFEs. If a `Patient` interface changes, TypeScript immediately surfaces every affected component across all four apps before runtime.

**Why a published npm package for shared-lib?**
Each MFE is independently deployable and built in isolation — including on Vercel's build servers. A local file reference (`../shared-lib`) breaks in CI and cloud environments. Publishing to npm makes `shared-lib` available anywhere, exactly like a real internal package in an enterprise monorepo.

**Why React Query over Redux for server state?**
Redux requires significant boilerplate for async data. React Query handles caching, background refetching, and optimistic updates out of the box. The appointments MFE demonstrates optimistic updates — status changes reflect instantly in the UI before the API confirms, with automatic rollback on error.

**Why static mock data over MSW in production builds?**
Mock Service Worker only intercepts fetch calls in dev mode. For preview and production builds, mock data is imported directly — keeping the demo fully functional without a backend while the React Query data-fetching pattern remains identical to what a real API integration would look like.

**How was the duplicate React instance problem solved?**
Each independently bundled MFE could load its own copy of React, causing hook conflicts (`Cannot read properties of null (reading 'useRef')`). The fix was configuring `singleton: true` and `eager: true` for React in Module Federation's shared config — forcing all MFEs to use exactly one React instance provided by the shell at runtime.

---

## Tech Stack

| Technology                     | Purpose                                   |
| ------------------------------ | ----------------------------------------- |
| React 18 + TypeScript          | UI and compile-time type safety           |
| Vite + Module Federation       | MFE bundling and runtime composition      |
| React Query (TanStack)         | Server state, caching, optimistic updates |
| React Router v6                | Client-side routing in shell              |
| Recharts                       | Dashboard data visualisation              |
| Vitest + React Testing Library | Unit and integration testing              |
| MSW (Mock Service Worker)      | API mocking in development                |
| GitHub Actions                 | CI/CD pipeline with matrix build strategy |
| Vercel                         | Independent deployment for each MFE       |
| npm                            | Published shared-lib package              |

---

## Features

### Multi-tenancy

Switch between **Apollo Hospitals** and **Fortis Healthcare** using the tenant selector in the top bar. Each tenant operates in isolation with its own data.

### Role-based Access Control

Three roles with different permissions — switch between them using the role selector in the top bar:

| Role         | Dashboard | Patients | Appointments |
| ------------ | --------- | -------- | ------------ |
| Admin        | ✅        | ✅       | ✅           |
| Doctor       | ✅        | ✅       | ❌           |
| Receptionist | ✅        | ✅       | ✅           |

### Dashboard

- KPI cards — Total Patients, Appointments Today, Beds Available, Beds Occupied
- Line chart — Patient admissions over the last 6 months
- Pie chart — Appointment distribution by department

### Patient Management

- Search patients by name or medical condition
- Filter by gender
- Click any row to view full patient detail
- One-click back navigation to the patient list

### Appointment Management

- Filter appointments by status (All / Scheduled / Completed / Cancelled)
- Update appointment status with **optimistic UI updates** — the badge updates instantly before the API responds, with automatic rollback on error
- Status cycle: Scheduled → Completed → Cancelled → Scheduled

---

## Running Locally

**Prerequisites:** Node.js 22+

```bash
# Clone the repository
git clone https://github.com/hareharun/medpanel.git
cd medpanel

# Install dependencies for all apps
cd mfe-dashboard && npm install && cd ..
cd mfe-patients && npm install && cd ..
cd mfe-appointments && npm install && cd ..
cd shell-app && npm install && cd ..
```

Open **4 terminals**:

```bash
# Terminal 1 — Dashboard MFE (port 5001)
cd mfe-dashboard && npm run build && npm run preview

# Terminal 2 — Patients MFE (port 5002)
cd mfe-patients && npm run build && npm run preview

# Terminal 3 — Appointments MFE (port 5003)
cd mfe-appointments && npm run build && npm run preview

# Terminal 4 — Shell (port 5000)
cd shell-app && npm run dev
```

Open [http://localhost:5000](http://localhost:5000)

---

## Running Tests

```bash
cd mfe-patients
npm run test:run
```

Expected output:

```
✓ src/test/PatientTable.test.tsx (4 tests)
✓ src/test/PatientDetail.test.tsx (2 tests)
✓ src/test/Patients.test.tsx (5 tests)

Test Files  3 passed (3)
Tests       11 passed (11)
```

---

## CI/CD Pipeline

GitHub Actions runs automatically on every push to `main`:

```
Push to main
    ↓
Run mfe-patients tests           Build all 4 apps in parallel
    ↓                                      ↓
✅ 11 tests pass            ✅ mfe-dashboard  ✅ mfe-patients
                            ✅ mfe-appointments  ✅ shell-app
```

- Tests run against `mfe-patients` (Vitest + React Testing Library)
- All four apps are built in parallel using a **matrix strategy**
- `fail-fast: false` ensures one failing job doesn't cancel the rest
- npm token authenticates installation of the scoped `@hareharun/medpanel-shared` package

---

## Environment Configuration

The shell uses Vite environment files to switch between local and production MFE URLs automatically:

```
.env.development   → MFEs at localhost:5001 / 5002 / 5003
.env.production    → MFEs at deployed Vercel URLs
```

No code changes needed when switching environments — Vite picks the correct file based on the build mode.

---

## Project Structure

```
medpanel/
├── shared-lib/                       # Published as @hareharun/medpanel-shared
│   └── src/
│       ├── components/               # Button, Card, Badge
│       ├── context/                  # TenantContext, AuthContext
│       └── types/                    # TypeScript interfaces
│
├── mfe-dashboard/                    # Analytics MFE → port 5001
│   └── src/
│       ├── components/               # StatCard, AdmissionsChart, DepartmentChart
│       ├── mocks/                    # Mock data and MSW handlers
│       └── Dashboard.tsx
│
├── mfe-patients/                     # Patient management MFE → port 5002
│   └── src/
│       ├── components/               # PatientTable, PatientDetail, SearchBar
│       ├── mocks/                    # Mock data and MSW handlers
│       ├── test/                     # Vitest + RTL tests (11 tests)
│       └── Patients.tsx
│
├── mfe-appointments/                 # Appointment management MFE → port 5003
│   └── src/
│       ├── components/               # AppointmentTable with optimistic updates
│       ├── mocks/                    # Mock data and MSW handlers
│       └── Appointments.tsx
│
├── shell-app/                        # Host shell → port 5000
│   └── src/
│       ├── components/               # Sidebar, TopBar, MFELoader
│       ├── remotes.ts                # React.lazy imports for each MFE
│       ├── declarations.d.ts         # TypeScript declarations for remote modules
│       └── App.tsx                   # Routing, providers, protected routes
│
└── .github/
    └── workflows/
        └── ci.yml                    # GitHub Actions pipeline
```

---

## What I Learned Building This

- **Module Federation internals** — how `remoteEntry.js` is generated, how shared dependencies are negotiated at runtime, and why singleton mode is critical for libraries that use React hooks internally
- **Duplicate React instance debugging** — identifying the root cause from a `useRef` null error, and fixing it through Vite's alias config combined with Module Federation's singleton shared config
- **TypeScript in a multi-package architecture** — using a published npm package as the type contract between independently deployed apps
- **Optimistic updates with React Query** — `useMutation` with `onMutate`, `onError` rollback, and `onSettled` cache invalidation
- **CI/CD for monorepos** — matrix build strategies, artifact passing between jobs, and environment-specific configuration

---

## Author

**Hareharun Amirrdanandaswami**  
React Developer — Chennai, Tamil Nadu  
[LinkedIn](#) · [GitHub](#) · hareharun.a24@gmail.com
