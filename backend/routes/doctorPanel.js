const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');

// all routes protected for doctors
router.use(auth('doctor'));

// helper to get doctor's doc
const getDoctorDoc = async (userId) => {
  return await Doctor.findOne({ user: userId });
};

// get appointments for this doctor
router.get('/appointments', async (req, res) => {
  try {
    const doc = await getDoctorDoc(req.user.id);
    if (!doc) return res.status(404).json({ msg: 'Doctor profile not found' });
    const appts = await Appointment.find({ doctor: doc._id }).populate('patient', '-password');
    res.json(appts);
  } catch (err) { console.error(err); res.status(500).send('Server error'); }
});

// update appointment status (complete/cancel)
router.put('/appointments/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const appt = await Appointment.findById(req.params.id);
    if (!appt) return res.status(404).json({ msg: 'Appointment not found' });
    // ensure appointment belongs to doctor's doc
    const doc = await getDoctorDoc(req.user.id);
    if (!doc || String(appt.doctor) !== String(doc._id)) return res.status(403).json({ msg: 'Not allowed' });
    appt.status = status;
    await appt.save();
    res.json(appt);
  } catch (err) { console.error(err); res.status(500).send('Server error'); }
});

// add slot (doctor adds to their own slots)
router.post('/slots', async (req, res) => {
  try {
    const { date, time } = req.body;
    const doc = await getDoctorDoc(req.user.id);
    if (!doc) return res.status(404).json({ msg: 'Doctor profile not found' });
    doc.slots.push({ date, time });
    await doc.save();
    res.json(doc);
  } catch (err) { console.error(err); res.status(500).send('Server error'); }
});

// remove a slot by index
router.delete('/slots/:index', async (req, res) => {
  try {
    const idx = parseInt(req.params.index, 10);
    const doc = await getDoctorDoc(req.user.id);
    if (!doc) return res.status(404).json({ msg: 'Doctor profile not found' });
    if (isNaN(idx) || idx < 0 || idx >= doc.slots.length) return res.status(400).json({ msg: 'Invalid slot index' });
    doc.slots.splice(idx, 1);
    await doc.save();
    res.json(doc);
  } catch (err) { console.error(err); res.status(500).send('Server error'); }
});

module.exports = router;
