
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = 'https://dspjxznvifkesvaxcwov.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzcGp4em52aWZrZXN2YXhjd292Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5NzY5MTQsImV4cCI6MjA2NTU1MjkxNH0.iqHs9MFjR-wrXDKKmrrQ7-qxqC5w7IAK8dXOl9Mk-So';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
