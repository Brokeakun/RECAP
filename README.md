# VaultGallery - Galeri Foto & Video dari Google Drive

Aplikasi galeri modern yang terintegrasi dengan Google Drive menggunakan Next.js, React, Tailwind CSS, dan Framer Motion.

## 🚀 Fitur

- ✅ Integrasi langsung dengan Google Drive API
- ✅ Tampilan masonry/pinterest style yang responsive
- ✅ Lightbox untuk preview foto dan video
- ✅ Auto-update dari folder Google Drive
- ✅ Animasi smooth dengan Framer Motion
- ✅ Dark theme yang modern
- ✅ SEO optimized

## 📋 Prasyarat

- Node.js 18+ 
- Google Cloud Project dengan Drive API enabled
- Service Account credentials

## 🔧 Setup Google Drive API

1. **Buat Project di Google Cloud Console**
   - Buka https://console.cloud.google.com/
   - Buat project baru atau pilih yang sudah ada

2. **Enable Google Drive API**
   - Di dashboard project, cari "Google Drive API"
   - Klik "Enable"

3. **Buat Service Account**
   - Buka "IAM & Admin" > "Service Accounts"
   - Klik "Create Service Account"
   - Beri nama dan deskripsi
   - Skip permission & user access

4. **Generate Key**
   - Klik service account yang baru dibuat
   - Tab "Keys" > "Add Key" > "Create New Key"
   - Pilih JSON dan download

5. **Share Folder Google Drive**
   - Buka folder di Google Drive yang ingin ditampilkan
   - Klik "Share"
   - Tambahkan email service account (dari file JSON)
   - Beri akses "Viewer"
   - Copy ID folder dari URL: `https://drive.google.com/drive/folders/[ID_INI]`

## 💻 Instalasi & Development

1. **Clone & Install Dependencies**
   ```bash
   git clone <repository-url>
   cd galeri-kita
   npm install
   ```

2. **Setup Environment Variables**
   
   Copy file `.env.example` menjadi `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` dan isi dengan:
   ```env
   GDRIVE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
   GDRIVE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
   GDRIVE_FOLDER_ID=your-folder-id-here
   ```

   **Catatan untuk Private Key:**
   - Copy seluruh private key dari file JSON (termasuk BEGIN/END)
   - Pastikan ada `\n` untuk newline
   - Bungkus dengan quotes

3. **Jalankan Development Server**
   ```bash
   npm run dev
   ```
   
   Buka http://localhost:3000

## 🚀 Deploy ke Vercel

### Option 1: Deploy via Vercel Dashboard

1. **Push ke GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Import Project di Vercel**
   - Buka https://vercel.com
   - Klik "Add New Project"
   - Import repository GitHub Anda
   - Framework preset: Next.js (auto-detect)

3. **Setup Environment Variables di Vercel**
   - Di project settings > Environment Variables
   - Tambahkan 3 variabel:
     - `GDRIVE_CLIENT_EMAIL`
     - `GDRIVE_PRIVATE_KEY`
     - `GDRIVE_FOLDER_ID`
   - **PENTING:** Untuk `GDRIVE_PRIVATE_KEY`, paste langsung tanpa quotes tambahan
   - Vercel otomatis handle multiline

4. **Deploy**
   - Klik "Deploy"
   - Tunggu proses build selesai
   - Website langsung online!

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy production
vercel --prod
```

Setup environment variables via CLI:
```bash
vercel env add GDRIVE_CLIENT_EMAIL
vercel env add GDRIVE_PRIVATE_KEY
vercel env add GDRIVE_FOLDER_ID
```

## 📝 Scripts

- `npm run dev` - Development server
- `npm run build` - Build production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🔒 Security

- ❌ **JANGAN** commit file `.env.local` ke repository
- ❌ **JANGAN** share private key di public
- ✅ Gunakan `.env.example` untuk dokumentasi
- ✅ `.env.local` sudah ada di `.gitignore`

## 🛠️ Tech Stack

- **Framework:** Next.js 16
- **UI:** React 19, Tailwind CSS 4
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **API:** Google Drive API (googleapis)
- **Language:** TypeScript

## 📂 Struktur Project

```
galeri-kita/
├── src/
│   └── app/
│       ├── api/drive/route.ts    # API endpoint
│       ├── page.tsx               # Main gallery page
│       ├── layout.tsx             # Root layout
│       └── globals.css            # Global styles
├── lib/
│   └── googleDrive.ts             # Google Drive helper
├── .env.example                   # Template env
└── next.config.ts                 # Next.js config
```

## 🐛 Troubleshooting

### Error: Missing credentials
- Pastikan semua env variables sudah diisi
- Check format private key (harus ada `\n`)

### Error: 403 Forbidden
- Pastikan service account punya akses ke folder
- Check email service account sudah benar

### Gambar tidak muncul
- Check network tab di browser
- Pastikan file di Drive adalah gambar/video
- Verifikasi folder ID sudah benar

### Build error di Vercel
- Check environment variables di Vercel dashboard
- Pastikan format private key benar (tanpa quotes tambahan di Vercel)

## 📞 Support

Jika ada masalah:
1. Check console browser untuk error
2. Check logs di Vercel dashboard
3. Verifikasi setup Google Drive API

## 📄 License

MIT License - Silakan digunakan untuk project pribadi atau komersial.

---

**Dibuat dengan ❤️ menggunakan Next.js & Google Drive API**
