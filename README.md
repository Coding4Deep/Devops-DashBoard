# DevOps Dashboard

A modern, responsive DevOps dashboard that provides real-time service monitoring, visitor analytics, and quick access to your DevOps tools and applications.

## Features

- 🔍 **Real-time Service Health Monitoring** - Actual health checks for your services
- 📊 **Live Visitor Analytics** - Track clicks and visits with localStorage
- 🚀 **Service Launcher** - Quick access to your DevOps applications
- 📱 **Responsive Design** - Beautiful UI that works on all devices
- 🐳 **Dockerized** - Ready for containerized deployment

## Local Development

### Prerequisites
- Node.js 18+
- npm or bun
- Docker (optional)

### Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Docker Deployment

### Option 1: Docker Build & Run
```bash
# Make scripts executable
chmod +x scripts/*.sh

# Build the image
./scripts/build.sh

# Run the container
./scripts/run.sh
```

### Option 2: Docker Compose
```bash
# Start all services (includes MongoDB)
docker-compose up -d

# Stop services
docker-compose down
```

### Option 3: Manual Docker Commands
```bash
# Build image
docker build -t devops-dashboard .

# Run container
docker run -d -p 3000:80 --name devops-dashboard devops-dashboard

# View logs
docker logs -f devops-dashboard
```

## Configuration

### Service URLs
Update the service URLs in `src/pages/Index.tsx` to point to your actual applications:

```typescript
const services = [
  {
    title: 'Task Manager App',
    onClick: () => handleServiceClick('Task Manager', 'https://your-actual-url.com', 'taskManagerClick')
  },
  // ... other services
];
```

### Health Check URLs
Update the health check URLs in `src/components/ServiceHealthMonitor.tsx`:

```typescript
const [services, setServices] = useState<Service[]>([
  { name: 'Portfolio Website', url: 'https://your-portfolio.com', status: 'checking' },
  // ... other services
]);
```

## Analytics

The dashboard tracks:
- Total page visits
- Unique visitors (daily)
- Portfolio button clicks
- Individual service clicks

All analytics data is stored in localStorage and persists between sessions.

## Production Deployment

1. Update service URLs to production endpoints
2. Build Docker image: `docker build -t devops-dashboard .`
3. Deploy to your container platform
4. Access on port 80 (or configured port)

## Architecture

- **Frontend**: React + TypeScript + Tailwind CSS
- **Build Tool**: Vite
- **Container**: Docker with Nginx
- **Analytics**: localStorage (no external dependencies)
- **Health Checks**: Direct HTTP requests + CORS proxy fallback

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/bdd01d14-94df-469a-8217-996993590ddb) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/bdd01d14-94df-469a-8217-996993590ddb) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
