
import React from 'react';
import { FileText, Wrench, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import ServiceHealthMonitor from '@/components/ServiceHealthMonitor';
import VisitorAnalytics from '@/components/VisitorAnalytics';
import ServiceCard from '@/components/ServiceCard';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const handlePortfolioClick = () => {
    toast({
      title: "Redirecting to Portfolio",
      description: "Opening your personal portfolio website...",
    });
    // Replace with your actual portfolio URL
    window.open('https://sagardeepak.dev', '_blank');
  };

  const handleServiceClick = (serviceName: string) => {
    toast({
      title: `Opening ${serviceName}`,
      description: `Launching ${serviceName} application...`,
    });
    // Add actual routing logic here
  };

  const services = [
    {
      title: 'Task Manager App',
      description: 'Efficient project management',
      icon: FileText,
      color: 'from-blue-500 to-blue-600',
      onClick: () => handleServiceClick('Task Manager')
    },
    {
      title: 'Dockerfile Optimizer',
      description: 'Optimize your Docker builds',
      icon: Wrench,
      color: 'from-green-500 to-green-600',
      onClick: () => handleServiceClick('Dockerfile Optimizer')
    },
    {
      title: 'DevOps Project Hub',
      description: 'Central project repository',
      icon: Wrench,
      color: 'from-purple-500 to-purple-600',
      onClick: () => handleServiceClick('DevOps Hub')
    },
    {
      title: 'E-Commerce App',
      description: 'Modern shopping platform',
      icon: ShoppingCart,
      color: 'from-orange-500 to-orange-600',
      onClick: () => handleServiceClick('E-Commerce')
    },
    {
      title: 'Future Tool 1',
      description: 'Coming soon...',
      icon: Wrench,
      color: 'from-gray-500 to-gray-600',
      onClick: () => handleServiceClick('Future Tool 1')
    },
    {
      title: 'Future Tool 2',
      description: 'Coming soon...',
      icon: FileText,
      color: 'from-gray-500 to-gray-600',
      onClick: () => handleServiceClick('Future Tool 2')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 animate-gradient">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 animate-float">
              Welcome to Your
              <span className="block text-gradient">DevOps Command Center</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 mb-8 animate-float" style={{ animationDelay: '0.5s' }}>
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
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '2s' }} />
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
            <h2 className="text-4xl font-bold text-white mb-4">Services & Tools</h2>
            <p className="text-white/70 text-lg">Access your DevOps applications and tools</p>
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

      {/* Footer */}
      <footer className="py-8 border-t border-white/10">
        <div className="container mx-auto px-6 text-center">
          <p className="text-white/60">
            © sagardeepak2002@gmail.com - DevOps Dashboard 2024
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
