import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bjvbsjwqsjrakwuycnad.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqdmJzandxc2pyYWt3dXljbmFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE4Mzc4MjQsImV4cCI6MjA2NzQxMzgyNH0.R3nxysxgQ7tV9vywnJLY8Tt0U1fWDSKkjSf-3n3x8Kc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
