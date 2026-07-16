"use client"

import { useState } from 'react'
import BookingTableRow from './BookingTableRow'
import BookingModal from './BookingModal'

export default function BookingsManager({ bookings }: { bookings: any[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingBooking, setEditingBooking] = useState<any>(null)

  const handleEdit = (booking: any) => {
    setEditingBooking(booking)
    setIsModalOpen(true)
  }

  const handleAddNew = () => {
    setEditingBooking(null)
    setIsModalOpen(true)
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800">Quản Lý Đơn Đặt Xe</h2>
        <button onClick={handleAddNew} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium shadow-sm flex items-center gap-2 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" /></svg>
          Thêm Đơn Mới
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm whitespace-nowrap">
                <th className="p-4 font-semibold">Số điện thoại</th>
                <th className="p-4 font-semibold">Điểm đón</th>
                <th className="p-4 font-semibold">Điểm đến</th>
                <th className="p-4 font-semibold">Loại dịch vụ</th>
                <th className="p-4 font-semibold">Khung giờ</th>
                <th className="p-4 font-semibold">Thời gian chờ</th>
                <th className="p-4 font-semibold">Lịch hẹn</th>
                <th className="p-4 font-semibold">Quãng đường</th>
                <th className="p-4 font-semibold">Giá cước</th>
                <th className="p-4 font-semibold">Ngày tạo</th>
                <th className="p-4 font-semibold">Trạng thái</th>
                <th className="p-4 font-semibold text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {bookings && bookings.length > 0 ? (
                bookings.map((booking) => (
                  <BookingTableRow 
                    key={booking.id} 
                    booking={booking} 
                    onEdit={() => handleEdit(booking)} 
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={12} className="p-8 text-center text-slate-500">
                    Chưa có đơn đặt xe nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <BookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        booking={editingBooking} 
      />
    </div>
  )
}
