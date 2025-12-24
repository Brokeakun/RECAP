# ✅ Checklist Sebelum Deploy

## Pre-Deployment Checklist

### 🔧 Development
- [x] Dependencies terinstall (`npm install`)
- [x] Build berhasil (`npm run build`)
- [x] TypeScript tanpa error
- [x] ESLint configured
- [ ] Test local (`npm run dev`)
- [ ] Browser testing (Chrome, Firefox, Safari)
- [ ] Mobile responsive testing

### 🔑 Google Drive Setup
- [ ] Google Cloud Project dibuat
- [ ] Google Drive API enabled
- [ ] Service Account dibuat
- [ ] JSON key downloaded
- [ ] Folder Google Drive di-share dengan service account
- [ ] Folder ID sudah dicopy

### 📝 Environment Variables
- [ ] `.env.local` dibuat untuk development
- [ ] `GDRIVE_CLIENT_EMAIL` diisi
- [ ] `GDRIVE_PRIVATE_KEY` diisi (dengan format benar)
- [ ] `GDRIVE_FOLDER_ID` diisi
- [ ] Test API `/api/drive` berjalan

### 🚀 Vercel Deployment
- [ ] Repository pushed ke GitHub
- [ ] Project di-import ke Vercel
- [ ] Environment variables di-set di Vercel:
  - [ ] `GDRIVE_CLIENT_EMAIL`
  - [ ] `GDRIVE_PRIVATE_KEY` (tanpa quotes tambahan!)
  - [ ] `GDRIVE_FOLDER_ID`
- [ ] Build & Deploy berhasil
- [ ] Production URL bisa diakses
- [ ] Foto/video dari Drive muncul

### 🧪 Post-Deployment Testing
- [ ] Homepage loading dengan baik
- [ ] Foto/video dari Google Drive muncul
- [ ] Lightbox berfungsi (klik foto)
- [ ] Video playback berjalan
- [ ] Loading state tampil
- [ ] Error handling berfungsi (jika ada error)
- [ ] Mobile responsive
- [ ] Performance baik (Lighthouse score)

### 🔒 Security Check
- [ ] `.env.local` tidak ter-commit ke Git
- [ ] `.gitignore` sudah benar
- [ ] Private key tidak ter-expose
- [ ] Service account hanya punya akses Viewer
- [ ] Environment variables aman di Vercel

### 📊 Optional Enhancements
- [ ] Custom domain setup
- [ ] Vercel Analytics enabled
- [ ] OG Image/Social preview
- [ ] Favicon customized
- [ ] Google Analytics (optional)
- [ ] Error monitoring (Sentry, etc)

## 🎯 Quick Commands

```bash
# Development
npm run dev

# Build test
npm run build

# Lint
npm run lint

# Start production (after build)
npm start

# Deploy to Vercel
vercel --prod
```

## 📞 Need Help?

Lihat dokumentasi:
- [README.md](./README.md) - Overview
- [QUICKSTART.md](./QUICKSTART.md) - Quick start
- [SETUP_GOOGLE_DRIVE.md](./SETUP_GOOGLE_DRIVE.md) - Google Drive setup
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deploy guide

---

**Good luck with your deployment! 🚀**
