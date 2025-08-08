export const sosService = {
  async alert(type, location) {
    await new Promise(r=>setTimeout(r,500))
    return { status: 'sent', type, location }
  }
}