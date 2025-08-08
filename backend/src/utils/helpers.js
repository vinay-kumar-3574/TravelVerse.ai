const moment = require('moment');
const { v4: uuidv4 } = require('uuid');

class HelperUtils {
  // Date and time utilities
  static formatDate(date, format = 'YYYY-MM-DD') {
    return moment(date).format(format);
  }

  static formatDateTime(date, format = 'YYYY-MM-DD HH:mm:ss') {
    return moment(date).format(format);
  }

  static getDaysBetween(startDate, endDate) {
    return moment(endDate).diff(moment(startDate), 'days');
  }

  static getDaysUntil(date) {
    return moment(date).diff(moment(), 'days');
  }

  static isDateInFuture(date) {
    return moment(date).isAfter(moment());
  }

  static isDateInPast(date) {
    return moment(date).isBefore(moment());
  }

  static getCurrentTimeZone() {
    return moment.tz.guess();
  }

  static convertTimeZone(date, fromZone, toZone) {
    return moment.tz(date, fromZone).tz(toZone);
  }

  // Currency utilities
  static formatCurrency(amount, currency = 'INR') {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency
    }).format(amount);
  }

  static calculatePercentage(value, total) {
    return ((value / total) * 100).toFixed(2);
  }

  static calculateDiscount(originalPrice, discountedPrice) {
    return ((originalPrice - discountedPrice) / originalPrice * 100).toFixed(2);
  }

  static calculateTax(amount, taxRate) {
    return (amount * taxRate / 100).toFixed(2);
  }

  // String utilities
  static capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  static capitalizeWords(str) {
    return str.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  static generateSlug(str) {
    return str
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
  }

  static truncateText(text, maxLength = 100) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  }

  // ID and reference utilities
  static generateUniqueId() {
    return uuidv4();
  }

  static generateBookingReference() {
    return 'TV' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substr(2, 5).toUpperCase();
  }

  static generateConfirmationNumber() {
    return 'CONF' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substr(2, 3).toUpperCase();
  }

  // Array and object utilities
  static groupBy(array, key) {
    return array.reduce((groups, item) => {
      const group = item[key];
      groups[group] = groups[group] || [];
      groups[group].push(item);
      return groups;
    }, {});
  }

  static sortBy(array, key, order = 'asc') {
    return array.sort((a, b) => {
      if (order === 'asc') {
        return a[key] > b[key] ? 1 : -1;
      } else {
        return a[key] < b[key] ? 1 : -1;
      }
    });
  }

  static filterBy(array, key, value) {
    return array.filter(item => item[key] === value);
  }

  static removeDuplicates(array, key) {
    const seen = new Set();
    return array.filter(item => {
      const value = item[key];
      if (seen.has(value)) {
        return false;
      } else {
        seen.add(value);
        return true;
      }
    });
  }

  // Validation utilities
  static isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static isValidPhoneNumber(phone) {
    const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
    return phoneRegex.test(phone);
  }

  static isValidUrl(url) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  // Error handling utilities
  static createError(message, statusCode = 500, details = null) {
    const error = new Error(message);
    error.statusCode = statusCode;
    error.details = details;
    return error;
  }

  static handleAsyncError(fn) {
    return (req, res, next) => {
      Promise.resolve(fn(req, res, next)).catch(next);
    };
  }

  // Response formatting utilities
  static formatSuccessResponse(data, message = 'Success') {
    return {
      success: true,
      message,
      data,
      timestamp: new Date().toISOString()
    };
  }

  static formatErrorResponse(message, statusCode = 500, details = null) {
    return {
      success: false,
      message,
      statusCode,
      details,
      timestamp: new Date().toISOString()
    };
  }

  static formatPaginatedResponse(data, page, limit, total) {
    return {
      success: true,
      data,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      },
      timestamp: new Date().toISOString()
    };
  }

  // File utilities
  static getFileExtension(filename) {
    return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
  }

  static isValidFileType(filename, allowedTypes) {
    const extension = this.getFileExtension(filename).toLowerCase();
    return allowedTypes.includes(extension);
  }

  static formatFileSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  }

  // Security utilities
  static sanitizeInput(input) {
    if (typeof input === 'string') {
      return input
        .replace(/[<>]/g, '')
        .replace(/javascript:/gi, '')
        .replace(/on\w+=/gi, '');
    }
    return input;
  }

  static generateRandomString(length = 10) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  static generateSecureToken() {
    return require('crypto').randomBytes(32).toString('hex');
  }

  // Location utilities
  static calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c; // Distance in kilometers
    return distance;
  }

  static deg2rad(deg) {
    return deg * (Math.PI/180);
  }

  // Time utilities
  static getTimeAgo(date) {
    return moment(date).fromNow();
  }

  static getTimeUntil(date) {
    return moment(date).toNow();
  }

  static isToday(date) {
    return moment(date).isSame(moment(), 'day');
  }

  static isThisWeek(date) {
    return moment(date).isSame(moment(), 'week');
  }

  static isThisMonth(date) {
    return moment(date).isSame(moment(), 'month');
  }

  // Budget utilities
  static calculateBudgetBreakdown(totalBudget, percentages) {
    const breakdown = {};
    for (const [category, percentage] of Object.entries(percentages)) {
      breakdown[category] = (totalBudget * percentage) / 100;
    }
    return breakdown;
  }

  static calculateRemainingBudget(totalBudget, spentAmount) {
    return totalBudget - spentAmount;
  }

  static calculateBudgetUtilization(spentAmount, totalBudget) {
    return (spentAmount / totalBudget) * 100;
  }

  // Travel utilities
  static calculateTripDuration(startDate, endDate) {
    return moment(endDate).diff(moment(startDate), 'days') + 1;
  }

  static getTripStatus(startDate, endDate) {
    const now = moment();
    const start = moment(startDate);
    const end = moment(endDate);

    if (now.isBefore(start)) {
      return 'upcoming';
    } else if (now.isBetween(start, end, 'day', '[]')) {
      return 'ongoing';
    } else {
      return 'completed';
    }
  }

  static formatTripDuration(days) {
    if (days === 1) return '1 day';
    if (days < 7) return `${days} days`;
    if (days < 30) return `${Math.floor(days / 7)} weeks`;
    return `${Math.floor(days / 30)} months`;
  }
}

module.exports = HelperUtils; 