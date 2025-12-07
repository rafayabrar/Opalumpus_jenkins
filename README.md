# Containerization & deployment

This repository contains a Node/Express backend (`Backend/`) and a Vite React frontend (`Opalumpus_frontEnd/`).

Files added:

- `Backend/Dockerfile` — optimized multi-stage image for the Express server (node:18-alpine, non-root user).
- `Opalumpus_frontEnd/Dockerfile` — multi-stage build (node) and serve static assets with `nginx:stable-alpine`.
- `Opalumpus_frontEnd/nginx.conf` — nginx config with SPA fallback and basic gzip/security headers.
- `docker-compose.yml` — compose file to run both services locally or on an EC2 instance.

Quick build & run (on your machine / EC2 instance with Docker installed):

PowerShell (Windows) examples:

```powershell
# From repository root
docker-compose build --pull --no-cache
docker-compose up -d

# Check logs
docker-compose logs -f frontend
docker-compose logs -f backend
```

Notes and deployment options

- Simple EC2 deploy (recommended for quick test):
  1. Provision an EC2 instance (Amazon Linux 2 or Ubuntu) and install Docker & Docker Compose.
  2. Clone this repo on the instance.
  3. Run the commands above to start the services.

- Production: push images to Amazon ECR and run in ECS or use a single EC2 with docker-compose and proper process supervision/firewall.

Tips

- Move `nodemon` from `dependencies` into `devDependencies` in `Backend/package.json` for a smaller production install.
- Add a `package-lock.json` or `pnpm-lock.yaml` to get deterministic installs and enable `npm ci` in Dockerfile.
- Add environment variables and a secrets mechanism (SSM Parameter Store, Secrets Manager) for DB connection strings, JWT secrets, etc.

If you'd like, I can:

- Build and test the Docker images here (if you want me to run build commands locally I can run them in a terminal session),
- Create an ECR/ECS deployment setup or a Terraform script to provision EC2 + security groups and run docker-compose,
- Or consolidate into a single image that serves both API and frontend (not recommended for scale).
