import Link from 'next/link'
import { Calendar, User, ChevronRight } from 'lucide-react'
import { createClient } from '@/utils/supabase/server'

export const metadata = {
  title: 'Tin Tức & Cẩm Nang Lái Xe | Lái Xe Hộ Đà Nẵng Rincar',
  description: 'Cập nhật tin tức mới nhất về dịch vụ lái xe hộ, các quy định pháp luật và kinh nghiệm an toàn giao thông.',
}

export const revalidate = 60 // Revalidate cache every 60 seconds

export default async function NewsPage() {
  const supabase = await createClient()

  // Fetch news from database
  const { data: news } = await supabase
    .from('news')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false })

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Tin Tức & Cẩm Nang Lái Xe</h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Cập nhật những thông tin mới nhất về dịch vụ, luật giao thông và các mẹo hay trên mọi nẻo đường.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 max-w-6xl py-12">
        {!news || news.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold text-slate-700 mb-2">Chưa có bài viết nào</h3>
            <p className="text-slate-500">Nội dung tin tức đang được chúng tôi cập nhật. Vui lòng quay lại sau.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item: any) => (
              <article key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-all group flex flex-col h-full">
                <Link href={`/tin-tuc/${item.slug}`} className="block overflow-hidden aspect-[4/3] bg-slate-200">
                  {item.image_url ? (
                    <img 
                      src={item.image_url} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                      Không có ảnh
                    </div>
                  )}
                </Link>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{new Date(item.created_at).toLocaleDateString('vi-VN')}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User size={14} />
                      <span>{item.author}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    <Link href={`/tin-tuc/${item.slug}`}>
                      {item.title}
                    </Link>
                  </h3>
                  <p className="text-slate-600 mb-4 line-clamp-3 flex-1">
                    {item.excerpt}
                  </p>
                  <Link 
                    href={`/tin-tuc/${item.slug}`} 
                    className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-colors mt-auto"
                  >
                    Đọc tiếp <ChevronRight size={16} className="ml-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Pagination (Tạm thời ẩn nếu ít bài) */}
        {news && news.length > 9 && (
          <div className="flex justify-center mt-16">
            <nav className="flex items-center gap-2">
              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-200 text-slate-500 cursor-not-allowed">
                <ChevronRight size={18} className="rotate-180" />
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white font-semibold">
                1
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-200 text-slate-700 transition-colors">
                <ChevronRight size={18} />
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  )
}
