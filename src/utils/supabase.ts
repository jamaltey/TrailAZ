import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://htcnhylcoxmlxxxtzlen.supabase.co';
const supabaseKey = 'sb_publishable_KtX4yyVcKdUby91Zyt7j1g_sZnq6t1t';

export const supabase = createClient(supabaseUrl, supabaseKey);
