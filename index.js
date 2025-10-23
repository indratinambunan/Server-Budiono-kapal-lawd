require('dotenv').config(); 

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jobRoutes = require('./routes/jobs'); 

const app = express();


app.use(cors());
app.use(express.json()); 


app.use('/api/jobs', jobRoutes);

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/no_poverty';

mongoose
  .connect(mongoUri)
  .then(() => console.log('Terhubung ke MongoDB'))
  .catch((err) => console.error('Gagal terhubung ke MongoDB:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
