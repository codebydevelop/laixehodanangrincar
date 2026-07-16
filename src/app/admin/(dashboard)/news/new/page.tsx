import { saveNews } from '../actions'
import Link from 'next/link'

export default function NewNewsPage() {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800">Thêm Bài Viết Mới</h2>
        <Link 
          href="/admin/news" 
          className="text-slate-500 hover:text-slate-800 font-medium transition-colors"
        >
          Trở về
        </Link>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <form action={saveNews} className="space-y-6" encType="multipart/form-data">
          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Tiêu đề bài viết</label>
              <input type="text" name="title" required className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900" placeholder="Ví dụ: Rincar mở rộng dịch vụ..." />
            </div>

            <div className="col-span-1">
              <label className="block text-sm font-medium text-slate-700 mb-1">Đường dẫn (Slug)</label>
              <input type="text" name="slug" required className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900" placeholder="vi-du-rincar-mo-rong..." />
              <p className="text-xs text-slate-500 mt-1">Sẽ dùng làm link: /tin-tuc/[slug]</p>
            </div>

            <div className="col-span-1 space-y-3">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Tải Ảnh Bìa lên</label>
                <input type="file" name="image" accept="image/*" className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Hoặc dùng Link Ảnh Bìa</label>
                <input type="url" name="image_url" className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900" placeholder="https://..." />
                <p className="text-xs text-slate-500 mt-1">Nếu tải ảnh lên, Link này sẽ bị bỏ qua.</p>
              </div>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Tóm tắt (Excerpt)</label>
              <textarea name="excerpt" rows={2} required className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900" placeholder="Mô tả ngắn gọn..."></textarea>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Nội dung chi tiết (Hỗ trợ HTML)</label>
              <textarea name="content" rows={10} required className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900" placeholder="<p>Đoạn văn bản...</p>"></textarea>
            </div>
            
            <div className="col-span-2 flex items-center gap-2">
              <input type="checkbox" name="is_published" value="true" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
              <label className="text-sm font-medium text-slate-700">Xuất bản ngay lập tức</label>
            </div>
          </div>

          <div className="flex justify-end border-t border-slate-100 pt-6 mt-6">
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
              Lưu bài viết
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
