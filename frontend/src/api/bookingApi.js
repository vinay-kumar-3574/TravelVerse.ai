export const bookingApi = {
  pay: async (amount, payload) => {
    await new Promise(r=>setTimeout(r, 600))
    return { status: 'ok', id: Date.now().toString(), amount, payload }
  }
}