
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import VideoPlayer from './VideoPlayer';
import { 
  Calendar, 
  Play, 
  Clock,
  Star,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const MondayMastery = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [currentWeek, setCurrentWeek] = useState(0);

  const weeklyVideos = [
    {
      id: '1',
      title: 'Crisis Leadership Fundamentals',
      duration: '6:42',
      description: 'Master the core principles of leading through organizational crisis with strategic clarity and unshakeable presence.',
      level: 1,
      progress: 0,
      releaseDate: 'This Week',
      theme: 'Crisis Leadership'
    },
    {
      id: '2', 
      title: 'Advanced Team Dynamics Navigation',
      duration: '7:15',
      description: 'Transform team tensions into breakthrough collaboration using advanced conflict resolution frameworks.',
      level: 2,
      progress: 85,
      releaseDate: 'Last Week',
      theme: 'Team Dynamics'
    },
    {
      id: '3',
      title: 'Mastery-Level Decision Architecture',
      duration: '5:58',
      description: 'Channel divine strategic will through business decisions that serve both organizational excellence and universal truth.',
      level: 3,
      progress: 100,
      releaseDate: '2 Weeks Ago',
      theme: 'Decision Mastery'
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
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#BDBBBB' }}>
            Transform your leadership through weekly strategic insights, frameworks, and breakthrough methodologies delivered with precision timing every Monday.
          </p>
        </div>

        {/* Current Week Highlight */}
        <Card className="mb-8 bg-gradient-to-r border" style={{ 
          background: 'linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(224, 184, 72, 0.1))', 
          borderColor: 'rgba(224, 184, 72, 0.3)' 
        }}>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl flex items-center justify-center" style={{ color: '#E0B848' }}>
              <Star className="w-6 h-6 mr-2" />
              This Week's Focus: Crisis Leadership
              <Star className="w-6 h-6 ml-2" />
            </CardTitle>
          </CardHeader>
        </Card>

        {/* Video Library */}
        <div className="grid gap-6 mb-8">
          {weeklyVideos.map((video) => (
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

        {/* Navigation */}
        <div className="flex justify-center items-center gap-4">
          <Button 
            variant="outline"
            disabled={currentWeek === 0}
            style={{ 
              backgroundColor: 'rgba(224, 184, 72, 0.1)', 
              borderColor: 'rgba(224, 184, 72, 0.3)',
              color: '#E0B848'
            }}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous Week
          </Button>
          
          <span style={{ color: '#C9D5DD' }}>Week {currentWeek + 1}</span>
          
          <Button 
            variant="outline"
            style={{ 
              backgroundColor: 'rgba(224, 184, 72, 0.1)', 
              borderColor: 'rgba(224, 184, 72, 0.3)',
              color: '#E0B848'
            }}
          >
            Next Week
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MondayMastery;
