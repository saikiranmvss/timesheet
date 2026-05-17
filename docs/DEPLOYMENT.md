# timesheet — Deployment (GitHub Actions only)

Same server as chatex. Uses **PostgreSQL** (enabled during global provision).

## GitHub Secrets (this repo)

| Secret | Value |
|--------|--------|
| `SERVER_HOST` | Droplet IP |
| `SERVER_USER` | `deploy` |
| `SSH_PRIVATE_KEY` | Same key as chatex |
| `DB_PASSWORD` | PostgreSQL password for user `timesheet` |
| `ENV_FILE` | See below |

**ENV_FILE example:**

```env
NODE_ENV=production
PORT=5300
DATABASE_URL=postgresql://timesheet:YOUR_DB_PASSWORD@127.0.0.1:5432/timesheet
LOG_LEVEL=info
```

## First deploy (schema)

1. Add secret **`MIGRATE_ON_DEPLOY=true`**
2. Run Deploy once (runs `pnpm --filter @workspace/db run push`)
3. Remove the secret or set to `false` for later deploys

## Deploy

Push to `main` or run **Actions → Deploy**.

## Verify

```text
http://YOUR_IP/timesheet/
http://YOUR_IP/timesheet/api/healthz
```

## Aligned with chatex/Ravyu

- Lockfile + `pnpm install --frozen-lockfile` in CI
- `FULL_PNPM_INSTALL=true` for monorepo deploy
- `drizzle-kit` in `@workspace/db` **dependencies** (available on server for `db push`)
- Same script/systemd/workflow fixes as chatex
