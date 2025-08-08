const Joi = require('joi');

class ValidationUtils {
  // User validation schemas
  static userRegistrationSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    fullName: Joi.string().min(2).max(50).required(),
    dateOfBirth: Joi.date().max('now').required(),
    gender: Joi.string().valid('male', 'female', 'other').required(),
    nationality: Joi.string().min(2).max(50).required(),
    primaryLanguage: Joi.string().min(2).max(50).required(),
    contactNumber: Joi.string().pattern(/^\+?[\d\s\-\(\)]+$/).required(),
    preferredTravelMode: Joi.string().valid('flight', 'train', 'bus', 'any').required()
  });

  static userOnboardingSchema = Joi.object({
    travelDocuments: Joi.object({
      passport: Joi.object({
        number: Joi.string().when('$travelMode', {
          is: 'flight',
          then: Joi.required(),
          otherwise: Joi.optional()
        }),
        expiryDate: Joi.date().when('$travelMode', {
          is: 'flight',
          then: Joi.required(),
          otherwise: Joi.optional()
        })
      }).optional(),
      visa: Joi.object({
        number: Joi.string().optional(),
        expiryDate: Joi.date().optional(),
        type: Joi.string().optional()
      }).optional(),
      governmentId: Joi.object({
        type: Joi.string().required(),
        number: Joi.string().required()
      }).optional()
    }).required(),
    emergencyContact: Joi.object({
      name: Joi.string().min(2).max(50).optional(),
      relationship: Joi.string().min(2).max(30).optional(),
      phoneNumber: Joi.string().pattern(/^\+?[\d\s\-\(\)]+$/).optional()
    }).optional(),
    consentAccepted: Joi.boolean().valid(true).required(),
    termsAccepted: Joi.boolean().valid(true).required()
  });

  // Trip validation schemas
  static tripCreationSchema = Joi.object({
    tripName: Joi.string().min(2).max(100).required(),
    source: Joi.string().min(2).max(100).required(),
    destination: Joi.string().min(2).max(100).required(),
    startDate: Joi.date().min('now').required(),
    endDate: Joi.date().min(Joi.ref('startDate')).required(),
    travelers: Joi.number().integer().min(1).max(20).required(),
    budget: Joi.number().positive().required(),
    preferences: Joi.object({
      accommodationType: Joi.string().valid('budget', 'economy', 'mid-range', 'luxury').optional(),
      transportPreference: Joi.string().valid('flight', 'train', 'bus', 'car').optional(),
      activities: Joi.array().items(Joi.string()).optional(),
      dietaryRestrictions: Joi.array().items(Joi.string()).optional(),
      accessibility: Joi.array().items(Joi.string()).optional()
    }).optional()
  });

  static tripUpdateSchema = Joi.object({
    tripName: Joi.string().min(2).max(100).optional(),
    source: Joi.string().min(2).max(100).optional(),
    destination: Joi.string().min(2).max(100).optional(),
    startDate: Joi.date().min('now').optional(),
    endDate: Joi.date().min(Joi.ref('startDate')).optional(),
    travelers: Joi.number().integer().min(1).max(20).optional(),
    budget: Joi.number().positive().optional(),
    preferences: Joi.object({
      accommodationType: Joi.string().valid('budget', 'economy', 'mid-range', 'luxury').optional(),
      transportPreference: Joi.string().valid('flight', 'train', 'bus', 'car').optional(),
      activities: Joi.array().items(Joi.string()).optional(),
      dietaryRestrictions: Joi.array().items(Joi.string()).optional(),
      accessibility: Joi.array().items(Joi.string()).optional()
    }).optional()
  });

  // Chat validation schemas
  static chatMessageSchema = Joi.object({
    content: Joi.string().min(1).max(1000).required(),
    metadata: Joi.object({
      intent: Joi.string().optional(),
      entities: Joi.object().optional(),
      context: Joi.object().optional()
    }).optional()
  });

  // AI interaction validation schemas
  static aiInteractionSchema = Joi.object({
    message: Joi.string().min(1).max(1000).required(),
    context: Joi.object({
      tripId: Joi.string().optional(),
      currentStage: Joi.string().optional(),
      previousMessages: Joi.array().items(Joi.object()).optional()
    }).optional(),
    intent: Joi.string().valid(
      'trip_planning',
      'booking',
      'support',
      'onboarding',
      'general_chat',
      'emergency',
      'translation',
      'budget_planning',
      'what_if_scenario'
    ).optional()
  });

  // Booking validation schemas
  static bookingSchema = Joi.object({
    transportType: Joi.string().valid('flight', 'train', 'bus', 'car').required(),
    source: Joi.string().min(2).max(100).required(),
    destination: Joi.string().min(2).max(100).required(),
    date: Joi.date().min('now').required(),
    travelers: Joi.number().integer().min(1).max(20).required(),
    seatClass: Joi.string().valid('economy', 'business', 'first', 'premium').optional(),
    specialRequests: Joi.array().items(Joi.string()).optional()
  });

  static hotelBookingSchema = Joi.object({
    hotelName: Joi.string().min(2).max(100).required(),
    destination: Joi.string().min(2).max(100).required(),
    checkIn: Joi.date().min('now').required(),
    checkOut: Joi.date().min(Joi.ref('checkIn')).required(),
    travelers: Joi.number().integer().min(1).max(20).required(),
    roomType: Joi.string().valid('single', 'double', 'triple', 'suite').optional(),
    specialRequests: Joi.array().items(Joi.string()).optional()
  });

  // Emergency validation schemas
  static emergencySchema = Joi.object({
    emergencyType: Joi.string().valid(
      'medical',
      'police',
      'fire',
      'accident',
      'lost',
      'theft',
      'natural_disaster',
      'civil_unrest'
    ).required(),
    location: Joi.string().min(2).max(200).required(),
    description: Joi.string().max(500).optional(),
    severity: Joi.string().valid('low', 'medium', 'high').optional()
  });

  // Translation validation schemas
  static translationSchema = Joi.object({
    text: Joi.string().min(1).max(500).required(),
    fromLanguage: Joi.string().min(2).max(10).required(),
    toLanguage: Joi.string().min(2).max(10).required(),
    context: Joi.string().max(100).optional()
  });

  // Validation methods
  static validateUserRegistration(data) {
    return this.userRegistrationSchema.validate(data);
  }

  static validateUserOnboarding(data, travelMode) {
    return this.userOnboardingSchema.validate(data, { context: { travelMode } });
  }

  static validateTripCreation(data) {
    return this.tripCreationSchema.validate(data);
  }

  static validateTripUpdate(data) {
    return this.tripUpdateSchema.validate(data);
  }

  static validateChatMessage(data) {
    return this.chatMessageSchema.validate(data);
  }

  static validateAIInteraction(data) {
    return this.aiInteractionSchema.validate(data);
  }

  static validateBooking(data) {
    return this.bookingSchema.validate(data);
  }

  static validateHotelBooking(data) {
    return this.hotelBookingSchema.validate(data);
  }

  static validateEmergency(data) {
    return this.emergencySchema.validate(data);
  }

  static validateTranslation(data) {
    return this.translationSchema.validate(data);
  }

  // Utility methods
  static sanitizeInput(input) {
    if (typeof input === 'string') {
      return input.trim().replace(/[<>]/g, '');
    }
    return input;
  }

  static validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static validatePhoneNumber(phone) {
    const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
    return phoneRegex.test(phone);
  }

  static validateDate(date) {
    const inputDate = new Date(date);
    return inputDate instanceof Date && !isNaN(inputDate);
  }

  static validateBudget(budget) {
    return typeof budget === 'number' && budget > 0 && budget <= 1000000;
  }

  static validateTravelers(travelers) {
    return typeof travelers === 'number' && travelers >= 1 && travelers <= 20;
  }

  // Error formatting
  static formatValidationError(error) {
    if (error.details) {
      return error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message,
        value: detail.context?.value
      }));
    }
    return [{ field: 'unknown', message: error.message }];
  }

  // Custom validators
  static customValidators = {
    futureDate: (value, helpers) => {
      const date = new Date(value);
      const now = new Date();
      if (date <= now) {
        return helpers.error('any.invalid');
      }
      return value;
    },

    validCurrency: (value, helpers) => {
      if (typeof value !== 'number' || value <= 0) {
        return helpers.error('any.invalid');
      }
      return value;
    },

    validLocation: (value, helpers) => {
      if (value.length < 2 || value.length > 100) {
        return helpers.error('any.invalid');
      }
      return value;
    }
  };
}

module.exports = ValidationUtils; 