import { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'primary' | 'secondary' | 'accent' | 'destructive';
}

const StatCard = ({ title, value, icon, trend, color = 'primary' }: StatCardProps) => {
  const colorClasses = {
    primary: 'bg-primary/10 text-primary',
    secondary: 'bg-secondary/50 text-secondary-foreground',
    accent: 'bg-accent text-accent-foreground',
    destructive: 'bg-destructive/10 text-destructive',
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">{title}</p>
              <p className="text-3xl font-bold">{value}</p>
              {trend && (
                <p
                  className={`text-sm mt-1 ${
                    trend.isPositive ? 'text-green-600' : 'text-destructive'
                  }`}
                >
                  {trend.isPositive ? '+' : ''}{trend.value}% from last month
                </p>
              )}
            </div>
            <div className={`p-4 rounded-full ${colorClasses[color]}`}>
              {icon}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StatCard;
