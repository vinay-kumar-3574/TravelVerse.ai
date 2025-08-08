import { chatService } from '../ChatInterface/chatService'

export const transportService = {
  async recommend(tripInfo) {
    return chatService.getTransportRecommendations(tripInfo)
  }
}