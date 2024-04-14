const GITHUB_BASE_URL = 'https://github.com';

/**
 * Generates a URL for a GitHub user profile.
 */
export const getUserProfileUrl = (username: string) => `${GITHUB_BASE_URL}/${username}`;

/**
 * Generates a URL for a GitHub repository.
 */
export const getRepositoryUrl = (ownerName: string, repoName: string) => `${GITHUB_BASE_URL}/${ownerName}/${repoName}`;

/**
 * Generates a URL for a GitHub pull request.
 */
export const getPullRequestUrl = (ownerName: string, repoName: string, pullNumber: number) =>
  `${getRepositoryUrl(ownerName, repoName)}/pull/${pullNumber}`;
