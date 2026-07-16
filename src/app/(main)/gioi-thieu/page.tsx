import { ShieldCheck, Target, Users, Award, Eye, Compass, ClipboardCheck, ShieldAlert } from 'lucide-react'

export const metadata = {
  title: 'Giới Thiệu Dịch Vụ Lái Xe Hộ Tại Đà Nẵng | Rincar',
  description: 'Tìm hiểu về sứ mệnh, tầm nhìn và giá trị cốt lõi của RINCAR - Dịch vụ lái xe hộ tại Đà Nẵng, Quảng Nam chuyên nghiệp, an tâm và uy tín nhất.',
  keywords: 'giới thiệu lái xe hộ đà nẵng, sứ mệnh rincar, giá trị cốt lõi rincar, thuê tài xế lái xe hộ đà nẵng',
}

export default function AboutPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070')] bg-cover bg-center opacity-20"></div>
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
            VỀ RINCAR - LÁI XE HỘ TẠI ĐÀ NẴNG
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Hành trình xây dựng niềm tin, mang lại sự <strong>an toàn tuyệt đối</strong> và trải nghiệm di chuyển đẳng cấp cho mỗi chuyến đi của khách hàng.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="flex-1">
              <span className="text-blue-600 font-bold text-sm uppercase tracking-wider block mb-2">Câu chuyện thương hiệu</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">Chúng tôi bắt đầu từ sự trăn trở về an toàn giao thông</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed text-lg">
                <p>
                  Khởi nguồn từ những trăn trở sâu sắc về thực trạng tai nạn giao thông do bia rượu tại khu vực miền Trung, <strong>Dịch vụ lái xe hộ tại Đà Nẵng RINCAR</strong> được thành lập với mục tiêu duy nhất: <strong>"Bảo vệ tính mạng khách hàng và bảo toàn xế cưng của bạn về đến nhà an toàn"</strong>.
                </p>
                <p>
                  Chúng tôi hiểu rằng, sau mỗi cuộc gặp gỡ đối tác, liên hoan bạn bè hay những ngày làm việc căng thẳng, sự mệt mỏi có thể làm lu mờ khả năng xử lý tình huống trên đường. Thay vì chọn cách mạo hiểm lái xe trong trạng thái không tỉnh táo, <strong>thuê tài xế lái xe hộ</strong> là một quyết định văn minh, có trách nhiệm với gia đình và xã hội.
                </p>
                <p>
                  RINCAR tự hào sở hữu đội ngũ <strong>tài xế chuyên nghiệp</strong>, giàu kinh nghiệm lái các dòng xe từ phổ thông đến siêu sang (Mercedes, Audi, BMW, Lexus...). Chúng tôi không chỉ cung cấp một dịch vụ di chuyển, mà mang đến cho bạn một người bạn đồng hành tin cậy trên mọi nẻo đường Đà Nẵng, Quảng Nam.
                </p>
              </div>
            </div>
            <div className="flex-1 w-full">
              <div className="relative">
                <div className="absolute -inset-4 bg-blue-100 rounded-3xl transform -rotate-3 -z-10"></div>
                <img
                  src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070"
                  alt="Lái xe hộ Đà Nẵng Rincar chuyên nghiệp"
                  className="rounded-2xl shadow-xl object-cover w-full h-[400px]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/30 via-slate-900 to-slate-900 -z-10"></div>
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white/5 backdrop-blur-md p-8 md:p-10 rounded-3xl border border-white/10 flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 bg-blue-500/20 text-blue-400 rounded-2xl flex items-center justify-center mb-6 border border-blue-500/30">
                  <Eye size={28} />
                </div>
                <h2 className="text-2xl font-bold mb-4">Tầm Nhìn Chiến Lược</h2>
                <p className="text-slate-300 leading-relaxed text-base">
                  Trở thành biểu tượng uy tín hàng đầu trong lĩnh vực cung cấp <strong>dịch vụ tài xế lái xe hộ</strong> tại khu vực Đà Nẵng và các tỉnh lân cận. Chúng tôi không ngừng ứng dụng công nghệ, nâng cao quy chuẩn tuyển chọn để mang lại sự yên tâm tuyệt đối cho khách hàng, góp phần thay đổi thói quen tham gia giao thông văn minh: <strong>"Đã uống rượu bia - Không lái xe"</strong>.
                </p>
              </div>
              <div className="h-1.5 w-16 bg-blue-500 rounded mt-8"></div>
            </div>

            <div className="bg-white/5 backdrop-blur-md p-8 md:p-10 rounded-3xl border border-white/10 flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center mb-6 border border-emerald-500/30">
                  <Compass size={28} />
                </div>
                <h2 className="text-2xl font-bold mb-4">Sứ Mệnh Phục Vụ</h2>
                <p className="text-slate-300 leading-relaxed text-base">
                  Cung cấp dịch vụ đưa đón khách hàng và phương tiện về nhà an toàn với thái độ <strong>tận tâm, bảo mật thông tin và chuyên nghiệp nhất</strong>. RINCAR cam kết đồng hành cùng doanh nghiệp, nhà hàng, quán ăn để tạo ra các giải pháp giao thông an toàn, giảm thiểu tối đa rủi ro giao thông trên địa bàn Thành phố Đà Nẵng.
                </p>
              </div>
              <div className="h-1.5 w-16 bg-emerald-500 rounded mt-8"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Strict Standards Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-blue-600 font-bold text-sm uppercase tracking-wider block mb-2">Quy chuẩn dịch vụ</span>
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Quy trình tuyển chọn tài xế cực kỳ nghiêm ngặt</h2>
            <div className="h-1.5 w-20 bg-blue-600 mx-auto rounded mb-4"></div>
            <p className="text-slate-500 leading-relaxed">
              Để bảo vệ an toàn cho phương tiện và tính mạng của khách hàng, mỗi tài xế tại <strong>Rincar</strong> đều phải vượt qua quy trình sàng lọc khắt khe.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6 font-bold text-lg">
                1
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-800">Kiểm tra hồ sơ pháp lý</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Tất cả tài xế bắt buộc phải có <strong>lý lịch tư pháp trong sạch</strong>, có tối thiểu <strong>5 năm kinh nghiệm</strong> lái xe thực tế và sở hữu bằng lái xe từ hạng B2 trở lên còn thời hạn sử dụng.
              </p>
            </div>

            <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6 font-bold text-lg">
                2
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-800">Sát hạch tay lái thực tế</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Ứng viên phải trải qua bài kiểm tra kỹ năng vận hành các dòng xe số sàn, xe số tự động, xe sang đắt tiền, và kỹ năng đỗ xe trong các không gian chật hẹp của đô thị Đà Nẵng.
              </p>
            </div>

            <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6 font-bold text-lg">
                3
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-800">Đào tạo văn hóa ứng xử</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Chúng tôi đào tạo tài xế về thái độ phục vụ khách hàng lịch sự, kỹ năng lắng nghe, giữ gìn <strong>bảo mật thông tin riêng tư</strong> của khách hàng và cách xử lý sự cố khẩn cấp chuyên nghiệp.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-bold text-sm uppercase tracking-wider block mb-2">Giá trị cốt lõi</span>
            <h2 className="text-3xl font-bold text-slate-800 mb-4">RINCAR cam kết những giá trị tốt nhất</h2>
            <div className="h-1.5 w-20 bg-blue-600 mx-auto rounded"></div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-2xl border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-800">An Toàn</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Sự an toàn của khách hàng và phương tiện là ưu tiên số một. Mọi chuyến đi đều được giám sát và bảo hiểm trách nhiệm.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-2xl border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Target size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-800">Trách Nhiệm</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Chúng tôi sẵn sàng phục vụ <strong>24/7</strong> bất kể lễ tết, thời tiết, cam kết đúng giờ và chịu trách nhiệm bảo toàn tài sản tuyệt đối.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-2xl border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Award size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-800">Chất Lượng</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Tài xế chuyên môn cao, giao tiếp chuẩn mực văn minh, am hiểu sâu sắc các cung đường và luật giao thông tại Đà Nẵng.
              </p>
            </div>

            {/* Compliant with Purple Ban: Changed purple to sky */}
            <div className="text-center p-6 bg-white rounded-2xl border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-sky-100 text-sky-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-800">Tận Tâm</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Lắng nghe, thấu cảm và phục vụ khách hàng chu đáo như người thân trong gia đình, đem lại sự thoải mái nhất sau mỗi hành trình.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
