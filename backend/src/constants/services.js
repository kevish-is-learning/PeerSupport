/**
 * Single source of truth for mentor service types.
 * The keys match the Prisma `MentorServiceType` enum exactly.
 * Display labels are what the frontend should show to users.
 */
export const SERVICE_TYPE_LABELS = Object.freeze({
  SOP_REVIEW: 'SoP Review / Discussion',
  RESUME_CURATION: 'Resume Curation / Review',
  MOCK_INTERVIEW: 'Mock Interview',
  WAT_GD_PREP: 'WAT and GD Preparation',
  KNOW_YOUR_COLLEGE: 'Know Your College',
  ONE_ON_ONE_CONNECT: 'One-on-one Connect',
});

/** All valid service-type enum values. */
export const VALID_SERVICE_TYPES = Object.keys(SERVICE_TYPE_LABELS);

