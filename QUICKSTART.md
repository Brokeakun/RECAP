# 🚀 Quick Start Guide - Galeri Kita

## ⚡ Super Cepat (5 Menit)

### 1️⃣ Install Dependencies
```bash
npm install
```

### 2️⃣ Setup Google Drive API
Ikuti panduan lengkap di: **[SETUP_GOOGLE_DRIVE.md](./SETUP_GOOGLE_DRIVE.md)**

Ringkasan:
- Buat Google Cloud Project
- Enable Drive API
- Buat Service Account
- Download JSON key
- Share folder Drive dengan service account email

### 3️⃣ Setup Environment Variables
```bash
# Copy template
cp .env.example .env.local
```

Edit `.env.local`, isi dengan:
```env
GDRIVE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GDRIVE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_KEY_HERE\n-----END PRIVATE KEY-----\n"
GDRIVE_FOLDER_ID=your-folder-id
```

### 4️⃣ Run Development
```bash
npm run dev
```
Buka: http://localhost:3000 🎉

### 5️⃣ Deploy ke Vercel
Lihat: **[DEPLOYMENT.md](./DEPLOYMENT.md)**

```bash
# Push ke GitHub
git add .
git commit -m "Initial commit"
git push origin main

# Atau pakai Vercel CLI
vercel --prod
```

## 📚 Dokumentasi Lengkap

- **[README.md](./README.md)** - Overview & fitur lengkap
- **[SETUP_GOOGLE_DRIVE.md](./SETUP_GOOGLE_DRIVE.md)** - Setup Google Drive API step-by-step
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Panduan deploy ke Vercel

## ❓ Butuh Bantuan?

### Server tidak jalan
```bash
# Pastikan port 3000 tidak dipakai
npm run dev
```

### Foto tidak muncul
1. ✅ Check `.env.local` sudah terisi
2. ✅ Service account sudah punya akses ke folder
3. ✅ Folder ID benar
4. ✅ Check console browser untuk error

### Build error
```bash
# Clean install
rm -rf node_modules .next
npm install
npm run build
```

## 🎯 Next Steps

- [ ] Kustomisasi title & branding di `src/app/layout.tsx`
- [ ] Ubah warna theme di `src/app/page.tsx`
- [ ] Tambah fitur filter (photos/videos only)
- [ ] Setup custom domain di Vercel
- [ ] Enable Vercel Analytics

---

**Happy coding! 🚀**
