const { createChatCompletion } = require('../ai-config');

class Translator {
  constructor() {
    this.supportedLanguages = {
      ENGLISH: 'en',
      SPANISH: 'es',
      FRENCH: 'fr',
      GERMAN: 'de',
      ITALIAN: 'it',
      PORTUGUESE: 'pt',
      RUSSIAN: 'ru',
      CHINESE: 'zh',
      JAPANESE: 'ja',
      KOREAN: 'ko',
      ARABIC: 'ar',
      HINDI: 'hi',
      THAI: 'th',
      VIETNAMESE: 'vi',
      INDONESIAN: 'id',
      MALAY: 'ms'
    };
  }

  async translateText(text, fromLanguage, toLanguage, context = 'general') {
    try {
      const prompt = `
        Translate the following text from ${fromLanguage} to ${toLanguage}:
        
        Text: "${text}"
        Context: ${context}
        
        Consider the cultural context and provide appropriate translation.
        
        Return a JSON object with translation:
        {
          "originalText": "${text}",
          "translatedText": "translated text",
          "fromLanguage": "${fromLanguage}",
          "toLanguage": "${toLanguage}",
          "pronunciation": "how to pronounce the translation",
          "context": "when to use this translation",
          "alternatives": ["alternative translations"],
          "culturalNotes": ["cultural context notes"],
          "formality": "formal/informal level",
          "usage": "when and how to use this phrase"
        }
      `;

      const response = await createChatCompletion(prompt);
      return JSON.parse(response);
    } catch (error) {
      console.error('Translation error:', error);
      throw new Error('Failed to translate text');
    }
  }

  async generateCommonPhrases(destination, language) {
    try {
      const prompt = `
        Generate common travel phrases for ${destination} in ${language}:
        
        Include essential phrases for:
        - Greetings and basic conversation
        - Transportation
        - Accommodation
        - Food and dining
        - Shopping
        - Emergency situations
        - Directions and locations
        
        Return a JSON object with phrases:
        {
          "destination": "${destination}",
          "language": "${language}",
          "categories": {
            "greetings": [
              {
                "english": "English phrase",
                "translation": "translated phrase",
                "pronunciation": "pronunciation guide",
                "usage": "when to use"
              }
            ],
            "transportation": ["transportation phrases"],
            "accommodation": ["accommodation phrases"],
            "food": ["food and dining phrases"],
            "shopping": ["shopping phrases"],
            "emergency": ["emergency phrases"],
            "directions": ["direction phrases"]
          },
          "culturalTips": ["cultural tips for communication"],
          "pronunciationGuide": "general pronunciation guide"
        }
      `;

      const response = await createChatCompletion(prompt);
      return JSON.parse(response);
    } catch (error) {
      console.error('Common phrases generation error:', error);
      throw new Error('Failed to generate common phrases');
    }
  }

  async provideLanguageTips(destination, language) {
    try {
      const prompt = `
        Provide language tips for ${destination} in ${language}:
        
        Return a JSON object with language tips:
        {
          "destination": "${destination}",
          "language": "${language}",
          "basicGrammar": ["basic grammar rules"],
          "pronunciation": ["pronunciation tips"],
          "commonMistakes": ["common mistakes to avoid"],
          "formalityLevels": ["formality levels and usage"],
          "culturalContext": ["cultural context for language"],
          "localDialects": ["local dialect variations"],
          "slang": ["common slang and informal expressions"],
          "bodyLanguage": ["body language and gestures"],
          "taboos": ["language taboos to avoid"],
          "learningResources": ["resources for learning the language"]
        }
      `;

      const response = await createChatCompletion(prompt);
      return JSON.parse(response);
    } catch (error) {
      console.error('Language tips error:', error);
      throw new Error('Failed to provide language tips');
    }
  }

  async translateSignsAndMenus(destination, category = 'general') {
    try {
      const prompt = `
        Provide common signs and menu translations for ${destination}:
        
        Category: ${category}
        
        Return a JSON object with translations:
        {
          "destination": "${destination}",
          "category": "${category}",
          "signs": [
            {
              "english": "English sign",
              "translation": "translated sign",
              "context": "where you might see this sign"
            }
          ],
          "menuItems": [
            {
              "english": "English menu item",
              "translation": "translated menu item",
              "description": "what this dish is",
              "ingredients": ["common ingredients"]
            }
          ],
          "usefulPhrases": ["useful phrases for this category"],
          "culturalNotes": ["cultural notes about signs and menus"]
        }
      `;

      const response = await createChatCompletion(prompt);
      return JSON.parse(response);
    } catch (error) {
      console.error('Signs and menus translation error:', error);
      throw new Error('Failed to translate signs and menus');
    }
  }

  async provideEmergencyTranslations(destination, emergencyType) {
    try {
      const prompt = `
        Provide emergency translations for ${destination}:
        
        Emergency Type: ${emergencyType}
        
        Return a JSON object with emergency translations:
        {
          "destination": "${destination}",
          "emergencyType": "${emergencyType}",
          "phrases": [
            {
              "english": "English emergency phrase",
              "translation": "translated emergency phrase",
              "pronunciation": "pronunciation guide",
              "usage": "when to use this phrase"
            }
          ],
          "emergencyNumbers": ["emergency contact numbers"],
          "usefulWords": ["useful emergency words"],
          "bodyLanguage": ["emergency body language"],
          "culturalNotes": ["cultural notes for emergencies"]
        }
      `;

      const response = await createChatCompletion(prompt);
      return JSON.parse(response);
    } catch (error) {
      console.error('Emergency translations error:', error);
      throw new Error('Failed to provide emergency translations');
    }
  }

  async generateLanguageGuide(destination, language) {
    try {
      const prompt = `
        Generate a comprehensive language guide for ${destination}:
        
        Language: ${language}
        
        Return a JSON object with language guide:
        {
          "destination": "${destination}",
          "language": "${language}",
          "overview": "language overview",
          "alphabet": "alphabet and writing system",
          "basicPhrases": ["basic phrases"],
          "numbers": ["number system"],
          "timeAndDate": ["time and date expressions"],
          "weather": ["weather expressions"],
          "foodAndDrink": ["food and drink vocabulary"],
          "transportation": ["transportation vocabulary"],
          "shopping": ["shopping vocabulary"],
          "emergency": ["emergency vocabulary"],
          "culturalNotes": ["cultural language notes"],
          "learningTips": ["tips for learning the language"],
          "resources": ["learning resources"]
        }
      `;

      const response = await createChatCompletion(prompt);
      return JSON.parse(response);
    } catch (error) {
      console.error('Language guide generation error:', error);
      throw new Error('Failed to generate language guide');
    }
  }

  async detectLanguage(text) {
    try {
      const prompt = `
        Detect the language of the following text:
        
        Text: "${text}"
        
        Return a JSON object with language detection:
        {
          "text": "${text}",
          "detectedLanguage": "detected language",
          "confidence": "confidence level (high/medium/low)",
          "alternativeLanguages": ["alternative possibilities"],
          "languageFamily": "language family",
          "writingSystem": "writing system used",
          "notes": ["additional notes about the language"]
        }
      `;

      const response = await createChatCompletion(prompt);
      return JSON.parse(response);
    } catch (error) {
      console.error('Language detection error:', error);
      throw new Error('Failed to detect language');
    }
  }

  async provideCulturalContext(destination, language) {
    try {
      const prompt = `
        Provide cultural context for language use in ${destination}:
        
        Language: ${language}
        
        Return a JSON object with cultural context:
        {
          "destination": "${destination}",
          "language": "${language}",
          "greetings": ["greeting customs"],
          "formality": ["formality levels and usage"],
          "gestures": ["important gestures and body language"],
          "taboos": ["language and cultural taboos"],
          "business": ["business communication customs"],
          "social": ["social communication customs"],
          "family": ["family communication customs"],
          "religion": ["religious language customs"],
          "politics": ["political language customs"],
          "recommendations": ["cultural communication recommendations"]
        }
      `;

      const response = await createChatCompletion(prompt);
      return JSON.parse(response);
    } catch (error) {
      console.error('Cultural context error:', error);
      throw new Error('Failed to provide cultural context');
    }
  }
}

module.exports = Translator; 