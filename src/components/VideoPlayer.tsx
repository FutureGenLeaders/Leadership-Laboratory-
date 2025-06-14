
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Play, 
  Pause, 
  BookmarkPlus, 
  Download, 
  PenTool,
  Clock
} from "lucide-react";

interface VideoPlayerProps {
  video: {
    id: string;
    title: string;
    duration: string;
    description: string;
    level: number;
    progress?: number;
    thumbnailUrl?: string;
  };
  onBookmark?: (timestamp: string, note: string) => void;
}

const VideoPlayer = ({ video, onBookmark }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [currentNote, setCurrentNote] = useState('');
  const [progress, setProgress] = useState(video.progress || 0);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleAddNote = () => {
    if (currentNote.trim() && onBookmark) {
      onBookmark('5:23', currentNote); // Mock timestamp
      setCurrentNote('');
    }
  };

  const getLevelColor = (level: number) => {
    switch (level) {
      case 1: return '#3B82F6';
      case 2: return '#EAB308'; 
      case 3: return '#DC2626';
      default: return '#E0B848';
    }
  };

  const getLevelName = (level: number) => {
    switch (level) {
      case 1: return 'Strategic Focus';
      case 2: return 'Advanced Leadership';
      case 3: return 'Mastery Mode';
      default: return 'All Levels';
    }
  };

  return (
    <Card className="bg-gradient-to-br from-black via-gray-900 to-black border" style={{ borderColor: 'rgba(173, 30, 45, 0.3)' }}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl" style={{ color: '#E0B848' }}>
            {video.title}
          </CardTitle>
          <Badge style={{ 
            backgroundColor: `${getLevelColor(video.level)}20`, 
            color: getLevelColor(video.level),
            borderColor: `${getLevelColor(video.level)}40`
          }}>
            {getLevelName(video.level)}
          </Badge>
        </div>
        <div className="flex items-center gap-2 text-sm" style={{ color: '#C9D5DD' }}>
          <Clock className="w-4 h-4" />
          <span>{video.duration}</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Video Player Area */}
        <div className="relative aspect-video bg-black rounded-lg border border-gray-700 flex items-center justify-center">
          <Button
            onClick={handlePlayPause}
            size="lg"
            className="text-black"
            style={{ background: 'linear-gradient(to right, #E0B848, #B08B18)' }}
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <Progress value={progress} className="w-full" />
          <p className="text-sm text-center" style={{ color: '#C9D5DD' }}>
            {progress}% Complete
          </p>
        </div>

        {/* Video Controls */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              style={{ 
                backgroundColor: 'rgba(224, 184, 72, 0.1)', 
                borderColor: 'rgba(224, 184, 72, 0.3)',
                color: '#E0B848'
              }}
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowNotes(!showNotes)}
              style={{ 
                backgroundColor: 'rgba(173, 30, 45, 0.1)', 
                borderColor: 'rgba(173, 30, 45, 0.3)',
                color: '#AD1E2D'
              }}
            >
              <PenTool className="w-4 h-4 mr-2" />
              Notes
            </Button>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            style={{ 
              backgroundColor: 'rgba(201, 213, 221, 0.1)', 
              borderColor: 'rgba(201, 213, 221, 0.3)',
              color: '#C9D5DD'
            }}
          >
            <BookmarkPlus className="w-4 h-4 mr-2" />
            Bookmark
          </Button>
        </div>

        {/* Notes Section */}
        {showNotes && (
          <div className="rounded-lg p-4 border space-y-3" style={{ 
            backgroundColor: 'rgba(0, 0, 0, 0.3)', 
            borderColor: 'rgba(173, 30, 45, 0.2)' 
          }}>
            <h4 className="font-semibold" style={{ color: '#E0B848' }}>Session Notes</h4>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add a note at current timestamp..."
                value={currentNote}
                onChange={(e) => setCurrentNote(e.target.value)}
                className="flex-1 px-3 py-2 rounded border bg-black text-white border-gray-600"
                style={{ color: '#C9D5DD' }}
              />
              <Button 
                onClick={handleAddNote}
                size="sm"
                className="text-black"
                style={{ background: 'linear-gradient(to right, #E0B848, #B08B18)' }}
              >
                Add
              </Button>
            </div>
          </div>
        )}

        {/* Description */}
        <div className="rounded-lg p-4 border" style={{ 
          backgroundColor: 'rgba(0, 0, 0, 0.2)', 
          borderColor: 'rgba(173, 30, 45, 0.1)' 
        }}>
          <p style={{ color: '#BDBBBB' }}>{video.description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoPlayer;
