const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tripId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trip'
  },
  messages: [{
    role: {
      type: String,
      enum: ['user', 'assistant', 'system'],
      required: true
    },
    content: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    metadata: {
      intent: String,
      entities: Object,
      confidence: Number
    }
  }],
  context: {
    currentTrip: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Trip'
    },
    lastIntent: String,
    conversationStage: {
      type: String,
      enum: ['onboarding', 'planning', 'booking', 'traveling', 'support'],
      default: 'onboarding'
    }
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Get last message
chatSchema.methods.getLastMessage = function() {
  return this.messages[this.messages.length - 1];
};

// Add message to chat
chatSchema.methods.addMessage = function(role, content, metadata = {}) {
  this.messages.push({
    role,
    content,
    metadata
  });
  return this.save();
};

module.exports = mongoose.model('Chat', chatSchema); 