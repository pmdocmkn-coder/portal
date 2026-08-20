import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function test() {
  const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
    email: 'admin@portal.com',
    password: 'password123',
  });
  console.log('SignIn:', signInError ? signInError.message : 'Success');

  if (signInData.user) {
    const { data: roleData, error: roleError } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', signInData.user.id)
      .single();
    
    console.log('Role Data:', roleData);
    console.log('Role Error:', roleError);
  }
}
test();
