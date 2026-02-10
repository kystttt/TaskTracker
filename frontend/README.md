## TaskTracker Frontend

React + TypeScript SPA for the TaskTracker backend (`/auth/**`, `/tasks/**`, `/admin/**`).

### Tech stack

- **React + TypeScript + Vite**
- **TailwindCSS**
- **React Router**
- **TanStack Query (React Query)**
- **React Hook Form + Zod**
- **Axios** with interceptors
- **ESLint + Prettier**

### Project structure

- `src/main.tsx` – app entry, React Query + Router + AuthProvider
- `src/App.tsx` – routes:
  - `/login`, `/register`
  - `/tasks`, `/tasks/:id` (protected)
  - `/admin/tasks` (admin-only)
- `src/api` – Axios instance and endpoints
  - `httpClient.ts` – base URL from `VITE_API_URL`, JWT Bearer, 401 → logout
  - `authApi.ts` – `/auth/login`, `/auth/register`
  - `taskApi.ts` – `/tasks`, `/tasks/{id}`, `/admin/tasks/`
- `src/auth` – token storage and guards
  - `tokenStorage.ts` – localStorage-based, easy to swap
  - `AuthProvider.tsx` – stores token, decodes JWT, exposes roles
  - `ProtectedRoute.tsx` – any authenticated user
  - `AdminRoute.tsx` – `ROLE_ADMIN` only
- `src/pages` – `LoginPage`, `RegisterPage`, `TasksPage`, `TaskDetailsPage`, `AdminTasksPage`
- `src/components` – layout, navbar, UI elements, task card + form
- `src/types` – `Task`, `Auth`, enums for status/priority/roles
- `src/utils` – JWT helpers, date helpers, constants

### Environment

Copy `.env.example` to `.env` (or `.env.local`) inside `frontend/`:

```bash
VITE_API_URL=http://localhost:8080
```

This must point to the running Spring Boot backend.

### How auth works

- Backend returns:
  - `POST /auth/login` → `{ "accessToken": "..." }`
  - `POST /auth/register` → `{ "accessToken": "..." }`
- Frontend:
  1. Saves `accessToken` via `tokenStorage` (localStorage).
  2. Decodes JWT (`sub`, `userId`, `roles`).
  3. Sends `Authorization: Bearer <token>` for all non-`/auth/**` requests.
  4. On **401** clears token and redirects to `/login`.
- Roles:
  - Enum in backend: `ROLE_USER`, `ROLE_ADMIN`
  - JWT claim: `roles: ["ROLE_USER"] | ["ROLE_ADMIN"]`
  - `ProtectedRoute` – any authenticated user
  - `AdminRoute` – requires `ROLE_ADMIN`

### Task features

- `/tasks`:
  - List of tasks for current user (`GET /tasks`).
  - Filters: by `status` and `priority`.
  - Actions: open details, edit, delete.
  - "Create task" opens modal with form.
- Task creation:
  - `POST /tasks`
  - Frontend sends:
    - `id: null`
    - `creatorId: null`
    - `status: null` (backend sets `CREATED`)
  - Validates: `title`, `assignedUserId`, `createDateTime`, `deadlineDate`, and `deadlineDate >= createDateTime`.
- Task editing:
  - `PUT /tasks/{id}`
  - UI blocks editing for `status === DONE`.
  - Frontend sends full `Task` object matching backend DTO.
- Task details:
  - `/tasks/:id` → `GET /tasks/{id}` shows all fields.

### Admin zone

- `/admin/tasks` (only `ROLE_ADMIN`)
- Uses `GET /admin/tasks/` to show all tasks in a table.
- Backend does **not** expose admin create/update/delete endpoints – frontend also делает только read.

### Running locally

From repo root:

1. Start backend (Spring Boot) on `http://localhost:8080`.
2. Install frontend dependencies:

   ```bash
   cd frontend
   npm install
   ```

3. Configure env (if needed):

   ```bash
   cp .env.example .env
   # edit VITE_API_URL if backend URL differs
   ```

4. Run dev server:

   ```bash
   npm run dev
   ```

5. Open `http://localhost:5173` in browser.

### Linting and formatting

- Run ESLint:

  ```bash
  npm run lint
  ```


