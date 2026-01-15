# Docker Commands for T.O.O.L.S Inc Web Application

## Build and Run

### Build the Docker image
```bash
docker build -t toolsinc-web:latest .
```

### Run the container
```bash
docker run -d -p 3000:3000 --name toolsinc-web toolsinc-web:latest
```

### Using Docker Compose
```bash
# Build and start
docker-compose up -d

# View logs
docker-compose logs -f

# Stop containers
docker-compose down

# Rebuild and restart
docker-compose up -d --build
```

## Azure Container Instances Deployment

### Login to Azure
```bash
az login
```

### Create resource group (if needed)
```bash
az group create --name toolsinc-rg --location eastus
```

### Create Azure Container Registry
```bash
az acr create --resource-group toolsinc-rg --name toolsincregistry --sku Basic
```

### Build and push to ACR
```bash
az acr build --registry toolsincregistry --image toolsinc-web:latest .
```

### Deploy to Azure Container Instances
```bash
az container create \
  --resource-group toolsinc-rg \
  --name toolsinc-web \
  --image toolsincregistry.azurecr.io/toolsinc-web:latest \
  --cpu 1 \
  --memory 1.5 \
  --registry-login-server toolsincregistry.azurecr.io \
  --registry-username <username> \
  --registry-password <password> \
  --dns-name-label toolsinc-web \
  --ports 3000
```

## Container Management

### View running containers
```bash
docker ps
```

### View container logs
```bash
docker logs toolsinc-web
```

### Stop container
```bash
docker stop toolsinc-web
```

### Remove container
```bash
docker rm toolsinc-web
```

### Inspect container
```bash
docker inspect toolsinc-web
```

## Health Checks

The container includes automatic health checks that run every 30 seconds.

View health status:
```bash
docker inspect --format='{{json .State.Health}}' toolsinc-web
```

## Production Considerations

1. **Security**: Container runs as non-root user (nextjs:nodejs)
2. **Health Checks**: Automatic monitoring of application status
3. **Resource Limits**: CPU and memory constraints configured
4. **Networking**: Isolated network for container communication
5. **Logging**: Structured logging for monitoring and debugging
