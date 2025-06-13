import express from 'express';
import Appointment from '../models/Appointment.js';
import { auth, adminAuth } from '../middleware/auth.js';

const router = express.Router();

// Create appointment
router.post('/', auth, async (req, res) => {
  try {
    const appointment = new Appointment({
      ...req.body,
      customer: req.user.userId
    });
    await appointment.save();
    await appointment.populate('service customer');
    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user's appointments
router.get('/my-appointments', auth, async (req, res) => {
  try {
    const appointments = await Appointment.find({ customer: req.user.userId })
      .populate('service')
      .sort({ appointmentDate: -1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all appointments (admin only)
router.get('/', adminAuth, async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('service customer')
      .sort({ appointmentDate: -1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update appointment status (admin only)
router.put('/:id/status', adminAuth, async (req, res) => {
  try {
    const { status } = req.body;
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('service customer');
    
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;