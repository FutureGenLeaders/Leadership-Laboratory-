
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lock, Calendar, Clock } from "lucide-react";

interface ContentLockProps {
  title: string;
  weekNumber: number;
  releaseDate: Date;
  timeUntilRelease: string;
  description?: string;
}

const ContentLock = ({ title, weekNumber, releaseDate, timeUntilRelease, description }: ContentLockProps) => {
  return (
    <Card className="opacity-60 border-2 border-dashed" style={{ 
      background: 'linear-gradient(to bottom right, rgba(0, 0, 0, 0.6), rgba(107, 114, 128, 0.1))',
      borderColor: 'rgba(107, 114, 128, 0.3)' 
    }}>
      <CardHeader className="text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 rounded-full bg-gray-600">
            <Lock className="w-6 h-6 text-gray-300" />
          </div>
        </div>
        <CardTitle className="text-lg" style={{ color: '#9CA3AF' }}>
          {title}
        </CardTitle>
        <Badge variant="outline" style={{ 
          backgroundColor: 'rgba(107, 114, 128, 0.2)', 
          color: '#9CA3AF', 
          borderColor: 'rgba(107, 114, 128, 0.3)' 
        }}>
          Week {weekNumber}
        </Badge>
      </CardHeader>
      
      <CardContent className="text-center space-y-4">
        {description && (
          <p className="text-sm" style={{ color: '#9CA3AF' }}>
            {description}
          </p>
        )}
        
        <div className="space-y-2">
          <div className="flex items-center justify-center text-sm" style={{ color: '#9CA3AF' }}>
            <Calendar className="w-4 h-4 mr-2" />
            Releases {releaseDate.toLocaleDateString()}
          </div>
          
          <div className="flex items-center justify-center text-sm font-medium" style={{ color: '#E5E7EB' }}>
            <Clock className="w-4 h-4 mr-2" />
            {timeUntilRelease}
          </div>
        </div>
        
        <div className="text-xs" style={{ color: '#6B7280' }}>
          Content releases weekly to prevent overwhelm and ensure sustainable growth
        </div>
      </CardContent>
    </Card>
  );
};

export default ContentLock;
