# Hệ thống chữ (Typography) — tuannghia-portfolio

## Cách dùng

Đặt file này ở thư mục gốc của dự án, rồi gửi Claude Code đoạn sau:

> Đọc file TYPOGRAPHY.md và áp dụng hệ thống chữ này cho toàn bộ dự án. Làm đúng theo mục 7 "Việc cần làm" và mục 8 "Kiểm tra trước khi xong". Chỉ thay đổi phần chữ (font, cỡ chữ, độ đậm, khoảng cách dòng, khoảng cách chữ). Không đổi màu, bố cục, khoảng cách giữa các khối, nội dung hay hiệu ứng. Xong thì liệt kê các file đã sửa.

---

## 1. Hai font, không hơn

| Vai trò | Font | Dùng cho |
|---|---|---|
| Chữ chính | **Be Vietnam Pro** | Tất cả tiêu đề, đoạn văn, menu, nút, tag, chú thích |
| Mã | **JetBrains Mono** | Chỉ khối terminal, đoạn code, câu lệnh, tên file |

Be Vietnam Pro do các nhà thiết kế Việt Nam làm, dấu tiếng Việt chuẩn ở mọi độ đậm. Font có đủ độ đậm từ mảnh tới rất đậm và có kiểu nghiêng, nên một font gánh được cả tên lớn ở hero lẫn chữ đoạn văn. JetBrains Mono là font code thật và chỉ xuất hiện ở chỗ thật sự là code, để phần terminal tách bạch rõ với phần còn lại.

Không dùng font mono cho tag, nhãn nhỏ hay số liệu trang trí.

## 2. Tokens

```css
:root {
  --font-sans: "Be Vietnam Pro", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;

  /* Thang cỡ chữ cổ điển: 12 · 14 · 16 · 18 · 21 · 24 · 36 · 48 · 96 */
  --text-xs: 0.75rem;                                   /* 12px */
  --text-sm: 0.875rem;                                  /* 14px */
  --text-base: 1rem;                                    /* 16px */
  --text-md: 1.125rem;                                  /* 18px */
  --text-lg: 1.3125rem;                                 /* 21px */
  --text-xl: 1.5rem;                                    /* 24px */
  --text-2xl: clamp(1.75rem, 1.2rem + 2.2vw, 2.25rem);  /* 28 → 36px */
  --text-3xl: clamp(2.25rem, 1.4rem + 3.4vw, 3rem);     /* 36 → 48px */
  --text-display: clamp(3rem, 1.2rem + 7.5vw, 6rem);    /* 48 → 96px */

  --weight-regular: 400;
  --weight-medium: 500;
  --weight-semibold: 600;
  --weight-bold: 700;
  --weight-black: 800;

  --leading-display: 1.1;
  --leading-heading: 1.2;
  --leading-snug: 1.4;
  --leading-code: 1.6;
  --leading-body: 1.7;

  --tracking-display: -0.025em;
  --tracking-heading: -0.015em;
  --tracking-small: 0.01em;

  --measure: 65ch;
}
```

## 3. Vai trò của từng thành phần

| Thành phần | Font | Cỡ | Đậm | Dòng | Khoảng chữ |
|---|---|---|---|---|---|
| Tên ở hero (h1) | sans | `--text-display` | 800 | 1.1 | -0.025em |
| Dòng chức danh dưới tên ("AI Engineer") | sans, nghiêng | `--text-lg` | 500 | 1.4 | 0 |
| Tiêu đề section (h2) | sans | `--text-3xl` | 700 | 1.2 | -0.015em |
| Tiêu đề nhỏ, tên dự án (h3) | sans | `--text-xl` | 600 | 1.2 | -0.015em |
| Đoạn giới thiệu ở hero / đầu section | sans | `--text-md` | 400 | 1.7 | 0 |
| Đoạn văn thường | sans | `--text-base` | 400 | 1.7 | 0 |
| Menu | sans | `--text-sm` | 500 | 1.4 | 0.01em |
| Nút | sans | `--text-sm` | 600 | 1.4 | 0.01em |
| Tag kỹ năng, nhãn nhỏ | sans | `--text-xs` | 500 | 1.4 | 0.01em |
| Chú thích, footer | sans | `--text-sm` | 400 | 1.5 | 0 |
| Số liệu, năm tháng | sans + `tabular-nums` | theo vị trí | 600 | theo vị trí | 0 |
| Khối terminal, code block | mono | `--text-sm` | 400 | 1.6 | 0 |
| Code nằm trong đoạn văn | mono | `0.9em` | 400 | kế thừa | 0 |

## 4. Quy tắc

- Mọi cỡ chữ lấy từ token. Không viết số px trực tiếp trong component.
- Chỉ dùng các độ đậm 400, 500, 600, 700, 800. Không dùng 300 hay 900.
- Không viết hoa toàn bộ kèm giãn chữ cho nhãn nhỏ. Viết kiểu câu (chỉ hoa chữ cái đầu).
- Đoạn văn dài (giới thiệu, mô tả dự án) rộng tối đa `--measure` (65 ký tự). Nếu đoạn đó đang căn giữa thì thêm `margin-inline: auto`.
- Tiếng Việt: khoảng cách dòng không dưới 1.1, kể cả tên ở hero. Không đặt `overflow: hidden` hay chiều cao cố định cho khối tiêu đề, vì dấu trên chữ hoa (Ấ, Ể, Ỗ) sẽ bị cắt.
- Đã nạp đủ độ đậm và kiểu nghiêng thật, nên tắt việc trình duyệt tự giả lập: `font-synthesis: none`.

## 5. Nạp font

**Mặc định (Vite / React, có `index.html`):** thêm vào `<head>`, xóa mọi link font cũ.

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

**Nếu dự án là Next.js:** dùng `next/font/google` (`Be_Vietnam_Pro`, `JetBrains_Mono`) với `subsets: ["latin", "vietnamese"]`, đúng các độ đậm ở trên, gán vào biến `--font-sans` / `--font-mono`, và không dùng thẻ link.

## 6. CSS nền

```css
html {
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-synthesis: none;
}

body {
  font-size: var(--text-base);
  font-weight: var(--weight-regular);
  line-height: var(--leading-body);
}

h1, h2, h3 { text-wrap: balance; }

h1 {
  font-size: var(--text-display);
  font-weight: var(--weight-black);
  line-height: var(--leading-display);
  letter-spacing: var(--tracking-display);
}

h2 {
  font-size: var(--text-3xl);
  font-weight: var(--weight-bold);
  line-height: var(--leading-heading);
  letter-spacing: var(--tracking-heading);
}

h3 {
  font-size: var(--text-xl);
  font-weight: var(--weight-semibold);
  line-height: var(--leading-heading);
  letter-spacing: var(--tracking-heading);
}

p { text-wrap: pretty; }

code, kbd, pre, samp { font-family: var(--font-mono); }
pre { font-size: var(--text-sm); line-height: var(--leading-code); }
:not(pre) > code { font-size: 0.9em; }

.t-lead    { font-size: var(--text-md); }
.t-role    { font-size: var(--text-lg); font-style: italic; font-weight: var(--weight-medium); line-height: var(--leading-snug); }
.t-nav     { font-size: var(--text-sm); font-weight: var(--weight-medium); line-height: var(--leading-snug); letter-spacing: var(--tracking-small); }
.t-button  { font-size: var(--text-sm); font-weight: var(--weight-semibold); line-height: var(--leading-snug); letter-spacing: var(--tracking-small); }
.t-tag     { font-size: var(--text-xs); font-weight: var(--weight-medium); line-height: var(--leading-snug); letter-spacing: var(--tracking-small); }
.t-caption { font-size: var(--text-sm); line-height: 1.5; }
.t-num     { font-variant-numeric: tabular-nums; }
.t-prose   { max-width: var(--measure); }
```

**Nếu dự án dùng Tailwind:** đưa các token vào theme để `font-sans`, `font-mono` và các class `text-*` trỏ đúng token (Tailwind v4: khai báo trong `@theme`; v3: `theme.extend.fontFamily` và `theme.extend.fontSize`). Thay các class tùy ý như `text-[15px]`, `tracking-widest`, `font-light` bằng class theo thang ở trên. Có thể dùng class Tailwind thay cho các class `.t-*`, miễn giá trị khớp bảng ở mục 3.

## 7. Việc cần làm

1. Tìm mọi chỗ khai báo font trong dự án: `<link>` Google Fonts, `@import`, `@font-face`, `font-family`, cấu hình font của Tailwind, style viết trực tiếp trong component. Xóa tất cả font khác, chỉ giữ hai font ở mục 1.
2. Nạp font theo mục 5.
3. Thêm tokens (mục 2) và CSS nền (mục 6) vào file CSS toàn cục.
4. Đi qua từng component và gán đúng vai trò theo bảng ở mục 3. Thay mọi `font-size`, `font-weight`, `line-height`, `letter-spacing` đang viết cứng bằng token hoặc class tương ứng.
5. Bỏ kiểu viết hoa toàn bộ kèm giãn chữ ở các nhãn nhỏ, đổi sang kiểu câu.
6. Chỉ dùng font mono cho khối terminal, code và câu lệnh. Tag kỹ năng và nhãn nhỏ chuyển sang font sans.
7. Không đổi màu, bố cục, khoảng cách giữa các khối, nội dung hay hiệu ứng, trừ khi cần để sửa chữ bị cắt hoặc bị tràn.

## 8. Kiểm tra trước khi xong

- `npm run build` chạy không lỗi.
- Tìm trong code không còn `font-family` nào ngoài hai biến `--font-sans` và `--font-mono`.
- Xem trang ở độ rộng 375px và 1440px: tên ở hero không tràn ngang, các tiêu đề không xuống dòng lẻ một chữ.
- Tạm đặt một dòng có dấu chồng như "Ẩn Ể Ỗ Kỹ sư thị giác máy tính" vào h1 và h2 để chắc dấu không bị cắt, rồi xóa đi.
- Trong tab Network của trình duyệt chỉ thấy tải hai font: Be Vietnam Pro và JetBrains Mono.
