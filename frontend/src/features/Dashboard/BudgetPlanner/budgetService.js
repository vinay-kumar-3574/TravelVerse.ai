export const budgetService = {
  async suggestAdjustments(budget) {
    return Promise.resolve({ suggestions: ['Reduce dining expenses', 'Opt for public transport'] })
  }
}