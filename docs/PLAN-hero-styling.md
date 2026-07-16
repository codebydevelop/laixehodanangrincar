# [PLAN] Cấu hình Font Inter, Ảnh nền Cầu Vàng & Nút liên hệ Zalo

Dự án cần thay đổi font chữ, cập nhật banner nền phần Hero bằng ảnh Cầu Vàng chìm phía dưới, và sửa đổi nút Zalo sang chữ "Liên hệ ngay" kèm icon SVG.

## Kế hoạch thực hiện

### Bước 1: Sao chép tài nguyên ảnh
- Sao chép ảnh nền Cầu Vàng đã được tạo vào thư mục `public/images/cau-vang-bg.png`.

### Bước 2: Thay đổi Font chữ
- File `src/app/layout.tsx`: Thay `Poppins` thành `Inter`, bật subset `vietnamese`.
- File `src/app/globals.css`: Cập nhật `--font-sans: var(--font-inter)`.

### Bước 3: Cập nhật Hero Section
- File `src/app/(main)/page.tsx`:
  - Thay URL ảnh nền bằng `/images/cau-vang-bg.png`.
  - Thay đổi opacity của ảnh nền để nằm chìm xuống phía dưới.
  - Thay thế nút Zalo: Đổi chữ thành "Liên hệ ngay", thay icon `<img>` bị lỗi bằng một thẻ `<svg>` vẽ logo Zalo chuẩn.

### Bước 4: Khắc phục lỗi Cache của Next.js
- Xóa thư mục `.next` và khởi động lại server.
