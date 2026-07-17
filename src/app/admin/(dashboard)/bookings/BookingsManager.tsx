"use client"

import { useState } from 'react'
import BookingCard from './BookingCard'
import BookingModal from './BookingModal'
import { Plus } from 'lucide-react'

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
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800">Quản Lý Đơn Đặt Xe</h2>
          <p className="text-sm text-slate-500 mt-1">{bookings?.length || 0} đơn</p>
        </div>
        <button
          onClick={handleAddNew}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-semibold shadow-sm flex items-center gap-2 transition-colors text-sm"
        >
          <Plus size={18} />
          <span className="hidden sm:inline">Thêm Đơn Mới</span>
          <span className="sm:hidden">Thêm</span>
        </button>
      </div>

      {/* Card Grid */}
      {bookings && bookings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {bookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              onEdit={() => handleEdit(booking)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
          <svg className="w-16 h-16 mb-4 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <p className="font-medium text-lg">Chưa có đơn đặt xe nào</p>
          <p className="text-sm mt-1">Nhấn &ldquo;Thêm&rdquo; để tạo đơn mới</p>
        </div>
      )}

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        booking={editingBooking}
      />
    </div>
  )
}
