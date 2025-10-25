const User = require('../models/User');

// 🔹 Fungsi untuk submit data verifikasi
const submitVerification = async (req, res) => {
  try {
    const userId = req.body.userId; 

    if (!userId) {
      return res.status(400).json({ message: 'User ID tidak ditemukan' });
    }

    const files = req.files;
    // ... (Logika pengecekan file yang disesuaikan) ...

    const existingUser = await User.findById(userId);
    if (!existingUser) {
        return res.status(404).json({ message: 'User tidak ditemukan' });
    }

    const verificationData = {
        // Ambil path relatif file yang disimpan Multer
        ktpFile: files.ktpFile ? files.ktpFile[0].filename : null,
        selfieFile: files.selfieFile ? files.selfieFile[0].filename : null,
        skckFile: files.skckFile ? files.skckFile[0].filename : null,
        stnkFile: files.stnkFile ? files.stnkFile[0].filename : null, 
        createdAt: new Date(),
    };

    // Cari user dan update data verifikasi
    const user = await User.findByIdAndUpdate(
      userId,
      {
        verifikasi: verificationData,
        isVerif: true, 
      },
      { new: true, runValidators: true } 
    ).select('-password'); 

    if (!user) {
      return res.status(404).json({ message: 'User tidak ditemukan setelah update' });
    }

    res.status(200).json({
      message: '✅ Verifikasi Akun Berhasil!', 
      user: user
    });

  } catch (error) {
    console.error('Error saat submit verifikasi:', error);
    res.status(500).json({ message: 'Gagal submit verifikasi', error: error.message });
  }
};

module.exports = { submitVerification };