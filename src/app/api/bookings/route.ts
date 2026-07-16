import { createClient } from '@/utils/supabase/server'
import { NextResponse, NextRequest } from 'next/server'
import nodemailer from 'nodemailer'
import { isRateLimited, isValidVietnamesePhone } from '@/utils/rate-limit'

export async function POST(request: NextRequest) {
  // --- RATE LIMITING: Sliding Window + Burst Detection ---
  // Chặn nếu: gửi >3 request trong 10 giây (burst), hoặc >10 request trong 1 phút
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? request.headers.get('x-real-ip') ?? '127.0.0.1'
  if (isRateLimited(ip, {
    maxRequests: 10,
    windowMs: 60 * 1000,      // 10 lần / 1 phút
    burstMax: 3,
    burstWindowMs: 10 * 1000, // hoặc 3 lần / 10 giây
  })) {
    return NextResponse.json(
      { error: 'Vui lòng không gửi quá nhiều yêu cầu cùng lúc. Hãy thử lại sau vài giây.' },
      { status: 429 }
    )
  }

  try {
    const body = await request.json()
    const { 
      phone, 
      pickup, 
      dropoff, 
      service_type, 
      time_frame, 
      waiting_time, 
      is_scheduled, 
      schedule_time, 
      distance, 
      price 
    } = body

    if (!phone || !pickup || !dropoff) {
      return NextResponse.json({ error: 'Thiếu thông tin bắt buộc' }, { status: 400 })
    }

    // --- VALIDATE SỐ ĐIỆN THOẠI VIỆT NAM ---
    if (!isValidVietnamesePhone(phone)) {
      return NextResponse.json(
        { error: 'Số điện thoại không hợp lệ. Vui lòng nhập số điện thoại Việt Nam 10 số (bắt đầu bằng 03x, 05x, 07x, 08x, 09x).' },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // 1. Insert into Supabase
    const { data, error: dbError } = await supabase
      .from('bookings')
      .insert([
        {
          phone,
          pickup,
          dropoff,
          service_type,
          time_frame,
          waiting_time,
          is_scheduled,
          schedule_time,
          distance,
          price
        }
      ])
      .select()

    if (dbError) {
      console.error('Supabase insert error:', JSON.stringify(dbError))
      return NextResponse.json({ error: `DB Error: ${dbError.message} (code: ${dbError.code})` }, { status: 500 })
    }

    // 2. Send Email via Nodemailer
    const emailUser = process.env.EMAIL_USER
    const emailPass = process.env.EMAIL_PASS

    if (emailUser && emailPass) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: emailUser,
          pass: emailPass
        }
      })

      const bookingId = data[0].id
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

      const mailOptions = {
        from: `"Rincar System" <${emailUser}>`,
        to: emailUser, // Send to admin
        subject: `[RINCAR] Có đơn đặt xe mới từ ${phone}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
            <div style="background-color: #2563eb; color: white; padding: 20px; border-radius: 10px 10px 0 0;">
              <h2 style="margin: 0;">Đơn Đặt Xe Mới!</h2>
            </div>
            <div style="padding: 20px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
              <p><strong>Khách hàng:</strong> ${phone}</p>
              <p><strong>Điểm đón:</strong> ${pickup}</p>
              <p><strong>Điểm đến:</strong> ${dropoff}</p>
              <p><strong>Loại dịch vụ:</strong> ${service_type}</p>
              <p><strong>Khung giờ:</strong> ${time_frame}</p>
              <p><strong>Khoảng cách:</strong> ${distance} km</p>
              <p><strong>Cước phí:</strong> ${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)}</p>

              <div style="margin-top: 30px; padding-top: 20px; border-top: 2px dashed #e5e7eb;">
                <h3 style="margin-top: 0;">Cập Nhật Trạng Thái Nhanh:</h3>
                <p style="font-size: 14px; color: #6b7280; margin-bottom: 15px;">Bấm vào một trong các nút dưới đây để cập nhật trạng thái đơn hàng ngay lập tức.</p>
                <div style="display: flex; gap: 10px;">
                  <a href="${baseUrl}/api/bookings/update-status?id=${bookingId}&status=Đã+nhận+cuốc" style="display: inline-block; padding: 12px 20px; background-color: #3b82f6; color: white; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 14px;">Đã nhận cuốc</a>
                  <a href="${baseUrl}/api/bookings/update-status?id=${bookingId}&status=Hoàn+thành" style="display: inline-block; padding: 12px 20px; background-color: #10b981; color: white; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 14px; margin-left: 10px;">Hoàn thành</a>
                  <a href="${baseUrl}/api/bookings/update-status?id=${bookingId}&status=Đã+hủy" style="display: inline-block; padding: 12px 20px; background-color: #ef4444; color: white; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 14px; margin-left: 10px;">Đã hủy</a>
                </div>
              </div>
            </div>
          </div>
        `
      }

      await transporter.sendMail(mailOptions)
    } else {
      console.warn('Email credentials are not set in .env.local')
    }

    return NextResponse.json({ success: true, data })
  } catch (error: any) {
    console.error('Server error:', error)
    return NextResponse.json({ error: error.message || 'Lỗi server' }, { status: 500 })
  }
}
