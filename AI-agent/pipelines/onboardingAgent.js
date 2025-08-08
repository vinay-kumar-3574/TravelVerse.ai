const { createChatCompletion, extractEntities } = require('../ai-config');

class OnboardingAgent {
  constructor() {
    this.stages = {
      BASIC_DETAILS: 'basic_details',
      TRAVEL_PREFERENCES: 'travel_preferences',
      TRAVEL_DOCUMENTS: 'travel_documents',
      EMERGENCY_CONTACT: 'emergency_contact',
      CONSENT: 'consent'
    };
  }

  async processOnboardingStep(userId, currentStage, userInput, existingData = {}) {
    try {
      switch (currentStage) {
        case this.stages.BASIC_DETAILS:
          return await this.handleBasicDetails(userInput, existingData);
        case this.stages.TRAVEL_PREFERENCES:
          return await this.handleTravelPreferences(userInput, existingData);
        case this.stages.TRAVEL_DOCUMENTS:
          return await this.handleTravelDocuments(userInput, existingData);
        case this.stages.EMERGENCY_CONTACT:
          return await this.handleEmergencyContact(userInput, existingData);
        case this.stages.CONSENT:
          return await this.handleConsent(userInput, existingData);
        default:
          return this.getNextStage(currentStage);
      }
    } catch (error) {
      console.error('Onboarding step processing error:', error);
      throw new Error('Failed to process onboarding step');
    }
  }

  async handleBasicDetails(userInput, existingData) {
    const prompt = `
      Extract the following information from the user input for onboarding:
      - Full name
      - Date of birth (YYYY-MM-DD format)
      - Gender (male/female/other)
      - Nationality
      - Primary language
      - Contact number
      
      User input: "${userInput}"
      
      Return a JSON object with the extracted information. If any field is missing, set it to null.
    `;

    const response = await createChatCompletion(prompt);
    const extractedData = JSON.parse(response);

    const validationResult = this.validateBasicDetails(extractedData);
    if (!validationResult.isValid) {
      return {
        stage: this.stages.BASIC_DETAILS,
        completed: false,
        data: { ...existingData, ...extractedData },
        message: validationResult.message,
        nextPrompt: "Please provide your basic details: full name, date of birth, gender, nationality, primary language, and contact number."
      };
    }

    return {
      stage: this.stages.TRAVEL_PREFERENCES,
      completed: true,
      data: { ...existingData, ...extractedData },
      message: "Basic details saved successfully!",
      nextPrompt: "What's your preferred travel mode? (flight/train/bus/any)"
    };
  }

  async handleTravelPreferences(userInput, existingData) {
    const prompt = `
      Extract travel preferences from the user input:
      - Preferred travel mode (flight/train/bus/any)
      - Any specific preferences or constraints
      
      User input: "${userInput}"
      
      Return a JSON object with the extracted information.
    `;

    const response = await createChatCompletion(prompt);
    const extractedData = JSON.parse(response);

    return {
      stage: this.stages.TRAVEL_DOCUMENTS,
      completed: true,
      data: { ...existingData, travelPreferences: extractedData },
      message: "Travel preferences saved!",
      nextPrompt: this.getDocumentPrompt(extractedData.preferredTravelMode)
    };
  }

  async handleTravelDocuments(userInput, existingData) {
    const travelMode = existingData.travelPreferences?.preferredTravelMode || 'any';
    const prompt = `
      Extract travel document information based on travel mode: ${travelMode}
      
      For flights: passport number, visa info, expiry dates
      For trains: government ID, passenger type
      For buses: government ID
      For any: all applicable documents
      
      User input: "${userInput}"
      
      Return a JSON object with the extracted document information.
    `;

    const response = await createChatCompletion(prompt);
    const extractedData = JSON.parse(response);

    return {
      stage: this.stages.EMERGENCY_CONTACT,
      completed: true,
      data: { ...existingData, travelDocuments: extractedData },
      message: "Travel documents information saved!",
      nextPrompt: "Please provide an emergency contact (name, relationship, phone number) - this is optional."
    };
  }

  async handleEmergencyContact(userInput, existingData) {
    if (!userInput || userInput.toLowerCase().includes('skip') || userInput.toLowerCase().includes('none')) {
      return {
        stage: this.stages.CONSENT,
        completed: true,
        data: { ...existingData, emergencyContact: null },
        message: "Emergency contact skipped.",
        nextPrompt: "Please accept our terms and conditions and privacy policy to continue."
      };
    }

    const prompt = `
      Extract emergency contact information from the user input:
      - Contact name
      - Relationship
      - Phone number
      
      User input: "${userInput}"
      
      Return a JSON object with the extracted information.
    `;

    const response = await createChatCompletion(prompt);
    const extractedData = JSON.parse(response);

    return {
      stage: this.stages.CONSENT,
      completed: true,
      data: { ...existingData, emergencyContact: extractedData },
      message: "Emergency contact saved!",
      nextPrompt: "Please accept our terms and conditions and privacy policy to continue."
    };
  }

  async handleConsent(userInput, existingData) {
    const hasAccepted = userInput.toLowerCase().includes('accept') || 
                       userInput.toLowerCase().includes('agree') ||
                       userInput.toLowerCase().includes('yes');

    if (!hasAccepted) {
      return {
        stage: this.stages.CONSENT,
        completed: false,
        data: existingData,
        message: "You must accept the terms and conditions to continue.",
        nextPrompt: "Please type 'accept' to agree to our terms and conditions and privacy policy."
      };
    }

    return {
      stage: 'completed',
      completed: true,
      data: { ...existingData, consentAccepted: true, termsAccepted: true, isOnboarded: true },
      message: "Onboarding completed successfully! Welcome to TravelVerse!",
      nextPrompt: "You can now start planning your trips!"
    };
  }

  validateBasicDetails(data) {
    const requiredFields = ['fullName', 'dateOfBirth', 'gender', 'nationality', 'primaryLanguage', 'contactNumber'];
    const missingFields = requiredFields.filter(field => !data[field]);

    if (missingFields.length > 0) {
      return {
        isValid: false,
        message: `Please provide: ${missingFields.join(', ')}`
      };
    }

    // Validate date format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(data.dateOfBirth)) {
      return {
        isValid: false,
        message: "Please provide date of birth in YYYY-MM-DD format"
      };
    }

    return { isValid: true, message: "Basic details are valid" };
  }

  getDocumentPrompt(travelMode) {
    switch (travelMode) {
      case 'flight':
        return "Please provide your passport number, visa information, and expiry dates.";
      case 'train':
        return "Please provide your government ID and passenger type (adult/child/senior).";
      case 'bus':
        return "Please provide your government ID.";
      default:
        return "Please provide all applicable travel documents (passport, visa, government ID, etc.).";
    }
  }

  getNextStage(currentStage) {
    const stageOrder = Object.values(this.stages);
    const currentIndex = stageOrder.indexOf(currentStage);
    return stageOrder[currentIndex + 1] || 'completed';
  }

  async generateOnboardingSummary(userData) {
    const prompt = `
      Generate a friendly welcome message and onboarding summary for the user:
      
      User data: ${JSON.stringify(userData)}
      
      Include:
      - Welcome message
      - Summary of collected information
      - Next steps
      - Any recommendations based on preferences
    `;

    return await createChatCompletion(prompt);
  }
}

module.exports = OnboardingAgent; 