require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Doctor = require('../models/Doctor');

const docs = [
  {
    name: "Dr. Richard James",
    specialty: "Cardiologist",
    bio: "Experienced cardiologist with 10+ years.",
    avatar: "",
    slots: [
      { date: "2025-11-20", time: "10:00" },
      { date: "2025-11-20", time: "11:00" },
      { date: "2025-11-21", time: "14:00" }
    ]
  },
  {
    name: "Dr. Sarah Lee",
    specialty: "Dermatologist",
    bio: "Skin specialist.",
    avatar: "",
    slots: [
      { date: "2025-11-20", time: "09:00" },
      { date: "2025-11-20", time: "12:00" }
    ]
  }
];

const run = async () => {
  await connectDB();
  await Doctor.deleteMany({});
  await Doctor.insertMany(docs);
  console.log('Seeded doctors');
  process.exit();
};

run();
