import { chatService } from '../../ChatInterface/chatService'

export const plannerService = {
  async generate(destination, days = 1, members = 1, budget) {
    return chatService.generateItinerary({ destination, members, budget }, days)
  }
}