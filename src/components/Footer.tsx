import Link from 'next/link'
import { MapPin, Phone, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-4 uppercase">Thông tin liên hệ</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="shrink-0 mt-0.5 text-blue-400" size={18} />
                <span>37 Nguyễn Phan Vinh, P. Sơn Trà, Đà Nẵng</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="shrink-0 text-red-400" size={18} />
                <span className="text-red-400 font-bold">0906.499.078</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="shrink-0 text-blue-400" size={18} />
                <a href="mailto:Laixehodanangrincar@gmail.com" className="hover:text-white transition">
                  Laixehodanangrincar@gmail.com
                </a>
              </li>
            </ul>
            <div className="mt-6 flex gap-3">
              <a
                href="#"
                className="bg-blue-600 text-white w-9 h-9 flex items-center justify-center rounded-full hover:bg-blue-700 transition shadow-lg"
                aria-label="Facebook"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a
                href="https://zalo.me/0906499078"
                target="_blank"
                rel="noreferrer"
                className="bg-[#0068FF] text-white w-9 h-9 flex items-center justify-center rounded-full hover:bg-blue-600 transition shadow-lg font-bold text-[11px]"
                aria-label="Zalo"
              >
                Zalo
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-4 uppercase">Dịch vụ chính</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="text-green-400">✓</span> Lái xe hộ theo Km
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">✓</span> Lái xe hộ theo Giờ
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">✓</span> Lái xe hộ theo Ngày
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-4 uppercase">Liên kết nhanh</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition">Trang Chủ</Link>
              </li>
              <li>
                <Link href="/gioi-thieu" className="hover:text-white transition">Giới Thiệu</Link>
              </li>
              <li>
                <Link href="/tin-tuc" className="hover:text-white transition">Tin Tức</Link>
              </li>
              <li>
                <Link href="/lien-he" className="hover:text-white transition">Liên Hệ</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-4 uppercase">Về Rincar</h3>
            <p className="text-sm leading-relaxed mb-4">
              Lái xe hộ Đà Nẵng Rincar chuyên cung cấp dịch vụ tài xế lái xe hộ an toàn, uy tín và chuyên nghiệp tại Đà Nẵng. Phục vụ 24/7, đưa bạn về nhà an toàn sau mỗi cuộc vui.
            </p>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 text-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} Lái xe hộ Đà Nẵng Rincar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
