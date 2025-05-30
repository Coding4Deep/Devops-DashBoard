
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';

interface AnalyticsData {
  totalVisits: number;
  uniqueVisitors: number;
  portfolioClicks: number;
  serviceClicks: {
    taskManager: number;
    dockerOptimizer: number;
    devopsHub: number;
    ecommerce: number;
    futureTool1: number;
    futureTool2: number;
  };
}

const VisitorAnalytics = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalVisits: 0,
    uniqueVisitors: 0,
    portfolioClicks: 0,
    serviceClicks: {
      taskManager: 0,
      dockerOptimizer: 0,
      devopsHub: 0,
      ecommerce: 0,
      futureTool1: 0,
      futureTool2: 0
    }
  });

  // Initialize analytics from localStorage
  useEffect(() => {
    const initializeAnalytics = () => {
      // Get or create visitor ID
      let visitorId = localStorage.getItem('devops_visitor_id');
      if (!visitorId) {
        visitorId = `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem('devops_visitor_id', visitorId);
      }

      // Track page visit
      const today = new Date().toDateString();
      const lastVisit = localStorage.getItem('devops_last_visit');
      
      let totalVisits = parseInt(localStorage.getItem('devops_total_visits') || '0');
      let uniqueVisitors = parseInt(localStorage.getItem('devops_unique_visitors') || '0');
      
      // Increment total visits
      totalVisits++;
      localStorage.setItem('devops_total_visits', totalVisits.toString());
      
      // Increment unique visitors if new day or new visitor
      if (lastVisit !== today) {
        uniqueVisitors++;
        localStorage.setItem('devops_unique_visitors', uniqueVisitors.toString());
        localStorage.setItem('devops_last_visit', today);
      }

      // Load click data
      const portfolioClicks = parseInt(localStorage.getItem('devops_portfolio_clicks') || '0');
      const serviceClicks = {
        taskManager: parseInt(localStorage.getItem('devops_task_manager_clicks') || '0'),
        dockerOptimizer: parseInt(localStorage.getItem('devops_docker_optimizer_clicks') || '0'),
        devopsHub: parseInt(localStorage.getItem('devops_hub_clicks') || '0'),
        ecommerce: parseInt(localStorage.getItem('devops_ecommerce_clicks') || '0'),
        futureTool1: parseInt(localStorage.getItem('devops_future_tool1_clicks') || '0'),
        futureTool2: parseInt(localStorage.getItem('devops_future_tool2_clicks') || '0')
      };

      setAnalytics({
        totalVisits,
        uniqueVisitors,
        portfolioClicks,
        serviceClicks
      });
    };

    initializeAnalytics();

    // Listen for click events
    const handlePortfolioClick = () => {
      const clicks = parseInt(localStorage.getItem('devops_portfolio_clicks') || '0') + 1;
      localStorage.setItem('devops_portfolio_clicks', clicks.toString());
      setAnalytics(prev => ({ ...prev, portfolioClicks: clicks }));
    };

    const handleServiceClick = (serviceName: string) => {
      const key = `devops_${serviceName}_clicks`;
      const clicks = parseInt(localStorage.getItem(key) || '0') + 1;
      localStorage.setItem(key, clicks.toString());
      
      setAnalytics(prev => ({
        ...prev,
        serviceClicks: {
          ...prev.serviceClicks,
          [serviceName]: clicks
        }
      }));
    };

    // Add event listeners
    window.addEventListener('portfolioClick', handlePortfolioClick);
    window.addEventListener('taskManagerClick', () => handleServiceClick('taskManager'));
    window.addEventListener('dockerOptimizerClick', () => handleServiceClick('dockerOptimizer'));
    window.addEventListener('devopsHubClick', () => handleServiceClick('devopsHub'));
    window.addEventListener('ecommerceClick', () => handleServiceClick('ecommerce'));
    window.addEventListener('futureTool1Click', () => handleServiceClick('futureTool1'));
    window.addEventListener('futureTool2Click', () => handleServiceClick('futureTool2'));

    return () => {
      window.removeEventListener('portfolioClick', handlePortfolioClick);
      window.removeEventListener('taskManagerClick', () => handleServiceClick('taskManager'));
      window.removeEventListener('dockerOptimizerClick', () => handleServiceClick('dockerOptimizer'));
      window.removeEventListener('devopsHubClick', () => handleServiceClick('devopsHub'));
      window.removeEventListener('ecommerceClick', () => handleServiceClick('ecommerce'));
      window.removeEventListener('futureTool1Click', () => handleServiceClick('futureTool1'));
      window.removeEventListener('futureTool2Click', () => handleServiceClick('futureTool2'));
    };
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
          <span className="text-white">📝 Portfolio Clicks</span>
          <span className="text-blue-400 font-semibold">{analytics.portfolioClicks}</span>
        </div>
        <div className="flex justify-between items-center p-2 bg-white/5 rounded">
          <span className="text-white">⚙️ Task Manager</span>
          <span className="text-purple-400 font-semibold">{analytics.serviceClicks.taskManager}</span>
        </div>
        <div className="flex justify-between items-center p-2 bg-white/5 rounded">
          <span className="text-white">🚀 Docker Optimizer</span>
          <span className="text-green-400 font-semibold">{analytics.serviceClicks.dockerOptimizer}</span>
        </div>
        <div className="flex justify-between items-center p-2 bg-white/5 rounded">
          <span className="text-white">🛒 DevOps Hub</span>
          <span className="text-yellow-400 font-semibold">{analytics.serviceClicks.devopsHub}</span>
        </div>
        <div className="flex justify-between items-center p-2 bg-white/5 rounded">
          <span className="text-white">🛒 E-Commerce</span>
          <span className="text-orange-400 font-semibold">{analytics.serviceClicks.ecommerce}</span>
        </div>
      </div>
    </Card>
  );
};

export default VisitorAnalytics;
