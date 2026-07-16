# Kế hoạch triển khai Website: Lái xe hộ Đà Nẵng Rincar

Xây dựng website dịch vụ "Lái xe hộ Đà Nẵng Rincar" dựa trên Next.js (App Router), với giao diện UI hiện đại, tối ưu SEO HTML5 và tích hợp Supabase để quản trị nội dung.

> [!IMPORTANT]
> **User Review Required**
> Kế hoạch này chưa được thực thi. Đây là chế độ `/plan` nhằm mục đích định hình công việc. Vui lòng xem xét các câu hỏi dưới đây và phản hồi trước khi chúng ta chuyển sang bước triển khai mã nguồn.

## Open Questions (Socratic Gate)

> [!WARNING]
> Trước khi viết code, vui lòng cho tôi biết:
> 1. **Bản đồ & Lấy vị trí**: Để chức năng "lấy vị trí hiện tại" và tính khoảng cách tự động hoạt động chính xác, chúng ta cần dùng một API bản đồ (ví dụ: Google Maps API, Goong API, hoặc Mapbox). Bạn đã đăng ký API Key của dịch vụ nào chưa, hay bạn muốn tôi sử dụng gói miễn phí nào trước?
> 2. **Xác thực Admin**: Đối với trang quản lý (tin tức, đặt xe), tôi sẽ sử dụng Supabase Auth (Email/Password) để bảo vệ trang này, chỉ admin mới có thể đăng nhập. Bạn có đồng ý với phương pháp này không?
> 3. **Luồng Đặt Xe**: Sau khi khách hàng xem "Số tiền tạm tính" và bấm "Đặt tài xế", hệ thống sẽ lưu vào cơ sở dữ liệu Supabase để Admin chủ động gọi lại, hay bạn muốn hệ thống gửi thêm thông báo qua Zalo/Email cho bạn ngay lập tức?

## Proposed Changes / Task Breakdown

Dự án sẽ được chia thành các phase cụ thể sau:

### Phase 1: Khởi tạo và Cấu hình nền tảng
- Khởi tạo Next.js App Router với Tailwind CSS.
- Thiết lập biến môi trường Supabase (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`).
- Cài đặt `@supabase/supabase-js`, `@supabase/ssr` và thiết lập middleware bảo mật.
- Tạo cấu trúc database trên Supabase (Tables: `bookings`, `news`).

### Phase 2: Xây dựng Giao diện Người Dùng (Client Pages)
- **Layout Chính**: Header (Logo Rincar, Menu), Footer (SĐT: 0906499078, Email: longhalo43dn@gmail.com).
- **Mạng Xã Hội Trôi Nổi**: Thêm nút Zalo, Facebook, Điện thoại ở góc phải dưới màn hình với hiệu ứng nhảy (bounce) thu hút người dùng.
- **Trang Chủ (Home)**:
  - Form Đặt Tài Xế: Tích hợp nút "Lấy vị trí hiện tại" (Geolocation API) cho điểm đón/đến.
  - Logic tính cước phí: 5km đầu = 120k. Từ km thứ 6 = 12k/km. `Total = 120k + (Distance - 5) * 12k`.
- **Trang Giới Thiệu (About), Tin Tức (News), Liên Hệ (Contact)**: Thiết kế đẹp mắt, cấu trúc HTML5 semantic để tối ưu SEO.

### Phase 3: Admin Dashboard (Quản trị)
- Trang Đăng nhập bảo mật cho Admin.
- **Quản lý Đặt xe**: Hiển thị danh sách khách hàng đặt xe qua form trang chủ (Tên, SĐT, Điểm đón, Điểm đến, Khoảng cách, Tiền tạm tính).
- **Quản lý Tin tức**: Giao diện thêm/sửa/xóa bài viết tin tức.

### Phase 4: Tối ưu SEO và Hiệu suất
- Tối ưu Metadata (Title, Description) cho mọi trang.
- Thêm cấu trúc Schema Markup cơ bản.

## Verification Plan

### Automated / Logic Testing
- Kiểm tra logic tính tiền với các kịch bản:
  - Khoảng cách 3km -> 120k.
  - Khoảng cách 10km -> 120k + (10 - 5)*12 = 180k.

### Manual Verification
- Deploy nghiệm thu nghiệm thử nghiệm để người dùng bấm nút "Lấy vị trí hiện tại".
- Truy cập thử vào link `/admin` mà không đăng nhập để đảm bảo tính bảo mật.
