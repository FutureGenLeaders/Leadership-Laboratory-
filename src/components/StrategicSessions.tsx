
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { 
  Send,
  Play,
  Target,
  Lightbulb,
  CheckCircle,
  User,
  Video,
  Clock,
  Brain,
  Zap
} from "lucide-react";

const StrategicSessions = () => {
  const [requestStep, setRequestStep] = useState(1);
  const [requestData, setRequestData] = useState({
    challenge: '',
    email: '',
    name: '',
    urgency: 'medium'
  });

  const videoLibrary = [
    {
      id: 1,
      title: 'Breaking Through Decision Paralysis',
      duration: '12 minutes',
      description: 'Strategic framework for making clear decisions when facing uncertainty and incomplete information.',
      category: 'Decision Making',
      views: 2847,
      created: 'Last week'
    },
    {
      id: 2,
      title: 'Leading Through Team Conflict',
      duration: '15 minutes', 
      description: 'Executive strategies for transforming team tensions into breakthrough collaboration and innovation.',
      category: 'Team Leadership',
      views: 1923,
      created: '2 weeks ago'
    },
    {
      id: 3,
      title: 'Confidence Under Executive Pressure',
      duration: '18 minutes',
      description: 'Advanced techniques for maintaining leadership presence and clarity during high-stakes situations.',
      category: 'Executive Presence',
      views: 3156,
      created: '3 weeks ago'
    },
    {
      id: 4,
      title: 'Strategic Thinking in Crisis Mode',
      duration: '14 minutes',
      description: 'Framework for maintaining strategic perspective and making optimal decisions during organizational crisis.',
      category: 'Crisis Leadership',
      views: 2634,
      created: '1 month ago'
    }
  ];

  const handleSubmitRequest = () => {
    console.log('Submitting leadership breakthrough request:', requestData);
    setRequestStep(2);
  };

  const handleInputChange = (field: string, value: string) => {
    setRequestData(prev => ({ ...prev, [field]: value }));
  };

  if (requestStep === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full border" style={{ 
          background: 'linear-gradient(to bottom right, rgba(0, 0, 0, 0.8), rgba(34, 197, 94, 0.1))',
          borderColor: 'rgba(34, 197, 94, 0.3)' 
        }}>
          <CardContent className="p-8 text-center space-y-6">
            <CheckCircle className="w-16 h-16 mx-auto" style={{ color: '#22C55E' }} />
            <h2 className="text-3xl font-bold" style={{ color: '#E0B848' }}>
              Request Submitted Successfully
            </h2>
            <p className="text-lg" style={{ color: '#C9D5DD' }}>
              Your leadership breakthrough request has been received. If your challenge resonates with our executive community, 
              a targeted strategy video will be created and you'll be notified via email.
            </p>
            <Button 
              onClick={() => {
                setRequestStep(1);
                setRequestData({ challenge: '', email: '', name: '', urgency: 'medium' });
              }}
              className="text-black"
              style={{ background: 'linear-gradient(to right, #E0B848, #B08B18)' }}
            >
              Submit Another Request
            </Button>
          </CardContent>
        </Card>
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
            <Video className="w-12 h-12 mr-3" style={{ color: '#E0B848' }} />
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r bg-clip-text text-transparent"
                style={{ background: `linear-gradient(to right, #E0B848, #B08B18, #E0B848)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Executive Breakthrough Videos
            </h1>
            <Brain className="w-12 h-12 ml-3" style={{ color: '#E0B848' }} />
          </div>
          <h2 className="text-2xl font-semibold mb-4" style={{ color: '#C9D5DD' }}>
            Strategic Solutions for Leadership Challenges
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#BDBBBB' }}>
            Request custom strategy videos for your specific leadership challenges. If your challenge resonates with our executive community, 
            a targeted breakthrough video will be created to address the core issue.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Request Form */}
          <Card className="border" style={{ 
            background: 'linear-gradient(to bottom right, rgba(0, 0, 0, 0.8), rgba(173, 30, 45, 0.1))',
            borderColor: 'rgba(173, 30, 45, 0.2)' 
          }}>
            <CardHeader>
              <CardTitle className="flex items-center" style={{ color: '#E0B848' }}>
                <Target className="w-6 h-6 mr-2" />
                Submit Leadership Challenge
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#C9D5DD' }}>
                  Your Name
                </label>
                <Input
                  value={requestData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Executive name"
                  className="bg-black/50 border-gray-600 text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#C9D5DD' }}>
                  Email Address
                </label>
                <Input
                  type="email"
                  value={requestData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="your@email.com"
                  className="bg-black/50 border-gray-600 text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#C9D5DD' }}>
                  Leadership Challenge Description
                </label>
                <Textarea
                  value={requestData.challenge}
                  onChange={(e) => handleInputChange('challenge', e.target.value)}
                  placeholder="Describe the specific leadership challenge, team dynamic, decision-making block, or strategic issue you're facing. Be as detailed as possible to help create the most relevant solution."
                  rows={6}
                  className="bg-black/50 border-gray-600 text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#C9D5DD' }}>
                  Urgency Level
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['low', 'medium', 'high'].map((level) => (
                    <Button
                      key={level}
                      variant={requestData.urgency === level ? 'default' : 'outline'}
                      onClick={() => handleInputChange('urgency', level)}
                      className={requestData.urgency === level ? 'text-black' : ''}
                      style={requestData.urgency === level ? { 
                        background: 'linear-gradient(to right, #E0B848, #B08B18)' 
                      } : {
                        backgroundColor: 'rgba(224, 184, 72, 0.1)',
                        borderColor: 'rgba(224, 184, 72, 0.3)',
                        color: '#E0B848'
                      }}
                    >
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>

              <Button 
                onClick={handleSubmitRequest}
                disabled={!requestData.challenge || !requestData.email || !requestData.name}
                className="w-full font-semibold text-lg py-6 text-black"
                style={{ background: 'linear-gradient(to right, #E0B848, #B08B18)' }}
              >
                <Send className="w-5 h-5 mr-2" />
                Submit Leadership Request
              </Button>
            </CardContent>
          </Card>

          {/* How It Works */}
          <Card className="border" style={{ 
            background: 'linear-gradient(to bottom right, rgba(0, 0, 0, 0.8), rgba(173, 30, 45, 0.1))',
            borderColor: 'rgba(173, 30, 45, 0.2)' 
          }}>
            <CardHeader>
              <CardTitle className="text-center" style={{ color: '#E0B848' }}>
                How Executive Breakthrough Videos Work
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1" style={{ color: '#C9D5DD' }}>Submit Your Challenge</h3>
                    <p className="text-sm" style={{ color: '#BDBBBB' }}>
                      Describe your specific leadership challenge, team dynamic, or strategic issue in detail.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1" style={{ color: '#C9D5DD' }}>Community Assessment</h3>
                    <p className="text-sm" style={{ color: '#BDBBBB' }}>
                      Challenges that resonate with multiple executives are prioritized for video creation.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1" style={{ color: '#C9D5DD' }}>Strategic Video Creation</h3>
                    <p className="text-sm" style={{ color: '#BDBBBB' }}>
                      A targeted breakthrough video is created with actionable strategies and frameworks.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">4</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1" style={{ color: '#C9D5DD' }}>Access & Implementation</h3>
                    <p className="text-sm" style={{ color: '#BDBBBB' }}>
                      You're notified when the video is available and gain immediate access to implement the solution.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Video Library */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8" style={{ color: '#E0B848' }}>
            Executive Strategy Video Library
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {videoLibrary.map((video) => (
              <Card 
                key={video.id}
                className="group hover:scale-105 transition-all duration-300 cursor-pointer border"
                style={{ 
                  background: 'linear-gradient(to bottom right, rgba(0, 0, 0, 0.8), rgba(173, 30, 45, 0.1))',
                  borderColor: 'rgba(173, 30, 45, 0.2)' 
                }}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge className="text-sm" style={{ 
                      backgroundColor: 'rgba(224, 184, 72, 0.2)', 
                      color: '#E0B848', 
                      borderColor: 'rgba(224, 184, 72, 0.3)' 
                    }}>
                      {video.category}
                    </Badge>
                    <div className="flex items-center text-sm" style={{ color: '#BDBBBB' }}>
                      <Clock className="w-4 h-4 mr-1" />
                      {video.duration}
                    </div>
                  </div>
                  <CardTitle className="text-xl group-hover:text-yellow-300 transition-colors" style={{ color: '#C9D5DD' }}>
                    {video.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p style={{ color: '#BDBBBB' }}>
                    {video.description}
                  </p>

                  <div className="flex items-center justify-between text-sm" style={{ color: '#BDBBBB' }}>
                    <span>{video.views.toLocaleString()} views</span>
                    <span>{video.created}</span>
                  </div>

                  <Button 
                    className="w-full font-semibold text-black"
                    style={{ background: 'linear-gradient(to right, #E0B848, #B08B18)' }}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Watch Strategy Video
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <Card className="border" style={{ 
          background: 'linear-gradient(to bottom right, rgba(0, 0, 0, 0.8), rgba(224, 184, 72, 0.1))',
          borderColor: 'rgba(224, 184, 72, 0.3)' 
        }}>
          <CardHeader>
            <CardTitle className="text-center text-2xl" style={{ color: '#E0B848' }}>
              Why Executive Breakthrough Videos Work
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="space-y-3">
                <Lightbulb className="w-12 h-12 mx-auto" style={{ color: '#E0B848' }} />
                <h3 className="font-semibold" style={{ color: '#C9D5DD' }}>Targeted Solutions</h3>
                <p className="text-sm" style={{ color: '#BDBBBB' }}>
                  Each video addresses specific leadership challenges with actionable frameworks and strategies.
                </p>
              </div>
              <div className="space-y-3">
                <Zap className="w-12 h-12 mx-auto" style={{ color: '#E0B848' }} />
                <h3 className="font-semibold" style={{ color: '#C9D5DD' }}>Immediate Access</h3>
                <p className="text-sm" style={{ color: '#BDBBBB' }}>
                  Get breakthrough insights on-demand when you need them most during critical leadership moments.
                </p>
              </div>
              <div className="space-y-3">
                <Target className="w-12 h-12 mx-auto" style={{ color: '#E0B848' }} />
                <h3 className="font-semibold" style={{ color: '#C9D5DD' }}>Community-Driven</h3>
                <p className="text-sm" style={{ color: '#BDBBBB' }}>
                  Solutions are created based on real challenges faced by executive leaders in your situation.
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
