import { chatService } from '../../ChatInterface/chatService'

export const translatorService = {
  async translate(text, targetLanguage) {
    return chatService.translateText(text, targetLanguage)
  }
}