const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');
const auth = require('../middleware/auth');

// get all doctors
router.get('/', async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (err) { console.error(err); res.status(500).send('Server error'); }
});

// get single doctor
router.get('/:id', async (req,res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ msg: 'Doctor not found' });
    res.json(doctor);
  } catch (err) { console.error(err); res.status(500).send('Server error'); }
});

// admin: add doctor (protected)
router.post('/', auth('admin'), async (req,res) => {
  try {
    const doctor = new Doctor(req.body);
    await doctor.save();
    res.json(doctor);
  } catch (err) { console.error(err); res.status(500).send('Server error'); }
});

module.exports = router;
