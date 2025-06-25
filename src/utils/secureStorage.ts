
/**
 * Secure storage utilities for sensitive data
 */

interface StorageItem {
  value: any;
  timestamp: number;
  expiresIn?: number; // milliseconds
}

/**
 * Securely store data with optional expiration
 */
export const setSecureItem = (key: string, value: any, expiresInMinutes?: number): void => {
  try {
    const item: StorageItem = {
      value,
      timestamp: Date.now(),
      expiresIn: expiresInMinutes ? expiresInMinutes * 60 * 1000 : undefined
    };
    
    localStorage.setItem(`secure_${key}`, JSON.stringify(item));
  } catch (error) {
    console.warn('Failed to store secure item:', error);
  }
};

/**
 * Retrieve and validate stored data
 */
export const getSecureItem = (key: string): any => {
  try {
    const stored = localStorage.getItem(`secure_${key}`);
    if (!stored) return null;
    
    const item: StorageItem = JSON.parse(stored);
    
    // Check expiration
    if (item.expiresIn && Date.now() - item.timestamp > item.expiresIn) {
      removeSecureItem(key);
      return null;
    }
    
    return item.value;
  } catch (error) {
    console.warn('Failed to retrieve secure item:', error);
    return null;
  }
};

/**
 * Remove stored data
 */
export const removeSecureItem = (key: string): void => {
  try {
    localStorage.removeItem(`secure_${key}`);
  } catch (error) {
    console.warn('Failed to remove secure item:', error);
  }
};

/**
 * Clear all spiritual profile data on logout
 */
export const clearSpiritualData = (): void => {
  const keysToRemove = [
    'spiritual_profile',
    'assessment_results',
    'protection_settings',
    'ritual_preferences'
  ];
  
  keysToRemove.forEach(key => removeSecureItem(key));
};

/**
 * Store spiritual profile with 24-hour expiration
 */
export const storeSpiritualProfile = (profile: any): void => {
  setSecureItem('spiritual_profile', profile, 24 * 60); // 24 hours
};

/**
 * Get spiritual profile
 */
export const getSpiritualProfile = (): any => {
  return getSecureItem('spiritual_profile');
};
