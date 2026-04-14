# Production Deployment Guide — GCP + Docker Compose + Nginx + Let's Encrypt

This guide covers provisioning a minimal GCP VM, hardening the Ubuntu OS, installing Docker, running the site via Docker Compose, and securing it with a free Let's Encrypt TLS certificate.

---

## Table of Contents

1. [GCP VM Provisioning](#1-gcp-vm-provisioning)
2. [DNS Configuration](#2-dns-configuration)
3. [Initial Server Setup](#3-initial-server-setup)
4. [Install Docker & Docker Compose](#4-install-docker--docker-compose)
5. [Deploy the Application](#5-deploy-the-application)
6. [Obtain a TLS Certificate with Let's Encrypt](#6-obtain-a-tls-certificate-with-lets-encrypt)
7. [Enable HTTPS in Nginx](#7-enable-https-in-nginx)
8. [Auto-Renew TLS Certificate](#8-auto-renew-tls-certificate)
9. [Firewall Rules Summary](#9-firewall-rules-summary)
10. [Maintenance & Operations](#10-maintenance--operations)

---

## 1. GCP VM Provisioning

### Recommended minimal specs

| Property        | Value                          |
|-----------------|--------------------------------|
| Machine type    | `e2-small` (2 vCPU, 2 GB RAM) |
| OS              | Ubuntu 22.04 LTS               |
| Boot disk       | 20 GB Standard Persistent Disk |
| Region          | Closest to your target users   |
| Network tier    | Standard (saves cost)          |

> **e2-micro (1 vCPU, 1 GB RAM)** works for low-traffic personal sites but may OOM during Docker builds. Build the image locally or in CI and push to a registry to avoid this.

### Via Google Cloud Console

1. Go to **Compute Engine → VM instances → Create Instance**
2. **Name**: `mysite-prod`
3. **Region / Zone**: e.g. `asia-southeast1-a` (Singapore)
4. **Machine configuration**: Series `E2` → Machine type `e2-small`
5. **Boot disk**:
   - Click *Change*
   - OS: **Ubuntu**, Version: **Ubuntu 22.04 LTS**
   - Boot disk type: **Standard persistent disk**, Size: **20 GB**
6. **Firewall**: Check both **Allow HTTP traffic** and **Allow HTTPS traffic**
7. Click **Create**

### Via gcloud CLI

```bash
# Authenticate
gcloud auth login
gcloud config set project YOUR_PROJECT_ID

# Create the VM
gcloud compute instances create mysite-prod \
  --zone=asia-southeast1-a \
  --machine-type=e2-small \
  --image-family=ubuntu-2204-lts \
  --image-project=ubuntu-os-cloud \
  --boot-disk-size=20GB \
  --boot-disk-type=pd-standard \
  --tags=http-server,https-server \
  --network-tier=STANDARD

# Open ports 80 and 443 via firewall rules
gcloud compute firewall-rules create allow-http \
  --allow=tcp:80 \
  --target-tags=http-server \
  --description="Allow HTTP"

gcloud compute firewall-rules create allow-https \
  --allow=tcp:443 \
  --target-tags=https-server \
  --description="Allow HTTPS"
```

### Reserve a static external IP (optional but recommended)

```bash
gcloud compute addresses create mysite-ip \
  --region=asia-southeast1

# Assign it to the VM
gcloud compute instances delete-access-config mysite-prod \
  --access-config-name="external-nat" \
  --zone=asia-southeast1-a

gcloud compute instances add-access-config mysite-prod \
  --access-config-name="external-nat" \
  --address=mysite-ip \
  --zone=asia-southeast1-a
```

Get your VM's external IP:

```bash
gcloud compute instances describe mysite-prod \
  --zone=asia-southeast1-a \
  --format='get(networkInterfaces[0].accessConfigs[0].natIP)'
```

---

## 2. DNS Configuration

In your domain registrar (Namecheap, Cloudflare, GoDaddy, etc.) add an **A record** pointing to your VM's external IP:

| Type | Host | Value          | TTL  |
|------|------|----------------|------|
| A    | @    | YOUR_VM_IP     | 300  |
| A    | www  | YOUR_VM_IP     | 300  |

Wait for DNS to propagate (usually 2–15 minutes with a low TTL). Verify:

```bash
dig +short yourdomain.com
# Should return YOUR_VM_IP
```

---

## 3. Initial Server Setup

### SSH into the VM

```bash
gcloud compute ssh mysite-prod --zone=asia-southeast1-a
```

Or with a standard SSH key:

```bash
ssh -i ~/.ssh/your_key ubuntu@YOUR_VM_IP
```

### Update the system

```bash
sudo apt update && sudo apt upgrade -y
```

### Create a non-root deploy user (recommended)

```bash
sudo adduser deploy
sudo usermod -aG sudo deploy

# Copy your SSH key to the new user
sudo mkdir -p /home/deploy/.ssh
sudo cp ~/.ssh/authorized_keys /home/deploy/.ssh/
sudo chown -R deploy:deploy /home/deploy/.ssh
sudo chmod 700 /home/deploy/.ssh
sudo chmod 600 /home/deploy/.ssh/authorized_keys
```

Switch to the deploy user for the rest of this guide:

```bash
sudo su - deploy
```

### Basic security hardening

```bash
# Disable root SSH login and password auth
sudo sed -i 's/^PermitRootLogin.*/PermitRootLogin no/' /etc/ssh/sshd_config
sudo sed -i 's/^PasswordAuthentication.*/PasswordAuthentication no/' /etc/ssh/sshd_config
sudo systemctl reload sshd

# Enable UFW firewall
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable
sudo ufw status
```

### Install essential utilities

```bash
sudo apt install -y \
  git \
  curl \
  wget \
  unzip \
  htop \
  fail2ban
```

---

## 4. Install Docker & Docker Compose

### Install Docker Engine

```bash
# Add Docker's official GPG key and repository
curl -fsSL https://download.docker.com/linux/ubuntu/gpg \
  | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

echo "deb [arch=$(dpkg --print-architecture) \
  signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] \
  https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" \
  | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

### Allow running Docker without sudo

```bash
sudo usermod -aG docker $USER
newgrp docker
```

### Verify

```bash
docker --version
docker compose version
```

---

## 5. Deploy the Application

### Clone the repository

```bash
sudo mkdir -p /opt/mysite
sudo chown deploy:deploy /opt/mysite

git clone https://github.com/arisculala/mysite.git /opt/mysite
cd /opt/mysite
```

### Build and start (HTTP only, before SSL)

The default `nginx.conf` listens on port 80 only. Start in this mode first — you need port 80 available for the Let's Encrypt HTTP challenge.

```bash
docker compose up -d --build
```

Check everything is running:

```bash
docker compose ps
docker compose logs -f app    # watch app logs
docker compose logs -f nginx  # watch nginx logs
```

Visit `http://yourdomain.com` — your site should be live over HTTP.

---

## 6. Obtain a TLS Certificate with Let's Encrypt

### Install Certbot (standalone — does not require host Nginx)

```bash
sudo apt install -y certbot
```

### Temporarily stop Nginx to free port 80

```bash
docker compose stop nginx
```

### Obtain the certificate

```bash
sudo certbot certonly \
  --standalone \
  --preferred-challenges http \
  -d yourdomain.com \
  -d www.yourdomain.com \
  --email arisculala@gmail.com \
  --agree-tos \
  --no-eff-email
```

Certificates are saved to:

```
/etc/letsencrypt/live/yourdomain.com/fullchain.pem
/etc/letsencrypt/live/yourdomain.com/privkey.pem
```

### Fix permissions so the Docker container can read them

```bash
sudo chmod -R 755 /etc/letsencrypt/live/
sudo chmod -R 755 /etc/letsencrypt/archive/
```

---

## 7. Enable HTTPS in Nginx

### Update nginx.conf

Edit `/opt/mysite/nginx.conf` — replace the `server` block with the version below. The HTTP block now redirects to HTTPS; the HTTPS block terminates TLS.

```nginx
http {
    # ... keep all existing top-level directives (gzip, security headers, upstream) ...

    # HTTP → HTTPS redirect
    server {
        listen 80;
        server_name yourdomain.com www.yourdomain.com;

        location /.well-known/acme-challenge/ {
            root /var/www/certbot;
        }

        location / {
            return 301 https://$host$request_uri;
        }
    }

    # HTTPS server
    server {
        listen 443 ssl http2;
        server_name yourdomain.com www.yourdomain.com;

        ssl_certificate     /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

        ssl_protocols       TLSv1.2 TLSv1.3;
        ssl_ciphers         ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256;
        ssl_prefer_server_ciphers off;
        ssl_session_cache   shared:SSL:10m;
        ssl_session_timeout 1d;

        add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;

        location /_next/static/ {
            proxy_pass http://nextjs;
            add_header Cache-Control "public, max-age=31536000, immutable";
        }

        location / {
            proxy_pass         http://nextjs;
            proxy_http_version 1.1;
            proxy_set_header   Upgrade           $http_upgrade;
            proxy_set_header   Connection        "upgrade";
            proxy_set_header   Host              $host;
            proxy_set_header   X-Real-IP         $remote_addr;
            proxy_set_header   X-Forwarded-For   $proxy_add_x_forwarded_for;
            proxy_set_header   X-Forwarded-Proto $scheme;
            proxy_read_timeout 60s;
        }
    }
}
```

### Update docker-compose.yml to mount the certificates

Edit `/opt/mysite/docker-compose.yml` — add the cert volume mounts to the nginx service and open port 443:

```yaml
  nginx:
    image: nginx:1.27-alpine
    container_name: mysite-nginx
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - /etc/letsencrypt:/etc/letsencrypt:ro
    depends_on:
      app:
        condition: service_healthy
    networks:
      - mysite-network
```

### Restart with HTTPS

```bash
docker compose up -d nginx
```

Verify:

```bash
curl -I https://yourdomain.com
# HTTP/2 200
```

---

## 8. Auto-Renew TLS Certificate

Let's Encrypt certificates expire every 90 days. Set up a cron job to auto-renew.

### Create a renewal script

```bash
sudo tee /opt/mysite/renew-cert.sh > /dev/null <<'EOF'
#!/bin/bash
set -e

cd /opt/mysite

# Stop nginx to free port 80
docker compose stop nginx

# Renew certificate
certbot renew --standalone --quiet

# Restart nginx
docker compose start nginx

echo "$(date): cert renewal complete" >> /var/log/certbot-renew.log
EOF

sudo chmod +x /opt/mysite/renew-cert.sh
```

### Schedule with cron

```bash
sudo crontab -e
```

Add this line (runs at 03:00 on the 1st of every month):

```cron
0 3 1 * * /opt/mysite/renew-cert.sh >> /var/log/certbot-renew.log 2>&1
```

### Test the renewal dry-run

```bash
sudo certbot renew --standalone --dry-run
```

---

## 9. Firewall Rules Summary

| Port | Protocol | Purpose              | Source    |
|------|----------|----------------------|-----------|
| 22   | TCP      | SSH                  | Your IP   |
| 80   | TCP      | HTTP / ACME challenge| 0.0.0.0/0 |
| 443  | TCP      | HTTPS                | 0.0.0.0/0 |

GCP Firewall (already created in Step 1). UFW on the host:

```bash
sudo ufw status verbose
# Should show: 22, 80, 443 ALLOW
```

---

## 10. Maintenance & Operations

### View running containers

```bash
cd /opt/mysite
docker compose ps
```

### View logs

```bash
docker compose logs -f            # all services
docker compose logs -f app        # Next.js app
docker compose logs -f nginx      # Nginx
```

### Deploy an update

```bash
cd /opt/mysite
git pull origin main
docker compose up -d --build
docker image prune -f             # clean old images
```

### Restart a service

```bash
docker compose restart app
docker compose restart nginx
```

### Check disk usage

```bash
df -h
docker system df
```

### Monitor resource usage

```bash
htop                              # CPU / RAM
docker stats                      # per-container live stats
```

### Full stop / start

```bash
docker compose down               # stop and remove containers
docker compose up -d              # start fresh
```

### Check TLS certificate expiry

```bash
sudo certbot certificates
# or
echo | openssl s_client -connect yourdomain.com:443 2>/dev/null \
  | openssl x509 -noout -dates
```

---

## Quick Reference

```
VM:         GCP e2-small, Ubuntu 22.04, asia-southeast1-a
App:        Docker container (Next.js standalone), port 3000
Proxy:      Nginx container, ports 80 + 443
TLS:        Let's Encrypt via Certbot standalone
Certs:      /etc/letsencrypt/live/yourdomain.com/
Project:    /opt/mysite/
Logs:       docker compose logs -f
Update:     git pull && docker compose up -d --build
Cert renew: /opt/mysite/renew-cert.sh (cron monthly)
```
