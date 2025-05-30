
#!/bin/bash

echo "Building DevOps Dashboard..."

# Build Docker image
docker build -t devops-dashboard .

echo "Build completed successfully!"
echo "To run the application, use: docker run -p 3000:80 devops-dashboard"
echo "Or use docker-compose: docker-compose up -d"
