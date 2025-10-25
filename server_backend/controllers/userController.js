const User = require('../models/User');
const bcrypt = require('bcryptjs');

// 🔹 Register
const registerUser = async (req, res) => {
  try {
    const { email, username, nomorHp, password, nama } = req.body;

    if (!email || !username || !nomorHp || !password || !nama) {
      return res.status(400).json({ message: "Field tidak boleh kosong" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email sudah terdaftar" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      username,
      nomorHp,
      password: hashedPassword,
      nama,
      isVerifikasi: false
    });

    await newUser.save();

    res.status(201).json({
      message: "User berhasil dibuat",
      user: {
        id: newUser._id,
        email: newUser.email,
        username: newUser.username,
        nomorHp: newUser.nomorHp
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Gagal membuat user", error: error.message });
  }
};

// 🔹 Login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email dan password harus diisi" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User tidak ditemukan" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Password salah" });

    res.status(200).json({
      message: "Login berhasil",
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        nomorHp: user.nomorHp
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Gagal login", error: error.message });
  }
};

// 🔹 Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data user", error: error.message });
  }
};

module.exports = { registerUser, loginUser, getAllUsers };
