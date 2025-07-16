// Simple in-memory cache configuration
const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

const cacheService = {
  get(key) {
    const item = cache.get(key);
    if (!item) return null;
    
    if (Date.now() > item.expiry) {
      cache.delete(key);
      return null;
    }
    
    return item.value;
  },
  
  set(key, value, ttl = CACHE_TTL) {
    cache.set(key, {
      value,
      expiry: Date.now() + ttl,
    });
  },
  
  delete(key) {
    cache.delete(key);
  },
  
  clear() {
    cache.clear();
  },
  
  // Clean up expired entries
  cleanup() {
    const now = Date.now();
    for (const [key, item] of cache.entries()) {
      if (now > item.expiry) {
        cache.delete(key);
      }
    }
  }
};

// Run cleanup every minute
setInterval(() => {
  cacheService.cleanup();
}, 60 * 1000);

module.exports = cacheService;