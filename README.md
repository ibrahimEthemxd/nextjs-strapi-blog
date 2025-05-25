# Next.js & Strapi Blog Platform

Bu proje, **Strapi CMS** ile yönetilen blog içeriklerini, **Next.js** ile oluşturulmuş bir frontend üzerinden listeleyen ve detaylarını gösteren bir uygulamadır. Arayüzde **Tailwind CSS** kullanılmıştır. Amaç, Headless CMS mimarisiyle içerik üretimini ve sunumunu ayrıştırmak ve modern bir blog deneyimi sunmaktır.

## 🚀 Kullanılan Teknolojiler

- **Strapi** – Headless CMS olarak içeriklerin (blog yazıları) yönetimi için
- **Next.js** – React tabanlı frontend framework, SSR (Sunucu Taraflı Render) desteğiyle
- **Tailwind CSS** – Hızlı ve modern stillendirme için utility-first CSS framework

---

## 📝 Özellikler

### 🧾 Blog Oluşturma Sayfası
- Yeni bir blog oluşturmak için kullanıcıdan başlık, içerik ve gerekli alanlar alınır.
- Form submit işlemi, Strapi CMS'nin REST API'sine `POST` isteği göndererek içeriği oluşturur.

### 📃 Blog Listeleme Sayfası
- Tüm blog yazıları Strapi'den çekilir.
- SSR (Sunucu Taraflı Render) ile sayfa önceden oluşturularak hızlı bir kullanıcı deneyimi sağlanır.
- Her bir blog kartına tıklanıldığında detay sayfasına yönlendirme yapılır.

### 📄 Blog Detay Sayfası
- Seçilen blog yazısının başlığı, içeriği ve varsa görselleri detaylı olarak gösterilir.
- Sayfa yine SSR ile render edilir.

---

## 📦 Kurulum

Projeyi yerel ortamda çalıştırmak için:

1. Bu repoyu klonlayın:
   ```bash
   git clone https://github.com/ibrahimEthemxd/nextjs-strapi-blog.git

   is this project empty ? 
