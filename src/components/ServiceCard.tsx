
import React from 'react';
import { Card } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick: () => void;
  color: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon: Icon, onClick, color }) => {
  return (
    <Card 
      className="glass-card p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:bg-white/15 group border-white/20"
      onClick={onClick}
    >
      <div className="flex items-center space-x-4 mb-4">
        <div className={`p-3 rounded-lg bg-gradient-to-r ${color} group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white group-hover:text-blue-200 transition-colors">
            {title}
          </h3>
          <p className="text-white/70 text-sm">{description}</p>
        </div>
      </div>
      <div className="text-white/60 text-sm group-hover:text-white/80 transition-colors">
        Click to access →
      </div>
    </Card>
  );
};

export default ServiceCard;
