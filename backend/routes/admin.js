const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');
const auth = require('../middleware/auth');

// protected: admin only
router.use(auth('admin'));

// get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) { console.error(err); res.status(500).send('Server error'); }
});

// change user role
router.put('/users/:id/role', async (req, res) => {
  try {
    const { role } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });
    user.role = role;
    await user.save();
    res.json(user);
  } catch (err) { console.error(err); res.status(500).send('Server error'); }
});

// delete user
router.delete('/users/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ msg: 'User deleted' });
  } catch (err) { console.error(err); res.status(500).send('Server error'); }
});

// get all appointments
router.get('/appointments', async (req, res) => {
  try {
    const appts = await Appointment.find().populate('doctor').populate('patient', '-password');
    res.json(appts);
  } catch (err) { console.error(err); res.status(500).send('Server error'); }
});

// update appointment status
router.put('/appointments/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const appt = await Appointment.findById(req.params.id);
    if (!appt) return res.status(404).json({ msg: 'Appointment not found' });
    appt.status = status;
    await appt.save();
    res.json(appt);
  } catch (err) { console.error(err); res.status(500).send('Server error'); }
});

// get all doctors
router.get('/doctors', async (req, res) => {
  try {
    const docs = await Doctor.find();
    res.json(docs);
  } catch (err) { console.error(err); res.status(500).send('Server error'); }
});

// delete doctor
router.delete('/doctors/:id', async (req, res) => {
  try {
    await Doctor.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Doctor deleted' });
  } catch (err) { console.error(err); res.status(500).send('Server error'); }
});

// add slot to doctor
router.post('/doctors/:id/slots', async (req, res) => {
  try {
    const { date, time } = req.body;
    const doc = await Doctor.findById(req.params.id);
    if (!doc) return res.status(404).json({ msg: 'Doctor not found' });
    doc.slots.push({ date, time });
    await doc.save();
    res.json(doc);
  } catch (err) { console.error(err); res.status(500).send('Server error'); }
});

module.exports = router;
