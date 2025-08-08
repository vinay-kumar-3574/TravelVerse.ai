/**
 * Memory Manager for AI Agent
 * Handles long-term memory storage and retrieval
 */

const fs = require('fs').promises;
const path = require('path');

class MemoryManager {
  constructor() {
    this.memoryDir = path.join(__dirname, 'data');
    this.userMemories = new Map();
    this.conversationHistory = new Map();
    this.userPreferences = new Map();
    this.tripMemories = new Map();
    
    this.initializeMemory();
  }

  /**
   * Initialize memory storage
   */
  async initializeMemory() {
    try {
      await fs.mkdir(this.memoryDir, { recursive: true });
      await this.loadMemories();
    } catch (error) {
      console.error('Error initializing memory:', error);
    }
  }

  /**
   * Load all memories from storage
   */
  async loadMemories() {
    try {
      const files = await fs.readdir(this.memoryDir);
      
      for (const file of files) {
        if (file.endsWith('.json')) {
          const userId = file.replace('.json', '');
          const data = await fs.readFile(path.join(this.memoryDir, file), 'utf8');
          const memory = JSON.parse(data);
          
          this.userMemories.set(userId, memory);
          this.conversationHistory.set(userId, memory.conversations || []);
          this.userPreferences.set(userId, memory.preferences || {});
          this.tripMemories.set(userId, memory.trips || []);
        }
      }
    } catch (error) {
      console.error('Error loading memories:', error);
    }
  }

  /**
   * Save memory to storage
   */
  async saveMemory(userId) {
    try {
      const memory = {
        userId,
        conversations: this.conversationHistory.get(userId) || [],
        preferences: this.userPreferences.get(userId) || {},
        trips: this.tripMemories.get(userId) || [],
        lastUpdated: new Date().toISOString()
      };

      await fs.writeFile(
        path.join(this.memoryDir, `${userId}.json`),
        JSON.stringify(memory, null, 2)
      );
    } catch (error) {
      console.error('Error saving memory:', error);
    }
  }

  /**
   * Get user memory
   */
  async getUserMemory(userId) {
    if (!this.userMemories.has(userId)) {
      const defaultMemory = {
        userId,
        conversations: [],
        preferences: {},
        trips: [],
        recentMessages: [],
        commonDestinations: [],
        travelPatterns: {},
        lastUpdated: new Date().toISOString()
      };
      
      this.userMemories.set(userId, defaultMemory);
      this.conversationHistory.set(userId, []);
      this.userPreferences.set(userId, {});
      this.tripMemories.set(userId, []);
    }

    return this.userMemories.get(userId);
  }

  /**
   * Store user interaction
   */
  async storeInteraction(userId, interaction) {
    const memory = await this.getUserMemory(userId);
    
    // Add to conversation history
    const conversations = this.conversationHistory.get(userId) || [];
    conversations.push({
      ...interaction,
      timestamp: new Date().toISOString()
    });

    // Keep only last 100 conversations
    if (conversations.length > 100) {
      conversations.splice(0, conversations.length - 100);
    }

    this.conversationHistory.set(userId, conversations);
    memory.conversations = conversations;
    memory.recentMessages = conversations.slice(-10);

    await this.saveMemory(userId);
    return memory;
  }

  /**
   * Store user preferences
   */
  async storePreferences(userId, preferences) {
    const currentPreferences = this.userPreferences.get(userId) || {};
    const updatedPreferences = { ...currentPreferences, ...preferences };
    
    this.userPreferences.set(userId, updatedPreferences);
    
    const memory = await this.getUserMemory(userId);
    memory.preferences = updatedPreferences;
    
    await this.saveMemory(userId);
    return updatedPreferences;
  }

  /**
   * Store trip memory
   */
  async storeTripMemory(userId, tripData) {
    const trips = this.tripMemories.get(userId) || [];
    trips.push({
      ...tripData,
      timestamp: new Date().toISOString()
    });

    // Keep only last 50 trips
    if (trips.length > 50) {
      trips.splice(0, trips.length - 50);
    }

    this.tripMemories.set(userId, trips);
    
    const memory = await this.getUserMemory(userId);
    memory.trips = trips;
    
    await this.saveMemory(userId);
    return trips;
  }

  /**
   * Get conversation history
   */
  async getConversationHistory(userId, limit = 20) {
    const conversations = this.conversationHistory.get(userId) || [];
    return conversations.slice(-limit);
  }

  /**
   * Get user preferences
   */
  async getUserPreferences(userId) {
    return this.userPreferences.get(userId) || {};
  }

  /**
   * Get trip memories
   */
  async getTripMemories(userId, limit = 10) {
    const trips = this.tripMemories.get(userId) || [];
    return trips.slice(-limit);
  }

  /**
   * Get recent messages
   */
  async getRecentMessages(userId, limit = 10) {
    const memory = await this.getUserMemory(userId);
    return memory.recentMessages || [];
  }

  /**
   * Get common destinations
   */
  async getCommonDestinations(userId) {
    const memory = await this.getUserMemory(userId);
    return memory.commonDestinations || [];
  }

  /**
   * Update common destinations
   */
  async updateCommonDestinations(userId, destination) {
    const memory = await this.getUserMemory(userId);
    const destinations = memory.commonDestinations || [];
    
    // Add destination if not already present
    if (!destinations.includes(destination)) {
      destinations.push(destination);
      
      // Keep only top 10 destinations
      if (destinations.length > 10) {
        destinations.splice(0, destinations.length - 10);
      }
      
      memory.commonDestinations = destinations;
      await this.saveMemory(userId);
    }
    
    return destinations;
  }

  /**
   * Get travel patterns
   */
  async getTravelPatterns(userId) {
    const memory = await this.getUserMemory(userId);
    return memory.travelPatterns || {};
  }

  /**
   * Update travel patterns
   */
  async updateTravelPatterns(userId, pattern) {
    const memory = await this.getUserMemory(userId);
    const patterns = memory.travelPatterns || {};
    
    // Update pattern statistics
    const key = `${pattern.mode}_${pattern.season}`;
    if (!patterns[key]) {
      patterns[key] = { count: 0, destinations: [] };
    }
    
    patterns[key].count++;
    if (!patterns[key].destinations.includes(pattern.destination)) {
      patterns[key].destinations.push(pattern.destination);
    }
    
    memory.travelPatterns = patterns;
    await this.saveMemory(userId);
    
    return patterns;
  }

  /**
   * Search memories by keyword
   */
  async searchMemories(userId, keyword) {
    const memory = await this.getUserMemory(userId);
    const results = [];
    
    // Search in conversations
    const conversations = memory.conversations || [];
    for (const conv of conversations) {
      if (conv.message && conv.message.toLowerCase().includes(keyword.toLowerCase())) {
        results.push({
          type: 'conversation',
          content: conv.message,
          timestamp: conv.timestamp
        });
      }
    }
    
    // Search in trips
    const trips = memory.trips || [];
    for (const trip of trips) {
      if (trip.destination && trip.destination.toLowerCase().includes(keyword.toLowerCase())) {
        results.push({
          type: 'trip',
          content: trip.destination,
          timestamp: trip.timestamp
        });
      }
    }
    
    return results;
  }

  /**
   * Get memory insights
   */
  async getMemoryInsights(userId) {
    const memory = await this.getUserMemory(userId);
    const conversations = memory.conversations || [];
    const trips = memory.trips || [];
    const preferences = memory.preferences || {};
    
    const insights = {
      totalConversations: conversations.length,
      totalTrips: trips.length,
      favoriteDestinations: this.getFavoriteDestinations(trips),
      commonTopics: this.getCommonTopics(conversations),
      travelPreferences: preferences,
      recentActivity: conversations.slice(-5).map(c => ({
        type: c.intent,
        timestamp: c.timestamp
      }))
    };
    
    return insights;
  }

  /**
   * Get favorite destinations
   */
  getFavoriteDestinations(trips) {
    const destinations = {};
    
    trips.forEach(trip => {
      if (trip.destination) {
        destinations[trip.destination] = (destinations[trip.destination] || 0) + 1;
      }
    });
    
    return Object.entries(destinations)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([destination, count]) => ({ destination, count }));
  }

  /**
   * Get common topics
   */
  getCommonTopics(conversations) {
    const topics = {};
    
    conversations.forEach(conv => {
      if (conv.intent) {
        topics[conv.intent] = (topics[conv.intent] || 0) + 1;
      }
    });
    
    return Object.entries(topics)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([topic, count]) => ({ topic, count }));
  }

  /**
   * Clear user memory
   */
  async clearUserMemory(userId) {
    this.userMemories.delete(userId);
    this.conversationHistory.delete(userId);
    this.userPreferences.delete(userId);
    this.tripMemories.delete(userId);
    
    try {
      await fs.unlink(path.join(this.memoryDir, `${userId}.json`));
    } catch (error) {
      // File might not exist, which is fine
    }
  }

  /**
   * Export user memory
   */
  async exportUserMemory(userId) {
    const memory = await this.getUserMemory(userId);
    return {
      userId,
      exportDate: new Date().toISOString(),
      data: memory
    };
  }

  /**
   * Import user memory
   */
  async importUserMemory(userId, memoryData) {
    this.userMemories.set(userId, memoryData);
    this.conversationHistory.set(userId, memoryData.conversations || []);
    this.userPreferences.set(userId, memoryData.preferences || {});
    this.tripMemories.set(userId, memoryData.trips || []);
    
    await this.saveMemory(userId);
  }

  /**
   * Get memory statistics
   */
  async getMemoryStats() {
    const stats = {
      totalUsers: this.userMemories.size,
      totalConversations: 0,
      totalTrips: 0,
      averageConversationsPerUser: 0,
      averageTripsPerUser: 0
    };
    
    for (const [userId, memory] of this.userMemories) {
      stats.totalConversations += (memory.conversations || []).length;
      stats.totalTrips += (memory.trips || []).length;
    }
    
    if (stats.totalUsers > 0) {
      stats.averageConversationsPerUser = Math.round(stats.totalConversations / stats.totalUsers);
      stats.averageTripsPerUser = Math.round(stats.totalTrips / stats.totalUsers);
    }
    
    return stats;
  }

  /**
   * Health check for memory manager
   */
  async healthCheck() {
    try {
      // Check if memory directory exists
      await fs.access(this.memoryDir);
      
      // Check if we can read/write
      const testFile = path.join(this.memoryDir, 'test.json');
      await fs.writeFile(testFile, '{"test": true}');
      await fs.readFile(testFile, 'utf8');
      await fs.unlink(testFile);
      
      return {
        status: 'healthy',
        memoryDir: this.memoryDir,
        userCount: this.userMemories.size,
        conversationCount: Array.from(this.conversationHistory.values())
          .reduce((sum, convs) => sum + convs.length, 0)
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        error: error.message
      };
    }
  }

  /**
   * Backup all memories
   */
  async backupMemories() {
    const backup = {
      timestamp: new Date().toISOString(),
      users: Array.from(this.userMemories.entries())
    };
    
    const backupFile = path.join(this.memoryDir, `backup_${Date.now()}.json`);
    await fs.writeFile(backupFile, JSON.stringify(backup, null, 2));
    
    return backupFile;
  }

  /**
   * Restore memories from backup
   */
  async restoreMemories(backupFile) {
    const backupData = await fs.readFile(backupFile, 'utf8');
    const backup = JSON.parse(backupData);
    
    for (const [userId, memory] of backup.users) {
      await this.importUserMemory(userId, memory);
    }
    
    return backup.users.length;
  }
}

module.exports = MemoryManager; 