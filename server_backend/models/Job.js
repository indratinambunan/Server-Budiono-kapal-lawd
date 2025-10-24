const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  judulPekerjaan: { type: String, required: true },
  kategori: { type: String, required: true },
  deskripsi: { type: String, required: true },
  alamat: { type: String, required: true },
  tanggal: { type: String, required: true },
  waktu: { type: String, required: true },
  jumlahHelper: { type: Number, required: true },
  budget: { type: Number, required: true },
  izinkanTawarMenawar: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Job', jobSchema);
