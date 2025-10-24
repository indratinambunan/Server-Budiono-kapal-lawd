const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


const jobRoutes = require('./routes/jobs'); // <-- tambahkan 'routes/'
const userRoutes = require('./routes/user');

const app = express();
const PORT = 5000;

mongoose.connect('mongodb://127.0.0.1:27017/jobwaroeng', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Terhubung ke MongoDB'))
.catch(err => console.error('❌ Gagal konek MongoDB:', err));


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server JobWaroeng berjalan!');
});

app.use('/jobs', jobRoutes);
app.use('/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
