/**
 * Application Constants
 * Centralized constants used across the application.
 */

const ROLES = Object.freeze({
  USER: 'USER',
  MODERATOR: 'MODERATOR',
  ADMIN: 'ADMIN',
});

const POST_STATUS = Object.freeze({
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  FLAGGED: 'FLAGGED',
  ARCHIVED: 'ARCHIVED',
});

const REPORT_STATUS = Object.freeze({
  PENDING: 'PENDING',
  REVIEWING: 'REVIEWING',
  RESOLVED: 'RESOLVED',
  DISMISSED: 'DISMISSED',
});

const REPORT_REASON = Object.freeze({
  SPAM: 'SPAM',
  HARASSMENT: 'HARASSMENT',
  INAPPROPRIATE: 'INAPPROPRIATE',
  MISINFORMATION: 'MISINFORMATION',
  SELF_HARM: 'SELF_HARM',
  OTHER: 'OTHER',
});

const NOTIFICATION_TYPE = Object.freeze({
  NEW_COMMENT: 'NEW_COMMENT',
  COMMENT_REPLY: 'COMMENT_REPLY',
  POST_UPVOTE: 'POST_UPVOTE',
  POST_APPROVED: 'POST_APPROVED',
  POST_REJECTED: 'POST_REJECTED',
  POST_FLAGGED: 'POST_FLAGGED',
  REPORT_RESOLVED: 'REPORT_RESOLVED',
  BADGE_EARNED: 'BADGE_EARNED',
  SYSTEM: 'SYSTEM',
});

const VOTE_TYPE = Object.freeze({
  UPVOTE: 'UPVOTE',
  DOWNVOTE: 'DOWNVOTE',
});

const SORT_BY = Object.freeze({
  NEWEST: 'newest',
  OLDEST: 'oldest',
  MOST_UPVOTED: 'most_upvoted',
  MOST_COMMENTED: 'most_commented',
  TRENDING: 'trending',
});

const CACHE_TTL = Object.freeze({
  SHORT: 60,         // 1 minute
  MEDIUM: 300,       // 5 minutes
  LONG: 900,         // 15 minutes
  HOUR: 3600,        // 1 hour
  DAY: 86400,        // 24 hours
});

const CACHE_KEYS = Object.freeze({
  POSTS_LIST: 'posts:list',
  POST_DETAIL: 'posts:detail',
  CATEGORIES: 'categories:all',
  TAGS_POPULAR: 'tags:popular',
  USER_PROFILE: 'users:profile',
  NOTIFICATIONS: 'notifications',
});

export {
  ROLES,
  POST_STATUS,
  REPORT_STATUS,
  REPORT_REASON,
  NOTIFICATION_TYPE,
  VOTE_TYPE,
  SORT_BY,
  CACHE_TTL,
  CACHE_KEYS,
};
