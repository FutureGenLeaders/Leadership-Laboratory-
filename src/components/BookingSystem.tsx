import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import Auth from './Auth';
import { 
  Calendar as CalendarIcon, 
  Clock,
  Video,
  CheckCircle,
  User,
  Globe,
  Zap,
  ArrowRight
} from "lucide-react";

const BookingSystem = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedSession, setSelectedSession] = useState<string>('');
  const [isBooking, setIsBooking] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  const sessionTypes = [
    {
      id: 'discovery',
      title: 'Discovery Call',
      duration: '30 min',
      description: 'Explore how nervous system leadership can transform your business',
      features: ['Assessment of current challenges', 'Custom leadership strategy', 'Perfect fit evaluation'],
      icon: Globe,
      price: 'Complimentary'
    },
    {
      id: 'intensive',
      title: 'Private Business Strategy',
      duration: '1 hour',
      description: 'Focused business strategy session to accomplish tangible results',
      features: ['Complete business assessment', 'Strategic action plan', 'Implementation roadmap'],
      icon: Zap,
      price: '$4,444'
    },
    {
      id: 'vip',
      title: 'VIP Business Strategy Day',
      duration: 'Full Day',
      description: 'Complete business transformation intensive for maximum impact',
      features: ['Full business strategy overhaul', 'Custom implementation framework', 'Ongoing strategic support'],
      icon: User,
      price: '$17,777'
    }
  ];

  const availableTimes = [
    '9:00 AM', '10:30 AM', '12:00 PM', '1:30 PM', '3:00 PM', '4:30 PM'
  ];

  const handleBooking = async () => {
    if (!user) {
      setShowAuth(true);
      return;
    }

    if (selectedSession && selectedDate && selectedTime) {
      setIsBooking(true);
      try {
        const { data, error } = await supabase.functions.invoke('create-booking', {
          body: {
            sessionType: selectedSession,
            sessionDate: selectedDate.toISOString().split('T')[0],
            sessionTime: selectedTime,
            notes: ''
          }
        });

        if (error) throw error;

        toast({
          title: 'Booking Confirmed!',
          description: data.message || 'Your session has been scheduled successfully.',
        });

        // Reset form
        setSelectedSession('');
        setSelectedTime('');
        setSelectedDate(new Date());

      } catch (error: any) {
        toast({
          title: 'Booking Failed',
          description: error.message || 'Unable to create booking. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setIsBooking(false);
      }
    }
  };

  // Show auth modal if user is not logged in
  if (showAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 border border-yellow-400 rotate-45 animate-pulse" style={{ borderColor: '#E0B848' }}></div>
          <div className="absolute top-40 right-32 w-24 h-24 border border-red-500 rounded-full animate-pulse delay-1000" style={{ borderColor: '#AD1E2D' }}></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r bg-clip-text text-transparent"
                style={{ background: `linear-gradient(to right, #E0B848, #B08B18, #E0B848)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Join to Book Your Session
            </h1>
          </div>
          
          <div className="max-w-md mx-auto">
            <Auth onSuccess={() => setShowAuth(false)} />
            <div className="text-center mt-4">
              <Button 
                variant="outline" 
                onClick={() => setShowAuth(false)}
                style={{ 
                  backgroundColor: 'rgba(201, 213, 221, 0.1)', 
                  borderColor: 'rgba(201, 213, 221, 0.3)',
                  color: '#C9D5DD'
                }}
              >
                Back to Booking
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 border border-yellow-400 rotate-45 animate-pulse" style={{ borderColor: '#E0B848' }}></div>
        <div className="absolute top-40 right-32 w-24 h-24 border border-red-500 rounded-full animate-pulse delay-1000" style={{ borderColor: '#AD1E2D' }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r bg-clip-text text-transparent"
              style={{ background: `linear-gradient(to right, #E0B848, #B08B18, #E0B848)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Book Your Transformation
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#BDBBBB' }}>
            Choose your sacred container for nervous system leadership transformation
          </p>
          {user && (
            <p className="text-sm mt-2" style={{ color: '#E0B848' }}>
              Welcome back, {user.email}
            </p>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Session Selection */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold mb-6" style={{ color: '#E0B848' }}>
              Select Your Sacred Container
            </h2>
            
            {sessionTypes.map((session) => (
              <Card 
                key={session.id}
                className={`cursor-pointer transition-all duration-300 border ${
                  selectedSession === session.id ? 'ring-2 ring-yellow-400' : 'hover:scale-[1.02]'
                }`}
                style={{ 
                  background: 'linear-gradient(to bottom right, rgba(0, 0, 0, 0.8), rgba(173, 30, 45, 0.1))',
                  borderColor: selectedSession === session.id ? '#E0B848' : 'rgba(173, 30, 45, 0.2)'
                }}
                onClick={() => setSelectedSession(session.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-full bg-gradient-to-r from-red-500 to-red-600">
                        <session.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold" style={{ color: '#C9D5DD' }}>
                          {session.title}
                        </h3>
                        <div className="flex items-center gap-4 text-sm" style={{ color: '#BDBBBB' }}>
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {session.duration}
                          </span>
                          <span className="flex items-center">
                            <Video className="w-4 h-4 mr-1" />
                            Virtual
                          </span>
                          <span className="font-bold" style={{ color: '#E0B848' }}>
                            {session.price}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="mb-4" style={{ color: '#BDBBBB' }}>
                    {session.description}
                  </p>

                  <div className="space-y-2">
                    {session.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm" style={{ color: '#C9D5DD' }}>
                        <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0" style={{ color: '#E0B848' }} />
                        {feature}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Booking Panel */}
          <div className="space-y-6">
            <Card className="border" style={{ 
              background: 'linear-gradient(to bottom right, rgba(0, 0, 0, 0.8), rgba(224, 184, 72, 0.1))',
              borderColor: 'rgba(224, 184, 72, 0.3)' 
            }}>
              <CardHeader>
                <CardTitle className="flex items-center" style={{ color: '#E0B848' }}>
                  <CalendarIcon className="w-5 h-5 mr-2" />
                  Select Date & Time
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                  disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                />

                {selectedDate && (
                  <div>
                    <h4 className="font-semibold mb-3" style={{ color: '#C9D5DD' }}>Available Times</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {availableTimes.map((time) => (
                        <Button
                          key={time}
                          variant={selectedTime === time ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedTime(time)}
                          className={selectedTime === time ? "text-black" : ""}
                          style={selectedTime === time ? 
                            { background: 'linear-gradient(to right, #E0B848, #B08B18)' } :
                            { 
                              backgroundColor: 'rgba(201, 213, 221, 0.1)', 
                              borderColor: 'rgba(201, 213, 221, 0.3)',
                              color: '#C9D5DD'
                            }
                          }
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {selectedSession && selectedDate && selectedTime && (
              <Card className="border" style={{ 
                background: 'linear-gradient(to bottom right, rgba(0, 0, 0, 0.8), rgba(173, 30, 45, 0.1))',
                borderColor: 'rgba(173, 30, 45, 0.2)' 
              }}>
                <CardContent className="p-6 text-center">
                  <h4 className="font-semibold mb-4" style={{ color: '#E0B848' }}>
                    Complete Your Booking
                  </h4>
                  <Button 
                    onClick={handleBooking}
                    disabled={isBooking}
                    className="w-full text-black font-semibold"
                    style={{ background: 'linear-gradient(to right, #E0B848, #B08B18)' }}
                  >
                    {isBooking ? 'Booking...' : 'Book Your Sacred Session'}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSystem;
