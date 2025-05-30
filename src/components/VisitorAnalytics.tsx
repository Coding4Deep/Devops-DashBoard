
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';

interface AnalyticsData {
  totalVisits: number;
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

  // Calculate total visits as sum of all clicks
  const calculateTotalVisits = (portfolioClicks: number, serviceClicks: any) => {
    const serviceTotal = Object.values(serviceClicks).reduce((sum: number, clicks: any) => sum + clicks, 0);
    return portfolioClicks + serviceTotal;
  };

  // Initialize analytics from localStorage
  useEffect(() => {
    const initializeAnalytics = () => {
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

      const totalVisits = calculateTotalVisits(portfolioClicks, serviceClicks);

      setAnalytics({
        totalVisits,
        portfolioClicks,
        serviceClicks
      });
    };

    initializeAnalytics();

    // Listen for click events
    const handlePortfolioClick = () => {
      const clicks = parseInt(localStorage.getItem('devops_portfolio_clicks') || '0') + 1;
      localStorage.setItem('devops_portfolio_clicks', clicks.toString());
      
      const serviceClicks = {
        taskManager: parseInt(localStorage.getItem('devops_task_manager_clicks') || '0'),
        dockerOptimizer: parseInt(localStorage.getItem('devops_docker_optimizer_clicks') || '0'),
        devopsHub: parseInt(localStorage.getItem('devops_hub_clicks') || '0'),
        ecommerce: parseInt(localStorage.getItem('devops_ecommerce_clicks') || '0'),
        futureTool1: parseInt(localStorage.getItem('devops_future_tool1_clicks') || '0'),
        futureTool2: parseInt(localStorage.getItem('devops_future_tool2_clicks') || '0')
      };
      
      setAnalytics(prev => ({ 
        ...prev, 
        portfolioClicks: clicks,
        totalVisits: calculateTotalVisits(clicks, serviceClicks)
      }));
    };

    const handleServiceClick = (serviceName: string) => {
      const key = `devops_${serviceName}_clicks`;
      const clicks = parseInt(localStorage.getItem(key) || '0') + 1;
      localStorage.setItem(key, clicks.toString());
      
      const portfolioClicks = parseInt(localStorage.getItem('devops_portfolio_clicks') || '0');
      const updatedServiceClicks = {
        taskManager: parseInt(localStorage.getItem('devops_task_manager_clicks') || '0'),
        dockerOptimizer: parseInt(localStorage.getItem('devops_docker_optimizer_clicks') || '0'),
        devopsHub: parseInt(localStorage.getItem('devops_hub_clicks') || '0'),
        ecommerce: parseInt(localStorage.getItem('devops_ecommerce_clicks') || '0'),
        futureTool1: parseInt(localStorage.getItem('devops_future_tool1_clicks') || '0'),
        futureTool2: parseInt(localStorage.getItem('devops_future_tool2_clicks') || '0')
      };
      
      setAnalytics(prev => ({
        ...prev,
        serviceClicks: updatedServiceClicks,
        totalVisits: calculateTotalVisits(portfolioClicks, updatedServiceClicks)
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
    <Card className="glass-card p-6 animate-float dark:bg-gray-800/50" style={{ animationDelay: '1s' }}>
      <h3 className="text-2xl font-bold text-white dark:text-gray-100 mb-6">Live Visitor Analytics</h3>
      
      <div className="text-center mb-6">
        <div className="text-4xl font-bold text-blue-400 dark:text-blue-300 mb-1">
          {analytics.totalVisits.toLocaleString()}
        </div>
        <div className="text-white/80 dark:text-gray-300">Total Visits</div>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center p-2 bg-white/5 dark:bg-gray-700/30 rounded">
          <span className="text-white dark:text-gray-200">📝 Portfolio Clicks</span>
          <span className="text-blue-400 dark:text-blue-300 font-semibold">{analytics.portfolioClicks}</span>
        </div>
        <div className="flex justify-between items-center p-2 bg-white/5 dark:bg-gray-700/30 rounded">
          <span className="text-white dark:text-gray-200">⚙️ Task Manager</span>
          <span className="text-purple-400 dark:text-purple-300 font-semibold">{analytics.serviceClicks.taskManager}</span>
        </div>
        <div className="flex justify-between items-center p-2 bg-white/5 dark:bg-gray-700/30 rounded">
          <span className="text-white dark:text-gray-200">🚀 Docker Optimizer</span>
          <span className="text-green-400 dark:text-green-300 font-semibold">{analytics.serviceClicks.dockerOptimizer}</span>
        </div>
        <div className="flex justify-between items-center p-2 bg-white/5 dark:bg-gray-700/30 rounded">
          <span className="text-white dark:text-gray-200">🛠️ DevOps Hub</span>
          <span className="text-yellow-400 dark:text-yellow-300 font-semibold">{analytics.serviceClicks.devopsHub}</span>
        </div>
        <div className="flex justify-between items-center p-2 bg-white/5 dark:bg-gray-700/30 rounded">
          <span className="text-white dark:text-gray-200">🛒 E-Commerce</span>
          <span className="text-orange-400 dark:text-orange-300 font-semibold">{analytics.serviceClicks.ecommerce}</span>
        </div>
      </div>
    </Card>
  );
};

export default VisitorAnalytics;
