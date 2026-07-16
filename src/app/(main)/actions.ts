"use server"

import { createClient } from '@/utils/supabase/server'

export async function getLatestNews() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('news')
    .select('title, slug, excerpt, image_url, created_at')
    .eq('is_published', true)
    .order('created_at', { ascending: false })
    .limit(3)
  
  return data || []
}
