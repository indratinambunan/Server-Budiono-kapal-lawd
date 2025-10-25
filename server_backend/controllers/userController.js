const User = require('../models/User');

// 🔹 Register user baru
const registerUser = async (req, res) => {
  try {
    const { email, username, password, nama, nomorHp} = req.body;

    if (!email || !username || !password || !nama || !nomorHp) {
      return res.status(400).json({ message: 'Field tidak boleh kosong' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email sudah terdaftar' });

    const newUser = new User({ email, username, password, nama, nomorHp});
    await newUser.save();

    res.status(201).json({ message: 'User berhasil terdaftar', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Gagal register user', error: error.message });
  }
};

// 🔹 Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) return res.status(401).json({ message: 'Email atau password salah' });
    res.json({ message: 'Login berhasil', user });
  } catch (error) {
    res.status(500).json({ message: 'Gagal login', error: error.message });
  }
};

// 🔹 Get semua user
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil data user', error: error.message });
  }
};

// get user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });
    res.json({ message: 'user ditemukan', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


module.exports = { registerUser, loginUser, getAllUsers, getUserById };
