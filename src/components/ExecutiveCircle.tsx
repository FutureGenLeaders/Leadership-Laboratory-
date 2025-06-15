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
  AlertCircle,
  Heart,
  Waves,
  Music,
  Wind
} from "lucide-react";
import ZoomMeeting from './ZoomMeeting';

const ExecutiveCircle = () => {
  const [hasSubmittedChallenge, setHasSubmittedChallenge] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState('');

  const upcomingSession = {
    date: 'Every Wednesday',
    time: '2:00 PM EST',
    duration: '90 minutes',
    topic: 'Sound Bath Integration for Crisis Leadership',
    nervousSystemFocus: 'Tibetan Bowl Meditation + Strategic Decision Making',
    participantCount: 12,
    maxParticipants: 15,
    status: 'Open'
  };

  const recentSessions = [
    {
      id: '1',
      topic: 'Breathwork for High-Stakes Negotiations',
      nervousSystemPractice: 'Box Breathing + Vagal Toning',
      date: 'Dec 11, 2024',
      keyInsights: [
        'Using breath to regulate before crucial conversations',
        'How nervous system state impacts negotiation outcomes',
        'Real-time regulation during conflict transformation'
      ],
      recordingAvailable: true,
      attended: true
    },
    {
      id: '2', 
      topic: 'Sacred Chanting for Team Coherence',
      nervousSystemPractice: 'OM Chanting + Heart Rate Variability',
      date: 'Dec 4, 2024',
      keyInsights: [
        'Sound frequency impact on group decision-making',
        'Building collective nervous system regulation',
        'Ancient practices for modern leadership presence'
      ],
      recordingAvailable: true,
      attended: false
    }
  ];

  const upcomingPractices = [
    { icon: Music, practice: 'Tibetan Sound Bowls', description: 'Frequency healing for leadership presence' },
    { icon: Wind, practice: 'Breathwork Protocols', description: 'Real-time regulation for business decisions' },
    { icon: Heart, practice: 'Heart Coherence', description: 'Optimal state for strategic thinking' },
    { icon: Waves, practice: 'Chanting & Toning', description: 'Vocal practices for leadership resonance' }
  ];

  // State for Zoom modal
  const [zoomOpen, setZoomOpen] = useState(false);
  const [meetingInfo, setMeetingInfo] = useState({
    meetingNumber: "",
    password: "",
    userName: "",
    signature: "",
    apiKey: "",
    leaveUrl: window.location.href,
  });

  // Collect Zoom meeting info via a simple form (in modal)
  const [showMeetingForm, setShowMeetingForm] = useState(false);

  const openZoomForm = () => setShowMeetingForm(true);

  const handleMeetingInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMeetingInfo({
      ...meetingInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleMeetingFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowMeetingForm(false);
    setZoomOpen(true);
  };

  const handleJoinSession = () => {
    // Mock Zoom integration
    console.log('Launching Leadership Circle session...');
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
        <div className="absolute bottom-32 left-1/3 w-16 h-16 border border-blue-400 animate-pulse delay-500" style={{ borderColor: '#3B82F6' }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Users className="w-12 h-12 mr-3" style={{ color: '#E0B848' }} />
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r bg-clip-text text-transparent"
                style={{ background: `linear-gradient(to right, #E0B848, #B08B18, #E0B848)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Leadership Circle
            </h1>
            <Heart className="w-12 h-12 ml-3" style={{ color: '#E0B848' }} />
          </div>
          <h2 className="text-2xl font-semibold mb-4" style={{ color: '#C9D5DD' }}>
            Weekly Nervous System Regulation + Strategic Business Coaching
          </h2>
          <p className="text-lg max-w-3xl mx-auto" style={{ color: '#BDBBBB' }}>
            Transform from the inside out. Join fellow leaders for weekly sessions combining ancient nervous system practices with cutting-edge business strategy. Sound bowls, breathwork, chanting, and real-world leadership challenges.
          </p>
        </div>

        {/* Nervous System Practices Preview */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {upcomingPractices.map((item, index) => (
            <Card key={index} className="text-center border" style={{ 
              background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(224, 184, 72, 0.05))',
              borderColor: 'rgba(224, 184, 72, 0.2)' 
            }}>
              <CardContent className="p-4">
                <item.icon className="w-8 h-8 mx-auto mb-2" style={{ color: '#E0B848' }} />
                <h3 className="font-semibold mb-1" style={{ color: '#C9D5DD' }}>{item.practice}</h3>
                <p className="text-xs" style={{ color: '#BDBBBB' }}>{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Next Session Card */}
        <Card className="mb-8 bg-gradient-to-r border" style={{ 
          background: 'linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(224, 184, 72, 0.1))', 
          borderColor: 'rgba(224, 184, 72, 0.3)' 
        }}>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center justify-center" style={{ color: '#E0B848' }}>
              <Music className="w-6 h-6 mr-2" />
              Next Leadership Circle Session
              <Waves className="w-6 h-6 ml-2" />
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
                <div className="rounded-lg p-3 border" style={{ 
                  backgroundColor: 'rgba(173, 30, 45, 0.1)', 
                  borderColor: 'rgba(173, 30, 45, 0.2)' 
                }}>
                  <p className="text-sm font-medium mb-1" style={{ color: '#C9D5DD' }}>Nervous System Practice:</p>
                  <p className="text-sm" style={{ color: '#BDBBBB' }}>{upcomingSession.nervousSystemFocus}</p>
                </div>
                <p style={{ color: '#BDBBBB' }}>
                  We'll begin with 20 minutes of Tibetan sound bowl meditation to regulate your nervous system, then apply that coherent state to high-pressure leadership scenarios.
                </p>
              </div>
            </div>

            <div className="flex justify-center">
              <Button 
                onClick={openZoomForm}
                className="font-semibold text-lg py-6 px-8 text-black"
                style={{ background: 'linear-gradient(to right, #E0B848, #B08B18)' }}
              >
                <Video className="w-5 h-5 mr-2" />
                Join Sacred Leadership Circle
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Show the modal form to collect meeting details */}
        {showMeetingForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
            <form
              className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
              onSubmit={handleMeetingFormSubmit}
            >
              <h3 className="text-lg font-bold mb-2">Join Zoom Meeting</h3>
              <div className="mb-2">
                <label className="block text-gray-700 font-medium mb-1">Meeting ID</label>
                <input
                  type="text"
                  name="meetingNumber"
                  className="w-full border rounded px-3 py-2"
                  required
                  value={meetingInfo.meetingNumber}
                  onChange={handleMeetingInfoChange}
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700 font-medium mb-1">Password</label>
                <input
                  type="text"
                  name="password"
                  className="w-full border rounded px-3 py-2"
                  required
                  value={meetingInfo.password}
                  onChange={handleMeetingInfoChange}
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700 font-medium mb-1">Your Name</label>
                <input
                  type="text"
                  name="userName"
                  className="w-full border rounded px-3 py-2"
                  required
                  value={meetingInfo.userName}
                  onChange={handleMeetingInfoChange}
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700 font-medium mb-1">API Key</label>
                <input
                  type="text"
                  name="apiKey"
                  className="w-full border rounded px-3 py-2"
                  required
                  value={meetingInfo.apiKey}
                  onChange={handleMeetingInfoChange}
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700 font-medium mb-1">Signature</label>
                <input
                  type="text"
                  name="signature"
                  className="w-full border rounded px-3 py-2"
                  required
                  value={meetingInfo.signature}
                  onChange={handleMeetingInfoChange}
                />
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 rounded bg-[#E0B848] text-black font-semibold"
                >
                  Join
                </button>
                <button
                  type="button"
                  className="flex-1 px-4 py-2 rounded bg-gray-200 text-gray-800 font-semibold"
                  onClick={() => setShowMeetingForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Show the ZoomMeeting modal if open */}
        {zoomOpen && (
          <ZoomMeeting
            meetingNumber={meetingInfo.meetingNumber}
            password={meetingInfo.password}
            userName={meetingInfo.userName}
            signature={meetingInfo.signature}
            apiKey={meetingInfo.apiKey}
            leaveUrl={meetingInfo.leaveUrl}
            onClose={() => setZoomOpen(false)}
          />
        )}

        {/* Pre-Session Challenge Submission */}
        <Card className="mb-8 border" style={{ 
          background: 'linear-gradient(to bottom right, rgba(0, 0, 0, 0.8), rgba(173, 30, 45, 0.1))',
          borderColor: 'rgba(173, 30, 45, 0.2)' 
        }}>
          <CardHeader>
            <CardTitle className="flex items-center" style={{ color: '#E0B848' }}>
              <MessageCircle className="w-6 h-6 mr-2" />
              Pre-Session Intention & Challenge
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {!hasSubmittedChallenge ? (
              <>
                <p style={{ color: '#C9D5DD' }}>
                  Share your current leadership challenge and set an intention for nervous system transformation. We'll weave both into the session's somatic practices and strategic discussions.
                </p>
                <div className="space-y-3">
                  <textarea
                    placeholder="Current leadership challenge + intention for nervous system regulation (optional, anonymous)..."
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
                    <Heart className="w-4 h-4 mr-2" />
                    Submit Sacred Intention
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
                Sacred intention received. Your nervous system and leadership challenge will be honored in our circle.
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Sessions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6" style={{ color: '#E0B848' }}>
            Recent Sacred Leadership Sessions
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
                      <div className="flex items-center text-sm mb-2" style={{ color: '#E0B848' }}>
                        <Waves className="w-4 h-4 mr-2" />
                        {session.nervousSystemPractice}
                      </div>
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
                    <p className="text-sm font-medium mb-3" style={{ color: '#C9D5DD' }}>Integration Insights:</p>
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
                        Experience Again
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Benefits & Sacred Container */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border" style={{ 
            background: 'linear-gradient(to bottom right, rgba(0, 0, 0, 0.8), rgba(173, 30, 45, 0.1))',
            borderColor: 'rgba(173, 30, 45, 0.2)' 
          }}>
            <CardHeader>
              <CardTitle className="flex items-center" style={{ color: '#E0B848' }}>
                <Heart className="w-6 h-6 mr-2" />
                Sacred Leadership Integration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start" style={{ color: '#C9D5DD' }}>
                  <CheckCircle className="w-4 h-4 mr-2 mt-1 flex-shrink-0" style={{ color: '#E0B848' }} />
                  Sound bowl meditation for leadership presence
                </li>
                <li className="flex items-start" style={{ color: '#C9D5DD' }}>
                  <CheckCircle className="w-4 h-4 mr-2 mt-1 flex-shrink-0" style={{ color: '#E0B848' }} />
                  Breathwork protocols for high-stakes decisions
                </li>
                <li className="flex items-start" style={{ color: '#C9D5DD' }}>
                  <CheckCircle className="w-4 h-4 mr-2 mt-1 flex-shrink-0" style={{ color: '#E0B848' }} />
                  Chanting practices for team coherence
                </li>
                <li className="flex items-start" style={{ color: '#C9D5DD' }}>
                  <CheckCircle className="w-4 h-4 mr-2 mt-1 flex-shrink-0" style={{ color: '#E0B848' }} />
                  Real-time nervous system regulation training
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
                Sacred Container Promise
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start" style={{ color: '#C9D5DD' }}>
                  <AlertCircle className="w-4 h-4 mr-2 mt-1 flex-shrink-0" style={{ color: '#AD1E2D' }} />
                  Ancient practices meet modern leadership
                </li>
                <li className="flex items-start" style={{ color: '#C9D5DD' }}>
                  <AlertCircle className="w-4 h-4 mr-2 mt-1 flex-shrink-0" style={{ color: '#AD1E2D' }} />
                  Somatic awareness for leadership transformation
                </li>
                <li className="flex items-start" style={{ color: '#C9D5DD' }}>
                  <AlertCircle className="w-4 h-4 mr-2 mt-1 flex-shrink-0" style={{ color: '#AD1E2D' }} />
                  Regulated nervous system as leadership advantage
                </li>
                <li className="flex items-start" style={{ color: '#C9D5DD' }}>
                  <AlertCircle className="w-4 h-4 mr-2 mt-1 flex-shrink-0" style={{ color: '#AD1E2D' }} />
                  Integration of inner work with outer success
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
