import { MetadataRoute } from 'next'
import { createClient } from '@supabase/supabase-js'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.laixehodanangrincar.com'
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || ''

  let newsUrls: MetadataRoute.Sitemap = []
  
  if (supabaseUrl && supabaseKey) {
    try {
      const supabase = createClient(supabaseUrl, supabaseKey)
      const { data: news } = await supabase
        .from('news')
        .select('slug, updated_at')
        .eq('is_published', true)

      if (news && news.length > 0) {
        newsUrls = news.map((item: any) => ({
          url: `${baseUrl}/tin-tuc/${item.slug}`,
          lastModified: item.updated_at ? new Date(item.updated_at) : new Date(),
          changeFrequency: 'weekly' as const,
          priority: 0.6,
        }))
      }
    } catch (err) {
      console.error('Error generating sitemap dynamic routes:', err)
    }
  }

  const staticRoutes = ['', '/gioi-thieu', '/tin-tuc', '/lien-he'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: (route === '' || route === '/tin-tuc') ? ('daily' as const) : ('monthly' as const),
    priority: route === '' ? 1.0 : 0.8,
  }))

  return [...staticRoutes, ...newsUrls]
}
