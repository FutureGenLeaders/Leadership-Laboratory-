
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  MessageSquare, 
  Heart,
  Reply,
  TrendingUp,
  Clock,
  Star,
  Plus,
  Search,
  Filter
} from "lucide-react";

const CommunityHub = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const discussions = [
    {
      id: '1',
      title: 'How do you regulate when team meetings get heated?',
      author: 'Sarah K.',
      avatar: '/placeholder.svg',
      category: 'Nervous System',
      replies: 12,
      likes: 24,
      lastActivity: '2 hours ago',
      content: 'I find myself getting triggered during conflict. What techniques work best for you in the moment?',
      tags: ['regulation', 'conflict', 'leadership']
    },
    {
      id: '2',
      title: 'Breathwork before board presentations - game changer!',
      author: 'Michael T.',
      avatar: '/placeholder.svg',
      category: 'Success Stories',
      replies: 8,
      likes: 31,
      lastActivity: '4 hours ago',
      content: 'Used the 4-7-8 technique before my quarterly presentation. Night and day difference in my presence.',
      tags: ['breathwork', 'presentations', 'success']
    },
    {
      id: '3',
      title: 'Weekly accountability partners - who\'s in?',
      author: 'Jennifer R.',
      avatar: '/placeholder.svg',
      category: 'Accountability',
      replies: 15,
      likes: 18,
      lastActivity: '6 hours ago',
      content: 'Looking to form small groups for weekly check-ins on nervous system practices.',
      tags: ['accountability', 'partnership', 'weekly']
    }
  ];

  const communityStats = {
    totalMembers: 247,
    activeDiscussions: 32,
    weeklyPosts: 156,
    helpfulAnswers: 89
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
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r bg-clip-text text-transparent"
              style={{ background: `linear-gradient(to right, #E0B848, #B08B18, #E0B848)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Sacred Leadership Community
          </h1>
          <p className="text-lg max-w-2xl mx-auto mb-6" style={{ color: '#BDBBBB' }}>
            Connect with fellow leaders on the journey of nervous system transformation and conscious business growth.
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center border" style={{ 
            background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(224, 184, 72, 0.05))',
            borderColor: 'rgba(224, 184, 72, 0.2)' 
          }}>
            <CardContent className="p-4">
              <Users className="w-8 h-8 mx-auto mb-2" style={{ color: '#E0B848' }} />
              <div className="text-2xl font-bold" style={{ color: '#C9D5DD' }}>{communityStats.totalMembers}</div>
              <div className="text-sm" style={{ color: '#BDBBBB' }}>Sacred Leaders</div>
            </CardContent>
          </Card>
          
          <Card className="text-center border" style={{ 
            background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(173, 30, 45, 0.05))',
            borderColor: 'rgba(173, 30, 45, 0.2)' 
          }}>
            <CardContent className="p-4">
              <MessageSquare className="w-8 h-8 mx-auto mb-2" style={{ color: '#AD1E2D' }} />
              <div className="text-2xl font-bold" style={{ color: '#C9D5DD' }}>{communityStats.activeDiscussions}</div>
              <div className="text-sm" style={{ color: '#BDBBBB' }}>Active Discussions</div>
            </CardContent>
          </Card>

          <Card className="text-center border" style={{ 
            background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(224, 184, 72, 0.05))',
            borderColor: 'rgba(224, 184, 72, 0.2)' 
          }}>
            <CardContent className="p-4">
              <TrendingUp className="w-8 h-8 mx-auto mb-2" style={{ color: '#E0B848' }} />
              <div className="text-2xl font-bold" style={{ color: '#C9D5DD' }}>{communityStats.weeklyPosts}</div>
              <div className="text-sm" style={{ color: '#BDBBBB' }}>Weekly Posts</div>
            </CardContent>
          </Card>

          <Card className="text-center border" style={{ 
            background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(173, 30, 45, 0.05))',
            borderColor: 'rgba(173, 30, 45, 0.2)' 
          }}>
            <CardContent className="p-4">
              <Star className="w-8 h-8 mx-auto mb-2" style={{ color: '#AD1E2D' }} />
              <div className="text-2xl font-bold" style={{ color: '#C9D5DD' }}>{communityStats.helpfulAnswers}</div>
              <div className="text-sm" style={{ color: '#BDBBBB' }}>Helpful Answers</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="discussions" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="discussions">Discussions</TabsTrigger>
            <TabsTrigger value="members">Sacred Circle</TabsTrigger>
            <TabsTrigger value="resources">Shared Wisdom</TabsTrigger>
          </TabsList>

          <TabsContent value="discussions">
            {/* Discussion Controls */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex gap-2 flex-1">
                <Button 
                  className="text-black"
                  style={{ background: 'linear-gradient(to right, #E0B848, #B08B18)' }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Start Discussion
                </Button>
                <Button 
                  variant="outline"
                  style={{ 
                    backgroundColor: 'rgba(201, 213, 221, 0.1)', 
                    borderColor: 'rgba(201, 213, 221, 0.3)',
                    color: '#C9D5DD'
                  }}
                >
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline"
                  size="sm"
                  style={{ 
                    backgroundColor: 'rgba(173, 30, 45, 0.1)', 
                    borderColor: 'rgba(173, 30, 45, 0.3)',
                    color: '#AD1E2D'
                  }}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>

            {/* Discussions List */}
            <div className="space-y-4">
              {discussions.map((discussion) => (
                <Card 
                  key={discussion.id}
                  className="hover:scale-[1.01] transition-all duration-300 cursor-pointer border"
                  style={{ 
                    background: 'linear-gradient(to bottom right, rgba(0, 0, 0, 0.8), rgba(173, 30, 45, 0.1))',
                    borderColor: 'rgba(173, 30, 45, 0.2)' 
                  }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={discussion.avatar} />
                            <AvatarFallback>{discussion.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="text-lg font-semibold hover:text-yellow-300 transition-colors" style={{ color: '#C9D5DD' }}>
                              {discussion.title}
                            </h3>
                            <div className="flex items-center gap-2 text-sm" style={{ color: '#BDBBBB' }}>
                              <span>by {discussion.author}</span>
                              <span>•</span>
                              <span className="flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                {discussion.lastActivity}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <p className="mb-4" style={{ color: '#BDBBBB' }}>
                          {discussion.content}
                        </p>

                        <div className="flex items-center gap-2 mb-3">
                          {discussion.tags.map((tag, index) => (
                            <Badge 
                              key={index}
                              variant="outline"
                              className="text-xs"
                              style={{ 
                                backgroundColor: 'rgba(224, 184, 72, 0.1)', 
                                borderColor: 'rgba(224, 184, 72, 0.3)',
                                color: '#E0B848'
                              }}
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center gap-4 text-sm" style={{ color: '#C9D5DD' }}>
                          <span className="flex items-center">
                            <Reply className="w-4 h-4 mr-1" />
                            {discussion.replies} replies
                          </span>
                          <span className="flex items-center">
                            <Heart className="w-4 h-4 mr-1" />
                            {discussion.likes} helpful
                          </span>
                        </div>
                      </div>

                      <Badge style={{ 
                        backgroundColor: 'rgba(224, 184, 72, 0.2)', 
                        color: '#E0B848', 
                        borderColor: 'rgba(224, 184, 72, 0.3)' 
                      }}>
                        {discussion.category}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="members">
            <div className="text-center py-12">
              <Users className="w-16 h-16 mx-auto mb-4" style={{ color: '#E0B848' }} />
              <h3 className="text-xl font-semibold mb-2" style={{ color: '#C9D5DD' }}>Sacred Circle Members</h3>
              <p style={{ color: '#BDBBBB' }}>Connect with fellow leaders on the path of transformation</p>
            </div>
          </TabsContent>

          <TabsContent value="resources">
            <div className="text-center py-12">
              <Star className="w-16 h-16 mx-auto mb-4" style={{ color: '#E0B848' }} />
              <h3 className="text-xl font-semibold mb-2" style={{ color: '#C9D5DD' }}>Shared Wisdom</h3>
              <p style={{ color: '#BDBBBB' }}>Community-curated resources and insights</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CommunityHub;
