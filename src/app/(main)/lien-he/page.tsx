"use client"

import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.phone) {
      alert('Vui lòng điền họ tên và số điện thoại.')
      return
    }

    setIsSubmitting(true)
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await res.json()

      if (res.ok) {
        alert('Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi sớm nhất có thể qua số điện thoại của bạn!')
        setFormData({ name: '', phone: '', message: '' })
      } else {
        alert(data.error || 'Có lỗi xảy ra, vui lòng thử lại sau.')
      }
    } catch (error) {
      alert('Không thể kết nối đến máy chủ. Vui lòng thử lại.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Liên Hệ Với Chúng Tôi</h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Tổng đài hỗ trợ RINCAR luôn sẵn sàng lắng nghe và phục vụ bạn 24/7. Hãy liên hệ ngay nếu bạn cần tài xế lái xe hộ.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl py-12 lg:py-20">
        <div className="flex flex-col lg:flex-row gap-12 bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden">
          
          {/* Contact Info (Left Side) */}
          <div className="lg:w-2/5 bg-blue-600 text-white p-10 flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-blue-500 rounded-full opacity-50 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-64 h-64 bg-blue-700 rounded-full opacity-50 blur-3xl"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-8">Thông tin liên hệ</h2>
              
              <div className="space-y-8 flex-1">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-500/30 p-3 rounded-xl shrink-0">
                    <MapPin size={24} className="text-blue-100" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1 text-blue-50">Trụ sở chính</h3>
                    <p className="text-blue-200 leading-relaxed">
                      08 Đỗ Quang, Phường Thạc Gián, Quận Thanh Khê, Thành phố Đà Nẵng
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-500/30 p-3 rounded-xl shrink-0">
                    <Phone size={24} className="text-blue-100" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1 text-blue-50">Hotline Đặt Tài Xế</h3>
                    <p className="text-blue-200 font-bold text-xl">0906.499.078</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-500/30 p-3 rounded-xl shrink-0">
                    <Mail size={24} className="text-blue-100" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1 text-blue-50">Email hỗ trợ</h3>
                    <p className="text-blue-200">longhalo43dn@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-500/30 p-3 rounded-xl shrink-0">
                    <Clock size={24} className="text-blue-100" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1 text-blue-50">Giờ hoạt động</h3>
                    <p className="text-blue-200 font-semibold">Phục vụ 24/7</p>
                    <p className="text-sm text-blue-300 mt-1">Sẵn sàng mọi lúc, mọi nơi</p>
                  </div>
                </div>
              </div>

              <div className="mt-16 pt-8 border-t border-blue-500/30">
                <p className="text-sm text-blue-200 mb-4">Kết nối với chúng tôi:</p>
                <div className="flex gap-4">
                  <a href="https://zalo.me/0906499078" className="w-10 h-10 rounded-full bg-white text-blue-600 flex items-center justify-center hover:scale-110 transition-transform font-bold">
                    Zalo
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-white text-blue-600 flex items-center justify-center hover:scale-110 transition-transform font-bold">
                    FB
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form (Right Side) */}
          <div className="lg:w-3/5 p-10 flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Gửi tin nhắn cho RINCAR</h2>
            <p className="text-slate-500 mb-8">Vui lòng điền thông tin bên dưới, chúng tôi sẽ liên hệ lại với bạn trong thời gian sớm nhất.</p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Họ và tên <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Nhập họ tên của bạn"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Số điện thoại <span className="text-red-500">*</span></label>
                <input 
                  type="tel" 
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Nhập số điện thoại liên hệ"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Nội dung tin nhắn</label>
                <textarea 
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                  placeholder="Bạn cần RINCAR hỗ trợ thêm thông tin gì?"
                ></textarea>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {isSubmitting ? 'ĐANG GỬI...' : (
                  <>
                    <Send size={18} /> GỬI TIN NHẮN
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12 rounded-3xl overflow-hidden h-[400px] border border-slate-200 shadow-md">
          {/* Placeholder for iframe map */}
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.02031126136!2d108.2127271!3d16.064433!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314218342416f0e9%3A0xc3c54432bd3cd27e!2s8%20%C4%90%E1%BB%97%20Quang%2C%20V%C4%A9nh%20Trung%2C%20Thanh%20Kh%C3%AA%2C%20%C4%90%C3%A0%20N%E1%BA%B5ng!5e0!3m2!1svi!2s!4v1700000000000!5m2!1svi!2s" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  )
}
