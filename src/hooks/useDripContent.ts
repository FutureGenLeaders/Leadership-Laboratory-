
import { useState, useEffect } from 'react';

export interface DripContentItem {
  id: string;
  title: string;
  description: string;
  weekNumber: number;
  isAvailable: boolean;
  releaseDate: Date;
  type: 'video' | 'masterclass' | 'session' | 'principle';
}

// Mock enrollment date - in real app this would come from user data
const ENROLLMENT_DATE = new Date('2024-06-01'); // Simulating user enrolled June 1st

export const useDripContent = () => {
  const [currentWeek, setCurrentWeek] = useState(1);

  useEffect(() => {
    const now = new Date();
    const timeDiff = now.getTime() - ENROLLMENT_DATE.getTime();
    const weeksDiff = Math.floor(timeDiff / (1000 * 3600 * 24 * 7)) + 1;
    setCurrentWeek(Math.max(1, weeksDiff));
  }, []);

  const isContentAvailable = (weekNumber: number): boolean => {
    return weekNumber <= currentWeek;
  };

  const getContentStatus = (weekNumber: number) => {
    if (weekNumber < currentWeek) return 'completed';
    if (weekNumber === currentWeek) return 'current';
    return 'locked';
  };

  const getNextReleaseDate = (weekNumber: number): Date => {
    const releaseDate = new Date(ENROLLMENT_DATE);
    releaseDate.setDate(releaseDate.getDate() + (weekNumber - 1) * 7);
    return releaseDate;
  };

  const formatTimeUntilRelease = (weekNumber: number): string => {
    if (weekNumber <= currentWeek) return '';
    
    const releaseDate = getNextReleaseDate(weekNumber);
    const now = new Date();
    const timeDiff = releaseDate.getTime() - now.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    if (daysDiff === 1) return 'Unlocks tomorrow';
    if (daysDiff <= 7) return `Unlocks in ${daysDiff} days`;
    
    const weeksDiff = Math.ceil(daysDiff / 7);
    return `Unlocks in ${weeksDiff} weeks`;
  };

  return {
    currentWeek,
    isContentAvailable,
    getContentStatus,
    getNextReleaseDate,
    formatTimeUntilRelease
  };
};
