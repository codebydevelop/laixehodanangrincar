import { NextRequest, NextResponse } from 'next/server'

const NOMINATIM_HEADERS = {
  'Accept-Language': 'vi-VN,vi;q=0.9',
  'User-Agent': 'RincarApp/1.0 (laixehodanang.com)',
  'Accept': 'application/json',
}

// Server-side proxy để tránh browser block custom User-Agent header
// Nominatim yêu cầu User-Agent hợp lệ, browser JS không được phép set header này

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const lat = searchParams.get('lat')
  const lon = searchParams.get('lon')

  if (!lat || !lon) {
    return NextResponse.json({ error: 'Thiếu tham số lat hoặc lon' }, { status: 400 })
  }

  const params = new URLSearchParams({
    lat,
    lon,
    format: 'json',
    addressdetails: '1',
    zoom: '18',
    namedetails: '1',
  })

  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?${params}`, {
      headers: NOMINATIM_HEADERS,
      next: { revalidate: 0 }, // không cache, luôn lấy kết quả mới
    })

    const text = await res.text()
    let data: Record<string, unknown>
    try {
      data = JSON.parse(text)
    } catch {
      console.error('Nominatim reverse error:', text)
      return NextResponse.json({ error: 'Lỗi từ Nominatim' }, { status: 502 })
    }

    return NextResponse.json(data)
  } catch (err) {
    console.error('Proxy reverse geocode error:', err)
    return NextResponse.json({ error: 'Không thể kết nối đến dịch vụ bản đồ' }, { status: 500 })
  }
}
