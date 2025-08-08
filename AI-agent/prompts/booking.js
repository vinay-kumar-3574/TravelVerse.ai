/**
 * Booking Prompt Templates
 * Contains all GPT prompts used for booking functionality
 */

const BOOKING_PROMPTS = {
  // Flight booking simulation
  flightBooking: `You are a flight booking agent. Simulate booking a flight based on the provided details.

Trip Details: {tripDetails}
User Preferences: {preferences}
Budget: {budget}

Simulate a flight booking and return in JSON format:
{
  "bookingId": "FL-{random 8 digit number}",
  "flightDetails": {
    "airline": "airline name",
    "flightNumber": "flight number",
    "departure": {
      "airport": "airport code",
      "city": "city name",
      "time": "HH:MM",
      "date": "YYYY-MM-DD"
    },
    "arrival": {
      "airport": "airport code", 
      "city": "city name",
      "time": "HH:MM",
      "date": "YYYY-MM-DD"
    },
    "duration": "flight duration",
    "stops": "direct/1 stop/2 stops",
    "class": "economy/business/first"
  },
  "passengers": [
    {
      "name": "passenger name",
      "seat": "seat number",
      "meal": "meal preference"
    }
  ],
  "pricing": {
    "baseFare": {
      "amount": number,
      "currency": "string"
    },
    "taxes": {
      "amount": number,
      "currency": "string"
    },
    "fees": {
      "amount": number,
      "currency": "string"
    },
    "total": {
      "amount": number,
      "currency": "string"
    }
  },
  "baggage": {
    "checked": "number of bags",
    "carryOn": "number of bags",
    "weightLimit": "weight limit"
  },
  "confirmation": {
    "status": "confirmed",
    "bookingDate": "YYYY-MM-DD HH:MM",
    "paymentMethod": "credit card/debit card",
    "receipt": "payment receipt details"
  }
}`,

  // Train booking simulation
  trainBooking: `You are a train booking agent. Simulate booking a train journey based on the provided details.

Trip Details: {tripDetails}
User Preferences: {preferences}
Budget: {budget}

Simulate a train booking and return in JSON format:
{
  "bookingId": "TR-{random 8 digit number}",
  "trainDetails": {
    "trainNumber": "train number",
    "trainName": "train name",
    "departure": {
      "station": "station name",
      "city": "city name",
      "time": "HH:MM",
      "date": "YYYY-MM-DD"
    },
    "arrival": {
      "station": "station name",
      "city": "city name", 
      "time": "HH:MM",
      "date": "YYYY-MM-DD"
    },
    "duration": "journey duration",
    "class": "sleeper/AC3Tier/AC2Tier/AC1Tier",
    "berth": "berth details"
  },
  "passengers": [
    {
      "name": "passenger name",
      "seat": "seat/berth number",
      "meal": "meal preference"
    }
  ],
  "pricing": {
    "baseFare": {
      "amount": number,
      "currency": "string"
    },
    "reservationFee": {
      "amount": number,
      "currency": "string"
    },
    "total": {
      "amount": number,
      "currency": "string"
    }
  },
  "amenities": {
    "food": "meal service available",
    "wifi": "wifi availability",
    "power": "power outlet availability"
  },
  "confirmation": {
    "status": "confirmed",
    "bookingDate": "YYYY-MM-DD HH:MM",
    "paymentMethod": "payment method",
    "receipt": "payment receipt details"
  }
}`,

  // Bus booking simulation
  busBooking: `You are a bus booking agent. Simulate booking a bus journey based on the provided details.

Trip Details: {tripDetails}
User Preferences: {preferences}
Budget: {budget}

Simulate a bus booking and return in JSON format:
{
  "bookingId": "BS-{random 8 digit number}",
  "busDetails": {
    "operator": "bus operator name",
    "busType": "AC/Non-AC/Sleeper",
    "departure": {
      "terminal": "terminal name",
      "city": "city name",
      "time": "HH:MM",
      "date": "YYYY-MM-DD"
    },
    "arrival": {
      "terminal": "terminal name",
      "city": "city name",
      "time": "HH:MM", 
      "date": "YYYY-MM-DD"
    },
    "duration": "journey duration",
    "seats": "seat configuration"
  },
  "passengers": [
    {
      "name": "passenger name",
      "seat": "seat number"
    }
  ],
  "pricing": {
    "baseFare": {
      "amount": number,
      "currency": "string"
    },
    "bookingFee": {
      "amount": number,
      "currency": "string"
    },
    "total": {
      "amount": number,
      "currency": "string"
    }
  },
  "amenities": {
    "food": "meal service",
    "wifi": "wifi availability",
    "charging": "charging points"
  },
  "confirmation": {
    "status": "confirmed",
    "bookingDate": "YYYY-MM-DD HH:MM",
    "paymentMethod": "payment method",
    "receipt": "payment receipt details"
  }
}`,

  // Hotel booking simulation
  hotelBooking: `You are a hotel booking agent. Simulate booking a hotel based on the provided details.

Trip Details: {tripDetails}
User Preferences: {preferences}
Budget: {budget}
Duration: {duration}

Simulate a hotel booking and return in JSON format:
{
  "bookingId": "HT-{random 8 digit number}",
  "hotelDetails": {
    "name": "hotel name",
    "rating": "star rating",
    "location": {
      "address": "full address",
      "city": "city name",
      "landmarks": ["nearby landmarks"],
      "distanceFromAirport": "distance from airport"
    },
    "checkIn": {
      "date": "YYYY-MM-DD",
      "time": "HH:MM"
    },
    "checkOut": {
      "date": "YYYY-MM-DD", 
      "time": "HH:MM"
    },
    "roomType": "room type",
    "occupancy": "number of guests"
  },
  "roomDetails": {
    "type": "single/double/triple/suite",
    "amenities": ["amenities list"],
    "view": "room view",
    "floor": "floor number"
  },
  "pricing": {
    "roomRate": {
      "amount": number,
      "currency": "string"
    },
    "taxes": {
      "amount": number,
      "currency": "string"
    },
    "fees": {
      "amount": number,
      "currency": "string"
    },
    "total": {
      "amount": number,
      "currency": "string"
    }
  },
  "services": {
    "breakfast": "included/extra",
    "wifi": "included/extra",
    "parking": "available/not available",
    "gym": "available/not available",
    "pool": "available/not available"
  },
  "confirmation": {
    "status": "confirmed",
    "bookingDate": "YYYY-MM-DD HH:MM",
    "paymentMethod": "payment method",
    "receipt": "payment receipt details"
  }
}`,

  // Generate booking confirmation email
  generateConfirmationEmail: `You are a travel booking system. Generate a professional booking confirmation email.

Booking Details: {bookingDetails}
User Details: {userDetails}

Generate a confirmation email in JSON format:
{
  "subject": "email subject line",
  "greeting": "dear user name",
  "body": {
    "confirmation": "booking confirmation message",
    "details": "booking details summary",
    "important": "important information",
    "nextSteps": "what to do next"
  },
  "attachments": [
    "list of attachments"
  ],
  "contact": {
    "phone": "contact number",
    "email": "support email"
  },
  "footer": "email footer with terms"
}`,

  // Validate booking details
  validateBooking: `You are a booking validation expert. Validate the provided booking details.

Booking Details: {bookingDetails}
User Requirements: {requirements}

Validate the booking and return in JSON format:
{
  "isValid": boolean,
  "errors": [
    {
      "field": "field name",
      "message": "error description",
      "severity": "critical/warning"
    }
  ],
  "warnings": [
    {
      "field": "field name",
      "message": "warning description",
      "suggestion": "recommendation"
    }
  ],
  "suggestions": [
    {
      "type": "timing/route/accommodation",
      "message": "suggestion description"
    }
  ],
  "alternatives": [
    {
      "type": "alternative option",
      "details": "alternative details",
      "pros": ["advantages"],
      "cons": ["disadvantages"]
    }
  ]
}`,

  // Generate booking summary
  generateBookingSummary: `You are a travel booking assistant. Generate a comprehensive booking summary.

All Bookings: {allBookings}
Trip Details: {tripDetails}

Generate a booking summary in JSON format:
{
  "tripOverview": {
    "destination": "destination name",
    "duration": "trip duration",
    "travelers": "number of travelers",
    "totalCost": {
      "amount": number,
      "currency": "string"
    }
  },
  "bookings": {
    "transport": {
      "type": "flight/train/bus",
      "details": "transport details",
      "cost": {
        "amount": number,
        "currency": "string"
      },
      "status": "confirmed/pending"
    },
    "accommodation": {
      "type": "hotel/hostel/apartment",
      "details": "accommodation details",
      "cost": {
        "amount": number,
        "currency": "string"
      },
      "status": "confirmed/pending"
    }
  },
  "timeline": [
    {
      "date": "YYYY-MM-DD",
      "event": "event description",
      "location": "location",
      "time": "HH:MM"
    }
  ],
  "importantInfo": {
    "checkIn": "check-in details",
    "checkOut": "check-out details",
    "documents": ["required documents"],
    "contacts": ["emergency contacts"]
  },
  "nextSteps": [
    "list of next steps"
  ]
}`,

  // Handle booking modifications
  handleModification: `You are a booking modification specialist. Handle booking modification requests.

Original Booking: {originalBooking}
Modification Request: {modificationRequest}
User Details: {userDetails}

Process the modification and return in JSON format:
{
  "canModify": boolean,
  "modificationDetails": {
    "type": "date/route/accommodation",
    "original": "original details",
    "modified": "modified details",
    "fee": {
      "amount": number,
      "currency": "string"
    }
  },
  "alternatives": [
    {
      "option": "alternative option",
      "cost": {
        "amount": number,
        "currency": "string"
      },
      "availability": "available/not available"
    }
  ],
  "confirmation": {
    "status": "modified/cancelled",
    "newBookingId": "new booking ID if applicable",
    "refund": {
      "amount": number,
      "currency": "string"
    }
  }
}`,

  // Generate cancellation policy
  generateCancellationPolicy: `You are a travel booking expert. Generate cancellation policy information.

Booking Type: {bookingType}
Booking Details: {bookingDetails}

Generate cancellation policy in JSON format:
{
  "policy": {
    "freeCancellation": "time limit for free cancellation",
    "partialRefund": "time limit for partial refund",
    "noRefund": "time limit for no refund",
    "modificationFee": {
      "amount": number,
      "currency": "string"
    }
  },
  "conditions": [
    "specific conditions for cancellation"
  ],
  "process": [
    "steps to cancel booking"
  ],
  "contact": {
    "phone": "cancellation contact",
    "email": "cancellation email"
  }
}`
};

module.exports = BOOKING_PROMPTS; 