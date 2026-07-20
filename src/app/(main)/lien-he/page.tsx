import type { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Liên Hệ Dịch Vụ Lái Xe Hộ Đà Nẵng 24/7 | Rincar',
  description: 'Tổng đài hỗ trợ dịch vụ lái xe hộ Rincar tại Đà Nẵng luôn sẵn sàng phục vụ 24/7. Liên hệ ngay qua số điện thoại 0906.499.078 để đặt tài xế lái xe hộ chuyên nghiệp.',
  keywords: 'liên hệ lái xe hộ đà nẵng, số điện thoại lái xe hộ đà nẵng, tổng đài lái xe hộ rincar',
}

import Breadcrumb from '@/components/Breadcrumb'

export default function ContactPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4 text-center flex flex-col items-center">
          <Breadcrumb items={[{ label: 'Trang chủ', href: '/' }, { label: 'Liên hệ', href: '/lien-he' }]} />
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Liên Hệ Với Chúng Tôi</h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Tổng đài hỗ trợ <strong>Rincar</strong> luôn sẵn sàng lắng nghe và phục vụ bạn 24/7. Hãy liên hệ ngay nếu bạn cần <strong>tài xế lái xe hộ chuyên nghiệp tại Đà Nẵng</strong>.
          </p>
        </div>
      </div>

      <ContactForm />
    </div>
  )
}
