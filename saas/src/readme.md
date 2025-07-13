# Secuvast SaaS

An all‑in‑one bilingual SaaS platform for LatAm and Canadian SMEs that unifies CRM, light ERP, inventory/sales, and optional cybersecurity capabilities under a single multitenant Django application.

---

## Features

| Module                                               | Status | Notes                                |
| ---------------------------------------------------- | ------ | ------------------------------------ |
| User management & email verification                 | ✅      | Django‑allauth based                 |
| Stripe subscriptions (Starter / Growth / Enterprise) | ✅      | Automatic group/permission mapping   |
| Multitenant data isolation                           | 🚧     | `SchemaTenantMiddleware` in progress |
| Dashboard UI                                         | 🚧     | Server‑rendered templates with HTMX  |
| CRM / Inventory / Billing                            | 🚧     | Planned next                         |
| Cybersecurity add‑ons                                | 🗓️    | Roadmap phase 3                      |

---

## Quick‑start (local dev)

### 1. Clone & create environment file

```bash
git clone https://github.com/rage93/Secuvast.git
cd Secuvast
cp .env.example .env  # edit values
```

Minimal variables:

| Var                      | Example                                                | Purpose                  |
| ------------------------ | ------------------------------------------------------ | ------------------------ |
| `DJANGO_SECRET_KEY`      | `changeme-in-prod`                                     | Cryptographic signing    |
| `DJANGO_DEBUG`           | `1`                                                    | Enable Django debug      |
| `DATABASE_URL`           | `postgres://secuvast:password@localhost:5432/secuvast` | Postgres connection      |
| `STRIPE_SECRET_KEY`      | `sk_test_...`                                          | Backend API key          |
| `STRIPE_PUBLISHABLE_KEY` | `pk_test_...`                                          | Front‑end key            |
| `STRIPE_WEBHOOK_SECRET`  | `whsec_...`                                            | Verify webhook signature |
| `ALLOWED_HOSTS`          | `localhost,127.0.0.1`                                  | Django hosts list        |

### 2. Build & run with Docker

```bash
# build image (python 3.12‑slim)
docker build -t secuvast .

# run in dev mode
docker run --env-file .env -p 8000:8000 secuvast
```

> **Tip:** For hot‑reload during development you can mount the source
>
> ```bash
> docker run --env-file .env -p 8000:8000 -v $(pwd)/src:/code secuvast
> ```

### 3. Initialise DB & admin user

```bash
docker exec -it $(docker ps -qf ancestor=secuvast | head -1) \
  python manage.py migrate

docker exec -it <container> python manage.py createsuperuser
```

Visit `http://localhost:8000/admin/` to log in.

---

## Useful Docker commands

| Task                   | Command                                    |
| ---------------------- | ------------------------------------------ |
| Shell inside container | `docker exec -it <id> /bin/bash`           |
| Collect static (prod)  | `python manage.py collectstatic --noinput` |
| Run tests              | `pytest -q`                                |

---

## GitHub Actions CI (Python only)

The workflow **.github/workflows/ci.yml** runs lint (`ruff`), security (`safety`), and tests on Postgres 16.  Node/React steps were removed to speed up the build.

---

## Deployment (production)

- Set `DJANGO_DEBUG=0` and configure `SECURE_HSTS_SECONDS`, `SESSION_COOKIE_SECURE`, `CSRF_TRUSTED_ORIGINS`.
- Use `DATABASE_URL` pointing to managed Postgres.
- Configure `CLOUD_STORAGE_BACKEND` if you off‑load static/media files.
- Set `SENTRY_DSN` (optional) for error monitoring.

---

## License

MIT

