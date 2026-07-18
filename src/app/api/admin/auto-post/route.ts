import { NextResponse } from 'next/server'
import { GoogleGenAI } from '@google/genai'
import { createClient } from '@/utils/supabase/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

export async function POST(req: Request) {
  try {
    const { topic = 'Dịch vụ lái xe hộ và đặt xe ở Đà Nẵng' } = await req.json()
    
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'Thiếu API Key trong cấu hình' }, { status: 400 })
    }

    const ai = new GoogleGenAI({ apiKey })

    // 1. Generate SEO Content
    const prompt = `Bạn là một chuyên gia Content SEO xuất sắc (chuẩn Rank Math SEO). Hãy viết một bài viết chuẩn SEO về chủ đề: "${topic}".
    
    YÊU CẦU BẮT BUỘC (RULE VIẾT BÀI RANK MATH SEO):
    1. Độ dài: 800 - 1000 từ, cấu trúc đoạn văn ngắn gọn, dễ đọc.
    2. Cấu trúc bài viết (Sườn bài đồng bộ):
       - Thẻ H1: Là Tiêu đề bài viết (tối đa 60 ký tự, chứa từ khóa chính, cực kỳ hấp dẫn).
       - Mở bài (Đoạn đầu tiên): Bắt buộc chứa từ khóa chính tự nhiên nhất.
       - Thẻ H2: Giới thiệu chi tiết dịch vụ (phải có chứa từ khoá chính ở ít nhất 1 thẻ H2).
       - Thẻ H2: Bảng giá / Lợi ích vượt trội (sử dụng bullet points <ul><li>).
       - Thẻ H2: Kết luận và Lời kêu gọi hành động (Call to Action).
    3. Định dạng: Sử dụng các thẻ HTML cơ bản (h2, h3, p, strong, ul, li). KHÔNG dùng markdown.
    4. Internal Link: Chèn 2-3 link chéo tự nhiên nhất vào văn bản (ví dụ: <a href="/dich-vu"><strong>thuê xe ô tô Đà Nẵng</strong></a> hoặc <a href="/lien-he"><strong>lái xe hộ</strong></a>).
    5. Nút Kêu Gọi Hành Động (CTA):
       - Ở cuối bài, KHÔNG ĐƯỢC dùng số điện thoại ảo hay thông tin giả (như 09XX, [Địa chỉ]).
       - Bắt buộc chèn HTML 2 nút bấm này vào vị trí đẹp (có thể trong 1 thẻ <div> có class flex gap-4):
         <a href="tel:0906499078" style="display:inline-block; background-color:#2563eb; color:white; padding:10px 20px; border-radius:8px; font-weight:bold; text-decoration:none; margin-right:10px;">Gọi 0906.499.078</a>
         <a href="https://zalo.me/0906499078" target="_blank" style="display:inline-block; background-color:#0068ff; color:white; padding:10px 20px; border-radius:8px; font-weight:bold; text-decoration:none;">Nhắn Zalo Ngay</a>
    6. Hình ảnh:
       - Bạn cần suy nghĩ ra 2 BỨC ẢNH MÔ TẢ để AI vẽ ra.
       - BẮT BUỘC để trống chính xác 2 đoạn text là IMAGE_1 và IMAGE_2 ở các vị trí phân bổ đều (sau các đoạn H2). Hệ thống sẽ tự động chèn ảnh vào đây.

    Vui lòng trả về định dạng JSON thuần (KHÔNG DÙNG markdown code block như \`\`\`json, chỉ là JSON raw) với cấu trúc sau:
    {
      "title": "Tiêu đề bài viết (Hấp dẫn, tối đa 60 ký tự)",
      "slug": "tieu-de-bai-viet-khong-dau-cach-ngang",
      "excerpt": "Đoạn meta description ngắn khoảng 150-160 ký tự, chứa từ khóa",
      "content": "Nội dung bài viết (HTML chuẩn SEO như yêu cầu, có chứa IMAGE_1 và IMAGE_2)",
      "imagePrompt1": "Prompt tiếng anh cực kỳ chi tiết mô tả ảnh 1 (VD: A modern luxury SUV driving on a beautiful beach road in Da Nang, bright sunny day, photorealistic, 8k resolution, highly detailed)",
      "imagePrompt2": "Prompt tiếng anh cực kỳ chi tiết mô tả ảnh 2 (VD: Professional Vietnamese driver in a suit smiling and opening the door of a black luxury car, high quality photography, sharp focus)"
    }`

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      }
    })

    const text = response.text
    if (!text) throw new Error('Không thể tạo nội dung')

    const generatedData = JSON.parse(text)
    let { title, slug, excerpt, content, imagePrompt1, imagePrompt2 } = generatedData

    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'news')
    await mkdir(uploadDir, { recursive: true }).catch(() => {})

    async function generateImage(promptText: string, suffix: string) {
      try {
        const seed = Math.floor(Math.random() * 100000)
        // Thêm các keyword để ép AI vẽ ảnh thật rõ nét, phong cách nhiếp ảnh
        const finalPrompt = promptText + ", photorealistic, high resolution, clear, professional photography, dslr"
        const encoded = encodeURIComponent(finalPrompt)
        const url = `https://image.pollinations.ai/prompt/${encoded}?width=1024&height=576&nologo=true&seed=${seed}`
        
        const res = await fetch(url)
        if (res.ok) {
          const arrayBuffer = await res.arrayBuffer()
          const buffer = Buffer.from(arrayBuffer)
          const filename = `${Date.now()}-${suffix}.jpg`
          const filepath = path.join(uploadDir, filename)
          await writeFile(filepath, buffer)
          return `/uploads/news/${filename}`
        }
      } catch (e) {
        console.error('Lỗi tạo ảnh AI:', e)
      }
      return null
    }

    const [img1, img2] = await Promise.all([
      generateImage(imagePrompt1 || 'Beautiful modern car in Da Nang', '1'),
      generateImage(imagePrompt2 || 'Tourist traveling in a luxury car', '2')
    ])

    let imageUrl1 = img1 || '/images/xe.jpg'
    let imageUrl2 = img2 || '/images/logoRincar.png'

    // Nếu AI không trả về IMAGE_1/IMAGE_2 trong content, ta tự chèn vào
    if (!content.includes('IMAGE_1')) {
      content = content + `\n\n<p><img src="IMAGE_1" alt="${title}" className="w-full rounded-xl my-6 shadow-md" /></p>`
    }
    if (!content.includes('IMAGE_2')) {
      content = content + `\n\n<p><img src="IMAGE_2" alt="${title}" className="w-full rounded-xl my-6 shadow-md" /></p>`
    }

    // 3. Replace placeholders in content
    content = content.replace('IMAGE_1', imageUrl1)
    content = content.replace('IMAGE_2', imageUrl2)

    // 4. Save to Database
    const supabase = await createClient()
    const { data, error } = await supabase.from('news').insert([
      {
        title,
        slug,
        excerpt,
        content,
        image_url: imageUrl1, // Use first image as thumbnail
        is_published: true
      }
    ]).select()

    if (error) throw error

    return NextResponse.json({ success: true, post: data[0] })
  } catch (error: any) {
    console.error('Auto post error:', error)
    return NextResponse.json({ error: error.message || 'Đã xảy ra lỗi' }, { status: 500 })
  }
}
