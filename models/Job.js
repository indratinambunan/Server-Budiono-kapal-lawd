const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  username: { type: String, required: true },
  title: { type: String, required: true },
  date: { type: String },
  location: { type: String },
  salary: { type: String },
}, { timestamps: true }); 

module.exports = mongoose.model('Job', jobSchema);
