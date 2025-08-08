const { createChatCompletion, extractEntities } = require('../ai-config');

class SOSHandler {
  constructor() {
    this.emergencyTypes = {
      MEDICAL: 'medical',
      POLICE: 'police',
      FIRE: 'fire',
      ACCIDENT: 'accident',
      LOST: 'lost',
      THEFT: 'theft',
      NATURAL_DISASTER: 'natural_disaster',
      CIVIL_UNREST: 'civil_unrest'
    };
  }

  async handleEmergency(emergencyType, location, tripData) {
    try {
      const { destination, travelers, emergencyContacts } = tripData;
      
      const prompt = `
        Handle emergency situation:
        
        Emergency Type: ${emergencyType}
        Location: ${location}
        Destination: ${destination}
        Travelers: ${travelers} people
        Emergency Contacts: ${JSON.stringify(emergencyContacts || [])}
        
        Return a JSON object with emergency response:
        {
          "emergencyType": "${emergencyType}",
          "severity": "high/medium/low",
          "immediateActions": ["immediate actions to take"],
          "emergencyNumbers": [
            {
              "service": "service name",
              "number": "phone number",
              "description": "when to call"
            }
          ],
          "locationDetails": "current location information",
          "stepByStepInstructions": ["detailed instructions"],
          "safetyTips": ["safety tips for this emergency"],
          "nextSteps": ["steps after immediate danger"],
          "prevention": ["how to prevent similar emergencies"],
          "localResources": ["local emergency resources"],
          "communication": ["how to communicate with authorities"]
        }
      `;

      const response = await createChatCompletion(prompt);
      return JSON.parse(response);
    } catch (error) {
      console.error('Emergency handling error:', error);
      throw new Error('Failed to handle emergency');
    }
  }

  async getEmergencyContacts(destination, emergencyType) {
    try {
      const prompt = `
        Get emergency contact information for ${destination}:
        
        Emergency Type: ${emergencyType}
        
        Return a JSON object with emergency contacts:
        {
          "destination": "${destination}",
          "emergencyType": "${emergencyType}",
          "contacts": [
            {
              "service": "service name",
              "number": "phone number",
              "description": "when to use this number",
              "availability": "24/7 or specific hours",
              "language": "languages spoken"
            }
          ],
          "generalEmergency": "general emergency number",
          "police": "police number",
          "ambulance": "ambulance number",
          "fire": "fire department number",
          "touristPolice": "tourist police number",
          "embassy": "nearest embassy contact",
          "hospital": "nearest hospital",
          "pharmacy": "24/7 pharmacy"
        }
      `;

      const response = await createChatCompletion(prompt);
      return JSON.parse(response);
    } catch (error) {
      console.error('Emergency contacts error:', error);
      throw new Error('Failed to get emergency contacts');
    }
  }

  async provideSafetyGuidance(location, tripData) {
    try {
      const { destination, travelers } = tripData;
      
      const prompt = `
        Provide safety guidance for ${location}:
        
        Location: ${location}
        Destination: ${destination}
        Travelers: ${travelers} people
        
        Return a JSON object with safety guidance:
        {
          "location": "${location}",
          "safetyRating": "high/medium/low",
          "currentAlerts": ["current safety alerts"],
          "safeAreas": ["safe areas to visit"],
          "avoidAreas": ["areas to avoid"],
          "safetyTips": ["general safety tips"],
          "emergencyProcedures": ["emergency procedures"],
          "localCustoms": ["important local customs"],
          "healthAdvice": ["health and medical advice"],
          "transportationSafety": ["transportation safety tips"],
          "communication": ["how to communicate in emergencies"],
          "weatherWarnings": ["current weather warnings"],
          "politicalSituation": ["current political situation"]
        }
      `;

      const response = await createChatCompletion(prompt);
      return JSON.parse(response);
    } catch (error) {
      console.error('Safety guidance error:', error);
      throw new Error('Failed to provide safety guidance');
    }
  }

  async assessRiskLevel(location, tripData) {
    try {
      const { destination, travelers, startDate, endDate } = tripData;
      
      const prompt = `
        Assess risk level for the trip:
        
        Location: ${location}
        Destination: ${destination}
        Travelers: ${travelers} people
        Dates: ${startDate} to ${endDate}
        
        Return a JSON object with risk assessment:
        {
          "overallRisk": "low/medium/high",
          "riskFactors": ["factors contributing to risk"],
          "safetyMeasures": ["recommended safety measures"],
          "insurance": ["insurance recommendations"],
          "precautions": ["precautions to take"],
          "emergencyPlan": ["emergency plan"],
          "communicationPlan": ["communication plan"],
          "medicalPreparations": ["medical preparations"],
          "documentation": ["required documentation"],
          "localLaws": ["important local laws"],
          "culturalSensitivity": ["cultural sensitivity notes"]
        }
      `;

      const response = await createChatCompletion(prompt);
      return JSON.parse(response);
    } catch (error) {
      console.error('Risk assessment error:', error);
      throw new Error('Failed to assess risk level');
    }
  }

  async provideMedicalAssistance(medicalIssue, location, tripData) {
    try {
      const { destination, travelers } = tripData;
      
      const prompt = `
        Provide medical assistance for ${medicalIssue}:
        
        Medical Issue: ${medicalIssue}
        Location: ${location}
        Destination: ${destination}
        Travelers: ${travelers} people
        
        Return a JSON object with medical assistance:
        {
          "medicalIssue": "${medicalIssue}",
          "severity": "high/medium/low",
          "immediateActions": ["immediate medical actions"],
          "hospitals": [
            {
              "name": "hospital name",
              "address": "hospital address",
              "phone": "phone number",
              "specialties": ["medical specialties"],
              "distance": "distance from location"
            }
          ],
          "pharmacies": [
            {
              "name": "pharmacy name",
              "address": "pharmacy address",
              "phone": "phone number",
              "hours": "operating hours"
            }
          ],
          "medications": ["recommended medications"],
          "firstAid": ["first aid instructions"],
          "precautions": ["medical precautions"],
          "insurance": ["medical insurance information"],
          "language": ["medical translation help"],
          "followUp": ["follow-up care instructions"]
        }
      `;

      const response = await createChatCompletion(prompt);
      return JSON.parse(response);
    } catch (error) {
      console.error('Medical assistance error:', error);
      throw new Error('Failed to provide medical assistance');
    }
  }

  async handleLostOrStolen(lostItem, location, tripData) {
    try {
      const { destination, travelers } = tripData;
      
      const prompt = `
        Handle lost or stolen item situation:
        
        Lost Item: ${lostItem}
        Location: ${location}
        Destination: ${destination}
        Travelers: ${travelers} people
        
        Return a JSON object with assistance:
        {
          "lostItem": "${lostItem}",
          "immediateActions": ["immediate actions to take"],
          "reporting": [
            {
              "authority": "authority to report to",
              "location": "where to report",
              "requirements": ["what to bring"],
              "process": "reporting process"
            }
          ],
          "replacement": ["replacement options"],
          "insurance": ["insurance claims process"],
          "prevention": ["prevention tips"],
          "emergencyContacts": ["relevant emergency contacts"],
          "documentation": ["required documentation"],
          "timeline": "expected timeline for resolution",
          "alternatives": ["alternative solutions"]
        }
      `;

      const response = await createChatCompletion(prompt);
      return JSON.parse(response);
    } catch (error) {
      console.error('Lost/stolen handling error:', error);
      throw new Error('Failed to handle lost or stolen situation');
    }
  }

  async provideNaturalDisasterGuidance(disasterType, location, tripData) {
    try {
      const { destination, travelers } = tripData;
      
      const prompt = `
        Provide guidance for natural disaster:
        
        Disaster Type: ${disasterType}
        Location: ${location}
        Destination: ${destination}
        Travelers: ${travelers} people
        
        Return a JSON object with disaster guidance:
        {
          "disasterType": "${disasterType}",
          "severity": "high/medium/low",
          "immediateActions": ["immediate safety actions"],
          "evacuation": ["evacuation procedures"],
          "shelter": ["shelter locations"],
          "emergencyServices": ["emergency services contacts"],
          "communication": ["communication methods"],
          "supplies": ["emergency supplies needed"],
          "safetyTips": ["safety tips for this disaster"],
          "recovery": ["recovery procedures"],
          "prevention": ["prevention measures"],
          "weatherUpdates": ["weather update sources"],
          "governmentAlerts": ["government alert sources"]
        }
      `;

      const response = await createChatCompletion(prompt);
      return JSON.parse(response);
    } catch (error) {
      console.error('Natural disaster guidance error:', error);
      throw new Error('Failed to provide natural disaster guidance');
    }
  }

  async generateEmergencyPlan(tripData) {
    try {
      const { destination, travelers, startDate, endDate, emergencyContacts } = tripData;
      
      const prompt = `
        Generate comprehensive emergency plan:
        
        Trip Details:
        - Destination: ${destination}
        - Travelers: ${travelers} people
        - Dates: ${startDate} to ${endDate}
        - Emergency Contacts: ${JSON.stringify(emergencyContacts || [])}
        
        Return a JSON object with emergency plan:
        {
          "emergencyContacts": ["all emergency contacts"],
          "communicationPlan": ["communication plan"],
          "meetingPoints": ["emergency meeting points"],
          "evacuationPlan": ["evacuation procedures"],
          "medicalPlan": ["medical emergency plan"],
          "documentation": ["required documentation"],
          "insurance": ["insurance information"],
          "embassy": ["embassy contact information"],
          "localResources": ["local emergency resources"],
          "prevention": ["prevention measures"],
          "checklist": ["emergency checklist"],
          "timeline": ["emergency response timeline"]
        }
      `;

      const response = await createChatCompletion(prompt);
      return JSON.parse(response);
    } catch (error) {
      console.error('Emergency plan generation error:', error);
      throw new Error('Failed to generate emergency plan');
    }
  }
}

module.exports = SOSHandler; 