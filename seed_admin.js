import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

// We need the service role key to bypass RLS and create users directly
const supabaseUrl = 'http://127.0.0.1:54331';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU';

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

async function seedAdmin() {
  console.log('Creating admin user...');
  
  // 1. Create User
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email: 'admin@portal.com',
    password: 'password123',
    email_confirm: true
  });

  if (authError) {
    console.error('Error creating user:', authError.message);
    return;
  }

  const userId = authData.user.id;
  console.log('User created:', userId);

  // 2. Assign Admin Role
  const { error: roleError } = await supabase
    .from('user_roles')
    .insert({ user_id: userId, role: 'admin' });

  if (roleError) {
    console.error('Error assigning role:', roleError.message);
    return;
  }

  console.log('Admin role assigned successfully!');
  console.log('Login with: admin@portal.com / password123');
}

seedAdmin();
