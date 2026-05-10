import { PrismaClient } from '../src/generated/prisma/index.js';

const prisma = new PrismaClient();

const SERVICES = [
  {
    name: 'Resume Review',
    slug: 'resume-review',
    description: 'Get expert feedback on your resume to make it stand out for MBA admissions.',
  },
  {
    name: 'Mock Interview',
    slug: 'mock-interview',
    description: 'Practice with realistic interview scenarios and get detailed feedback.',
  },
  {
    name: 'Profile Review',
    slug: 'profile-review',
    description: 'Comprehensive evaluation of your MBA application profile.',
  },
  {
    name: 'SOP Review',
    slug: 'sop-review',
    description: 'Statement of Purpose review and improvement suggestions.',
  },
  {
    name: 'GD Practice',
    slug: 'gd-practice',
    description: 'Group Discussion practice sessions with expert moderation.',
  },
  {
    name: 'Strategy Session',
    slug: 'strategy-session',
    description: 'One-on-one strategy planning for your MBA journey.',
  },
];

async function main() {
  console.log('🌱 Seeding services...');

  for (const service of SERVICES) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {
        name: service.name,
        description: service.description,
      },
      create: service,
    });
    console.log(`  ✅ ${service.name}`);
  }

  console.log('🌱 Seeding complete.');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
