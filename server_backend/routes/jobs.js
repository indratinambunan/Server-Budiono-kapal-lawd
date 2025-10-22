const express = require('express');
const router = express.Router();

let jobs = [
  {
    id: 1,
    title: "Helper Toko",
    description: "Membantu toko sehari-hari",
    salary: 50000,
    location: "Jakarta",
    date: "2025-10-22",
    userId: 1,
    username: "Indra"
  }
];

router.get('/', (req, res) => {
  res.json(jobs);
});

router.post('/', (req, res) => {
  const { title, description, salary, location, date, userId } = req.body;
  const newJob = {
    id: jobs.length + 1,
    title,
    description,
    salary,
    location,
    date,
    userId,
    username: "Indra"
  };
  jobs.push(newJob);
  res.status(201).json(newJob);
});

module.exports = router;
