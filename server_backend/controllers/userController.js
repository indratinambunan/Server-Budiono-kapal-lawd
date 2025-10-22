const users = []; // sementara pakai array dulu

const registerUser = (req, res) => {
  const { email, username, password } = req.body;
  if (!email || !username || !password) {
    return res.status(400).json({ message: 'Field tidak boleh kosong' });
  }
  users.push({ email, username, password });
  res.status(201).json({ message: 'User berhasil terdaftar' });
};

const loginUser = (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    return res.json({ message: 'Login berhasil', user });
  } else {
    return res.status(401).json({ message: 'Email atau password salah' });
  }
};

module.exports = { registerUser, loginUser };
