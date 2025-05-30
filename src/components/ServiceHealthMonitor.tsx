
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

  const checkServiceHealth = async (service: Service): Promise<{ status: 'up' | 'down'; responseTime: number }> => {
    try {
      const startTime = Date.now();
      
      // Create AbortController for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      try {
        // Try direct fetch first
        const response = await fetch(service.url, {
          method: 'HEAD',
          mode: 'no-cors',
          signal: controller.signal,
        });
        
        clearTimeout(timeoutId);
        const endTime = Date.now();
        const responseTime = endTime - startTime;
        
        // For no-cors mode, we can't check response.ok, so if no error thrown, consider it up
        return {
          status: 'up',
          responseTime: responseTime
        };
      } catch (directError) {
        clearTimeout(timeoutId);
        
        // If direct fetch fails, try with CORS proxy
        try {
          const proxyResponse = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(service.url)}`, {
            method: 'GET',
          });
          
          const endTime = Date.now();
          const responseTime = endTime - startTime;
          
          if (proxyResponse.ok) {
            const data = await proxyResponse.json();
            // Check if the proxied content contains actual HTML (not an error page)
            const isValidPage = data.contents && 
              data.contents.includes('<html') && 
              !data.contents.toLowerCase().includes('not found') &&
              !data.contents.toLowerCase().includes('error 404') &&
              !data.contents.toLowerCase().includes('server error');
            
            return {
              status: isValidPage ? 'up' : 'down',
              responseTime: responseTime
            };
          } else {
            return {
              status: 'down',
              responseTime: 0
            };
          }
        } catch (proxyError) {
          console.log(`Service ${service.name} check failed:`, proxyError);
          return {
            status: 'down',
            responseTime: 0
          };
        }
      }
    } catch (error) {
      console.log(`Service ${service.name} check failed:`, error);
      return {
        status: 'down',
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
            {service.responseTime && service.responseTime > 0 && (
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
