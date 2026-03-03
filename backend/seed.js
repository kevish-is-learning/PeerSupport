/**
 * Prisma Seed Script
 * Seeds the database with initial categories, badges, and an admin user.
 * Run with: npm run db:seed
 */

import { PrismaClient } from './src/generated/prisma/index.js'; 

import bcrypt from 'bcryptjs';

const prisma = new PrismaClient({});

async function main() {
  console.log('🌱 Seeding database...\n');

  // --- Categories ---
  const categories = [
    { name: 'General', slug: 'general', description: 'General peer support discussions', icon: '💬', color: '#6366f1', sortOrder: 0 },
    { name: 'Anxiety', slug: 'anxiety', description: 'Discussions about anxiety and coping strategies', icon: '😰', color: '#f59e0b', sortOrder: 1 },
    { name: 'Depression', slug: 'depression', description: 'Support for depression and low mood', icon: '🌧️', color: '#3b82f6', sortOrder: 2 },
    { name: 'Relationships', slug: 'relationships', description: 'Relationship support and advice', icon: '❤️', color: '#ef4444', sortOrder: 3 },
    { name: 'Self-Care', slug: 'self-care', description: 'Tips and discussions about self-care routines', icon: '🧘', color: '#10b981', sortOrder: 4 },
    { name: 'Academic Stress', slug: 'academic-stress', description: 'Academic and career pressure support', icon: '📚', color: '#8b5cf6', sortOrder: 5 },
    { name: 'Grief & Loss', slug: 'grief-loss', description: 'Support for grief and bereavement', icon: '🕊️', color: '#6b7280', sortOrder: 6 },
    { name: 'Positive Stories', slug: 'positive-stories', description: 'Share your positive experiences and wins', icon: '🌟', color: '#f97316', sortOrder: 7 },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }
  console.log(`✅ ${categories.length} categories seeded`);

  // --- Badges ---
  const badges = [
    { name: 'First Post', description: 'Created your first post', icon: '✍️', criteria: 'Create 1 post' },
    { name: 'Helpful', description: 'Received 10 upvotes on comments', icon: '🤝', criteria: 'Receive 10 comment upvotes' },
    { name: 'Supporter', description: 'Left 50 comments', icon: '💪', criteria: 'Create 50 comments' },
    { name: 'Popular', description: 'A post reached 100 upvotes', icon: '🔥', criteria: 'Get 100 upvotes on a single post' },
    { name: 'Veteran', description: 'Active member for 1 year', icon: '🎖️', criteria: 'Account age >= 1 year' },
    { name: 'Trusted', description: 'Achieved 500 reputation', icon: '⭐', criteria: 'Reputation >= 500' },
  ];

  for (const badge of badges) {
    await prisma.badge.upsert({
      where: { name: badge.name },
      update: {},
      create: badge,
    });
  }
  console.log(`✅ ${badges.length} badges seeded`);

  // --- Admin User ---
  const adminPassword = await bcrypt.hash('Admin@123', 12);
  await prisma.user.upsert({
    where: { email: 'admin@peersupport.com' },
    update: {},
    create: {
      username: 'admin',
      email: 'admin@peersupport.com',
      password: adminPassword,
      displayName: 'Admin',
      role: 'ADMIN',
      isVerified: true,
    },
  });
  console.log('✅ Admin user seeded (admin@peersupport.com / Admin@123)');

  console.log('\n🌱 Seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
