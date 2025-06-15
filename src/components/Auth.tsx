
import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Mail, Lock, User } from 'lucide-react';

interface AuthProps {
  onSuccess?: () => void;
}

const Auth: React.FC<AuthProps> = ({ onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const { toast } = useToast();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
          },
        });
        if (error) throw error;
        toast({
          title: 'Success!',
          description: 'Check your email for the confirmation link.',
        });
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        toast({
          title: 'Welcome back!',
          description: 'You have successfully signed in.',
        });
        onSuccess?.();
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto border" style={{ 
      background: 'linear-gradient(to bottom right, rgba(0, 0, 0, 0.9), rgba(173, 30, 45, 0.1))',
      borderColor: 'rgba(224, 184, 72, 0.3)' 
    }}>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl" style={{ color: '#E0B848' }}>
          {isSignUp ? 'Join the Sacred Circle' : 'Welcome Back'}
        </CardTitle>
        <p className="text-sm" style={{ color: '#BDBBBB' }}>
          {isSignUp 
            ? 'Begin your nervous system leadership journey' 
            : 'Continue your transformation'
          }
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAuth} className="space-y-4">
          {isSignUp && (
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4" style={{ color: '#BDBBBB' }} />
              <Input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required={isSignUp}
                className="pl-10"
                style={{ 
                  backgroundColor: 'rgba(201, 213, 221, 0.1)', 
                  borderColor: 'rgba(201, 213, 221, 0.3)',
                  color: '#C9D5DD'
                }}
              />
            </div>
          )}
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4" style={{ color: '#BDBBBB' }} />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="pl-10"
              style={{ 
                backgroundColor: 'rgba(201, 213, 221, 0.1)', 
                borderColor: 'rgba(201, 213, 221, 0.3)',
                color: '#C9D5DD'
              }}
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4" style={{ color: '#BDBBBB' }} />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="pl-10"
              style={{ 
                backgroundColor: 'rgba(201, 213, 221, 0.1)', 
                borderColor: 'rgba(201, 213, 221, 0.3)',
                color: '#C9D5DD'
              }}
            />
          </div>
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full text-black font-semibold"
            style={{ background: 'linear-gradient(to right, #E0B848, #B08B18)' }}
          >
            {isLoading ? 'Loading...' : (isSignUp ? 'Create Account' : 'Sign In')}
          </Button>
        </form>
        <div className="text-center mt-4">
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-sm hover:underline"
            style={{ color: '#E0B848' }}
          >
            {isSignUp 
              ? 'Already have an account? Sign in' 
              : 'Need an account? Sign up'
            }
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Auth;
