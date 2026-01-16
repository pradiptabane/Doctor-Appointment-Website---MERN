require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const User = require('../models/User');
const Doctor = require('../models/Doctor');
const bcrypt = require('bcryptjs');

const run = async () => {
  await connectDB();

  await User.deleteMany({});
  await Doctor.deleteMany({});

  // create admin
  const adminPass = await bcrypt.hash('adminpass', 10);
  const admin = new User({ name: 'Admin User', email: 'admin@prescripto.com', password: adminPass, role: 'admin' });
  await admin.save();

  // create doctor user
  const docPass = await bcrypt.hash('doctorpass', 10);
  const doctorUser = new User({ name: 'Dr. Sarah Lee', email: 'dr.sarah@prescripto.com', password: docPass, role: 'doctor' });
  await doctorUser.save();
  const doctorDoc = new Doctor({
    user: doctorUser._id,
    name: 'Dr. Sarah Lee',
    specialty: 'Dermatologist',
    bio: 'Skin specialist with 8 years experience',
    slots: [
      { date: '2025-11-20', time: '09:00' },
      { date: '2025-11-20', time: '12:00' }
    ]
  });
  await doctorDoc.save();

  // create patient user
  const patPass = await bcrypt.hash('patientpass', 10);
  const patient = new User({ name: 'John Doe', email: 'john@patient.com', password: patPass, role: 'user', medicalHistory: 'No known allergies' });
  await patient.save();

  console.log('Seeded admin, doctor, patient');
  process.exit();
};

run();
