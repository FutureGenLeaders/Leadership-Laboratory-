
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar,
  Clock,
  DollarSign,
  Video,
  Phone,
  AlertTriangle,
  Target,
  Zap,
  CheckCircle,
  User
} from "lucide-react";

const StrategicSessions = () => {
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [bookingStep, setBookingStep] = useState(1);

  const sessionTypes = [
    {
      id: 'strategic',
      title: 'Strategic Session',
      duration: '60 minutes',
      price: 397,
      icon: Target,
      color: 'from-blue-500 to-blue-600',
      description: 'Comprehensive strategic leadership coaching for complex organizational challenges.',
      bestFor: [
        'Long-term strategic planning',
        'Organizational transformation leadership',
        'Executive presence development',
        'Complex decision architecture'
      ]
    },
    {
      id: 'crisis',
      title: 'Crisis Intervention',
      duration: '45 minutes',
      price: 297,
      icon: AlertTriangle,
      color: 'from-red-500 to-red-600',
      description: 'Immediate strategic support for urgent leadership challenges and crisis situations.',
      bestFor: [
        'Urgent crisis leadership',
        'Team conflict resolution',
        'Rapid decision-making support',
        'Emergency strategic pivots'
      ]
    },
    {
      id: 'intensive',
      title: 'Executive Intensive',
      duration: '90 minutes',
      price: 597,
      icon: Zap,
      color: 'from-purple-500 to-purple-600',
      description: 'Deep-dive transformation session for breakthrough leadership development.',
      bestFor: [
        'Comprehensive leadership overhaul',
        'Multi-faceted challenge resolution',
        'Advanced framework implementation',
        'Executive mastery acceleration'
      ]
    }
  ];

  const monthlyPackage = {
    title: 'Monthly Coaching Package',
    sessions: 2,
    price: 697,
    savings: 97,
    description: 'Two strategic sessions per month with priority booking and extended support.'
  };

  const availableSlots = [
    { date: '2024-12-18', time: '10:00 AM EST', available: true },
    { date: '2024-12-18', time: '2:00 PM EST', available: true },
    { date: '2024-12-19', time: '9:00 AM EST', available: false },
    { date: '2024-12-19', time: '1:00 PM EST', available: true },
    { date: '2024-12-20', time: '11:00 AM EST', available: true },
    { date: '2024-12-20', time: '3:00 PM EST', available: true }
  ];

  const handleSessionSelect = (sessionId: string) => {
    setSelectedSession(sessionId);
    setBookingStep(2);
  };

  const handleBookSession = () => {
    // Mock booking process
    console.log('Booking session:', selectedSession);
    setBookingStep(3);
  };

  if (bookingStep === 3) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full border" style={{ 
          background: 'linear-gradient(to bottom right, rgba(0, 0, 0, 0.8), rgba(34, 197, 94, 0.1))',
          borderColor: 'rgba(34, 197, 94, 0.3)' 
        }}>
          <CardContent className="p-8 text-center space-y-6">
            <CheckCircle className="w-16 h-16 mx-auto" style={{ color: '#22C55E' }} />
            <h2 className="text-3xl font-bold" style={{ color: '#E0B848' }}>
              Session Booked Successfully
            </h2>
            <p className="text-lg" style={{ color: '#C9D5DD' }}>
              Your strategic coaching session has been confirmed. You'll receive a calendar invitation and Zoom link within 5 minutes.
            </p>
            <Button 
              onClick={() => {
                setBookingStep(1);
                setSelectedSession(null);
              }}
              className="text-black"
              style={{ background: 'linear-gradient(to right, #E0B848, #B08B18)' }}
            >
              Book Another Session
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (bookingStep === 2 && selectedSession) {
    const session = sessionTypes.find(s => s.id === selectedSession);
    if (!session) return null;

    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-4">
        <div className="container mx-auto max-w-4xl">
          <Button 
            variant="ghost" 
            onClick={() => setBookingStep(1)}
            className="mb-6"
            style={{ color: '#C9D5DD' }}
          >
            ← Back to Session Types
          </Button>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Session Details */}
            <Card className="border" style={{ 
              background: 'linear-gradient(to bottom right, rgba(0, 0, 0, 0.8), rgba(173, 30, 45, 0.1))',
              borderColor: 'rgba(173, 30, 45, 0.2)' 
            }}>
              <CardHeader>
                <CardTitle className="flex items-center" style={{ color: '#E0B848' }}>
                  <session.icon className="w-6 h-6 mr-2" />
                  {session.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span style={{ color: '#C9D5DD' }}>Duration:</span>
                  <span style={{ color: '#E0B848' }}>{session.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span style={{ color: '#C9D5DD' }}>Investment:</span>
                  <span className="text-2xl font-bold" style={{ color: '#E0B848' }}>${session.price}</span>
                </div>
                <p style={{ color: '#BDBBBB' }}>{session.description}</p>
              </CardContent>
            </Card>

            {/* Calendar Booking */}
            <Card className="border" style={{ 
              background: 'linear-gradient(to bottom right, rgba(0, 0, 0, 0.8), rgba(173, 30, 45, 0.1))',
              borderColor: 'rgba(173, 30, 45, 0.2)' 
            }}>
              <CardHeader>
                <CardTitle className="flex items-center" style={{ color: '#E0B848' }}>
                  <Calendar className="w-6 h-6 mr-2" />
                  Select Time Slot
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {availableSlots.map((slot, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    disabled={!slot.available}
                    onClick={handleBookSession}
                    className="w-full justify-between"
                    style={{ 
                      backgroundColor: slot.available ? 'rgba(224, 184, 72, 0.1)' : 'rgba(107, 114, 128, 0.1)', 
                      borderColor: slot.available ? 'rgba(224, 184, 72, 0.3)' : 'rgba(107, 114, 128, 0.3)',
                      color: slot.available ? '#E0B848' : '#6B7280'
                    }}
                  >
                    <span>{slot.date}</span>
                    <span>{slot.time}</span>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>
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
            <User className="w-12 h-12 mr-3" style={{ color: '#E0B848' }} />
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r bg-clip-text text-transparent"
                style={{ background: `linear-gradient(to right, #E0B848, #B08B18, #E0B848)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Strategic Sessions
            </h1>
            <User className="w-12 h-12 ml-3" style={{ color: '#E0B848' }} />
          </div>
          <h2 className="text-2xl font-semibold mb-4" style={{ color: '#C9D5DD' }}>
            Private 1:1 Executive Coaching
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#BDBBBB' }}>
            On-demand strategic coaching sessions for immediate leadership challenges, breakthrough development, and crisis intervention.
          </p>
        </div>

        {/* Monthly Package Highlight */}
        <Card className="mb-12 bg-gradient-to-r border" style={{ 
          background: 'linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(224, 184, 72, 0.1))', 
          borderColor: 'rgba(224, 184, 72, 0.3)' 
        }}>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl flex items-center justify-center" style={{ color: '#E0B848' }}>
              <DollarSign className="w-6 h-6 mr-2" />
              Monthly Coaching Package - Best Value
              <DollarSign className="w-6 h-6 ml-2" />
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="flex items-center justify-center gap-8">
              <div>
                <span className="text-3xl font-bold" style={{ color: '#E0B848' }}>${monthlyPackage.price}</span>
                <span className="text-lg ml-2" style={{ color: '#C9D5DD' }}>/ month</span>
              </div>
              <Badge className="text-lg px-4 py-2" style={{ 
                backgroundColor: 'rgba(34, 197, 94, 0.2)', 
                color: '#22C55E', 
                borderColor: 'rgba(34, 197, 94, 0.3)' 
              }}>
                Save ${monthlyPackage.savings}
              </Badge>
            </div>
            <p className="text-lg" style={{ color: '#C9D5DD' }}>
              {monthlyPackage.description}
            </p>
            <Button 
              className="font-semibold text-lg py-6 px-8 text-black"
              style={{ background: 'linear-gradient(to right, #E0B848, #B08B18)' }}
            >
              Choose Monthly Package
            </Button>
          </CardContent>
        </Card>

        {/* Individual Session Types */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8" style={{ color: '#E0B848' }}>
            Individual Session Types
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {sessionTypes.map((session) => {
              const IconComponent = session.icon;
              return (
                <Card 
                  key={session.id}
                  className="group hover:scale-105 transition-all duration-300 cursor-pointer border h-full"
                  style={{ 
                    background: 'linear-gradient(to bottom right, rgba(0, 0, 0, 0.8), rgba(173, 30, 45, 0.1))',
                    borderColor: 'rgba(173, 30, 45, 0.2)' 
                  }}
                  onClick={() => handleSessionSelect(session.id)}
                >
                  <CardHeader className="text-center">
                    <div className={`p-4 rounded-full bg-gradient-to-r ${session.color} mx-auto w-fit mb-4`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl group-hover:text-yellow-300 transition-colors" style={{ color: '#C9D5DD' }}>
                      {session.title}
                    </CardTitle>
                    <div className="flex items-center justify-center gap-4 text-sm" style={{ color: '#BDBBBB' }}>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {session.duration}
                      </span>
                      <span className="text-2xl font-bold" style={{ color: '#E0B848' }}>
                        ${session.price}
                      </span>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-center" style={{ color: '#BDBBBB' }}>
                      {session.description}
                    </p>

                    <div className="rounded-lg p-4 border" style={{ 
                      backgroundColor: 'rgba(0, 0, 0, 0.2)', 
                      borderColor: 'rgba(173, 30, 45, 0.1)' 
                    }}>
                      <p className="text-sm font-medium mb-3" style={{ color: '#C9D5DD' }}>Best For:</p>
                      <ul className="space-y-2">
                        {session.bestFor.map((item, index) => (
                          <li key={index} className="flex items-start text-sm" style={{ color: '#BDBBBB' }}>
                            <CheckCircle className="w-3 h-3 mr-2 mt-1 flex-shrink-0" style={{ color: '#E0B848' }} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button 
                      className="w-full font-semibold text-black"
                      style={{ background: 'linear-gradient(to right, #E0B848, #B08B18)' }}
                    >
                      <Video className="w-4 h-4 mr-2" />
                      Book Now
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* How It Works */}
        <Card className="border" style={{ 
          background: 'linear-gradient(to bottom right, rgba(0, 0, 0, 0.8), rgba(173, 30, 45, 0.1))',
          borderColor: 'rgba(173, 30, 45, 0.2)' 
        }}>
          <CardHeader>
            <CardTitle className="text-center text-2xl" style={{ color: '#E0B848' }}>
              How Strategic Sessions Work
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center mx-auto">
                  <span className="text-white font-bold">1</span>
                </div>
                <h3 className="font-semibold" style={{ color: '#C9D5DD' }}>Book Your Session</h3>
                <p className="text-sm" style={{ color: '#BDBBBB' }}>
                  Choose your session type and select an available time slot that works with your schedule.
                </p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 flex items-center justify-center mx-auto">
                  <span className="text-white font-bold">2</span>
                </div>
                <h3 className="font-semibold" style={{ color: '#C9D5DD' }}>Strategic Coaching</h3>
                <p className="text-sm" style={{ color: '#BDBBBB' }}>
                  Engage in focused, high-impact coaching via secure Zoom with breakthrough frameworks and strategies.
                </p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center mx-auto">
                  <span className="text-white font-bold">3</span>
                </div>
                <h3 className="font-semibold" style={{ color: '#C9D5DD' }}>Implementation</h3>
                <p className="text-sm" style={{ color: '#BDBBBB' }}>
                  Receive personalized action plans and follow-up resources to implement your breakthrough insights.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StrategicSessions;
