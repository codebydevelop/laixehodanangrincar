"use client"

import Link from 'next/link'
import Image from 'next/image'
import { Phone, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { name: 'Trang Chủ', href: '/' },
    { name: 'Giới Thiệu', href: '/gioi-thieu' },
    { name: 'Tin Tức', href: '/tin-tuc' },
    { name: 'Liên Hệ', href: '/lien-he' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-24 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-[85px] h-[85px] md:w-24 md:h-24 overflow-hidden rounded-full border-2 border-blue-100 shadow-sm bg-white shrink-0">
                <Image
                  src="/images/logoRincar.png"
                  alt="Rincar Logo"
                  width={140}
                  height={140}
                  quality={100}
                  priority
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-center mt-1">
                <span className="text-[15px] md:text-[21px] font-black text-red-600 tracking-tight leading-none uppercase">
                  Dịch vụ lái xe hộ Rincar
                </span>
                <div className="h-[1px] w-full bg-slate-300 my-1"></div>
                <span className="text-[11px] md:text-[14px] font-bold text-slate-800 tracking-wide uppercase">
                  An tâm | An toàn | Uy tín
                </span>
              </div>
            </Link>
          </div>

          <nav className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-semibold uppercase text-gray-700 hover:text-blue-600 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            <div className="flex flex-col items-end">
              <span className="text-xs font-semibold text-gray-500 uppercase">Hotline / Zalo</span>
              <a href="tel:0906499078" className="text-lg font-bold text-red-600 hover:text-red-700">
                0906.499.078
              </a>
            </div>
            <button
              onClick={() => {
                const element = document.getElementById('booking-phone-input')
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'center' })
                  element.focus({ preventScroll: true })
                } else {
                  window.location.href = '/#booking-phone-input'
                }
              }}
              className="rounded-full bg-red-600 px-6 py-2.5 text-sm font-bold text-white shadow-md transition hover:bg-red-700 cursor-pointer"
            >
              ĐẶT TÀI NGAY
            </button>
          </div>

          <button
            className="md:hidden p-2 text-gray-600"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-24 left-0 w-full bg-white shadow-lg border-t">
          <div className="flex flex-col p-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-base font-semibold text-gray-800 hover:text-blue-600 p-2"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t flex flex-col items-center gap-3">
              <a href="tel:0906499078" className="flex items-center gap-2 text-lg font-bold text-red-600">
                <Phone size={20} /> 0906.499.078
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
