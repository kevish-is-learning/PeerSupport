import { PrismaClient } from '../generated/prisma/index.js';

const prisma = new PrismaClient();

async function main() {
  console.log('🗑️  Clearing database...\n');

  // Delete in reverse order of dependencies
  console.log('Deleting WebinarRegistrations...');
  await prisma.webinarRegistration.deleteMany({});
  
  console.log('Deleting Webinars...');
  await prisma.webinar.deleteMany({});
  
  console.log('Deleting VerificationDocuments...');
  await prisma.verificationDocument.deleteMany({});
  
  console.log('Deleting ServiceReviews...');
  await prisma.serviceReview.deleteMany({});
  
  console.log('Deleting Services...');
  await prisma.service.deleteMany({});
  
  console.log('Deleting MentorFeedback...');
  await prisma.mentorFeedback.deleteMany({});
  
  console.log('Deleting MenteeResumes...');
  await prisma.menteeResume.deleteMany({});
  
  console.log('Deleting MentorResumes...');
  await prisma.mentorResume.deleteMany({});
  
  console.log('Deleting MentorApplications...');
  await prisma.mentorApplication.deleteMany({});
  
  console.log('Deleting MentorProfiles...');
  await prisma.mentorProfile.deleteMany({});
  
  console.log('Deleting MenteeProfiles...');
  await prisma.menteeProfile.deleteMany({});
  
  console.log('Deleting AdminProfiles...');
  await prisma.adminProfile.deleteMany({});
  
  console.log('Deleting Users...');
  await prisma.user.deleteMany({});

  console.log('\n✅ Database cleared successfully!\n');
}

main()
  .catch((e) => {
    console.error('❌ Clear failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
