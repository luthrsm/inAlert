import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://hhezqwqlwzodwwoynpay.supabase.co'; 
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhoZXpxd3Fsd3pvZHd3b3lucGF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjcyODc3ODAsImV4cCI6MjA0Mjg2Mzc4MH0.Xq8CYCsj3y-6vpWWPdG8IHm37TRaHB4RO28YF1J34W8"; 

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;
