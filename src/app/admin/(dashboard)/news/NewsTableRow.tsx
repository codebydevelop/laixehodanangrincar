"use client"

import { deleteNews, togglePublishStatus } from './actions'
import Link from 'next/link'

export default function NewsTableRow({ item }: { item: any }) {
  return (
    <tr className="border-b border-slate-100 hover:bg-slate-50">
      <td className="p-4 align-top">
        <div className="flex gap-4">
          <div className="w-16 h-16 bg-slate-200 rounded-lg overflow-hidden shrink-0">
            {item.image_url ? (
              <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">No img</div>
            )}
          </div>
          <div>
            <p className="font-semibold text-slate-800 line-clamp-1">{item.title}</p>
            <p className="text-xs text-slate-400 mt-1">/{item.slug}</p>
            <p className="text-xs text-slate-400 mt-1">{new Date(item.created_at).toLocaleString('vi-VN')}</p>
          </div>
        </div>
      </td>
      <td className="p-4 align-top">
        <button
          onClick={() => togglePublishStatus(item.id, item.is_published)}
          className={`text-xs font-medium px-3 py-1 rounded-full transition-colors ${
            item.is_published 
              ? 'bg-green-100 text-green-700 hover:bg-green-200' 
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          {item.is_published ? 'Đang xuất bản' : 'Bản nháp'}
        </button>
      </td>
      <td className="p-4 align-top text-right">
        <div className="flex justify-end gap-2">
          {/* <Link
            href={`/admin/news/${item.id}`}
            className="text-sm text-blue-500 hover:text-blue-700 font-medium px-3 py-1 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"
          >
            Sửa
          </Link> */}
          <button
            onClick={() => {
              if (confirm('Bạn có chắc chắn muốn xoá bài viết này?')) {
                deleteNews(item.id)
              }
            }}
            className="text-sm text-red-500 hover:text-red-700 font-medium px-3 py-1 bg-red-50 hover:bg-red-100 rounded-md transition-colors"
          >
            Xóa
          </button>
        </div>
      </td>
    </tr>
  )
}
