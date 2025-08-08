const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/auth');
const Trip = require('../models/Trip');

// All trip routes require authentication
router.use(authenticateToken);

// Get all trips for user
router.get('/', async (req, res) => {
  try {
    const trips = await Trip.find({ userId: req.user.id }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      data: { trips }
    });
  } catch (error) {
    console.error('Get trips error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get trips',
      error: error.message
    });
  }
});

// Get specific trip
router.get('/:tripId', async (req, res) => {
  try {
    const trip = await Trip.findOne({ 
      _id: req.params.tripId, 
      userId: req.user.id 
    });

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: 'Trip not found'
      });
    }

    res.status(200).json({
      success: true,
      data: { trip }
    });
  } catch (error) {
    console.error('Get trip error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get trip',
      error: error.message
    });
  }
});

// Create new trip
router.post('/', async (req, res) => {
  try {
    const tripData = {
      ...req.body,
      userId: req.user.id
    };

    const trip = new Trip(tripData);
    await trip.save();

    res.status(201).json({
      success: true,
      message: 'Trip created successfully',
      data: { trip }
    });
  } catch (error) {
    console.error('Create trip error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create trip',
      error: error.message
    });
  }
});

// Update trip
router.put('/:tripId', async (req, res) => {
  try {
    const trip = await Trip.findOneAndUpdate(
      { _id: req.params.tripId, userId: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: 'Trip not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Trip updated successfully',
      data: { trip }
    });
  } catch (error) {
    console.error('Update trip error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update trip',
      error: error.message
    });
  }
});

// Delete trip
router.delete('/:tripId', async (req, res) => {
  try {
    const trip = await Trip.findOneAndDelete({
      _id: req.params.tripId,
      userId: req.user.id
    });

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: 'Trip not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Trip deleted successfully'
    });
  } catch (error) {
    console.error('Delete trip error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete trip',
      error: error.message
    });
  }
});

module.exports = router; 