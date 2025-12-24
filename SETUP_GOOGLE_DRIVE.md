# Panduan Lengkap Setup Google Drive API

## 📝 Langkah-langkah Detail

### 1. Buat Google Cloud Project

1. Buka [Google Cloud Console](https://console.cloud.google.com/)
2. Klik dropdown project di header (sebelah kiri logo Google Cloud)
3. Klik "New Project"
4. Isi:
   - **Project name**: Galeri Kita (atau nama lain)
   - **Location**: No organization
5. Klik "Create"
6. Tunggu beberapa detik hingga project dibuat

### 2. Enable Google Drive API

1. Pastikan project yang baru dibuat sudah dipilih (cek di header)
2. Di sidebar kiri, klik "APIs & Services" > "Library"
3. Di search box, ketik "Google Drive API"
4. Klik hasil pertama "Google Drive API"
5. Klik tombol biru "ENABLE"
6. Tunggu hingga API aktif

### 3. Buat Service Account

1. Di sidebar, klik "APIs & Services" > "Credentials"
2. Klik tombol "+ CREATE CREDENTIALS" di atas
3. Pilih "Service account"
4. Isi form:
   - **Service account name**: galeri-kita-service
   - **Service account ID**: (auto-generate)
   - **Description**: Service account untuk galeri foto
5. Klik "CREATE AND CONTINUE"
6. Di "Grant this service account access to project":
   - Skip (tidak perlu pilih role)
   - Klik "CONTINUE"
7. Di "Grant users access to this service account":
   - Skip
   - Klik "DONE"

### 4. Generate & Download JSON Key

1. Di halaman Credentials, scroll ke bawah ke section "Service Accounts"
2. Klik email service account yang baru dibuat (galeri-kita-service@...)
3. Klik tab "KEYS"
4. Klik "ADD KEY" > "Create new key"
5. Pilih format "JSON"
6. Klik "CREATE"
7. File JSON akan otomatis terdownload
8. **SIMPAN FILE INI DENGAN AMAN** (jangan share ke siapapun!)

### 5. Extract Credentials dari JSON

Buka file JSON yang didownload. Strukturnya seperti ini:

```json
{
  "type": "service_account",
  "project_id": "your-project-id",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIE...\n-----END PRIVATE KEY-----\n",
  "client_email": "galeri-kita-service@your-project.iam.gserviceaccount.com",
  "client_id": "...",
  "auth_uri": "...",
  "token_uri": "...",
  "auth_provider_x509_cert_url": "...",
  "client_x509_cert_url": "..."
}
```

Yang kita butuhkan:
- ✅ `client_email` → untuk GDRIVE_CLIENT_EMAIL
- ✅ `private_key` → untuk GDRIVE_PRIVATE_KEY

### 6. Setup Folder Google Drive

1. Buka [Google Drive](https://drive.google.com/)
2. Buat folder baru atau pilih folder yang sudah ada
3. Upload beberapa foto/video untuk test
4. Klik kanan folder > "Share" / "Bagikan"
5. Di "Add people and groups":
   - Paste email service account: `galeri-kita-service@your-project.iam.gserviceaccount.com`
   - Set role: **Viewer** (sudah cukup)
   - **UNCHECK** "Notify people" (tidak perlu kirim email)
6. Klik "Share"
7. Copy ID folder dari URL browser:
   - URL: `https://drive.google.com/drive/folders/1a2b3c4d5e6f7g8h9i0j`
   - ID: `1a2b3c4d5e6f7g8h9i0j`

### 7. Setup Environment Variables

#### Untuk Development (Local):

1. Copy `.env.example` menjadi `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local`:
   ```env
   GDRIVE_CLIENT_EMAIL=galeri-kita-service@your-project.iam.gserviceaccount.com
   GDRIVE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASC...\n-----END PRIVATE KEY-----\n"
   GDRIVE_FOLDER_ID=1a2b3c4d5e6f7g8h9i0j
   ```

   **Tips Private Key:**
   - Copy paste langsung dari JSON
   - Pastikan ada `\n` untuk newline
   - Bungkus dengan quotes `"..."`

#### Untuk Production (Vercel):

Di Vercel Dashboard > Project Settings > Environment Variables:

1. **GDRIVE_CLIENT_EMAIL**
   ```
   galeri-kita-service@your-project.iam.gserviceaccount.com
   ```

2. **GDRIVE_PRIVATE_KEY**
   ```
   -----BEGIN PRIVATE KEY-----
   MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC...
   (paste seluruh key, termasuk BEGIN dan END)
   ...
   -----END PRIVATE KEY-----
   ```
   ⚠️ **PENTING:** Jangan tambahkan quotes di Vercel!

3. **GDRIVE_FOLDER_ID**
   ```
   1a2b3c4d5e6f7g8h9i0j
   ```

### 8. Test Local

```bash
npm run dev
```

Buka http://localhost:3000 - foto dari Google Drive seharusnya muncul!

## 🔍 Troubleshooting

### "Missing Google Drive API credentials"
❌ Environment variables belum di-set
✅ Pastikan `.env.local` ada dan terisi dengan benar

### "Failed to fetch files from Google Drive"
❌ Service account belum punya akses ke folder
✅ Share folder dengan email service account

### "Invalid credentials"
❌ Private key salah format
✅ Copy paste ulang dari JSON, pastikan ada `\n`

### Foto tidak muncul
❌ Folder ID salah
✅ Check URL folder Google Drive, copy ID yang benar

## 🎉 Done!

Kalau semua langkah sudah diikuti, aplikasi seharusnya bisa menampilkan foto/video dari Google Drive!

**Next step:** Deploy ke Vercel (lihat `DEPLOYMENT.md`)
