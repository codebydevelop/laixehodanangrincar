import { createClient } from '@/utils/supabase/server'
import BookingsManager from './BookingsManager'

export const dynamic = 'force-dynamic'

export default async function AdminBookings() {
  const supabase = await createClient()

  // Lấy dữ liệu từ Supabase, mới nhất lên đầu
  const { data: bookings } = await supabase
    .from('bookings')
    .select('*')
    .order('created_at', { ascending: false })

  return <BookingsManager bookings={bookings || []} />
}
