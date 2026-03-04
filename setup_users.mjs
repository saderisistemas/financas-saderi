import fs from 'fs';
import { createClient } from '@supabase/supabase-js';

const envPath = new URL('./.env', import.meta.url);
const envContent = fs.readFileSync(envPath, 'utf8');

const urlMatch = envContent.match(/VITE_SUPABASE_URL=(.*)/);
const keyMatch = envContent.match(/VITE_SUPABASE_ANON_KEY=(.*)/);

const supabaseUrl = urlMatch ? urlMatch[1].trim() : '';
const supabaseAnonKey = keyMatch ? keyMatch[1].trim() : '';

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Supabase URL and Key are required in .env');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function createAdmins() {
    console.log('Creating Admin 1: Danilo...');
    const res1 = await supabase.auth.signUp({
        email: 'saderivigilancia@gmail.com',
        password: 'caspita11',
        options: {
            data: {
                full_name: 'Danilo Saderi'
            }
        }
    });
    if (res1.error) console.error('Error Admin 1:', res1.error.message);
    else console.log('Admin 1 created successfully or already exists.');

    console.log('Creating Admin 2: Jackie...');
    const res2 = await supabase.auth.signUp({
        email: 'jackie.esbiju1988@gmail.com',
        password: 'Bia$1245',
        options: {
            data: {
                full_name: 'Jackie Saderi'
            }
        }
    });
    if (res2.error) console.error('Error Admin 2:', res2.error.message);
    else console.log('Admin 2 created successfully or already exists.');
}

createAdmins();
