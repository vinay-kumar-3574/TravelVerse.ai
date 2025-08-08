const { createChatCompletion } = require('../ai-config.js');

class BookingAgent {
  constructor() {
    this.bookingProviders = {
      flights: ['IndiGo', 'Air India', 'SpiceJet', 'Vistara', 'GoAir'],
      trains: ['IRCTC', 'Railway Express', 'Premium Trains'],
      buses: ['RedBus', 'MakeMyTrip', 'Goibibo', 'Local Operators'],
      hotels: ['Booking.com', 'Airbnb', 'OYO', 'Taj Hotels', 'Marriott']
    };
  }

  // Simulate flight booking
  async bookFlight(bookingData) {
    const flightPrompt = `
      Simulate a flight booking for:
      - From: ${bookingData.source}
      - To: ${bookingData.destination}
      - Date: ${bookingData.date}
      - Passengers: ${bookingData.passengers}
      - Budget: ${bookingData.budget}
      
      Generate a realistic booking response with:
      - Flight number and airline
      - Departure and arrival times
      - Price breakdown
      - Booking reference
      - Seat class options
      - Baggage allowance
      
      Return as JSON with booking details.
    `;

    try {
      const response = await createChatCompletion([
        { role: 'user', content: flightPrompt }
      ], 'bookingAgent');

      try {
        return JSON.parse(response);
      } catch (parseError) {
        return {
          success: true,
          bookingId: `FL${Date.now()}`,
          airline: 'IndiGo',
          flightNumber: '6E-1234',
          departure: `${bookingData.source} Airport`,
          arrival: `${bookingData.destination} Airport`,
          departureTime: '10:00 AM',
          arrivalTime: '12:00 PM',
          price: bookingData.budget * 0.4,
          class: 'Economy',
          passengers: bookingData.passengers,
          status: 'confirmed'
        };
      }
    } catch (error) {
      console.error('Flight booking error:', error);
      return { success: false, message: 'Booking failed' };
    }
  }

  // Simulate train booking
  async bookTrain(bookingData) {
    const trainPrompt = `
      Simulate a train booking for:
      - From: ${bookingData.source}
      - To: ${bookingData.destination}
      - Date: ${bookingData.date}
      - Passengers: ${bookingData.passengers}
      - Budget: ${bookingData.budget}
      
      Generate a realistic booking response with:
      - Train number and name
      - Departure and arrival times
      - Price breakdown
      - Booking reference
      - Class options (AC/Non-AC)
      - Berth preferences
      
      Return as JSON with booking details.
    `;

    try {
      const response = await createChatCompletion([
        { role: 'user', content: trainPrompt }
      ], 'bookingAgent');

      try {
        return JSON.parse(response);
      } catch (parseError) {
        return {
          success: true,
          bookingId: `TR${Date.now()}`,
          trainNumber: '12345',
          trainName: 'Rajdhani Express',
          departure: bookingData.source,
          arrival: bookingData.destination,
          departureTime: '08:00 PM',
          arrivalTime: '06:00 AM',
          price: bookingData.budget * 0.2,
          class: 'AC 3 Tier',
          passengers: bookingData.passengers,
          status: 'confirmed'
        };
      }
    } catch (error) {
      console.error('Train booking error:', error);
      return { success: false, message: 'Booking failed' };
    }
  }

  // Simulate bus booking
  async bookBus(bookingData) {
    const busPrompt = `
      Simulate a bus booking for:
      - From: ${bookingData.source}
      - To: ${bookingData.destination}
      - Date: ${bookingData.date}
      - Passengers: ${bookingData.passengers}
      - Budget: ${bookingData.budget}
      
      Generate a realistic booking response with:
      - Bus operator and route
      - Departure and arrival times
      - Price breakdown
      - Booking reference
      - Bus type (AC/Non-AC)
      - Seat preferences
      
      Return as JSON with booking details.
    `;

    try {
      const response = await createChatCompletion([
        { role: 'user', content: busPrompt }
      ], 'bookingAgent');

      try {
        return JSON.parse(response);
      } catch (parseError) {
        return {
          success: true,
          bookingId: `BS${Date.now()}`,
          operator: 'RedBus',
          route: `${bookingData.source} to ${bookingData.destination}`,
          departure: bookingData.source,
          arrival: bookingData.destination,
          departureTime: '09:00 PM',
          arrivalTime: '07:00 AM',
          price: bookingData.budget * 0.1,
          busType: 'AC Sleeper',
          passengers: bookingData.passengers,
          status: 'confirmed'
        };
      }
    } catch (error) {
      console.error('Bus booking error:', error);
      return { success: false, message: 'Booking failed' };
    }
  }

  // Simulate hotel booking
  async bookHotel(bookingData) {
    const hotelPrompt = `
      Simulate a hotel booking for:
      - Location: ${bookingData.destination}
      - Check-in: ${bookingData.checkIn}
      - Check-out: ${bookingData.checkOut}
      - Guests: ${bookingData.guests}
      - Budget: ${bookingData.budget}
      
      Generate a realistic booking response with:
      - Hotel name and rating
      - Room type and amenities
      - Price breakdown
      - Booking reference
      - Check-in/out times
      - Cancellation policy
      
      Return as JSON with booking details.
    `;

    try {
      const response = await createChatCompletion([
        { role: 'user', content: hotelPrompt }
      ], 'bookingAgent');

      try {
        return JSON.parse(response);
      } catch (parseError) {
        return {
          success: true,
          bookingId: `HT${Date.now()}`,
          hotelName: 'Grand Hotel',
          rating: 4.5,
          roomType: 'Deluxe Room',
          checkIn: bookingData.checkIn,
          checkOut: bookingData.checkOut,
          price: bookingData.budget * 0.3,
          guests: bookingData.guests,
          amenities: ['WiFi', 'AC', 'TV', 'Room Service'],
          status: 'confirmed'
        };
      }
    } catch (error) {
      console.error('Hotel booking error:', error);
      return { success: false, message: 'Booking failed' };
    }
  }

  // Process transport booking based on mode
  async bookTransport(bookingData) {
    switch (bookingData.mode) {
      case 'flight':
        return await this.bookFlight(bookingData);
      case 'train':
        return await this.bookTrain(bookingData);
      case 'bus':
        return await this.bookBus(bookingData);
      default:
        return { success: false, message: 'Invalid transport mode' };
    }
  }

  // Generate booking confirmation email
  async generateConfirmationEmail(bookingDetails) {
    const emailPrompt = `
      Generate a professional booking confirmation email for:
      - Booking Type: ${bookingDetails.type}
      - Booking ID: ${bookingDetails.bookingId}
      - Details: ${JSON.stringify(bookingDetails)}
      
      Include:
      - Confirmation message
      - Booking details
      - Important information
      - Contact details
      - Next steps
      
      Format as a professional email.
    `;

    try {
      const emailContent = await createChatCompletion([
        { role: 'user', content: emailPrompt }
      ], 'bookingAgent');

      return {
        success: true,
        emailContent: emailContent
      };
    } catch (error) {
      console.error('Email generation error:', error);
      return {
        success: false,
        message: 'Could not generate confirmation email'
      };
    }
  }

  // Process complete booking request
  async processBooking(bookingRequest) {
    try {
      let bookingResult;

      if (bookingRequest.type === 'transport') {
        bookingResult = await this.bookTransport(bookingRequest);
      } else if (bookingRequest.type === 'hotel') {
        bookingResult = await this.bookHotel(bookingRequest);
      } else {
        return { success: false, message: 'Invalid booking type' };
      }

      if (!bookingResult.success) {
        return bookingResult;
      }

      // Generate confirmation email
      const emailResult = await this.generateConfirmationEmail({
        type: bookingRequest.type,
        ...bookingResult
      });

      return {
        success: true,
        booking: bookingResult,
        confirmationEmail: emailResult.success ? emailResult.emailContent : null,
        message: 'Booking completed successfully!'
      };

    } catch (error) {
      console.error('Booking process error:', error);
      return {
        success: false,
        message: 'Sorry, the booking process failed. Please try again.'
      };
    }
  }
}

module.exports = BookingAgent; 