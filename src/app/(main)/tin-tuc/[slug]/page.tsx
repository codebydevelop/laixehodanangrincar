import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Calendar, User, ChevronLeft } from 'lucide-react'

// Cấu hình revalidate để ISR
export const revalidate = 60

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()
  const { data } = await supabase
    .from('news')
    .select('title, excerpt')
    .eq('slug', slug)
    .single()

  if (!data) return { title: 'Không tìm thấy bài viết' }

  return {
    title: `${data.title} | Lái Xe Hộ Đà Nẵng Rincar`,
    description: data.excerpt || 'Bài viết tin tức từ Rincar',
  }
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: article } = await supabase
    .from('news')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (!article) {
    notFound()
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link href="/tin-tuc" className="inline-flex items-center text-slate-500 hover:text-blue-600 mb-8 transition-colors font-medium">
          <ChevronLeft size={20} className="mr-1" /> Quay lại danh sách tin
        </Link>

        <article className="bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100">
          {article.image_url && (
            <div className="w-full h-[300px] md:h-[500px] overflow-hidden bg-slate-200">
              <img 
                src={article.image_url} 
                alt={article.title} 
                className="w-full h-full object-cover" 
              />
            </div>
          )}
          
          <div className="p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
              {article.title}
            </h1>
            
            <div className="flex items-center gap-6 text-sm text-slate-500 mb-10 pb-10 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>{new Date(article.created_at).toLocaleDateString('vi-VN')}</span>
              </div>
              <div className="flex items-center gap-2">
                <User size={16} />
                <span>{article.author}</span>
              </div>
            </div>

            <div className="prose prose-lg prose-blue max-w-none text-slate-700">
              {/* Nếu nội dung là HTML thì dùng dangerouslySetInnerHTML, nếu là text thường thì cứ in ra */}
              <div dangerouslySetInnerHTML={{ __html: article.content || '' }} />
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}
