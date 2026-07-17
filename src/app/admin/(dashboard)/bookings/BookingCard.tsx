"use client"

import { updateBookingStatus, deleteBooking } from './actions'
import { Phone, MapPin, Clock, Car, Calendar, Route, Banknote, Trash2, Pencil } from 'lucide-react'

const STATUS_STYLES: Record<string, string> = {
  'Chờ xác nhận': 'bg-yellow-100 text-yellow-700 border-yellow-200',
  'Đã nhận cuốc': 'bg-blue-100 text-blue-700 border-blue-200',
  'Hoàn thành':   'bg-green-100 text-green-700 border-green-200',
  'Đã hủy':       'bg-red-100 text-red-600 border-red-200',
}

export default function BookingCard({ booking, onEdit }: { booking: any; onEdit?: () => void }) {
  const price = booking.price
    ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(booking.price)
    : null

  const currentStatus = booking.status || 'Chờ xác nhận'

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Phone size={15} className="text-slate-400" />
          <span className="font-bold text-slate-800 text-base">{booking.phone}</span>
        </div>
        <span className="text-xs text-slate-400">
          {new Date(booking.created_at).toLocaleString('vi-VN')}
        </span>
      </div>

      {/* Body */}
      <div className="px-4 py-3 space-y-2.5">
        <div className="flex items-start gap-2">
          <MapPin size={15} className="text-blue-400 mt-0.5 shrink-0" />
          <div>
            <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wide">Điểm đón</p>
            <p className="text-sm text-slate-700 leading-snug">{booking.pickup}</p>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <MapPin size={15} className="text-red-400 mt-0.5 shrink-0" />
          <div>
            <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wide">Điểm đến</p>
            <p className="text-sm text-slate-700 leading-snug">{booking.dropoff}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1">
          {booking.service_type && (
            <div className="flex items-center gap-1.5">
              <Car size={13} className="text-slate-400 shrink-0" />
              <span className="text-xs text-slate-600">{booking.service_type}</span>
            </div>
          )}
          {booking.time_frame && (
            <div className="flex items-center gap-1.5">
              <Clock size={13} className="text-slate-400 shrink-0" />
              <span className="text-xs text-slate-600">{booking.time_frame}</span>
            </div>
          )}
          {booking.distance && (
            <div className="flex items-center gap-1.5">
              <Route size={13} className="text-slate-400 shrink-0" />
              <span className="text-xs text-slate-600">{booking.distance} km</span>
            </div>
          )}
          {price && (
            <div className="flex items-center gap-1.5">
              <Banknote size={13} className="text-yellow-500 shrink-0" />
              <span className="text-xs font-semibold text-yellow-600">{price}</span>
            </div>
          )}
        </div>

        {booking.is_scheduled && booking.schedule_time && (
          <div className="flex items-center gap-1.5 bg-blue-50 rounded-lg px-3 py-2">
            <Calendar size={13} className="text-blue-500 shrink-0" />
            <span className="text-xs font-medium text-blue-600">Lịch hẹn: {booking.schedule_time}</span>
          </div>
        )}
      </div>

      {/* Footer: Status + Actions */}
      <div className="flex items-center justify-between gap-2 px-4 py-3 border-t border-slate-100">
        <select
          defaultValue={currentStatus}
          onChange={(e) => updateBookingStatus(booking.id, e.target.value)}
          className={`text-xs font-semibold px-2.5 py-1.5 rounded-full border appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300 ${STATUS_STYLES[currentStatus] || 'bg-slate-100 text-slate-600 border-slate-200'}`}
        >
          <option value="Chờ xác nhận">Chờ xác nhận</option>
          <option value="Đã nhận cuốc">Đã nhận cuốc</option>
          <option value="Hoàn thành">Hoàn thành</option>
          <option value="Đã hủy">Đã hủy</option>
        </select>

        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-medium px-3 py-1.5 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
          >
            <Pencil size={13} /> Sửa
          </button>
          <button
            onClick={() => {
              if (confirm('Bạn có chắc chắn muốn xoá đơn này?')) {
                deleteBooking(booking.id)
              }
            }}
            className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 font-medium px-3 py-1.5 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
          >
            <Trash2 size={13} /> Xóa
          </button>
        </div>
      </div>
    </div>
  )
}
