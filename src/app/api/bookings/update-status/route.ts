import { createClient } from '@/utils/supabase/server'
import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const id = searchParams.get('id')
  const status = searchParams.get('status')

  if (!id || !status) {
    return NextResponse.json({ error: 'Thiếu thông tin id hoặc trạng thái.' }, { status: 400 })
  }

  const supabase = await createClient()
  
  const { error } = await supabase
    .from('bookings')
    .update({ status })
    .eq('id', id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  return NextResponse.redirect(`${baseUrl}/admin/bookings?status_updated=true`)
}
