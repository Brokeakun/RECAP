# 🔑 Cara Mengisi Environment Variables

## Untuk Development (Local)

### 1. Copy Template
```bash
cp .env.example .env.local
```

### 2. Buka File JSON dari Google Cloud

File JSON yang Anda download dari Service Account terlihat seperti ini:

```json
{
  "type": "service_account",
  "project_id": "galeri-kita-123456",
  "private_key_id": "abc123def456...",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASC...\n-----END PRIVATE KEY-----\n",
  "client_email": "galeri-service@galeri-kita-123456.iam.gserviceaccount.com",
  "client_id": "123456789",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/..."
}
```

### 3. Edit .env.local

```env
# 1. GDRIVE_CLIENT_EMAIL
# Copy dari field "client_email" di JSON
GDRIVE_CLIENT_EMAIL=galeri-service@galeri-kita-123456.iam.gserviceaccount.com

# 2. GDRIVE_PRIVATE_KEY
# Copy SELURUH field "private_key" dari JSON (termasuk \n)
# Bungkus dengan quotes "..."
GDRIVE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"

# 3. GDRIVE_FOLDER_ID
# Buka folder Google Drive Anda di browser
# URL: https://drive.google.com/drive/folders/1a2b3c4d5e6f7g8h9i0j
# Copy bagian setelah /folders/ → 1a2b3c4d5e6f7g8h9i0j
GDRIVE_FOLDER_ID=1a2b3c4d5e6f7g8h9i0j
```

### ⚠️ Tips untuk Private Key:

**Cara 1: Copy Paste dari JSON**
```env
GDRIVE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvgIBADA...\n-----END PRIVATE KEY-----\n"
```
- Keep semua `\n` (jangan replace dengan enter)
- Bungkus dengan quotes
- Satu line saja

**Cara 2: Multi-line (PowerShell/Bash)**
```env
GDRIVE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC...
...
-----END PRIVATE KEY-----"
```
- Quotes di awal dan akhir
- Real newlines (Enter)

## Untuk Production (Vercel)

### Di Vercel Dashboard

1. Buka project > Settings > Environment Variables

2. **Tambah Variable 1: GDRIVE_CLIENT_EMAIL**
   ```
   Key: GDRIVE_CLIENT_EMAIL
   Value: galeri-service@galeri-kita-123456.iam.gserviceaccount.com
   ```

3. **Tambah Variable 2: GDRIVE_PRIVATE_KEY**
   ```
   Key: GDRIVE_PRIVATE_KEY
   Value: (paste langsung dari JSON, tanpa quotes!)
   
   -----BEGIN PRIVATE KEY-----
   MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC...
   (seluruh key dengan newline real)
   ...
   -----END PRIVATE KEY-----
   ```
   
   ⚠️ **PENTING di Vercel:**
   - JANGAN tambahkan quotes `"..."` 
   - JANGAN gunakan `\n`
   - Paste langsung dengan Enter/newline real
   - Vercel otomatis handle multiline

4. **Tambah Variable 3: GDRIVE_FOLDER_ID**
   ```
   Key: GDRIVE_FOLDER_ID
   Value: 1a2b3c4d5e6f7g8h9i0j
   ```

5. Klik "Save"

6. Redeploy project (Vercel akan auto-trigger)

## ✅ Verifikasi

### Test Local:
```bash
npm run dev
# Buka http://localhost:3000
# Foto seharusnya muncul
```

### Test Production:
```
# Buka URL Vercel Anda
# Check browser console untuk errors
# Foto seharusnya muncul
```

## 🐛 Troubleshooting

### Error: Missing credentials
❌ Environment variables belum di-set
✅ Check `.env.local` (local) atau Vercel dashboard (production)

### Error: Invalid credentials
❌ Private key format salah
✅ Pastikan:
  - Ada BEGIN dan END
  - Untuk local: bungkus dengan quotes
  - Untuk Vercel: TANPA quotes

### Error: 403 Forbidden
❌ Service account belum punya akses
✅ Share folder Google Drive dengan email service account

### Foto tidak muncul
❌ Folder ID salah
✅ Check URL folder: `https://drive.google.com/drive/folders/[ID_INI]`

## 📝 Contoh .env.local yang Benar

```env
GDRIVE_CLIENT_EMAIL=my-service@my-project-123456.iam.gserviceaccount.com
GDRIVE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDEv7qKW8N1XxYN\nBhL2xJ8fK9vH3Qm5Wp7Lr4tYx...(very long)...kTq2A==\n-----END PRIVATE KEY-----\n"
GDRIVE_FOLDER_ID=1AbCdEfGhIjKlMnOpQrStUvWxYz
```

**Key points:**
- ✅ Email: plain text, no quotes
- ✅ Private key: wrapped in quotes, with `\n`
- ✅ Folder ID: plain text, no quotes

---

**Need help?** Check `SETUP_GOOGLE_DRIVE.md` for complete setup guide.
