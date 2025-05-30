
#!/bin/bash

echo "Starting DevOps Dashboard..."

# Check if docker-compose is available
if command -v docker-compose &> /dev/null; then
    docker-compose up -d
    echo "Dashboard started with docker-compose"
    echo "Access at: http://localhost:3000"
else
    # Fallback to docker run
    docker run -d -p 3000:80 --name devops-dashboard devops-dashboard
    echo "Dashboard started with docker run"
    echo "Access at: http://localhost:3000"
fi

echo "Container logs: docker logs -f devops-dashboard"
