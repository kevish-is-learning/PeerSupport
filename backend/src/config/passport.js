import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '../generated/prisma/index.js';
import emailService from '../services/EmailService.js';

const prisma = new PrismaClient();

// Serialize user for session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Local Strategy (Email/Password)
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        // Find user by email
        const user = await prisma.user.findUnique({
          where: { email: email.toLowerCase() },
        });

        if (!user) {
          return done(null, false, { message: 'Invalid email or password' });
        }

        // Check if user registered with Google
        if (user.provider === 'GOOGLE' || !user.password) {
          return done(null, false, { 
            message: 'Please sign in with Google' 
          });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, { message: 'Invalid email or password' });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:5000/api/auth/google/callback',
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        let mode = 'login';
        let role = 'MENTEE';
        
        if (req.query.state) {
          try {
            const decodedState = Buffer.from(req.query.state, 'base64').toString('utf8');
            const stateObj = JSON.parse(decodedState);
            mode = stateObj.mode || 'login';
            role = stateObj.role || 'MENTEE';
          } catch (e) {
            console.error('Failed to parse state:', e);
          }
        }

        // Check if user already exists
        let user = await prisma.user.findUnique({
          where: { googleId: profile.id },
          include: {
            mentorProfile: { select: { id: true } },
            menteeProfile: { select: { id: true } },
          },
        });

        if (user) {
          // User exists, return user
          return done(null, user);
        }

        // If trying to log in but account doesn't exist, block registration
        if (mode !== 'register') {
          return done(null, false, {
            message: 'account_not_found',
          });
        }

        // Check if email already exists with local provider
        const emailExists = await prisma.user.findUnique({
          where: { email: profile.emails[0].value },
        });

        if (emailExists) {
          return done(null, false, { 
            message: 'email_exists' 
          });
        }

        // Create new user
        user = await prisma.user.create({
          data: {
            email: profile.emails[0].value,
            name: profile.displayName,
            googleId: profile.id,
            provider: 'GOOGLE',
            profilePicture: profile.photos[0]?.value,
            isVerified: true, // Google accounts are verified
            role: role, // Use the role extracted from state
          },
          include: {
            mentorProfile: { select: { id: true } },
            menteeProfile: { select: { id: true } },
          },
        });

        // Fire-and-forget welcome email for new Google signups
        emailService.sendWelcomeEmail({
          name: user.name,
          email: user.email,
          role: user.role,
        });

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;