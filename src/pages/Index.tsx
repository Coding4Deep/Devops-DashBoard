
import React from 'react';
import { FileText, Wrench, ShoppingCart, GitBranch, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import ServiceHealthMonitor from '@/components/ServiceHealthMonitor';
import VisitorAnalytics from '@/components/VisitorAnalytics';
import ServiceCard from '@/components/ServiceCard';
import MailMe from '@/components/MailMe';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const handlePortfolioClick = () => {
    // Dispatch custom event for analytics
    window.dispatchEvent(new CustomEvent('portfolioClick'));
    
    toast({
      title: "Redirecting to Portfolio",
      description: "Opening your personal portfolio website...",
    });
    
    // Replace with your actual portfolio URL
    window.open('https://sagardeepak.dev', '_blank');
  };

  const handleServiceClick = (serviceName: string, url: string, eventName: string) => {
    // Dispatch custom event for analytics
    window.dispatchEvent(new CustomEvent(eventName));
    
    toast({
      title: `Opening ${serviceName}`,
      description: `Launching ${serviceName} application...`,
    });
    
    // Open the actual service URL
    window.open(url, '_blank');
  };

  const services = [
    {
      title: 'Task Manager App',
      description: 'Efficient project management',
      icon: FileText,
      color: 'from-blue-500 to-blue-600',
      onClick: () => handleServiceClick('Task Manager', 'https://github.com/your-username/task-manager', 'taskManagerClick')
    },
    {
      title: 'Dockerfile Optimizer',
      description: 'Optimize your Docker builds',
      icon: Wrench,
      color: 'from-green-500 to-green-600',
      onClick: () => handleServiceClick('Dockerfile Optimizer', 'https://github.com/your-username/dockerfile-optimizer', 'dockerOptimizerClick')
    },
    {
      title: 'DevOps Project Hub',
      description: 'Central project repository',
      icon: GitBranch,
      color: 'from-purple-500 to-purple-600',
      onClick: () => handleServiceClick('DevOps Hub', 'https://github.com/your-username/devops-hub', 'devopsHubClick')
    },
    {
      title: 'E-Commerce App',
      description: 'Modern shopping platform',
      icon: ShoppingCart,
      color: 'from-orange-500 to-orange-600',
      onClick: () => handleServiceClick('E-Commerce', 'https://github.com/your-username/ecommerce-app', 'ecommerceClick')
    },
    {
      title: 'Data Pipeline Tool',
      description: 'ETL and data processing',
      icon: Database,
      color: 'from-teal-500 to-teal-600',
      onClick: () => handleServiceClick('Data Pipeline', 'https://github.com/your-username/data-pipeline', 'futureTool1Click')
    },
    {
      title: 'Monitoring Dashboard',
      description: 'Real-time system monitoring',
      icon: FileText,
      color: 'from-indigo-500 to-indigo-600',
      onClick: () => handleServiceClick('Monitoring Dashboard', 'https://github.com/your-username/monitoring-dashboard', 'futureTool2Click')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 light:from-blue-50 light:via-indigo-100 light:to-purple-100 animate-gradient transition-colors duration-500">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 dark:bg-purple-400/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 dark:bg-blue-400/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-60 h-60 bg-teal-500/20 dark:bg-teal-400/10 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-float" style={{ animationDelay: '4s' }} />
      </div>

      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-7xl font-bold text-white dark:text-gray-100 light:text-gray-800 mb-6 animate-float">
              Welcome to Your
              <span className="block text-gradient">DevOps Command Center</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 dark:text-gray-300 light:text-gray-600 mb-8 animate-float" style={{ animationDelay: '0.5s' }}>
              Monitor. Optimize. Deploy. Where your CI/CD pipelines, tools, and services unite.
            </p>
            
            <Button 
              onClick={handlePortfolioClick}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 animate-pulse-slow"
            >
              Visit My Portfolio
            </Button>
          </div>
        </div>
      </section>

      {/* Status and Analytics Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <ServiceHealthMonitor />
            <VisitorAnalytics />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white dark:text-gray-100 light:text-gray-800 mb-4">Services & Tools</h2>
            <p className="text-white/70 dark:text-gray-300 light:text-gray-600 text-lg">Access your DevOps applications and tools</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <div key={index} style={{ animationDelay: `${index * 0.1}s` }} className="animate-float">
                <ServiceCard {...service} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mail Me Section */}
      <MailMe />

      {/* Footer */}
      <footer className="py-8 border-t border-white/10 dark:border-gray-700/50">
        <div className="container mx-auto px-6 text-center">
          <p className="text-white/60 dark:text-gray-400 light:text-gray-600">
            © sagardeepak2002@gmail.com - DevOps Dashboard 2024
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
