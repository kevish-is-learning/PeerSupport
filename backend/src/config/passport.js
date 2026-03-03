/**
 * Passport Google OAuth Configuration
 */

import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import Environment from './environment.js';
import { Database } from '../config/database.js';
import Helpers from '../utils/helpers.js';
import logger from '../utils/logger.js';

const env = Environment.getInstance();

// Configure Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: env.googleClientId,
      clientSecret: env.googleClientSecret,
      callbackURL: env.googleCallbackUrl,
      scope: ['profile', 'email'],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        const providerId = profile.id;
        const provider = 'google';

        // Check if user exists with this provider
        let user = await Database.user.findFirst({
          where: {
            provider,
            providerId,
          },
        });

        if (user) {
          // Update last login
          user = await Database.user.update({
            where: { id: user.id },
            data: { lastLoginAt: new Date() },
          });
          logger.info(`Google OAuth login: ${user.email}`);
          return done(null, user);
        }

        // Check if user exists with same email but different provider
        const existingUser = await Database.user.findUnique({
          where: { email },
        });

        if (existingUser) {
          // Link Google account to existing user
          user = await Database.user.update({
            where: { id: existingUser.id },
            data: {
              provider,
              providerId,
              lastLoginAt: new Date(),
              isVerified: true,
            },
          });
          logger.info(`Linked Google account to existing user: ${user.email}`);
          return done(null, user);
        }

        // Create new user
        const username = Helpers.generateUsernameFromEmail(email);
        const displayName = profile.displayName || username;
        const avatar = profile.photos?.[0]?.value || null;

        user = await Database.user.create({
          data: {
            email,
            username,
            displayName,
            avatar,
            provider,
            providerId,
            isVerified: true,
            lastLoginAt: new Date(),
          },
        });

        logger.info(`New user created via Google OAuth: ${user.email}`);
        return done(null, user);
      } catch (error) {
        logger.error('Google OAuth error:', error);
        return done(error, null);
      }
    }
  )
);

// Serialize user for the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from the session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await Database.user.findUnique({ where: { id } });
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;
