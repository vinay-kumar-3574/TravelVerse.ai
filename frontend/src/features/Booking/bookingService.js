export const bookingService = {
  async pay(amount, payload) {
    // mock payment
    await new Promise(r => setTimeout(r, 800))
    return { status: 'success', transactionId: Date.now().toString(), amount, payload }
  },
}