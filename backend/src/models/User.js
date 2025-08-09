const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  dateOfBirth: {
    type: Date,
    required: false // Will be required during onboarding
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: false // Will be required during onboarding
  },
  nationality: {
    type: String,
    required: false // Will be required during onboarding
  },
  primaryLanguage: {
    type: String,
    required: false,
    default: 'English'
  },
  contactNumber: {
    type: String,
    required: false // Will be required during onboarding
  },
  preferredTravelMode: {
    type: String,
    enum: ['flight', 'train', 'bus', 'any'],
    default: 'any'
  },
  travelDocuments: {
    passport: {
      number: String,
      expiryDate: Date,
      issuingCountry: String
    },
    visa: {
      number: String,
      expiryDate: Date,
      issuingCountry: String
    },
    governmentId: {
      type: String,
      number: String
    }
  },
  emergencyContact: {
    name: String,
    relationship: String,
    phone: String,
    email: String
  },
  familyMembers: [{
    name: String,
    dateOfBirth: Date,
    gender: String,
    relationship: String,
    travelDocuments: {
      passport: {
        number: String,
        expiryDate: Date
      },
      visa: {
        number: String,
        expiryDate: Date
      }
    }
  }],
  preferences: {
    budget: {
      type: Number,
      default: 0
    },
    preferredAirlines: [String],
    preferredHotels: [String],
    dietaryRestrictions: [String],
    accessibility: {
      wheelchair: { type: Boolean, default: false },
      visual: { type: Boolean, default: false },
      hearing: { type: Boolean, default: false }
    }
  },
  isOnboarded: {
    type: Boolean,
    default: false
  },
  consentAccepted: {
    type: Boolean,
    default: false
  },
  termsAccepted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema); 