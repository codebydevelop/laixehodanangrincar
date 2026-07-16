"use server"

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateBookingStatus(id: number, status: string) {
  const supabase = await createClient()
  await supabase.from('bookings').update({ status }).eq('id', id)
  revalidatePath('/admin/bookings')
}

export async function deleteBooking(id: number) {
  const supabase = await createClient()
  await supabase.from('bookings').delete().eq('id', id)
  revalidatePath('/admin/bookings')
}

export async function createBooking(data: any) {
  const supabase = await createClient()
  const { error } = await supabase.from('bookings').insert([data])
  if (error) {
    throw new Error(error.message)
  }
  revalidatePath('/admin/bookings')
}

export async function updateBookingData(id: number, data: any) {
  const supabase = await createClient()
  const { error } = await supabase.from('bookings').update(data).eq('id', id)
  if (error) {
    throw new Error(error.message)
  }
  revalidatePath('/admin/bookings')
}
