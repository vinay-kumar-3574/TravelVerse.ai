const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: process.env.SMTP_PORT || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }

  async sendBookingConfirmation(userEmail, bookingDetails) {
    try {
      const { tripName, source, destination, startDate, endDate, transport, accommodation } = bookingDetails;
      
      const mailOptions = {
        from: process.env.SMTP_USER,
        to: userEmail,
        subject: `Booking Confirmation - ${tripName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2c3e50;">Booking Confirmation</h2>
            <h3 style="color: #3498db;">${tripName}</h3>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h4 style="color: #2c3e50; margin-top: 0;">Trip Details</h4>
              <p><strong>From:</strong> ${source}</p>
              <p><strong>To:</strong> ${destination}</p>
              <p><strong>Start Date:</strong> ${startDate}</p>
              <p><strong>End Date:</strong> ${endDate}</p>
            </div>
            
            <div style="background-color: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h4 style="color: #27ae60; margin-top: 0;">Transport Details</h4>
              <p><strong>Mode:</strong> ${transport.mode}</p>
              <p><strong>Cost:</strong> ${transport.cost} INR</p>
              <p><strong>Confirmation:</strong> ${transport.confirmationNumber}</p>
            </div>
            
            <div style="background-color: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h4 style="color: #f39c12; margin-top: 0;">Accommodation Details</h4>
              <p><strong>Hotel:</strong> ${accommodation.name}</p>
              <p><strong>Cost:</strong> ${accommodation.cost} INR</p>
              <p><strong>Confirmation:</strong> ${accommodation.confirmationNumber}</p>
            </div>
            
            <div style="background-color: #d1ecf1; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h4 style="color: #17a2b8; margin-top: 0;">Important Information</h4>
              <ul>
                <li>Please arrive at the airport/station 2 hours before departure</li>
                <li>Keep your booking confirmations handy</li>
                <li>Check-in at hotel is usually after 2 PM</li>
                <li>Have your travel documents ready</li>
              </ul>
            </div>
            
            <p style="color: #6c757d; font-size: 14px; text-align: center; margin-top: 30px;">
              Thank you for choosing TravelVerse! Have a wonderful trip!
            </p>
          </div>
        `
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log('Booking confirmation email sent:', result.messageId);
      return result;
    } catch (error) {
      console.error('Email sending error:', error);
      throw new Error('Failed to send booking confirmation email');
    }
  }

  async sendWelcomeEmail(userEmail, userData) {
    try {
      const { fullName } = userData;
      
      const mailOptions = {
        from: process.env.SMTP_USER,
        to: userEmail,
        subject: 'Welcome to TravelVerse!',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2c3e50;">Welcome to TravelVerse!</h2>
            <p>Hello ${fullName},</p>
            
            <p>Welcome to TravelVerse! We're excited to have you on board and help you plan amazing trips.</p>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h4 style="color: #3498db; margin-top: 0;">What you can do with TravelVerse:</h4>
              <ul>
                <li>Plan trips with AI assistance</li>
                <li>Book flights, trains, and hotels</li>
                <li>Get real-time travel updates</li>
                <li>Access emergency assistance</li>
                <li>Translate languages on the go</li>
                <li>Track your budget and expenses</li>
              </ul>
            </div>
            
            <div style="background-color: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h4 style="color: #27ae60; margin-top: 0;">Getting Started</h4>
              <p>Start by telling us about your travel preferences and we'll help you plan your next adventure!</p>
            </div>
            
            <p style="color: #6c757d; font-size: 14px; text-align: center; margin-top: 30px;">
              Happy travels!<br>
              The TravelVerse Team
            </p>
          </div>
        `
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log('Welcome email sent:', result.messageId);
      return result;
    } catch (error) {
      console.error('Welcome email error:', error);
      throw new Error('Failed to send welcome email');
    }
  }

  async sendEmergencyAlert(userEmail, emergencyDetails) {
    try {
      const { emergencyType, location, instructions } = emergencyDetails;
      
      const mailOptions = {
        from: process.env.SMTP_USER,
        to: userEmail,
        subject: `Emergency Alert - ${emergencyType}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #dc3545;">Emergency Alert</h2>
            
            <div style="background-color: #f8d7da; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h4 style="color: #721c24; margin-top: 0;">Emergency Details</h4>
              <p><strong>Type:</strong> ${emergencyType}</p>
              <p><strong>Location:</strong> ${location}</p>
            </div>
            
            <div style="background-color: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h4 style="color: #856404; margin-top: 0;">Immediate Actions</h4>
              <ul>
                ${instructions.map(instruction => `<li>${instruction}</li>`).join('')}
              </ul>
            </div>
            
            <div style="background-color: #d1ecf1; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h4 style="color: #0c5460; margin-top: 0;">Emergency Contacts</h4>
              <p>Please contact local emergency services immediately if needed.</p>
            </div>
            
            <p style="color: #6c757d; font-size: 14px; text-align: center; margin-top: 30px;">
              Stay safe!<br>
              TravelVerse Support Team
            </p>
          </div>
        `
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log('Emergency alert email sent:', result.messageId);
      return result;
    } catch (error) {
      console.error('Emergency alert email error:', error);
      throw new Error('Failed to send emergency alert email');
    }
  }

  async sendTripReminder(userEmail, tripDetails) {
    try {
      const { tripName, destination, startDate, daysLeft } = tripDetails;
      
      const mailOptions = {
        from: process.env.SMTP_USER,
        to: userEmail,
        subject: `Trip Reminder - ${tripName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2c3e50;">Trip Reminder</h2>
            <h3 style="color: #3498db;">${tripName}</h3>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h4 style="color: #2c3e50; margin-top: 0;">Trip Details</h4>
              <p><strong>Destination:</strong> ${destination}</p>
              <p><strong>Start Date:</strong> ${startDate}</p>
              <p><strong>Days Left:</strong> ${daysLeft} days</p>
            </div>
            
            <div style="background-color: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h4 style="color: #27ae60; margin-top: 0;">Pre-Trip Checklist</h4>
              <ul>
                <li>✓ Pack your bags</li>
                <li>✓ Check travel documents</li>
                <li>✓ Confirm bookings</li>
                <li>✓ Check weather forecast</li>
                <li>✓ Download offline maps</li>
                <li>✓ Set up emergency contacts</li>
              </ul>
            </div>
            
            <p style="color: #6c757d; font-size: 14px; text-align: center; margin-top: 30px;">
              Have a wonderful trip!<br>
              TravelVerse Team
            </p>
          </div>
        `
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log('Trip reminder email sent:', result.messageId);
      return result;
    } catch (error) {
      console.error('Trip reminder email error:', error);
      throw new Error('Failed to send trip reminder email');
    }
  }
}

module.exports = EmailService; 