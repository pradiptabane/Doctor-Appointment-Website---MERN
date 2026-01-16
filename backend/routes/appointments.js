const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const auth = require('../middleware/auth');

// book appointment
router.post('/book', auth(), async (req,res) => {
  try {
    const { doctorId, date, time } = req.body;
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) return res.status(404).json({ msg:'Doctor not found' });

    const slot = doctor.slots.find(s => s.date === date && s.time === time);
    if (!slot || slot.booked) return res.status(400).json({ msg: 'Slot unavailable' });

    const appointment = new Appointment({
      patient: req.user.id,
      doctor: doctorId,
      date, time
    });
    await appointment.save();

    slot.booked = true;
    await doctor.save();

    res.json(appointment);
  } catch (err) { console.error(err); res.status(500).send('Server error'); }
});

// get appointments for user
router.get('/my', auth(), async (req,res) => {
  try {
    const appts = await Appointment.find({ patient: req.user.id }).populate('doctor');
    res.json(appts);
  } catch (err) { console.error(err); res.status(500).send('Server error'); }
});

// cancel appointment
router.post('/cancel/:id', auth(), async (req, res) => {
  try {
    const appt = await Appointment.findById(req.params.id);
    if (!appt) return res.status(404).json({ msg: 'Appointment not found' });
    if (String(appt.patient) !== req.user.id) return res.status(403).json({ msg: 'Not allowed' });
    appt.status = 'cancelled';
    await appt.save();
    const doctor = await Doctor.findById(appt.doctor);
    const slot = doctor.slots.find(s => s.date === appt.date && s.time === appt.time);
    if (slot) { slot.booked = false; await doctor.save(); }
    res.json({ msg: 'Cancelled' });
  } catch (err) { console.error(err); res.status(500).send('Server error'); }
});

module.exports = router;
