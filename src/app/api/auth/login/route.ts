import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()

    const validUsername = process.env.ADMIN_USERNAME
    const validPassword = process.env.ADMIN_PASSWORD

    if (username === validUsername && password === validPassword) {
      // Set an HTTP-only cookie using NextResponse
      const response = NextResponse.json({ success: true })
      
      response.cookies.set({
        name: 'admin_token',
        value: validPassword as string, // Sử dụng mật khẩu làm token để chống giả mạo
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 1 week
      })

      return response
    }

    return NextResponse.json(
      { error: 'Tên đăng nhập hoặc mật khẩu không đúng' },
      { status: 401 }
    )
  } catch (error: any) {
    console.error("Login API Error:", error);
    return NextResponse.json(
      { error: 'Lỗi server: ' + (error.message || String(error)) },
      { status: 500 }
    )
  }
}
