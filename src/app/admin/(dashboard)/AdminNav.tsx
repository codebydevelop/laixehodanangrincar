'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Car, FileText, LayoutDashboard, LogOut, Menu, X } from 'lucide-react'
import { useState } from 'react'

const navLinks = [
  { href: '/admin', label: 'Tổng quan', icon: LayoutDashboard },
  { href: '/admin/bookings', label: 'Cuốc Xe', icon: Car },
  { href: '/admin/news', label: 'Tin Tức', icon: FileText },
]

export default function AdminNav() {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const isActive = (href: string) =>
    href === '/admin' ? pathname === '/admin' : pathname.startsWith(href)

  return (
    <>
      {/* ===== DESKTOP SIDEBAR ===== */}
      <aside className="hidden md:flex w-64 bg-slate-900 text-white flex-col shrink-0 min-h-screen">
        <div className="h-16 flex items-center border-b border-slate-800 hover:bg-slate-800 transition-colors">
          <Link href="/" className="flex items-center gap-3 w-full h-full px-4" title="Trở về Trang chủ">
            <div className="relative w-10 h-10 overflow-hidden rounded-full border-2 border-slate-700 bg-white shrink-0">
              <Image src="/images/logoRincar.png" alt="Rincar Logo" width={40} height={40} quality={100} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black text-white tracking-tight leading-none">RINCAR</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Lái Xe Hộ</span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 py-6 px-4 flex flex-col gap-2">
          {navLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium ${
                isActive(href)
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Icon size={20} />
              <span>{label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <form action="/api/auth/logout" method="post">
            <button className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-950/30 transition-colors font-medium">
              <LogOut size={20} />
              Đăng xuất
            </button>
          </form>
        </div>
      </aside>

      {/* ===== MOBILE TOP BAR ===== */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 h-14 bg-slate-900 flex items-center justify-between px-4 border-b border-slate-800">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-8 h-8 overflow-hidden rounded-full border border-slate-700 bg-white shrink-0">
            <Image src="/images/logoRincar.png" alt="Rincar Logo" width={32} height={32} quality={100} className="w-full h-full object-cover" />
          </div>
          <span className="text-white font-black tracking-tight text-base">RINCAR</span>
          <span className="text-slate-400 text-xs font-medium">Admin</span>
        </Link>

        <form action="/api/auth/logout" method="post">
          <button className="flex items-center gap-1 text-red-400 text-xs font-semibold px-3 py-1.5 rounded-lg border border-red-800/40 hover:bg-red-950/30 transition-colors">
            <LogOut size={14} />
            Xuất
          </button>
        </form>
      </div>

      {/* ===== MOBILE BOTTOM NAV ===== */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-900 border-t border-slate-800 flex">
        {navLinks.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex-1 flex flex-col items-center justify-center py-3 gap-1 transition-colors ${
              isActive(href)
                ? 'text-blue-400'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Icon size={22} />
            <span className="text-[10px] font-semibold">{label}</span>
          </Link>
        ))}
      </nav>
    </>
  )
}
