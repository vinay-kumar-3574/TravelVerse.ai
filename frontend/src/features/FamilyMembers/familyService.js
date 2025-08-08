export const familyService = {
  async addMember(member) {
    return Promise.resolve(member)
  },
  async removeMember(id) {
    return Promise.resolve(id)
  },
  async listMembers() {
    return Promise.resolve([])
  }
}