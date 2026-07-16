import { ShieldCheck, Target, Users, Award } from 'lucide-react'

export const metadata = {
  title: 'Giới Thiệu | Lái Xe Hộ Đà Nẵng Rincar',
  description: 'Tìm hiểu về sứ mệnh, tầm nhìn và giá trị cốt lõi của Rincar - Dịch vụ lái xe hộ hàng đầu tại Đà Nẵng.',
}

export default function AboutPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070')] bg-cover bg-center opacity-20"></div>
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Về RINCAR</h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
            Hành trình xây dựng niềm tin và mang lại sự an toàn cho mỗi chuyến đi tại Đà Nẵng.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-slate-800 mb-6">Câu chuyện của chúng tôi</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed text-lg">
                <p>
                  Khởi nguồn từ những trăn trở về an toàn giao thông sau những cuộc vui, <strong>Lái xe hộ Đà Nẵng RINCAR</strong> được thành lập với mục tiêu duy nhất: "Bảo vệ bạn và xế cưng an toàn về đến nhà".
                </p>
                <p>
                  Chúng tôi hiểu rằng, đôi khi một ly rượu hay sự mệt mỏi sau ngày dài làm việc có thể trở thành mối nguy hiểm tiềm tàng phía sau vô lăng. Thay vì mạo hiểm, RINCAR mang đến giải pháp tiện lợi, chuyên nghiệp để bạn hoàn toàn yên tâm tận hưởng cuộc sống.
                </p>
                <p>
                  Trải qua quá trình hình thành và phát triển, RINCAR tự hào đã phục vụ hàng ngàn khách hàng tại khu vực Đà Nẵng, Quảng Nam, góp phần xây dựng một cộng đồng tham gia giao thông an toàn và văn minh hơn.
                </p>
              </div>
            </div>
            <div className="flex-1">
              <div className="relative">
                <div className="absolute -inset-4 bg-blue-100 rounded-3xl transform -rotate-3 -z-10"></div>
                <img 
                  src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070" 
                  alt="Lái xe chuyên nghiệp" 
                  className="rounded-2xl shadow-xl object-cover w-full h-[400px]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Giá Trị Cốt Lõi</h2>
            <div className="h-1 w-20 bg-blue-600 mx-auto rounded"></div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-800">An Toàn</h3>
              <p className="text-slate-600">Sự an toàn của khách hàng và tài sản là ưu tiên số một trong mọi chuyến đi.</p>
            </div>

            <div className="text-center p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Target size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-800">Trách Nhiệm</h3>
              <p className="text-slate-600">Cam kết phục vụ đúng giờ, chuẩn xác và chịu trách nhiệm tuyệt đối trong công việc.</p>
            </div>

            <div className="text-center p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Award size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-800">Chất Lượng</h3>
              <p className="text-slate-600">Tài xế được tuyển chọn khắt khe, đào tạo bài bản và có thái độ phục vụ chuẩn mực.</p>
            </div>

            <div className="text-center p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-800">Tận Tâm</h3>
              <p className="text-slate-600">Lắng nghe và phục vụ khách hàng bằng cả trái tim, mang lại sự thoải mái nhất.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
