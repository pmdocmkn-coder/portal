import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'http://127.0.0.1:54321';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJh...'; // I will get the actual key from .env

require('dotenv').config();

async function run() {
  const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);
  
  const [settingsRes, slidersRes, portalsRes] = await Promise.all([
    supabase.from('site_settings').select('*').eq('id', 1).single(),
    supabase.from('hero_sliders').select('image_url').order('display_order', { ascending: true }),
    supabase.from('portal_items').select('*').order('created_at', { ascending: false })
  ]);
  
  console.log('Settings:', settingsRes);
  console.log('Sliders:', slidersRes);
  console.log('Portals:', portalsRes);
}
run();
