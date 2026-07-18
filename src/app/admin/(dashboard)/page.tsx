import { createClient } from '@/utils/supabase/server'

export default async function AdminDashboard() {
  const supabase = await createClient()

  const { count: bookingsCount } = await supabase.from('bookings').select('*', { count: 'exact', head: true })
  const { count: newsCount } = await supabase.from('news').select('*', { count: 'exact', head: true })

  // Tính tổng doanh thu các đơn 'Hoàn thành'
  const { data: completedBookings } = await supabase
    .from('bookings')
    .select('price')
    .eq('status', 'Hoàn thành')

  const totalRevenue = completedBookings?.reduce((sum, b) => sum + (Number(b.price) || 0), 0) || 0
  const formattedRevenue = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalRevenue)

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-slate-800 mb-8">Tổng Quan Hệ Thống</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-center">
          <p className="text-slate-500 font-medium mb-1">Tổng Cuốc Xe</p>
          <h3 className="text-4xl font-black text-blue-600">{bookingsCount || 0}</h3>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-center">
          <p className="text-slate-500 font-medium mb-1">Tổng Bài Viết</p>
          <h3 className="text-4xl font-black text-indigo-600">{newsCount || 0}</h3>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-center">
          <p className="text-slate-500 font-medium mb-1">Tổng Doanh Thu</p>
          <h3 className="text-4xl font-black text-green-600">{formattedRevenue}</h3>
        </div>
      </div>
    </div>
  )
}
