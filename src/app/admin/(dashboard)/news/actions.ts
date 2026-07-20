"use server"

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

export async function deleteNews(id: number) {
  const supabase = await createClient()
  await supabase.from('news').delete().eq('id', id)
  revalidatePath('/admin/news')
}

export async function togglePublishStatus(id: number, currentStatus: boolean) {
  const supabase = await createClient()
  await supabase.from('news').update({ is_published: !currentStatus }).eq('id', id)
  revalidatePath('/admin/news')
}

export async function saveNews(formData: FormData) {
  const id = formData.get('id')
  const title = formData.get('title') as string
  const slug = formData.get('slug') as string
  const excerpt = formData.get('excerpt') as string
  const content = formData.get('content') as string
  const is_published = formData.get('is_published') === 'true'

  // Xử lý upload ảnh
  let image_url = formData.get('image_url') as string
  const imageFile = formData.get('image') as File
  if (imageFile && imageFile.size > 0) {
    const bytes = await imageFile.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const cloudinary = require('cloudinary').v2
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    })

    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'datxehorincar/news' },
        (error: any, result: any) => {
          if (error) reject(error)
          else resolve(result)
        }
      )
      uploadStream.end(buffer)
    })

    image_url = (uploadResult as any).secure_url
  }

  const supabase = await createClient()

  const data = {
    title,
    slug,
    excerpt,
    image_url,
    content,
    is_published,
  }

  if (id) {
    // Cập nhật
    await supabase.from('news').update(data).eq('id', Number(id))
  } else {
    // Thêm mới
    await supabase.from('news').insert([data])
  }

  revalidatePath('/admin/news')
  redirect('/admin/news')
}
