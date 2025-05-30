
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';

interface Service {
  name: string;
  url: string;
  status: 'up' | 'down' | 'checking';
  responseTime?: number;
}

const ServiceHealthMonitor = () => {
  const [services, setServices] = useState<Service[]>([
    { name: 'Portfolio Website', url: 'https://google.com', status: 'checking' },
    { name: 'Task Manager', url: 'https://github.com', status: 'checking' },
    { name: 'Dockerfile Optimizer', url: 'https://stackoverflow.com', status: 'checking' },
    { name: 'E-Commerce App', url: 'https://linkedin.com', status: 'checking' },
  ]);

  const checkServiceHealth = async (service: Service) => {
    try {
      const startTime = Date.now();
      
      // Using a CORS proxy for demo purposes - in production, use your own health check endpoint
      const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(service.url)}`, {
        method: 'GET',
        timeout: 5000 as any,
      });
      
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      
      return {
        status: response.ok ? 'up' : 'down',
        responseTime: responseTime
      };
    } catch (error) {
      console.log(`Service ${service.name} check failed:`, error);
      return {
        status: 'down' as const,
        responseTime: 0
      };
    }
  };

  useEffect(() => {
    const checkAllServices = async () => {
      const updatedServices = await Promise.all(
        services.map(async (service) => {
          const health = await checkServiceHealth(service);
          return {
            ...service,
            status: health.status,
            responseTime: health.responseTime
          };
        })
      );
      setServices(updatedServices);
    };

    checkAllServices();
    
    // Check every 30 seconds
    const interval = setInterval(checkAllServices, 30000);
    return () => clearInterval(interval);
  }, []);

  const upServices = services.filter(s => s.status === 'up').length;
  const totalServices = services.length;

  return (
    <Card className="glass-card p-6 animate-float">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">Service Health Monitor</h3>
        <div className="flex items-center space-x-4">
          <div className="text-3xl font-bold text-green-400">
            {upServices}/{totalServices}
          </div>
          <span className="text-white/80">Services Online</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((service, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${
                service.status === 'up' ? 'bg-green-400 animate-pulse' :
                service.status === 'down' ? 'bg-red-400' :
                'bg-yellow-400 animate-pulse'
              }`} />
              <span className="text-white font-medium">{service.name}</span>
            </div>
            {service.responseTime && (
              <span className="text-white/60 text-sm">
                {service.responseTime}ms
              </span>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ServiceHealthMonitor;
