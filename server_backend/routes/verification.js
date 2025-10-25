const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { submitVerification } = require('../controllers/verificationController');

// 🔹 Pastikan folder 'uploads' ada, kalau belum ada otomatis dibuat
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log('📂 Folder "uploads" otomatis dibuat');
}

// 🔹 Konfigurasi Multer untuk penyimpanan file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Ganti spasi di nama file agar tidak error
    cb(null, `${Date.now()}-${file.fieldname}-${file.originalname.replace(/\s/g, '_')}`);
  }
});

const upload = multer({ storage: storage });

// 🔹 Middleware upload.fields() digunakan untuk menerima beberapa file
router.post(
  '/',
  upload.fields([
    { name: 'ktpFile', maxCount: 1 },
    { name: 'selfieFile', maxCount: 1 },
    { name: 'skckFile', maxCount: 1 },
    { name: 'stnkFile', maxCount: 1 }
  ]),
  submitVerification
);

module.exports = router;
