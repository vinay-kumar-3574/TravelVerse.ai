export const formatCurrency = (value, currency = 'INR', locale = 'en-IN') => {
  try {
    return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(Number(value || 0))
  } catch {
    return `${currency} ${Number(value||0).toLocaleString()}`
  }
}