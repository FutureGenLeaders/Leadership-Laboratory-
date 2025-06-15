import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import VideoPlayer from './VideoPlayer';
import ContentLock from './ContentLock';
import { useDripContent } from '../hooks/useDripContent';
import { 
  Calendar, 
  Play, 
  Clock,
  Star,
  ChevronLeft,
  ChevronRight,
  Users
} from "lucide-react";

const MondayMastery = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const { currentWeek, isContentAvailable, getContentStatus, getNextReleaseDate, formatTimeUntilRelease } = useDripContent();

  const weeklyVideos = [
    {
      id: '1',
      title: 'Nervous System Foundations',
      duration: '6:42',
      description: 'Understanding how your nervous system impacts every leadership decision and team interaction.',
      level: 1,
      progress: 100,
      weekNumber: 1,
      theme: 'Foundations'
    },
    {
      id: '2', 
      title: 'Regulation Under Pressure',
      duration: '7:15',
      description: 'Master the art of staying regulated when everything around you is in chaos.',
      level: 1,
      progress: 85,
      weekNumber: 2,
      theme: 'Self-Regulation'
    },
    {
      id: '3',
      title: 'Leading Through Team Stress',
      duration: '5:58',
      description: 'How to recognize and respond to team dysregulation with compassionate leadership.',
      level: 2,
      progress: 60,
      weekNumber: 3,
      theme: 'Team Leadership'
    },
    {
      id: '4',
      title: 'Decision Making from Clarity',
      duration: '8:12',
      description: 'Make strategic decisions from a regulated nervous system rather than reactive fear.',
      level: 2,
      progress: 0,
      weekNumber: 4,
      theme: 'Strategic Clarity'
    },
    {
      id: '5',
      title: 'Conflict as Connection',
      duration: '9:33',
      description: 'Transform workplace conflict into deeper understanding and stronger teams.',
      level: 2,
      progress: 0,
      weekNumber: 5,
      theme: 'Conflict Resolution'
    },
    {
      id: '6',
      title: 'Sustainable Leadership Pace',
      duration: '7:45',
      description: 'Build leadership practices that sustain your energy rather than deplete it.',
      level: 3,
      progress: 0,
      weekNumber: 6,
      theme: 'Sustainability'
    }
  ];

  const handleVideoSelect = (videoId: string) => {
    setSelectedVideo(videoId);
  };

  const handleBookmark = (timestamp: string, note: string) => {
    console.log('Bookmarked:', timestamp, note);
  };

  if (selectedVideo) {
    const video = weeklyVideos.find(v => v.id === selectedVideo);
    if (!video) return null;

    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-4">
        <div className="container mx-auto max-w-4xl">
          <Button 
            variant="ghost" 
            onClick={() => setSelectedVideo(null)}
            className="mb-6"
            style={{ color: '#C9D5DD' }}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Monday Mastery
          </Button>
          
          <VideoPlayer 
            video={video} 
            onBookmark={handleBookmark}
          />
        </div>
      </div>
    );
  }

  const availableVideos = weeklyVideos.filter(video => isContentAvailable(video.weekNumber));
  const lockedVideos = weeklyVideos.filter(video => !isContentAvailable(video.weekNumber));

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Sacred Geometry Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 border border-yellow-400 rotate-45 animate-pulse" style={{ borderColor: '#E0B848' }}></div>
        <div className="absolute top-40 right-32 w-24 h-24 border border-red-500 rounded-full animate-pulse delay-1000" style={{ borderColor: '#AD1E2D' }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r bg-clip-text text-transparent"
              style={{ background: `linear-gradient(to right, #E0B848, #B08B18, #E0B848)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Monday Mastery
          </h1>
          <h2 className="text-2xl font-semibold mb-4" style={{ color: '#C9D5DD' }}>
            Weekly Leadership Wisdom Series
          </h2>
          <p className="text-lg max-w-2xl mx-auto mb-6" style={{ color: '#BDBBBB' }}>
            Transform your leadership through weekly neuroscience-based insights, released gradually to prevent overwhelm and ensure deep integration.
          </p>
          
          {/* Progress Indicator */}
          <Card className="max-w-md mx-auto border" style={{ 
            background: 'linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(224, 184, 72, 0.1))', 
            borderColor: 'rgba(224, 184, 72, 0.3)' 
          }}>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="w-5 h-5 mr-2" style={{ color: '#E0B848' }} />
                <span className="font-semibold" style={{ color: '#E0B848' }}>Week {currentWeek} Active</span>
              </div>
              <p className="text-sm" style={{ color: '#C9D5DD' }}>
                {availableVideos.length} of {weeklyVideos.length} modules unlocked
              </p>
              <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                <div 
                  className="h-2 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${(availableVideos.length / weeklyVideos.length) * 100}%`,
                    background: 'linear-gradient(to right, #E0B848, #B08B18)'
                  }}
                ></div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Available Videos */}
        {availableVideos.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 text-center" style={{ color: '#E0B848' }}>
              Available Now
            </h3>
            <div className="grid gap-6">
              {availableVideos.map((video) => (
                <Card 
                  key={video.id}
                  className="group hover:scale-[1.02] transition-all duration-300 cursor-pointer border"
                  style={{ 
                    background: 'linear-gradient(to bottom right, rgba(0, 0, 0, 0.8), rgba(173, 30, 45, 0.1))',
                    borderColor: 'rgba(173, 30, 45, 0.2)' 
                  }}
                  onClick={() => handleVideoSelect(video.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 rounded-full bg-gradient-to-r from-red-500 to-red-600">
                            <Play className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold group-hover:text-yellow-300 transition-colors" style={{ color: '#C9D5DD' }}>
                              {video.title}
                            </h3>
                            <div className="flex items-center gap-4 text-sm" style={{ color: '#BDBBBB' }}>
                              <span className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {video.duration}
                              </span>
                              <span className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {video.releaseDate}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <p className="mb-4" style={{ color: '#BDBBBB' }}>
                          {video.description}
                        </p>

                        {video.progress > 0 && (
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm" style={{ color: '#C9D5DD' }}>
                              <span>Progress</span>
                              <span>{video.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                              <div 
                                className="h-2 rounded-full transition-all duration-300"
                                style={{ 
                                  width: `${video.progress}%`,
                                  background: 'linear-gradient(to right, #E0B848, #B08B18)'
                                }}
                              ></div>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <Badge style={{ 
                          backgroundColor: 'rgba(224, 184, 72, 0.2)', 
                          color: '#E0B848', 
                          borderColor: 'rgba(224, 184, 72, 0.3)' 
                        }}>
                          {video.theme}
                        </Badge>
                        <Badge style={{ 
                          backgroundColor: `${video.level === 1 ? '#3B82F6' : video.level === 2 ? '#EAB308' : '#DC2626'}20`, 
                          color: video.level === 1 ? '#3B82F6' : video.level === 2 ? '#EAB308' : '#DC2626',
                          borderColor: `${video.level === 1 ? '#3B82F6' : video.level === 2 ? '#EAB308' : '#DC2626'}40`
                        }}>
                          Level {video.level}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Upcoming/Locked Content */}
        {lockedVideos.length > 0 && (
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-6 text-center" style={{ color: '#6B7280' }}>
              Coming Soon
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {lockedVideos.slice(0, 4).map((video) => (
                <ContentLock
                  key={video.id}
                  title={video.title}
                  weekNumber={video.weekNumber}
                  releaseDate={getNextReleaseDate(video.weekNumber)}
                  timeUntilRelease={formatTimeUntilRelease(video.weekNumber)}
                  description={video.description}
                />
              ))}
            </div>
          </div>
        )}

        {/* Drip Content Explanation */}
        <Card className="border" style={{ 
          background: 'linear-gradient(to bottom right, rgba(0, 0, 0, 0.8), rgba(224, 184, 72, 0.1))',
          borderColor: 'rgba(224, 184, 72, 0.3)' 
        }}>
          <CardHeader>
            <CardTitle className="text-center text-xl" style={{ color: '#E0B848' }}>
              Why Weekly Release?
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p style={{ color: '#C9D5DD' }}>
              Leadership transformation requires time for integration. Each weekly module builds on the previous, 
              allowing your nervous system to adapt and embody new patterns before moving forward.
            </p>
            <p className="text-sm" style={{ color: '#BDBBBB' }}>
              This pacing prevents overwhelm and ensures sustainable, lasting change in how you lead.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MondayMastery;
