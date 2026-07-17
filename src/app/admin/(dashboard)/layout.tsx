import type { Metadata } from 'next'
import AdminNav from './AdminNav'

export const metadata: Metadata = {
  title: 'Admin | Rincar',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminNav />

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden flex flex-col
        pt-14 pb-20 md:pt-0 md:pb-0">
        {children}
      </main>
    </div>
  )
}
