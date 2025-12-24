# 🎨 Carousel Generator AI

Công cụ tạo Carousel chuyên nghiệp từ nội dung Markdown, được tối ưu hóa cho LinkedIn, Instagram và các mạng xã hội.

## 🚀 Tính năng chính
- **Markdown to Design**: Tự động chuyển đổi nội dung văn bản thành các slide đẹp mắt.
- **Tùy chỉnh linh hoạt**: Chỉnh sửa phông chữ, màu sắc, vị trí các khối nội dung trực tiếp trên giao diện.
- **Xuất file hàng loạt**: Tải xuống toàn bộ carousel dưới dạng file `.zip` chứa các ảnh chất lượng cao.
- **Hỗ trợ tiếng Việt**: Tích hợp các phông chữ Google Fonts phổ biến (Be Vietnam Pro, Roboto, ...).

## 🛠️ Hướng dẫn cài đặt local
1. Clone dự án:
   ```bash
   git clone https://github.com/maihung89/carousel-generator-ai-.git
   ```
2. Cài đặt dependencies:
   ```bash
   npm install
   ```
3. Chạy môi trường phát triển:
   ```bash
   npm run dev
   ```

## 🌐 Hướng dẫn chạy trên môi trường Website (GitHub Pages)

Để chạy dự án này trên website cá nhân của bạn thông qua GitHub Pages, hãy thực hiện các bước sau:

### 1. Đưa code lên GitHub
Nếu bạn chưa đưa code lên, hãy chạy các lệnh sau trong terminal:
```bash
git add .
git commit -m "Build: Fix deployment and build errors"
git push origin main
```

### 2. Cấu hình GitHub Actions
Dự án đã có sẵn file `.github/workflows/deploy.yml`. Khi bạn `push` code lên nhánh `main`, GitHub sẽ tự động build và triển khai.

**Bước quan trọng trong GitHub Settings:**
1. Truy cập vào Repository của bạn trên GitHub.
2. Chọn **Settings** > **Pages**.
3. Tại phần **Build and deployment** > **Source**, hãy chọn **GitHub Actions**.

### 3. Truy cập Website
Sau khi quá trình "Actions" hoàn tất (khoảng 1-2 phút), website của bạn sẽ có địa chỉ:
`https://maihung89.github.io/carousel-generator-ai-/`

---
*Dự án được hỗ trợ bởi Antigravity (Advanced Agentic Coding).*
