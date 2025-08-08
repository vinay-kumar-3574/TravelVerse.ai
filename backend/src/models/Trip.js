const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tripName: {
    type: String,
    required: true
  },
  source: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  travelers: [{
    name: String,
    age: Number,
    type: {
      type: String,
      enum: ['adult', 'child', 'infant'],
      default: 'adult'
    }
  }],
  budget: {
    total: Number,
    spent: { type: Number, default: 0 },
    currency: { type: String, default: 'INR' }
  },
  transport: {
    mode: {
      type: String,
      enum: ['flight', 'train', 'bus'],
      required: true
    },
    booking: {
      provider: String,
      bookingId: String,
      departureTime: Date,
      arrivalTime: Date,
      price: Number,
      status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending'
      }
    }
  },
  accommodation: {
    hotelName: String,
    bookingId: String,
    checkIn: Date,
    checkOut: Date,
    price: Number,
    roomType: String,
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'pending'
    }
  },
  itinerary: [{
    day: Number,
    date: Date,
    activities: [{
      time: String,
      activity: String,
      location: String,
      cost: Number
    }]
  }],
  expenses: [{
    category: {
      type: String,
      enum: ['transport', 'accommodation', 'food', 'activities', 'shopping', 'other']
    },
    amount: Number,
    description: String,
    date: { type: Date, default: Date.now }
  }],
  status: {
    type: String,
    enum: ['planning', 'booked', 'ongoing', 'completed', 'cancelled'],
    default: 'planning'
  },
  aiSuggestions: [{
    type: String,
    content: String,
    timestamp: { type: Date, default: Date.now }
  }],
  emergencyContacts: [{
    name: String,
    phone: String,
    relationship: String
  }],
  documents: [{
    type: String,
    name: String,
    url: String
  }]
}, {
  timestamps: true
});

// Calculate total spent
tripSchema.methods.calculateTotalSpent = function() {
  return this.expenses.reduce((total, expense) => total + expense.amount, 0);
};

// Get remaining budget
tripSchema.methods.getRemainingBudget = function() {
  return this.budget.total - this.calculateTotalSpent();
};

module.exports = mongoose.model('Trip', tripSchema); 