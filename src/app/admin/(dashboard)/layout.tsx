import type { Metadata } from 'next'
import Link from 'next/link'
import { Car, FileText, LayoutDashboard, LogOut } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Admin | Rincar',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="h-16 flex items-center justify-center border-b border-slate-800 hover:bg-slate-800 transition-colors">
          <Link href="/" className="flex items-center gap-3 w-full h-full px-4" title="Trở về Trang chủ">
            <div className="relative w-10 h-10 overflow-hidden rounded-full border-2 border-slate-700 bg-white shrink-0">
              <img 
                src="/images/logo.png" 
                alt="Rincar Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black text-white tracking-tight leading-none">RINCAR</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                Lái Xe Hộ
              </span>
            </div>
          </Link>
        </div>
        
        <nav className="flex-1 py-6 px-4 flex flex-col gap-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors">
            <LayoutDashboard size={20} />
            <span className="font-medium">Tổng quan</span>
          </Link>
          <Link href="/admin/bookings" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors">
            <Car size={20} />
            <span className="font-medium">Quản lý Cuốc Xe</span>
          </Link>
          <Link href="/admin/news" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors">
            <FileText size={20} />
            <span className="font-medium">Quản lý Tin Tức</span>
          </Link>
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

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden flex flex-col">
        {children}
      </main>
    </div>
  )
}
