# PayScale — Payroll & HRMS

Enterprise-grade Payroll + HRMS + Timesheet SaaS UI with 15+ pages, realistic dummy data, and full navigation.

## Run & Operate

- `pnpm --filter @workspace/payroll-hrms run dev` — run the frontend (port 23422)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000, Express 5)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema (dev only)
- Required env: `SESSION_SECRET`

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React 18 + Vite 7, Tailwind v4, shadcn/ui, wouter, Recharts, lucide-react
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`)
- Build: esbuild (CJS bundle)

## Where things live

```
artifacts/payroll-hrms/src/
  App.tsx                    ← router with all 19 routes
  pages/                     ← one file per page (15+ pages)
  components/layout/         ← AppLayout, Sidebar, Topbar
  components/ui/             ← shadcn/ui components
  lib/data.ts                ← all dummy data (EMPLOYEES, TIMESHEETS, etc.)
  index.css                  ← Tailwind v4 + blue-indigo theme
artifacts/api-server/        ← Express API (currently unused by frontend)
```

## Architecture decisions

- Pure frontend SaaS UI — no backend calls, all data from `src/lib/data.ts`
- AppLayout wraps all non-auth routes; auth pages (/login, /forgot-password, /reset-password) render without sidebar
- Wouter for routing (lightweight, no React Router); dynamic params via `useParams`
- Sidebar collapse state persisted to `localStorage`
- Tailwind v4 with CSS variables for theming (blue-indigo primary); dark mode via `next-themes`

## Product

- Login with role selector (Employee / Supervisor / Admin)
- Dashboard: KPI cards, weekly hours bar chart, attendance area chart, recent timesheets + notifications
- Timesheets: day navigation, add/delete entries, lock/submit flow, project+work pack dropdowns
- Calculated Hours: weekly/fortnightly/monthly tabs with daily breakdown table and chart
- Payroll: current run table, payslip modal, payment history, trend chart
- Employees: searchable/filterable list, add employee modal, employee detail page with tabs (overview, payroll, leave, attendance)
- Projects: collapsible project cards with work pack management
- Teams: member cards with progress bars, team hours bar chart, summary table
- Approvals: bulk select, approve/reject with reason modal, status filter
- Supervisor: team overview, approval queue
- Admin: company-wide analytics, department pie chart, employee table, audit log
- Reports: payroll/hours/overtime reports with export buttons
- Notifications: grouped by date, mark read/all read
- Settings: company, payroll config, notification preferences, security (2FA, password change)

## User preferences

_Populate as sessions continue._

## Gotchas

- Do NOT run `pnpm dev` at root — use workflow restart or `pnpm --filter` commands
- Vite is configured with `server.allowedHosts: true` for proxy iframe support
- `BASE_URL` from `import.meta.env.BASE_URL` is used in the wouter router base

## Pointers

- See `.local/skills/pnpm-workspace/` for workspace conventions
- See `.local/skills/react-vite/` for Vite/React patterns
