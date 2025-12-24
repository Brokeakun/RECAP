# Vercel Deployment Checklist

## ✅ Persiapan Sebelum Deploy

- [ ] Pastikan semua dependencies sudah terinstall
- [ ] Test build di local: `npm run build`
- [ ] Setup Google Drive API dan Service Account
- [ ] Share folder Google Drive dengan service account email
- [ ] Copy ID folder dari URL Google Drive

## 🔑 Environment Variables yang Dibutuhkan

Di Vercel Dashboard > Project Settings > Environment Variables, tambahkan:

### 1. GDRIVE_CLIENT_EMAIL
```
Value: your-service-account@your-project.iam.gserviceaccount.com
```
(Email dari service account JSON file)

### 2. GDRIVE_PRIVATE_KEY
```
Value: -----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC...
(paste seluruh private key dari JSON, termasuk BEGIN dan END)
...
-----END PRIVATE KEY-----
```
**PENTING:** 
- Paste langsung tanpa quotes tambahan
- Vercel otomatis handle multiline
- Jangan tambahkan \n manual

### 3. GDRIVE_FOLDER_ID
```
Value: 1a2b3c4d5e6f7g8h9i0j
```
(ID dari URL folder: https://drive.google.com/drive/folders/[ID_INI])

## 📋 Langkah Deploy

### Via Vercel Dashboard

1. Push code ke GitHub
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. Login ke https://vercel.com

3. Klik "Add New Project"

4. Import repository GitHub

5. Framework preset: Next.js (auto-detect)

6. Add Environment Variables (3 variabel di atas)

7. Klik "Deploy"

8. Tunggu hingga selesai (2-3 menit)

9. Website online di: https://your-project.vercel.app

### Via Vercel CLI

```bash
# Install CLI
npm i -g vercel

# Login
vercel login

# Deploy preview
vercel

# Deploy production
vercel --prod
```

## 🧪 Testing Setelah Deploy

- [ ] Buka URL production
- [ ] Check apakah foto/video muncul
- [ ] Test lightbox (klik foto)
- [ ] Test responsive (mobile/tablet)
- [ ] Check console untuk errors
- [ ] Test video playback

## ⚠️ Common Issues

### Foto tidak muncul
- Check environment variables di Vercel
- Verify service account punya akses ke folder
- Check folder ID sudah benar

### Build failed
- Check format private key (jangan ada quotes tambahan)
- Pastikan semua dependencies ada di package.json
- Check logs di Vercel dashboard

### 403 Forbidden
- Service account belum diberi akses ke folder
- Share folder dengan email service account

## 🔄 Update Aplikasi

Setiap kali push ke GitHub branch main, Vercel otomatis rebuild dan deploy:

```bash
git add .
git commit -m "Update feature"
git push origin main
```

## 📊 Monitoring

- Dashboard: https://vercel.com/dashboard
- Analytics: Vercel Analytics (gratis)
- Logs: Project > Deployments > [Latest] > Logs

## 🎉 Selesai!

Aplikasi sudah online dan siap digunakan!
URL: https://your-project.vercel.app
