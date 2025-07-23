export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export const validateDiscordUsername = (username: string): ValidationResult => {
  if (username.length < 2 || username.length > 32) {
    return {error: 'Discord username must be 2-32 characters', isValid: false};
  }
  if (!/^[a-z0-9_.]+$/.test(username)) {
    return {
      error: 'Discord username can only contain lowercase letters, numbers, underscore, and period',
      isValid: false,
    };
  }
  if (username.includes('..')) {
    return {error: 'Discord username cannot contain consecutive periods', isValid: false};
  }
  return {isValid: true};
};

export const validateFacebookUsername = (username: string): ValidationResult => {
  if (username.length < 5) {
    return {error: 'Facebook username must be at least 5 characters', isValid: false};
  }
  if (!/^[A-Za-z0-9.]+$/.test(username)) {
    return {error: 'Facebook username can only contain letters, numbers, and periods', isValid: false};
  }
  if (!/[A-Za-z]/.test(username)) {
    return {error: 'Facebook username must include at least one letter', isValid: false};
  }
  return {isValid: true};
};

export const validateGitHubUsername = (username: string): ValidationResult => {
  if (username.length < 1 || username.length > 39) {
    return {error: 'GitHub username must be 1-39 characters', isValid: false};
  }
  if (!/^[A-Za-z0-9-]+$/.test(username)) {
    return {error: 'GitHub username can only contain letters, numbers, and hyphens', isValid: false};
  }
  if (username.includes('--')) {
    return {error: 'GitHub username cannot contain consecutive hyphens', isValid: false};
  }
  if (username.startsWith('-') || username.endsWith('-')) {
    return {error: 'GitHub username cannot begin or end with a hyphen', isValid: false};
  }
  return {isValid: true};
};

export const validateInstagramUsername = (username: string): ValidationResult => {
  if (username.length < 1 || username.length > 30) {
    return {error: 'Instagram username must be 1-30 characters', isValid: false};
  }
  if (!/^[A-Za-z0-9_.]+$/.test(username)) {
    return {error: 'Instagram username can only contain letters, numbers, underscore, and period', isValid: false};
  }
  if (username.endsWith('.')) {
    return {error: 'Instagram username cannot end with a period', isValid: false};
  }
  return {isValid: true};
};

export const validateLinkedInUsername = (username: string): ValidationResult => {
  if (username.length < 3 || username.length > 100) {
    return {error: 'LinkedIn username must be 3-100 characters', isValid: false};
  }
  if (!/^[A-Za-z0-9-]+$/.test(username)) {
    return {error: 'LinkedIn username can only contain letters, numbers, and hyphens', isValid: false};
  }
  return {isValid: true};
};

export const validatePinterestUsername = (username: string): ValidationResult => {
  if (username.length < 3 || username.length > 30) {
    return {error: 'Pinterest username must be 3-30 characters', isValid: false};
  }
  if (!/^[A-Za-z0-9_]+$/.test(username)) {
    return {error: 'Pinterest username can only contain letters, numbers, and underscore', isValid: false};
  }
  return {isValid: true};
};

export const validateRedditUsername = (username: string): ValidationResult => {
  if (username.length < 3 || username.length > 20) {
    return {error: 'Reddit username must be 3-20 characters', isValid: false};
  }
  if (!/^[A-Za-z0-9_-]+$/.test(username)) {
    return {error: 'Reddit username can only contain letters, numbers, underscore, and hyphen', isValid: false};
  }
  return {isValid: true};
};

export const validateTikTokUsername = (username: string): ValidationResult => {
  if (username.length < 2 || username.length > 24) {
    return {error: 'TikTok username must be 2-24 characters', isValid: false};
  }
  if (!/^[A-Za-z0-9_.]+$/.test(username)) {
    return {error: 'TikTok username can only contain letters, numbers, underscore, and period', isValid: false};
  }
  if (username.endsWith('.')) {
    return {error: 'TikTok username cannot end with a period', isValid: false};
  }
  return {isValid: true};
};

export const validateTwitchUsername = (username: string): ValidationResult => {
  if (username.length < 4 || username.length > 25) {
    return {error: 'Twitch username must be 4-25 characters', isValid: false};
  }
  if (!/^[A-Za-z0-9_]+$/.test(username)) {
    return {error: 'Twitch username can only contain letters, numbers, and underscore', isValid: false};
  }
  return {isValid: true};
};

export const validateXUsername = (username: string): ValidationResult => {
  if (username.length < 4 || username.length > 15) {
    return {error: 'X username must be 4-15 characters', isValid: false};
  }
  if (!/^[A-Za-z0-9_]+$/.test(username)) {
    return {error: 'X username can only contain letters, numbers, and underscore', isValid: false};
  }
  return {isValid: true};
};

export const validateYouTubeUsername = (username: string): ValidationResult => {
  if (username.length < 3 || username.length > 30) {
    return {error: 'YouTube username must be 3-30 characters', isValid: false};
  }
  if (!/^[A-Za-z0-9_.-]+$/.test(username)) {
    return {
      error: 'YouTube username can only contain letters, numbers, underscore, hyphen, and period',
      isValid: false,
    };
  }
  if (/^[_.-]|[_.-]$/.test(username)) {
    return {error: 'YouTube username cannot begin or end with underscore, hyphen, or period', isValid: false};
  }
  return {isValid: true};
};

export const socialUsernameValidators: Record<string, (username: string) => ValidationResult> = {
  discord: validateDiscordUsername,
  facebook: validateFacebookUsername,
  github: validateGitHubUsername,
  instagram: validateInstagramUsername,
  linkedin: validateLinkedInUsername,
  pinterest: validatePinterestUsername,
  reddit: validateRedditUsername,
  tiktok: validateTikTokUsername,
  twitch: validateTwitchUsername,
  x: validateXUsername,
  youtube: validateYouTubeUsername,
};
