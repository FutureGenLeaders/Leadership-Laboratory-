
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import VideoPlayer from './VideoPlayer';
import { 
  GraduationCap, 
  Clock,
  Star,
  ChevronLeft,
  Shield,
  Zap,
  Users,
  Target
} from "lucide-react";

const MasterclassLibrary = () => {
  const [selectedMasterclass, setSelectedMasterclass] = useState<string | null>(null);

  const masterclasses = [
    {
      id: '1',
      title: 'Pressure Into Performance',
      duration: '18:42',
      description: 'Master the core transformation methodology that converts organizational pressure into breakthrough performance. Learn the neural rewiring techniques used by Fortune 500 executives.',
      level: 1,
      progress: 0,
      icon: Target,
      color: 'from-blue-500 to-blue-600',
      difficulty: 'Foundation',
      keyTakeaways: [
        'The Pressure-Performance Paradox Framework',
        'Neural rewiring techniques for stress transformation', 
        'Strategic breathing protocols for decision clarity',
        'Real-time pressure calibration methods'
      ]
    },
    {
      id: '2',
      title: 'The Antifragile Executive',
      duration: '22:15',
      description: 'Build resilience frameworks that make you stronger through chaos. Advanced methodologies for turning organizational volatility into strategic advantage.',
      level: 2,
      progress: 60,
      icon: Shield,
      color: 'from-green-500 to-green-600',
      difficulty: 'Advanced',
      keyTakeaways: [
        'Antifragility principles for executive leadership',
        'Chaos navigation and strategic opportunism',
        'Building organizational immune systems',
        'Volatility as competitive advantage'
      ]
    },
    {
      id: '3',
      title: 'Crisis Leadership Mastery',
      duration: '25:33',
      description: 'Lead through organizational chaos with unshakeable presence. The complete methodology for crisis transformation and team stabilization.',
      level: 2,
      progress: 100,
      icon: Zap,
      color: 'from-red-500 to-red-600',
      difficulty: 'Advanced',
      keyTakeaways: [
        'Crisis leadership decision frameworks',
        'Team stabilization under extreme pressure',
        'Communication protocols for uncertainty',
        'Strategic pivoting during organizational chaos'
      ]
    },
    {
      id: '4',
      title: 'Team Conflict Alchemy',
      duration: '19:58',
      description: 'Transform team tensions into breakthrough collaboration. The advanced art of converting organizational friction into innovation fuel.',
      level: 3,
      progress: 25,
      icon: Users,
      color: 'from-purple-500 to-purple-600',
      difficulty: 'Mastery',
      keyTakeaways: [
        'Conflict as innovation catalyst',
        'Sacred tension transformation techniques',
        'Team consciousness elevation protocols',
        'Breakthrough collaboration architectures'
      ]
    }
  ];

  const handleMasterclassSelect = (masterclassId: string) => {
    setSelectedMasterclass(masterclassId);
  };

  const handleBookmark = (timestamp: string, note: string) => {
    console.log('Masterclass bookmarked:', timestamp, note);
  };

  if (selectedMasterclass) {
    const masterclass = masterclasses.find(m => m.id === selectedMasterclass);
    if (!masterclass) return null;

    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-4">
        <div className="container mx-auto max-w-4xl">
          <Button 
            variant="ghost" 
            onClick={() => setSelectedMasterclass(null)}
            className="mb-6"
            style={{ color: '#C9D5DD' }}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Masterclass Library
          </Button>
          
          <VideoPlayer 
            video={masterclass} 
            onBookmark={handleBookmark}
          />

          {/* Key Takeaways */}
          <Card className="mt-6 border" style={{ 
            background: 'linear-gradient(to bottom right, rgba(0, 0, 0, 0.8), rgba(173, 30, 45, 0.1))',
            borderColor: 'rgba(173, 30, 45, 0.2)' 
          }}>
            <CardHeader>
              <CardTitle style={{ color: '#E0B848' }}>Key Takeaways</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {masterclass.keyTakeaways.map((takeaway, index) => (
                  <li key={index} className="flex items-start" style={{ color: '#C9D5DD' }}>
                    <Star className="w-4 h-4 mr-2 mt-1 flex-shrink-0" style={{ color: '#E0B848' }} />
                    {takeaway}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Sacred Geometry Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 border border-yellow-400 rotate-45 animate-pulse" style={{ borderColor: '#E0B848' }}></div>
        <div className="absolute bottom-32 right-1/3 w-28 h-28 border border-red-500 transform rotate-12 animate-pulse delay-2000" style={{ borderColor: '#AD1E2D' }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <GraduationCap className="w-12 h-12 mr-3" style={{ color: '#E0B848' }} />
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r bg-clip-text text-transparent"
                style={{ background: `linear-gradient(to right, #E0B848, #B08B18, #E0B848)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Masterclass Library
            </h1>
            <GraduationCap className="w-12 h-12 ml-3" style={{ color: '#E0B848' }} />
          </div>
          <h2 className="text-2xl font-semibold mb-4" style={{ color: '#C9D5DD' }}>
            Deep-Dive Leadership Transformation
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#BDBBBB' }}>
            Comprehensive masterclasses designed to fundamentally transform your leadership approach through advanced frameworks and breakthrough methodologies.
          </p>
        </div>

        {/* Masterclass Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {masterclasses.map((masterclass) => {
            const IconComponent = masterclass.icon;
            return (
              <Card 
                key={masterclass.id}
                className="group hover:scale-105 transition-all duration-300 cursor-pointer border h-full"
                style={{ 
                  background: 'linear-gradient(to bottom right, rgba(0, 0, 0, 0.8), rgba(173, 30, 45, 0.1))',
                  borderColor: 'rgba(173, 30, 45, 0.2)' 
                }}
                onClick={() => handleMasterclassSelect(masterclass.id)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-full bg-gradient-to-r ${masterclass.color}`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Badge style={{ 
                        backgroundColor: 'rgba(224, 184, 72, 0.2)', 
                        color: '#E0B848', 
                        borderColor: 'rgba(224, 184, 72, 0.3)' 
                      }}>
                        {masterclass.difficulty}
                      </Badge>
                      <Badge style={{ 
                        backgroundColor: `${masterclass.level === 1 ? '#3B82F6' : masterclass.level === 2 ? '#EAB308' : '#DC2626'}20`, 
                        color: masterclass.level === 1 ? '#3B82F6' : masterclass.level === 2 ? '#EAB308' : '#DC2626',
                        borderColor: `${masterclass.level === 1 ? '#3B82F6' : masterclass.level === 2 ? '#EAB308' : '#DC2626'}40`
                      }}>
                        Level {masterclass.level}
                      </Badge>
                    </div>
                  </div>

                  <CardTitle className="text-xl group-hover:text-yellow-300 transition-colors mb-2" style={{ color: '#C9D5DD' }}>
                    {masterclass.title}
                  </CardTitle>
                  
                  <div className="flex items-center text-sm mb-3" style={{ color: '#BDBBBB' }}>
                    <Clock className="w-4 h-4 mr-2" />
                    {masterclass.duration}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p style={{ color: '#BDBBBB' }}>
                    {masterclass.description}
                  </p>

                  {masterclass.progress > 0 && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm" style={{ color: '#C9D5DD' }}>
                        <span>Progress</span>
                        <span>{masterclass.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full transition-all duration-300"
                          style={{ 
                            width: `${masterclass.progress}%`,
                            background: 'linear-gradient(to right, #E0B848, #B08B18)'
                          }}
                        ></div>
                      </div>
                    </div>
                  )}

                  <div className="rounded-lg p-3 border" style={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.2)', 
                    borderColor: 'rgba(173, 30, 45, 0.1)' 
                  }}>
                    <p className="text-sm font-medium mb-2" style={{ color: '#C9D5DD' }}>Key Frameworks:</p>
                    <ul className="text-sm space-y-1">
                      {masterclass.keyTakeaways.slice(0, 2).map((takeaway, index) => (
                        <li key={index} className="flex items-start" style={{ color: '#BDBBBB' }}>
                          <Star className="w-3 h-3 mr-2 mt-0.5 flex-shrink-0" style={{ color: '#E0B848' }} />
                          {takeaway}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MasterclassLibrary;
