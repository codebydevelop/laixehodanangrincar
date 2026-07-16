"use client"

import { useState, useEffect } from 'react'
import { createBooking, updateBookingData } from './actions'

export default function BookingModal({ isOpen, onClose, booking }: { isOpen: boolean, onClose: () => void, booking: any }) {
  const [loading, setLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    phone: '',
    pickup: '',
    dropoff: '',
    service_type: '1 Chuyến',
    time_frame: 'Từ 10h đến 23h',
    waiting_time: '',
    is_scheduled: false,
    schedule_time: '',
    distance: '',
    price: '',
    status: 'Chờ xác nhận'
  })

  useEffect(() => {
    if (booking) {
      setFormData({
        phone: booking.phone || '',
        pickup: booking.pickup || '',
        dropoff: booking.dropoff || '',
        service_type: booking.service_type || '1 Chuyến',
        time_frame: booking.time_frame || 'Từ 10h đến 23h',
        waiting_time: booking.waiting_time || '',
        is_scheduled: booking.is_scheduled || false,
        schedule_time: booking.schedule_time || '',
        distance: booking.distance?.toString() || '',
        price: booking.price?.toString() || '',
        status: booking.status || 'Chờ xác nhận'
      })
    } else {
      setFormData({
        phone: '', pickup: '', dropoff: '', service_type: '1 Chuyến',
        time_frame: 'Từ 10h đến 23h', waiting_time: '', is_scheduled: false,
        schedule_time: '', distance: '', price: '', status: 'Chờ xác nhận'
      })
    }
  }, [booking, isOpen])

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const payload = {
        ...formData,
        distance: formData.distance ? parseFloat(formData.distance) : null,
        price: formData.price ? parseFloat(formData.price) : null
      }
      
      if (booking) {
        await updateBookingData(booking.id, payload)
      } else {
        await createBooking(payload)
      }
      onClose()
    } catch (error) {
      alert('Có lỗi xảy ra: ' + error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({ ...prev, [name]: checked }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h3 className="text-xl font-bold text-slate-800">
            {booking ? 'Sửa Đơn Đặt Xe' : 'Thêm Đơn Mới'}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto">
          <form id="booking-form" onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-medium text-slate-700 mb-1">Số điện thoại *</label>
                <input required type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900" />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-medium text-slate-700 mb-1">Trạng thái</label>
                <select name="status" value={formData.status} onChange={handleChange} className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 bg-white">
                  <option value="Chờ xác nhận">Chờ xác nhận</option>
                  <option value="Đã nhận cuốc">Đã nhận cuốc</option>
                  <option value="Hoàn thành">Hoàn thành</option>
                  <option value="Đã hủy">Đã hủy</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Điểm đón *</label>
                <input required type="text" name="pickup" value={formData.pickup} onChange={handleChange} className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900" />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Điểm đến *</label>
                <input required type="text" name="dropoff" value={formData.dropoff} onChange={handleChange} className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900" />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-medium text-slate-700 mb-1">Loại dịch vụ</label>
                <select name="service_type" value={formData.service_type} onChange={handleChange} className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 bg-white">
                  <option value="1 Chuyến">1 Chuyến</option>
                  <option value="2 Chiều">2 Chiều</option>
                  <option value="Theo Giờ">Theo Giờ</option>
                </select>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-medium text-slate-700 mb-1">Khung giờ</label>
                <input type="text" name="time_frame" value={formData.time_frame} onChange={handleChange} className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900" />
              </div>
              
              <div className="col-span-2 flex items-center gap-2 mt-2">
                <input type="checkbox" name="is_scheduled" checked={formData.is_scheduled} onChange={handleChange} className="w-4 h-4 text-blue-600" />
                <label className="text-sm font-medium text-slate-700">Là lịch hẹn trước?</label>
              </div>
              
              {formData.is_scheduled && (
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Thời gian đón</label>
                  <input type="datetime-local" name="schedule_time" value={formData.schedule_time} onChange={handleChange} className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900" />
                </div>
              )}
              
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-medium text-slate-700 mb-1">Thời gian chờ (nếu có)</label>
                <input type="text" name="waiting_time" value={formData.waiting_time} onChange={handleChange} className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900" placeholder="VD: 30 phút" />
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-medium text-slate-700 mb-1">Khoảng cách (km)</label>
                <input type="number" step="0.1" name="distance" value={formData.distance} onChange={handleChange} className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900" />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-medium text-slate-700 mb-1">Giá cước (VNĐ)</label>
                <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900" />
              </div>
            </div>
          </form>
        </div>
        
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
          <button onClick={onClose} disabled={loading} className="px-4 py-2 text-slate-600 hover:bg-slate-200 font-medium rounded-lg transition-colors">
            Hủy
          </button>
          <button type="submit" form="booking-form" disabled={loading} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2">
            {loading ? 'Đang lưu...' : 'Lưu lại'}
          </button>
        </div>
      </div>
    </div>
  )
}
