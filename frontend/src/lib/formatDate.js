import { format } from 'date-fns'

export const formatDate = (date, fmt = 'PP') => {
  try { return format(new Date(date), fmt) } catch { return '' }
}