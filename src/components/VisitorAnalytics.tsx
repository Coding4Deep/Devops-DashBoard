
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';

const VisitorAnalytics = () => {
  const [analytics, setAnalytics] = useState({
    totalVisits: 0,
    uniqueVisitors: 0,
    appVisits: {
      portfolio: 0,
      taskManager: 0,
      dockerOptimizer: 0,
      ecommerce: 0
    }
  });

  useEffect(() => {
    // Simulate real-time analytics updates
    const updateAnalytics = () => {
      const baseVisits = Math.floor(Date.now() / 100000); // Changes over time
      setAnalytics({
        totalVisits: baseVisits + Math.floor(Math.random() * 50),
        uniqueVisitors: Math.floor(baseVisits * 0.7) + Math.floor(Math.random() * 30),
        appVisits: {
          portfolio: Math.floor(baseVisits * 0.4) + Math.floor(Math.random() * 20),
          taskManager: Math.floor(baseVisits * 0.2) + Math.floor(Math.random() * 15),
          dockerOptimizer: Math.floor(baseVisits * 0.15) + Math.floor(Math.random() * 10),
          ecommerce: Math.floor(baseVisits * 0.25) + Math.floor(Math.random() * 18)
        }
      });
    };

    updateAnalytics();
    const interval = setInterval(updateAnalytics, 10000); // Update every 10 seconds
    
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="glass-card p-6 animate-float" style={{ animationDelay: '1s' }}>
      <h3 className="text-2xl font-bold text-white mb-6">Live Visitor Analytics</h3>
      
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-400 mb-1">
            {analytics.totalVisits.toLocaleString()}
          </div>
          <div className="text-white/80">Total Visits</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-purple-400 mb-1">
            {analytics.uniqueVisitors.toLocaleString()}
          </div>
          <div className="text-white/80">Unique Visitors</div>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center p-2 bg-white/5 rounded">
          <span className="text-white">📝 Portfolio</span>
          <span className="text-blue-400 font-semibold">{analytics.appVisits.portfolio}</span>
        </div>
        <div className="flex justify-between items-center p-2 bg-white/5 rounded">
          <span className="text-white">⚙️ Task Manager</span>
          <span className="text-purple-400 font-semibold">{analytics.appVisits.taskManager}</span>
        </div>
        <div className="flex justify-between items-center p-2 bg-white/5 rounded">
          <span className="text-white">🚀 Docker Optimizer</span>
          <span className="text-green-400 font-semibold">{analytics.appVisits.dockerOptimizer}</span>
        </div>
        <div className="flex justify-between items-center p-2 bg-white/5 rounded">
          <span className="text-white">🛒 E-Commerce</span>
          <span className="text-yellow-400 font-semibold">{analytics.appVisits.ecommerce}</span>
        </div>
      </div>
    </Card>
  );
};

export default VisitorAnalytics;
