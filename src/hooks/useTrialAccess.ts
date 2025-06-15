
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface TrialStatus {
  isInTrial: boolean;
  trialDaysLeft: number;
  trialStartDate: Date | null;
  trialEndDate: Date | null;
  hasTrialExpired: boolean;
}

export const useTrialAccess = () => {
  const { user } = useAuth();
  const [trialStatus, setTrialStatus] = useState<TrialStatus>({
    isInTrial: false,
    trialDaysLeft: 0,
    trialStartDate: null,
    trialEndDate: null,
    hasTrialExpired: false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      checkTrialStatus();
    } else {
      setLoading(false);
    }
  }, [user]);

  const checkTrialStatus = async () => {
    if (!user) return;

    try {
      // Check if user has trial data
      const { data: profile, error } = await supabase
        .from('user_profiles')
        .select('trial_start_date, trial_end_date, created_at')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching trial status:', error);
        setLoading(false);
        return;
      }

      let trialStartDate: Date;
      let trialEndDate: Date;

      if (!profile || !profile.trial_start_date) {
        // User doesn't have trial data yet, create it
        trialStartDate = new Date();
        trialEndDate = new Date();
        trialEndDate.setDate(trialEndDate.getDate() + 14);

        await supabase
          .from('user_profiles')
          .upsert({
            user_id: user.id,
            email: user.email,
            trial_start_date: trialStartDate.toISOString(),
            trial_end_date: trialEndDate.toISOString(),
          });
      } else {
        trialStartDate = new Date(profile.trial_start_date);
        trialEndDate = new Date(profile.trial_end_date);
      }

      const now = new Date();
      const isInTrial = now <= trialEndDate;
      const hasTrialExpired = now > trialEndDate;
      const timeDiff = trialEndDate.getTime() - now.getTime();
      const trialDaysLeft = Math.max(0, Math.ceil(timeDiff / (1000 * 3600 * 24)));

      setTrialStatus({
        isInTrial,
        trialDaysLeft,
        trialStartDate,
        trialEndDate,
        hasTrialExpired,
      });
    } catch (error) {
      console.error('Error in trial status check:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    ...trialStatus,
    loading,
    refreshTrialStatus: checkTrialStatus,
  };
};
