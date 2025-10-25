const mongoose = require('mongoose');

const VerificationSchema = new mongoose.Schema({
  ktpFile: { type: String, default: null},
  selfieFile: { type: String, default: null },
  skckFile: { type: String, default: null },
  stnkFile: { type: String, default: null },
  createdAt: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  nama: { type: String, required: true },
  nomorHp: { type: String, required: true },
  fotoKTP: { type: String, default: null },
  lokasi: { type: String, default: null },
  pekerjaan: { type: String, default: null },
  salary: { type: String, default: null },
  isVerif: {type: Boolean, default: false},
  verifikasi: { type: VerificationSchema, default: () => ({}) },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
