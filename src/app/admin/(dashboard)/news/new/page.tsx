"use client"

import { saveNews } from '../actions'
import Link from 'next/link'
import { useState } from 'react'

export default function NewNewsPage() {
  const [isPreview, setIsPreview] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    image_url: ''
  })
  const [imagePreview, setImagePreview] = useState<string>('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0])
      setImagePreview(url)
    } else {
      setImagePreview('')
    }
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800">Thêm Bài Viết Mới</h2>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setIsPreview(!isPreview)}
            className="text-blue-600 bg-blue-50 px-4 py-2 rounded-lg font-medium hover:bg-blue-100 transition-colors"
          >
            {isPreview ? 'Quay lại Chỉnh sửa' : 'Xem trước'}
          </button>
          <Link 
            href="/admin/news" 
            className="text-slate-500 hover:text-slate-800 font-medium transition-colors"
          >
            Trở về
          </Link>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <form action={saveNews} className={`space-y-6 ${isPreview ? 'hidden' : 'block'}`} encType="multipart/form-data">
          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Tiêu đề bài viết</label>
              <input type="text" name="title" required value={formData.title} onChange={handleChange} className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900" placeholder="Ví dụ: Rincar mở rộng dịch vụ..." />
            </div>

            <div className="col-span-1">
              <label className="block text-sm font-medium text-slate-700 mb-1">Đường dẫn (Slug)</label>
              <input type="text" name="slug" required value={formData.slug} onChange={handleChange} className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900" placeholder="vi-du-rincar-mo-rong..." />
              <p className="text-xs text-slate-500 mt-1">Sẽ dùng làm link: /tin-tuc/[slug]</p>
            </div>

            <div className="col-span-1 space-y-3">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Tải Ảnh Bìa lên</label>
                <input type="file" name="image" accept="image/*" onChange={handleImageChange} className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Hoặc dùng Link Ảnh Bìa</label>
                <input type="url" name="image_url" value={formData.image_url} onChange={handleChange} className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900" placeholder="https://..." />
                <p className="text-xs text-slate-500 mt-1">Nếu tải ảnh lên, Link này sẽ bị bỏ qua.</p>
              </div>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Tóm tắt (Excerpt)</label>
              <textarea name="excerpt" rows={2} required value={formData.excerpt} onChange={handleChange} className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900" placeholder="Mô tả ngắn gọn..."></textarea>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Nội dung chi tiết (Hỗ trợ HTML)</label>
              <textarea name="content" rows={10} required value={formData.content} onChange={handleChange} className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900" placeholder="<p>Đoạn văn bản...</p>"></textarea>
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

        {isPreview && (
          <div className="max-w-4xl mx-auto py-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">{formData.title || 'Tiêu đề chưa nhập'}</h1>
            
            <div className="flex items-center gap-2 text-slate-500 mb-8">
              <span>Tin tức</span>
              <span>•</span>
              <span>{new Date().toLocaleDateString('vi-VN')}</span>
            </div>

            {(imagePreview || formData.image_url) && (
              <div className="relative w-full aspect-[16/9] mb-8 rounded-2xl overflow-hidden">
                <img 
                  src={imagePreview || formData.image_url} 
                  alt={formData.title || 'Preview image'}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="text-lg text-slate-700 font-medium mb-8 p-6 bg-slate-50 border-l-4 border-blue-600 rounded-r-xl">
              {formData.excerpt || 'Tóm tắt chưa nhập...'}
            </div>

            {/* Content Preview */}
            <div 
              className="prose prose-slate prose-lg max-w-none prose-headings:font-bold prose-a:text-blue-600 hover:prose-a:text-blue-500 text-slate-900"
              dangerouslySetInnerHTML={{ __html: formData.content || '<p class="text-slate-800 italic">Nội dung bài viết sẽ hiển thị ở đây...</p>' }}
            />
            
            <div className="flex justify-center border-t border-slate-200 pt-8 mt-12">
              <button 
                type="button" 
                onClick={() => setIsPreview(false)}
                className="bg-slate-800 hover:bg-slate-900 text-white px-8 py-3 rounded-xl font-medium transition-colors shadow-sm"
              >
                Tiếp tục chỉnh sửa
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
