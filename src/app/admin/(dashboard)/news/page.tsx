import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import NewsTableRow from './NewsTableRow'
import AutoPostButton from './AutoPostButton'

export default async function AdminNews() {
  const supabase = await createClient()

  // Lấy dữ liệu từ Supabase, mới nhất lên đầu
  const { data: newsItems } = await supabase
    .from('news')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800">Quản Lý Tin Tức</h2>
        <div className="flex">
          <AutoPostButton />
          <Link 
            href="/admin/news/new" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            + Thêm Bài Viết
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm">
                <th className="p-4 font-semibold w-1/2">Bài viết</th>
                <th className="p-4 font-semibold w-1/4">Trạng thái</th>
                <th className="p-4 font-semibold text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {newsItems && newsItems.length > 0 ? (
                newsItems.map((item) => (
                  <NewsTableRow key={item.id} item={item} />
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="p-8 text-center text-slate-500">
                    Chưa có bài viết nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
