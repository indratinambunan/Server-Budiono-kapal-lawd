const Job = require('../models/Job');

// 🔹 Tambah Job baru
const createJob = async (req, res) => {
  try {
    const {
      userId, judulPekerjaan, kategori, deskripsi,
      alamat, tanggal, waktu, jumlahHelper, budget, izinkanTawarMenawar
    } = req.body;

    if (!userId || !judulPekerjaan || !kategori || !deskripsi || !alamat || !tanggal || !waktu) {
      return res.status(400).json({ message: 'Field tidak boleh kosong' });
    }

    const newJob = new Job({
      userId, judulPekerjaan, kategori, deskripsi,
      alamat, tanggal, waktu, jumlahHelper, budget, izinkanTawarMenawar
    });

    await newJob.save();
    res.status(201).json({ message: 'Job berhasil dibuat', job: newJob });
  } catch (error) {
    res.status(500).json({ message: 'Gagal membuat job', error: error.message });
  }
};

// 🔹 Ambil semua Job
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate('userId', 'nama email username');
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil job', error: error.message });
  }
};

module.exports = { createJob, getAllJobs };
