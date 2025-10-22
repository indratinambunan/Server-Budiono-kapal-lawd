const express = require('express');
const cors = require('cors');
const jobRoutes = require('./routes/jobs'); // <-- tambahkan 'routes/'

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server JobWaroeng berjalan!');
});

app.use('/jobs', jobRoutes);

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
