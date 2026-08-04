# Yêu cầu Dự án – UniHub Workshop

## 1. Bối cảnh
Trường Đại học A tổ chức **“Tuần lễ kỹ năng và nghề nghiệp”** hàng năm. Sự kiện kéo dài 5 ngày, mỗi ngày có 8–12 workshop diễn ra song song tại nhiều phòng khác nhau. Quy trình quản lý đăng ký bằng Google Form và thông báo qua email thủ công hiện tại không còn đáp ứng được nhu cầu khi quy mô gia tăng.

Hệ thống **UniHub Workshop** được xây dựng nhằm số hóa toàn bộ quy trình từ việc công bố thông tin, đăng ký, thanh toán cho đến check-in tham dự tại sự kiện.

---

## 2. Người dùng & Phân quyền (Actors)

| Nhóm người dùng | Mô tả chức năng & Quyền hạn |
| --- | --- |
| **Sinh viên** | Xem lịch workshop, đăng ký tham dự (miễn phí/có phí), nhận thông báo & mã QR check-in, check-in khi tham dự |
| **Ban tổ chức** | Quản lý workshop (tạo mới, cập nhật, đổi phòng/giờ, hủy), tải file PDF giới thiệu để tạo AI Summary, xem thống kê số lượng đăng ký |
| **Nhân sự check-in** | Truy cập giao diện check-in để quét/xác nhận mã QR của sinh viên tại cửa phòng |

---

## 3. Yêu cầu Chức năng (Functional Requirements)

### 3.1. Xem và Đăng ký Workshop
* **Hiển thị danh sách:** Sinh viên xem toàn bộ danh sách workshop trong tuần lễ kèm thông tin chi tiết: diễn giả, phòng tổ chức, sơ đồ phòng và số chỗ còn lại theo thời gian thực.
* **Đăng ký tham dự:** Hỗ trợ đăng ký cho cả workshop miễn phí và workshop thu phí.
* **Mã QR Check-in:** Phát hành mã QR duy nhất cho sinh viên sau khi đăng ký thành công.

### 3.2. Thông báo (Notification System)
* **Xác nhận tự động:** Gửi thông báo xác nhận qua ứng dụng và email ngay sau khi đăng ký thành công.
* **Khả năng mở rộng:** Kiến trúc thiết kế cho phép tích hợp thêm các kênh thông báo mới (ví dụ: Telegram) trong tương lai mà không làm ảnh hưởng tới luồng xử lý chính.

### 3.3. Quản trị & Phân quyền Truy cập (RBAC)
* **Trang Web Admin:** Giao diện quản trị nội bộ dành cho Ban tổ chức để quản lý thông tin workshop và theo dõi báo cáo thống kê.
* **Kiểm soát truy cập (Role-Based Access Control):**
  * *Sinh viên:* Quyền xem và đăng ký workshop.
  * *Ban tổ chức:* Quyền tạo, sửa, hủy workshop và truy cập báo cáo thống kê.
  * *Nhân sự check-in:* Quyền hạn chế, chỉ truy cập tính năng quét và xác nhận mã QR.

### 3.4. Check-in tại sự kiện
* **Quét mã QR:** Nhân sự tại cửa phòng sử dụng ứng dụng check-in để quét mã QR xác thực sinh viên.
* **Hỗ trợ Offline:** Cho phép ghi nhận dữ liệu check-in tạm thời khi mất kết nối mạng và tự động đồng bộ về server khi có mạng trở lại.

### 3.5. AI Summary
* **Xử lý tài liệu:** Ban tổ chức tải file PDF giới thiệu workshop lên hệ thống.
* **Tóm tắt nội dung:** Hệ thống tự động trích xuất, làm sạch văn bản và gửi tới mô hình AI để tạo bản tóm tắt hiển thị trên trang chi tiết workshop.

### 3.6. Đồng bộ Dữ liệu Sinh viên
* **Nhập dữ liệu từ CSV:** Do hệ thống quản lý sinh viên cũ không cung cấp API, UniHub Workshop định kỳ tự động nhập file CSV (được hệ thống cũ export vào ban đêm) để xác thực thông tin sinh viên khi đăng ký.

---

## 4. Yêu cầu Phi chức năng & Thách thức Kỹ thuật

### 4.1. Chống tranh chấp chỗ ngồi (Concurrency & Race Conditions)
* Với các workshop giới hạn số chỗ (ví dụ: 60 chỗ) nhưng có hàng trăm sinh viên đăng ký cùng lúc, hệ thống phải đảm bảo tính nhất quán dữ liệu (no overbooking), tuyệt đối không để 2 sinh viên cùng nhận một chỗ cuối cùng.

### 4.2. Kiểm soát Tải đột biến (Surge Traffic & Protection)
* **Tải trọng dự kiến:** Khoảng 12.000 sinh viên truy cập trong 10 phút đầu mở đăng ký (60% dồn vào 3 phút đầu tiên).
* **Cơ chế bảo vệ:** Áp dụng Rate Limiting để bảo vệ backend API khỏi quá tải, ngăn chặn spam request từ client và đảm bảo sự công bằng giữa các sinh viên.

### 4.3. Xử lý Thanh toán không ổn định & Chống trừ tiền 2 lần (Idempotency)
* **Cô lập sự cố:** Sự cố từ cổng thanh toán không được làm gián đoạn các tính năng phi thanh toán (xem lịch, thông tin sự kiện, đăng ký miễn phí).
* **Idempotency:** Luồng thanh toán phải xử lý trường hợp timeout/retry mà không làm trừ tiền lặp lại của sinh viên.

### 4.4. Check-in Offline & Tự đồng bộ
* Đảm bảo nhân sự check-in tại vùng mạng yếu vẫn ghi nhận được sinh viên tham dự mà không làm mất mát hay sai lệch dữ liệu khi đồng bộ lại.

### 4.5. Nhập liệu Batch an toàn
* Luồng xử lý file CSV định kỳ phải có cơ chế bỏ qua dữ liệu lỗi/trùng lặp và không làm ảnh hưởng tới hiệu năng hệ thống đang vận hành.

---

## 5. Danh mục Sản phẩm & Nội dung Thiết kế (Deliverables)

1. **Tài liệu Thiết kế Kiến trúc (Architecture Documentation):** Mô tả kiến trúc tổng thể, các thành phần, giao thức kết nối và chiến lược xử lý sự cố (Fault Tolerance).
2. **Sơ đồ C4:**
   * *Level 1 – System Context:* Tổng quan hệ thống, người dùng và các hệ thống bên ngoài.
   * *Level 2 – Container:* Phân rã các container (Web App, Backend API, Database, Message Broker, Cache...) và công nghệ sử dụng.
3. **High-Level Architecture Diagram:** Sơ đồ luồng dữ liệu tại các điểm tích hợp (cổng thanh toán, AI model, dữ liệu CSV) và luồng check-in offline.
4. **Thiết kế Cơ sở dữ liệu:** Lựa chọn loại DB (SQL/NoSQL/Hybrid), giải thích lý do và thiết kế Schema chi tiết cho các entity chính.
5. **Mô tả Luồng Nghiệp vụ Chính:** Phân tích chi tiết các bước xử lý, xử lý ngoại lệ cho luồng Đăng ký thu phí, Check-in Offline & Sync, và Import CSV sinh viên.
6. **Thiết kế Kiểm soát Truy cập (RBAC):** Mô hình phân quyền chi tiết cho các nhóm người dùng tại API endpoint và trang admin.
7. **Thiết kế Cơ chế Bảo vệ Hệ thống:**
   * Rate Limiting (Token Bucket / Sliding Window).
   * Circuit Breaker & Graceful Degradation cho Cổng thanh toán.
   * Idempotency Key cho giao dịch thanh toán.
