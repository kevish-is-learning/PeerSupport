ALTER TABLE "MentorProfile"
  ADD COLUMN "education" JSONB,
  ADD COLUMN "professionalExperience" JSONB,
  ADD COLUMN "adminReviewNotes" TEXT,
  ADD COLUMN "reviewedAt" TIMESTAMP(3);
