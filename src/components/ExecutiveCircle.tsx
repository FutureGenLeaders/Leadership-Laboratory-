
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Calendar,
  Clock,
  Video,
  MessageCircle,
  Shield,
  Star,
  CheckCircle,
  AlertCircle
} from "lucide-react";

const ExecutiveCircle = () => {
  const [hasSubmittedChallenge, setHasSubmittedChallenge] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState('');

  const upcomingSession = {
    date: 'Every Wednesday',
    time: '2:00 PM EST',
    duration: '60 minutes',
    topic: 'Crisis Leadership Under Pressure',
    participantCount: 12,
    maxParticipants: 15,
    status: 'Open'
  };

  const recentSessions = [
    {
      id: '1',
      topic: 'Team Conflict Transformation',
      date: 'Dec 11, 2024',
      keyInsights: [
        'Sacred tension as innovation catalyst',
        'Converting friction into breakthrough energy',
        'Anonymous feedback protocols for sensitive discussions'
      ],
      recordingAvailable: true,
      attended: true
    },
    {
      id: '2', 
      topic: 'Strategic Decision Architecture',
      date: 'Dec 4, 2024',
      keyInsights: [
        'Decision-making under incomplete information',
        'Pressure calibration for optimal judgment',
        'Building antifragile choice frameworks'
      ],
      recordingAvailable: true,
      attended: false
    }
  ];

  const handleJoinSession = () => {
    // Mock Zoom integration
    console.log('Launching Zoom session...');
  };

  const handleSubmitChallenge = () => {
    if (currentChallenge.trim()) {
      setHasSubmittedChallenge(true);
      setCurrentChallenge('');
    }
  };

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
          <div className="flex items-center justify-center mb-4">
            <Users className="w-12 h-12 mr-3" style={{ color: '#E0B848' }} />
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r bg-clip-text text-transparent"
                style={{ background: `linear-gradient(to right, #E0B848, #B08B18, #E0B848)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Executive Circle
            </h1>
            <Users className="w-12 h-12 ml-3" style={{ color: '#E0B848' }} />
          </div>
          <h2 className="text-2xl font-semibold mb-4" style={{ color: '#C9D5DD' }}>
            Weekly Group Coaching for Elite Leaders
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#BDBBBB' }}>
            Join an intimate circle of high-performing executives for weekly strategic coaching sessions. Maximum 15 participants for personalized attention and breakthrough insights.
          </p>
        </div>

        {/* Next Session Card */}
        <Card className="mb-8 bg-gradient-to-r border" style={{ 
          background: 'linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(224, 184, 72, 0.1))', 
          borderColor: 'rgba(224, 184, 72, 0.3)' 
        }}>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center justify-center" style={{ color: '#E0B848' }}>
              <Calendar className="w-6 h-6 mr-2" />
              Next Executive Circle Session
              <Calendar className="w-6 h-6 ml-2" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span style={{ color: '#C9D5DD' }}>Schedule:</span>
                  <Badge style={{ 
                    backgroundColor: 'rgba(224, 184, 72, 0.2)', 
                    color: '#E0B848', 
                    borderColor: 'rgba(224, 184, 72, 0.3)' 
                  }}>
                    {upcomingSession.date}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span style={{ color: '#C9D5DD' }}>Time:</span>
                  <span style={{ color: '#E0B848' }}>{upcomingSession.time}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span style={{ color: '#C9D5DD' }}>Duration:</span>
                  <span style={{ color: '#C9D5DD' }}>{upcomingSession.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span style={{ color: '#C9D5DD' }}>Participants:</span>
                  <span style={{ color: upcomingSession.participantCount >= upcomingSession.maxParticipants ? '#AD1E2D' : '#E0B848' }}>
                    {upcomingSession.participantCount}/{upcomingSession.maxParticipants}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold" style={{ color: '#E0B848' }}>
                  This Week's Focus: {upcomingSession.topic}
                </h3>
                <p style={{ color: '#BDBBBB' }}>
                  Master the art of leading through organizational chaos with unshakeable presence. We'll explore decision-making frameworks for crisis situations and team stabilization protocols.
                </p>
              </div>
            </div>

            <div className="flex justify-center">
              <Button 
                onClick={handleJoinSession}
                className="font-semibold text-lg py-6 px-8 text-black"
                style={{ background: 'linear-gradient(to right, #E0B848, #B08B18)' }}
              >
                <Video className="w-5 h-5 mr-2" />
                Join Executive Circle
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Pre-Session Challenge Submission */}
        <Card className="mb-8 border" style={{ 
          background: 'linear-gradient(to bottom right, rgba(0, 0, 0, 0.8), rgba(173, 30, 45, 0.1))',
          borderColor: 'rgba(173, 30, 45, 0.2)' 
        }}>
          <CardHeader>
            <CardTitle className="flex items-center" style={{ color: '#E0B848' }}>
              <MessageCircle className="w-6 h-6 mr-2" />
              Pre-Session Strategic Challenge
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {!hasSubmittedChallenge ? (
              <>
                <p style={{ color: '#C9D5DD' }}>
                  Submit your current leadership challenge for potential discussion during this week's session. All submissions are anonymous and optional.
                </p>
                <div className="space-y-3">
                  <textarea
                    placeholder="Describe a current leadership challenge you're facing (optional, anonymous)..."
                    value={currentChallenge}
                    onChange={(e) => setCurrentChallenge(e.target.value)}
                    className="w-full h-24 px-4 py-3 rounded border bg-black text-white border-gray-600 resize-none"
                    style={{ color: '#C9D5DD' }}
                  />
                  <Button 
                    onClick={handleSubmitChallenge}
                    disabled={!currentChallenge.trim()}
                    className="text-black"
                    style={{ background: 'linear-gradient(to right, #E0B848, #B08B18)' }}
                  >
                    Submit Challenge
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex items-center p-4 rounded-lg border" style={{ 
                backgroundColor: 'rgba(34, 197, 94, 0.1)', 
                borderColor: 'rgba(34, 197, 94, 0.3)',
                color: '#22C55E'
              }}>
                <CheckCircle className="w-5 h-5 mr-2" />
                Challenge submitted successfully. Thank you for your contribution to the circle.
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Sessions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#E0B848' }}>
            Recent Executive Circle Sessions
          </h2>
          
          <div className="space-y-4">
            {recentSessions.map((session) => (
              <Card 
                key={session.id}
                className="border"
                style={{ 
                  background: 'linear-gradient(to bottom right, rgba(0, 0, 0, 0.8), rgba(173, 30, 45, 0.1))',
                  borderColor: 'rgba(173, 30, 45, 0.2)' 
                }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-2" style={{ color: '#C9D5DD' }}>
                        {session.topic}
                      </h3>
                      <div className="flex items-center text-sm" style={{ color: '#BDBBBB' }}>
                        <Calendar className="w-4 h-4 mr-2" />
                        {session.date}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {session.attended && (
                        <Badge style={{ 
                          backgroundColor: 'rgba(34, 197, 94, 0.2)', 
                          color: '#22C55E', 
                          borderColor: 'rgba(34, 197, 94, 0.3)' 
                        }}>
                          Attended
                        </Badge>
                      )}
                      {session.recordingAvailable && (
                        <Badge style={{ 
                          backgroundColor: 'rgba(224, 184, 72, 0.2)', 
                          color: '#E0B848', 
                          borderColor: 'rgba(224, 184, 72, 0.3)' 
                        }}>
                          Recording Available
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="rounded-lg p-4 border" style={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.2)', 
                    borderColor: 'rgba(173, 30, 45, 0.1)' 
                  }}>
                    <p className="text-sm font-medium mb-3" style={{ color: '#C9D5DD' }}>Key Insights:</p>
                    <ul className="space-y-2">
                      {session.keyInsights.map((insight, index) => (
                        <li key={index} className="flex items-start text-sm" style={{ color: '#BDBBBB' }}>
                          <Star className="w-3 h-3 mr-2 mt-1 flex-shrink-0" style={{ color: '#E0B848' }} />
                          {insight}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {session.recordingAvailable && (
                    <div className="mt-4 flex justify-end">
                      <Button 
                        variant="outline"
                        size="sm"
                        style={{ 
                          backgroundColor: 'rgba(224, 184, 72, 0.1)', 
                          borderColor: 'rgba(224, 184, 72, 0.3)',
                          color: '#E0B848'
                        }}
                      >
                        <Video className="w-4 h-4 mr-2" />
                        Watch Recording
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Benefits & Guidelines */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border" style={{ 
            background: 'linear-gradient(to bottom right, rgba(0, 0, 0, 0.8), rgba(173, 30, 45, 0.1))',
            borderColor: 'rgba(173, 30, 45, 0.2)' 
          }}>
            <CardHeader>
              <CardTitle className="flex items-center" style={{ color: '#E0B848' }}>
                <Star className="w-6 h-6 mr-2" />
                Circle Benefits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start" style={{ color: '#C9D5DD' }}>
                  <CheckCircle className="w-4 h-4 mr-2 mt-1 flex-shrink-0" style={{ color: '#E0B848' }} />
                  Intimate group of maximum 15 executives
                </li>
                <li className="flex items-start" style={{ color: '#C9D5DD' }}>
                  <CheckCircle className="w-4 h-4 mr-2 mt-1 flex-shrink-0" style={{ color: '#E0B848' }} />
                  Anonymous participation for sensitive topics
                </li>
                <li className="flex items-start" style={{ color: '#C9D5DD' }}>
                  <CheckCircle className="w-4 h-4 mr-2 mt-1 flex-shrink-0" style={{ color: '#E0B848' }} />
                  Real-time strategic coaching and feedback
                </li>
                <li className="flex items-start" style={{ color: '#C9D5DD' }}>
                  <CheckCircle className="w-4 h-4 mr-2 mt-1 flex-shrink-0" style={{ color: '#E0B848' }} />
                  Session recordings available for 48 hours
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border" style={{ 
            background: 'linear-gradient(to bottom right, rgba(0, 0, 0, 0.8), rgba(173, 30, 45, 0.1))',
            borderColor: 'rgba(173, 30, 45, 0.2)' 
          }}>
            <CardHeader>
              <CardTitle className="flex items-center" style={{ color: '#E0B848' }}>
                <Shield className="w-6 h-6 mr-2" />
                Confidentiality Promise
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start" style={{ color: '#C9D5DD' }}>
                  <AlertCircle className="w-4 h-4 mr-2 mt-1 flex-shrink-0" style={{ color: '#AD1E2D' }} />
                  All discussions remain strictly confidential
                </li>
                <li className="flex items-start" style={{ color: '#C9D5DD' }}>
                  <AlertCircle className="w-4 h-4 mr-2 mt-1 flex-shrink-0" style={{ color: '#AD1E2D' }} />
                  No company-specific information sharing
                </li>
                <li className="flex items-start" style={{ color: '#C9D5DD' }}>
                  <AlertCircle className="w-4 h-4 mr-2 mt-1 flex-shrink-0" style={{ color: '#AD1E2D' }} />
                  Drop-in participation without judgment
                </li>
                <li className="flex items-start" style={{ color: '#C9D5DD' }}>
                  <AlertCircle className="w-4 h-4 mr-2 mt-1 flex-shrink-0" style={{ color: '#AD1E2D' }} />
                  Safe space for vulnerable leadership topics
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveCircle;
