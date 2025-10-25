const mongoose = require('mongoose');
const User = require('./models/User');
const Job = require('./models/Job');

// 🔹 Koneksi MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/jobwaroeng', {})
.then(() => console.log('✅ Terhubung ke MongoDB'))
.catch(err => console.error('❌ Gagal konek MongoDB:', err));

// 🔹 Data 10 user (beberapa punya fotoKTP, beberapa tidak)
const usersData = [
  { email: "indra@example.com", username: "Indra", password: "indrapass", nama: "Indra Setiawan", nomorHp: "081234567890", fotoKTP: "ktp1.jpg", lokasi: "Bandung", pekerjaan: "Barista", salary: "200000", verifikasi: null, isVerif: false },
  { email: "rahmad@example.com", username: "Rahmad", password: "rahmadpass", nama: "Rahmad Fadhil", nomorHp: "082134567891", lokasi: "Bandung", pekerjaan: "Barista", salary: "250000", verifikasi: null, isVerif: false },
  { email: "rizky@example.com", username: "Rizky", password: "rizkypass", nama: "Rizky Ramadhan", nomorHp: "083134567892", fotoKTP: "ktp3.png", lokasi: "Jakarta", pekerjaan: "Penjaga Toko", salary: "150000", verifikasi: null, isVerif: false },
  { email: "nina@example.com", username: "Nina", password: "ninapass", nama: "Nina Kartika", nomorHp: "084134567893", lokasi: "Medan", pekerjaan: "Kasir Minimarket", salary: "270000", verifikasi: null, isVerif: false },
  { email: "budi@example.com", username: "Budi", password: "budipass", nama: "Budi Santoso", nomorHp: "085134567894", fotoKTP: "ktp5.jpg", lokasi: "Bandung", pekerjaan: "Driver Mobil", salary: "280000", verifikasi: null, isVerif: false },
  { email: "sari@example.com", username: "Sari", password: "saripass", nama: "Sari Lestari", nomorHp: "086134567895", lokasi: "Surabaya", pekerjaan: "Staff Gudang", salary: "200000", verifikasi: null, isVerif: false },
  { email: "fajar@example.com", username: "Fajar", password: "fajarpass", nama: "Fajar Prasetyo", nomorHp: "087134567896", fotoKTP: "ktp7.png", lokasi: "Bogor", pekerjaan: "Kurir Motor", salary: "390000", verifikasi: null, isVerif: false },
  { email: "lina@example.com", username: "Lina", password: "linapass", nama: "Lina Marlina", nomorHp: "088134567897", lokasi: "Riau", pekerjaan: "Admin Sosial Media", salary: "100000", verifikasi: null, isVerif: false },
  { email: "agus@example.com", username: "Agus", password: "aguspass", nama: "Agus Setiono", nomorHp: "089134567898", fotoKTP: "ktp9.jpg", lokasi: "Aceh", pekerjaan: "Desainer Grafis", salary: "550000", verifikasi: null, isVerif: false },
  { email: "tina@example.com", username: "Tina", password: "tinapass", nama: "Tina Anggraini", nomorHp: "089934567899", lokasi: "Jakarta", pekerjaan: "Operator Produksi", salary: "900000", verifikasi: null, isVerif: false }
];


// 🔹 Data 10 job (nanti userId akan diganti setelah user disimpan)
let jobsData = [
  { judulPekerjaan: "Helper Toko", kategori: "Perdagangan", deskripsi: "Membantu pekerjaan toko sehari-hari", alamat: "Jakarta", tanggal: "2025-10-25", waktu: "09:00", jumlahHelper: 2, budget: 50000, izinkanTawarMenawar: true },
  { judulPekerjaan: "Kurir Motor", kategori: "Logistik", deskripsi: "Mengantar paket area Depok", alamat: "Depok", tanggal: "2025-10-26", waktu: "08:30", jumlahHelper: 1, budget: 80000, izinkanTawarMenawar: false },
  { judulPekerjaan: "Tukang Kebun", kategori: "Kebersihan", deskripsi: "Membersihkan taman depan dan belakang", alamat: "Bekasi", tanggal: "2025-10-27", waktu: "07:30", jumlahHelper: 1, budget: 100000, izinkanTawarMenawar: true },
  { judulPekerjaan: "Asisten Rumah Tangga", kategori: "Rumah Tangga", deskripsi: "Membersihkan rumah 2 lantai", alamat: "Tangerang", tanggal: "2025-10-28", waktu: "09:00", jumlahHelper: 1, budget: 150000, izinkanTawarMenawar: true },
  { judulPekerjaan: "Driver Harian", kategori: "Transportasi", deskripsi: "Mengemudi mobil pribadi", alamat: "Jakarta", tanggal: "2025-10-29", waktu: "07:00", jumlahHelper: 1, budget: 200000, izinkanTawarMenawar: false },
  { judulPekerjaan: "Pelayan Cafe", kategori: "Kuliner", deskripsi: "Melayani pelanggan dan mencatat pesanan", alamat: "Bandung", tanggal: "2025-10-30", waktu: "10:00", jumlahHelper: 2, budget: 120000, izinkanTawarMenawar: true },
  { judulPekerjaan: "Cuci Motor", kategori: "Jasa", deskripsi: "Mencuci motor pelanggan di lokasi", alamat: "Bogor", tanggal: "2025-10-31", waktu: "09:00", jumlahHelper: 2, budget: 70000, izinkanTawarMenawar: true },
  { judulPekerjaan: "Penjaga Stand", kategori: "Event", deskripsi: "Menjaga stand makanan di bazar", alamat: "Jakarta Barat", tanggal: "2025-11-01", waktu: "08:00", jumlahHelper: 2, budget: 90000, izinkanTawarMenawar: false },
  { judulPekerjaan: "Penerjemah", kategori: "Layanan Profesional", deskripsi: "Menerjemahkan dokumen bahasa Inggris", alamat: "Online", tanggal: "2025-11-02", waktu: "13:00", jumlahHelper: 1, budget: 250000, izinkanTawarMenawar: false },
  { judulPekerjaan: "Tukang Cat", kategori: "Renovasi", deskripsi: "Mengecat dinding rumah minimalis", alamat: "Cibubur", tanggal: "2025-11-03", waktu: "08:30", jumlahHelper: 2, budget: 180000, izinkanTawarMenawar: true }
];

// 🔹 Fungsi seeding data
const seedData = async () => {
  try {
    await User.deleteMany({});
    await Job.deleteMany({});
    console.log("🧹 Koleksi lama dihapus");

    const savedUsers = await User.insertMany(usersData);
    console.log(`✅ ${savedUsers.length} user berhasil ditambahkan`);

    // Ambil ID user untuk setiap job
    jobsData = jobsData.map((job, i) => ({
      ...job,
      userId: savedUsers[i % savedUsers.length]._id // rotasi user
    }));

    await Job.insertMany(jobsData);
    console.log(`✅ ${jobsData.length} job berhasil ditambahkan`);

    console.log("🎉 Semua data dummy berhasil dimasukkan ke MongoDB!");
  } catch (error) {
    console.error("❌ Gagal menambahkan data:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedData();
