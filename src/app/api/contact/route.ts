import { NextResponse, NextRequest } from 'next/server'
import nodemailer from 'nodemailer'
import { isRateLimited, isValidVietnamesePhone } from '@/utils/rate-limit'

export async function POST(request: NextRequest) {
  // --- RATE LIMITING: Sliding Window + Burst Detection ---
  // Chặn nếu: gửi >2 request trong 10 giây (burst), hoặc >5 request trong 1 phút
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? request.headers.get('x-real-ip') ?? '127.0.0.1'
  if (isRateLimited(ip, {
    maxRequests: 5,
    windowMs: 60 * 1000,      // 5 lần / 1 phút
    burstMax: 2,
    burstWindowMs: 10 * 1000, // hoặc 2 lần / 10 giây
  })) {
    return NextResponse.json(
      { error: 'Vui lòng không gửi quá nhiều yêu cầu cùng lúc. Hãy thử lại sau vài giây.' },
      { status: 429 }
    )
  }

  try {
    const { name, phone, message } = await request.json()

    if (!name || !phone) {
      return NextResponse.json(
        { error: 'Vui lòng điền họ tên và số điện thoại.' },
        { status: 400 }
      )
    }

    // --- VALIDATE SỐ ĐIỆN THOẠI VIỆT NAM ---
    if (!isValidVietnamesePhone(phone)) {
      return NextResponse.json(
        { error: 'Số điện thoại không hợp lệ. Vui lòng nhập 10 số (bắt đầu bằng 03x, 05x, 07x, 08x, 09x).' },
        { status: 400 }
      )
    }


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

      const mailOptions = {
        from: `"Rincar Contact Form" <${emailUser}>`,
        to: emailUser, // Send to themselves
        subject: `[LIÊN HỆ MỚI] Từ ${name} - ${phone}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
            <div style="background-color: #2563eb; color: white; padding: 20px; text-align: center;">
              <h2 style="margin: 0;">TIN NHẮN LIÊN HỆ MỚI</h2>
            </div>
            <div style="padding: 20px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold; width: 150px;">Họ và Tên:</td>
                  <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Số điện thoại:</td>
                  <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; color: #e11d48; font-weight: bold;">${phone}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; font-weight: bold;" colspan="2">Nội dung tin nhắn:</td>
                </tr>
                <tr>
                  <td style="padding: 10px; background-color: #f8fafc; border-radius: 6px;" colspan="2">
                    ${message ? message.replace(/\n/g, '<br>') : '<i>Không có nội dung tin nhắn.</i>'}
                  </td>
                </tr>
              </table>
            </div>
            <div style="background-color: #f8fafc; padding: 15px; text-align: center; font-size: 12px; color: #64748b;">
              Email này được gửi tự động từ form liên hệ trên website Rincar.
            </div>
          </div>
        `
      }

      await transporter.sendMail(mailOptions)
      return NextResponse.json({ success: true })
    } else {
      console.warn('Email credentials not configured in .env.local')
      return NextResponse.json({ error: 'Hệ thống gửi mail chưa được cấu hình.' }, { status: 500 })
    }

  } catch (error: any) {
    console.error('Contact error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
