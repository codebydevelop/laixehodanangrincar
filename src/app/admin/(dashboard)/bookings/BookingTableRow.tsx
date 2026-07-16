"use client"

import { updateBookingStatus, deleteBooking } from './actions'

export default function BookingTableRow({ booking, onEdit }: { booking: any, onEdit?: () => void }) {
  return (
    <tr className="border-b border-slate-200 hover:bg-slate-50 text-sm whitespace-nowrap text-slate-800">
      <td className="p-4 align-top font-medium">{booking.phone}</td>
      <td className="p-4 align-top max-w-[200px] truncate" title={booking.pickup}>{booking.pickup}</td>
      <td className="p-4 align-top max-w-[200px] truncate" title={booking.dropoff}>{booking.dropoff}</td>
      <td className="p-4 align-top">{booking.service_type || '-'}</td>
      <td className="p-4 align-top">{booking.time_frame || '-'}</td>
      <td className="p-4 align-top">{booking.waiting_time || '-'}</td>
      <td className="p-4 align-top">
        {booking.is_scheduled ? (
          <span className="text-blue-600 font-medium">{booking.schedule_time}</span>
        ) : (
          <span className="text-slate-400">Không</span>
        )}
      </td>
      <td className="p-4 align-top">{booking.distance ? `${booking.distance} km` : '-'}</td>
      <td className="p-4 align-top font-medium text-yellow-600">
        {booking.price ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(booking.price) : '-'}
      </td>
      <td className="p-4 align-top text-slate-500">
        {new Date(booking.created_at).toLocaleString('vi-VN')}
      </td>
      <td className="p-4 align-top">
        <select
          defaultValue={booking.status || 'Chờ xác nhận'}
          onChange={(e) => updateBookingStatus(booking.id, e.target.value)}
          className="text-sm border border-slate-300 rounded-md px-2 py-1.5 focus:ring-blue-500 focus:border-blue-500 bg-white"
        >
          <option value="Chờ xác nhận">Chờ xác nhận</option>
          <option value="Đã nhận cuốc">Đã nhận cuốc</option>
          <option value="Hoàn thành">Hoàn thành</option>
          <option value="Đã hủy">Đã hủy</option>
        </select>
      </td>
      <td className="p-4 align-top text-right space-x-2">
        <button
          onClick={onEdit}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium px-3 py-1.5 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"
        >
          Sửa
        </button>
        <button
          onClick={() => {
            if (confirm('Bạn có chắc chắn muốn xoá đơn này?')) {
              deleteBooking(booking.id)
            }
          }}
          className="text-sm text-red-500 hover:text-red-700 font-medium px-3 py-1.5 bg-red-50 hover:bg-red-100 rounded-md transition-colors"
        >
          Xóa
        </button>
      </td>
    </tr>
  )
}
