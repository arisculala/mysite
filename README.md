# Aris Culala — Personal Portfolio Site

Personal profile website built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**. Deployed via **Docker + Nginx** reverse proxy.

---

## Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Framework  | Next.js 14 (App Router, standalone) |
| Language   | TypeScript                          |
| Styling    | Tailwind CSS                        |
| Icons      | React Icons                         |
| Container  | Docker (multi-stage build)          |
| Proxy      | Nginx 1.27                          |
| Deployment | Docker Compose                      |

---

## Local Development

### Prerequisites
- Node.js 20+
- npm 10+

### Run dev server

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Building with Docker

### 1. Build the Docker image

```bash
docker build -t mysite:latest .
```

### 2. Run with Docker Compose (app + Nginx)

```bash
docker compose up -d
```

The site will be available at **http://localhost**.

### 3. Check logs

```bash
# All services
docker compose logs -f

# App only
docker compose logs -f app

# Nginx only
docker compose logs -f nginx
```

### 4. Stop containers

```bash
docker compose down
```

---

## Production Deployment

### Option A — VPS / Dedicated Server (Docker Compose)

#### Step 1: Provision a server

Use any provider: **DigitalOcean**, **Hetzner**, **AWS EC2**, **Vultr**, etc.

Minimum recommended specs:
- 1 vCPU, 1 GB RAM (2 GB recommended)
- Ubuntu 22.04 LTS

#### Step 2: Install Docker

```bash
# On the server
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
newgrp docker
```

#### Step 3: Clone and deploy

```bash
git clone https://github.com/<your-user>/mysite.git
cd mysite

docker compose up -d --build
```

Site is live on port 80.

#### Step 4: Configure a domain

Point your domain's **A record** to your server's IP, then set up SSL with Certbot:

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Obtain SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

Then update `nginx.conf` — uncomment the HTTPS server block and replace `yourdomain.com` with your actual domain.

#### Step 5: Enable HTTPS in docker-compose

Uncomment the SSL volume mounts in `docker-compose.yml`:

```yaml
volumes:
  - ./nginx.conf:/etc/nginx/nginx.conf:ro
  - /etc/letsencrypt:/etc/nginx/ssl:ro
```

And in `nginx.conf`, uncomment the `return 301` redirect in the HTTP server block and the full HTTPS server block.

Restart:

```bash
docker compose down && docker compose up -d
```

---

### Option B — Deploy to Vercel (zero-config)

```bash
npm install -g vercel
vercel --prod
```

> Remove or comment out `output: 'standalone'` in `next.config.js` for Vercel deployments.

---

### Option C — Deploy to Fly.io

```bash
# Install flyctl
curl -L https://fly.io/install.sh | sh

# Login and launch
fly auth login
fly launch --name mysite --region sin
fly deploy
```

---

## CI/CD with GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Build & push Docker image
        run: |
          docker build -t mysite:${{ github.sha }} .

      - name: Deploy via SSH
        uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            cd /opt/mysite
            git pull origin main
            docker compose up -d --build
            docker image prune -f
```

Required GitHub secrets: `SERVER_HOST`, `SERVER_USER`, `SSH_PRIVATE_KEY`.

---

## Customization

All content is in the component files under `src/components/`:

| File              | Content to update                   |
|-------------------|-------------------------------------|
| `Hero.tsx`        | Name, tagline, links                |
| `About.tsx`       | Bio, highlights                     |
| `Skills.tsx`      | Skill categories and proficiency %  |
| `Experience.tsx`  | Work history                        |
| `Projects.tsx`    | Project cards and links             |
| `Contact.tsx`     | Contact methods                     |
| `Footer.tsx`      | Footer links                        |
| `app/layout.tsx`  | SEO metadata                        |

---

## Project Structure

```
mysite/
├── src/
│   ├── app/
│   │   ├── globals.css        # Global styles + Tailwind
│   │   ├── layout.tsx         # Root layout + metadata
│   │   └── page.tsx           # Home page (assembles sections)
│   └── components/
│       ├── Navbar.tsx
│       ├── Hero.tsx
│       ├── About.tsx
│       ├── Skills.tsx
│       ├── Experience.tsx
│       ├── Projects.tsx
│       ├── Contact.tsx
│       └── Footer.tsx
├── Dockerfile                 # Multi-stage Docker build
├── docker-compose.yml         # App + Nginx orchestration
├── nginx.conf                 # Nginx reverse proxy config
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## License

MIT — free to use and modify for personal use.
