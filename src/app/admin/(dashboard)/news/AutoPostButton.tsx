"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Sparkles, Loader2, CheckCircle2, XCircle } from 'lucide-react'

export default function AutoPostButton() {
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const router = useRouter()

  const [topic, setTopic] = useState('Dịch vụ lái xe hộ và đặt xe ở Đà Nẵng')

  const handleAutoPost = async () => {
    setIsLoading(true)
    setError(null)
    setSuccess(false)
    setStatus('Đang khởi tạo Gemini AI...')

    try {
      setStatus('Đang tạo nội dung SEO và hình ảnh (có thể mất 15-30 giây)...')
      const res = await fetch('/api/admin/auto-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ topic })
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Đã xảy ra lỗi khi tạo bài viết')
      }

      setStatus('Đã lưu bài viết thành công!')
      setSuccess(true)
      
      setTimeout(() => {
        setShowModal(false)
        router.refresh()
      }, 2000)

    } catch (err: any) {
      if (err.message.includes('high demand') || err.message.includes('503')) {
        setError('Hệ thống AI của Google hiện đang quá tải. Vui lòng thử lại sau 1-2 phút!')
      } else {
        setError(err.message)
      }
      setStatus('Lỗi!')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 mr-3"
      >
        <Sparkles size={18} />
        Đăng bài tự động (Gemini)
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative">
            <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Sparkles className="text-purple-600" />
              Tạo bài viết AI
            </h3>

            {!isLoading && !success && !error ? (
              <div className="py-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Chọn chủ đề bài viết:
                </label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4 bg-white text-slate-900 font-medium"
                >
                  <option value="Dịch vụ lái xe hộ và đặt xe ở Đà Nẵng">Dịch vụ lái xe hộ và đặt xe ở Đà Nẵng</option>
                  <option value="Dịch vụ thuê xe ô tô 4 chỗ, 7 chỗ tại Đà Nẵng">Dịch vụ thuê xe ô tô 4 chỗ, 7 chỗ tại Đà Nẵng</option>
                  <option value="Thuê xe đưa đón sân bay Đà Nẵng giá rẻ">Thuê xe đưa đón sân bay Đà Nẵng giá rẻ</option>
                  <option value="Kinh nghiệm thuê xe du lịch Đà Nẵng tự túc">Kinh nghiệm thuê xe du lịch Đà Nẵng tự túc</option>
                  <option value="Dịch vụ tài xế lái xe hộ ban đêm tại Đà Nẵng an toàn">Dịch vụ tài xế lái xe hộ ban đêm tại Đà Nẵng an toàn</option>
                  <option value="Top các địa điểm du lịch Đà Nẵng nhất định phải đến">Top các địa điểm du lịch Đà Nẵng nhất định phải đến</option>
                </select>
                <div className="flex justify-end gap-2">
                  <button 
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                  >
                    Hủy
                  </button>
                  <button 
                    onClick={handleAutoPost}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium"
                  >
                    Bắt đầu tạo
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-6">
                {isLoading && (
                  <>
                    <Loader2 className="w-12 h-12 text-purple-600 animate-spin mb-4" />
                    <p className="text-slate-600 text-center font-medium animate-pulse">{status}</p>
                  </>
                )}
                
                {success && (
                  <>
                    <CheckCircle2 className="w-12 h-12 text-green-500 mb-4" />
                    <p className="text-slate-800 font-medium">{status}</p>
                  </>
                )}

                {error && (
                  <>
                    <XCircle className="w-12 h-12 text-red-500 mb-4" />
                    <p className="text-red-600 font-medium text-center mb-4">{error}</p>
                    <button 
                      onClick={() => {
                        setError(null)
                        setIsLoading(false)
                      }}
                      className="bg-slate-200 hover:bg-slate-300 text-slate-800 px-4 py-2 rounded-lg"
                    >
                      Thử lại
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
