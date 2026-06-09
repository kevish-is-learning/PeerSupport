import { PrismaClient } from '../src/generated/prisma/index.js';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// Data arrays for generation
const firstNames = ['Aarav', 'Vivaan', 'Aditya', 'Vihaan', 'Arjun', 'Sai', 'Reyansh', 'Ayaan', 'Krishna', 'Ishaan', 'Diya', 'Myra', 'Ananya', 'Aaradhya', 'Pari', 'Anika', 'Navya', 'Avni', 'Saanvi', 'Kavya'];
const lastNames = ['Sharma', 'Verma', 'Gupta', 'Malhotra', 'Singh', 'Patel', 'Kumar', 'Reddy', 'Rao', 'Das', 'Sen', 'Banerjee', 'Iyer', 'Menon', 'Jain'];
const colleges = ['IIM Ahmedabad', 'IIM Bangalore', 'IIM Calcutta', 'IIM Lucknow', 'IIM Kozhikode', 'IIM Indore', 'ISB', 'XLRI', 'FMS Delhi', 'MDI Gurgaon', 'SP Jain'];
const ugColleges = ['IIT Delhi', 'IIT Bombay', 'IIT Kanpur', 'IIT Madras', 'IIT Kharagpur', 'BITS Pilani', 'NIT Trichy', 'SRCC', 'St. Stephens'];
const companies = ['McKinsey', 'BCG', 'Bain & Co', 'Google', 'Microsoft', 'Amazon', 'Unilever', 'P&G', 'Goldman Sachs', 'Morgan Stanley', 'HUL', 'ITC'];
const roles = ['Product Manager', 'Management Consultant', 'Strategy Consultant', 'Brand Manager', 'Investment Banker', 'Software Engineer', 'Data Scientist', 'Marketing Manager'];
const expertise = ['Interview Preparation', 'Resume Review', 'Career Guidance', 'Case Study Practice', 'GD/WAT Preparation', 'Product Management', 'Consulting', 'Marketing'];

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function main() {
  console.log('🌱 Starting Database Seeding...');

  // 1. Clean up old data
  // console.log('🧹 Cleaning up existing data...');
  // const modelNames = [
  //   'sessionAttendance', 'walletTransaction', 'mentorCancellationStat', 'payout', 
  //   'invoice', 'payment', 'sessionFeedback', 'review', 'booking', 
  //   'availabilityWindowService', 'availabilityWindow', 'mentorService', 
  //   'mentorWallet', 'mentorProfile', 'menteeProfile', 'user'
  // ];

  // for (const model of modelNames) {
  //   if (prisma[model]) {
  //     await prisma[model].deleteMany();
  //   }
  // }

  const defaultPassword = await bcrypt.hash('password123', 10);
  const now = new Date();

  // 2. Create Admins
  console.log('👑 Creating Admins...');
  await prisma.user.createMany({
    data: [
      { name: 'Super Admin', email: 'admin@peersupport.com', role: 'ADMIN', password: defaultPassword, isVerified: true },
      { name: 'Support Staff', email: 'support@peersupport.com', role: 'ADMIN', password: defaultPassword, isVerified: true },
    ]
  });

  // 3. Create Mentors (10 Mentors)
  console.log('🎓 Creating Mentors...');
  const mentors = [];
  for (let i = 1; i <= 10; i++) {
    const fn = randomChoice(firstNames);
    const ln = randomChoice(lastNames);
    const company = randomChoice(companies);
    const role = randomChoice(roles);
    
    const user = await prisma.user.create({
      data: {
        name: `${fn} ${ln}`,
        email: `mentor${i}@example.com`,
        role: 'MENTOR',
        password: defaultPassword,
        isVerified: true,
        profilePicture: `https://i.pravatar.cc/150?u=mentor${i}`,
      }
    });

    const isApproved = i <= 8; // 8 approved, 2 pending/rejected
    
    const profile = await prisma.mentorProfile.create({
      data: {
        userId: user.id,
        username: `${fn.toLowerCase()}_${ln.toLowerCase()}_${randomInt(10,99)}`,
        bio: `Experienced ${role} at ${company}. Alumnus of ${randomChoice(colleges)}. Passionate about mentoring.`,
        linkedInUrl: `https://linkedin.com/in/${fn.toLowerCase()}${ln.toLowerCase()}`,
        contactNumber: `+91 98765${randomInt(10000, 99999)}`,
        expertiseTags: [randomChoice(expertise), randomChoice(expertise)],
        ugCollegeProfile: `${randomChoice(ugColleges)} | B.Tech | ${randomInt(2012, 2018)}`,
        pgCollegeProfile: `${randomChoice(colleges)} | MBA | ${randomInt(2016, 2022)}`,
        workExperience: `${randomInt(2, 8)}|${company}|${role}`,
        approvalStatus: isApproved ? 'APPROVED' : (i === 9 ? 'PENDING' : 'REJECTED'),
        isVerified: isApproved,
        totalSessions: isApproved ? randomInt(5, 50) : 0,
        totalEarnings: isApproved ? randomInt(5000, 50000) : 0,
        averageRating: isApproved ? (Math.random() * (5.0 - 4.0) + 4.0) : 0,
      }
    });

    if (isApproved) {
      await prisma.mentorWallet.create({
        data: {
          mentorProfileId: profile.id,
          availableBalance: profile.totalEarnings * 0.2,
          withdrawnBalance: profile.totalEarnings * 0.8,
        }
      });

      // Services
      const svc1 = await prisma.mentorService.create({
        data: { mentorProfileId: profile.id, title: 'Resume Review', description: 'Detailed feedback on your CV.', price: randomInt(5, 10)*100, durationMinutes: 30 }
      });
      const svc2 = await prisma.mentorService.create({
        data: { mentorProfileId: profile.id, title: 'Mock Interview', description: 'Simulated 1-hour interview.', price: randomInt(10, 20)*100, durationMinutes: 60, bufferMinutes: 15 }
      });

      // Availability (Weekends)
      const win1 = await prisma.availabilityWindow.create({
        data: { mentorProfileId: profile.id, dayOfWeek: 'SATURDAY', startTime: new Date('1970-01-01T10:00:00Z'), endTime: new Date('1970-01-01T14:00:00Z') }
      });
      await prisma.availabilityWindowService.createMany({
        data: [{ windowId: win1.id, mentorServiceId: svc1.id }, { windowId: win1.id, mentorServiceId: svc2.id }]
      });

      mentors.push({ user, profile, services: [svc1, svc2] });
    }
  }

  // 4. Create Mentees (15 Mentees)
  console.log('🎒 Creating Mentees...');
  const mentees = [];
  for (let i = 1; i <= 15; i++) {
    const fn = randomChoice(firstNames);
    const ln = randomChoice(lastNames);
    
    const user = await prisma.user.create({
      data: {
        name: `${fn} ${ln}`,
        email: `mentee${i}@example.com`,
        role: 'MENTEE',
        password: defaultPassword,
        isVerified: true,
        profilePicture: `https://i.pravatar.cc/150?u=mentee${i}`,
      }
    });

    const dob = new Date();
    dob.setFullYear(randomInt(1996, 2002));
    dob.setMonth(randomInt(0, 11));

    const profile = await prisma.menteeProfile.create({
      data: {
        userId: user.id,
        username: `${fn.toLowerCase()}_${ln.toLowerCase()}_${randomInt(100,999)}`,
        dateOfBirth: dob,
        contactNumber: `+91 88888${randomInt(10000, 99999)}`,
        education: [
          { type: '10th', institutionName: 'Public School', fromYear: 2012, toYear: 2014, score: randomInt(85, 98) },
          { type: '12th', institutionName: 'Public School', fromYear: 2014, toYear: 2016, score: randomInt(85, 98) },
          { type: 'Graduation', institutionName: randomChoice(ugColleges), fromYear: 2016, toYear: 2020, score: randomInt(7, 9) + (randomInt(0,9)/10) }
        ],
        catHistory: i % 3 === 0 ? { LRDI: randomInt(85, 99), VARC: randomInt(85, 99), Quants: randomInt(85, 99) } : null,
        workExperience: i % 2 === 0 ? `${randomInt(1, 3)}|${randomChoice(companies)}|Analyst` : null,
        skillsets: [randomChoice(['Data Analysis', 'Marketing', 'Finance', 'Coding']), 'Communication'],
      }
    });

    mentees.push({ user, profile });
  }

  // 5. Create Bookings (30 Bookings)
  console.log('📅 Creating Bookings & Payments...');
  for (let i = 1; i <= 30; i++) {
    const menteeObj = randomChoice(mentees);
    const mentorObj = randomChoice(mentors);
    const service = randomChoice(mentorObj.services);

    // 60% completed, 20% confirmed future, 10% payment pending, 10% cancelled
    const r = Math.random();
    let status = 'COMPLETED';
    let startOffsetDays = -randomInt(1, 30);
    
    if (r > 0.9) { status = 'CANCELLED_BY_MENTEE'; startOffsetDays = randomInt(1, 10); }
    else if (r > 0.8) { status = 'PAYMENT_PENDING'; startOffsetDays = randomInt(1, 10); }
    else if (r > 0.6) { status = 'CONFIRMED'; startOffsetDays = randomInt(1, 10); }

    const startTime = new Date(now);
    startTime.setDate(startTime.getDate() + startOffsetDays);
    startTime.setHours(randomInt(10, 18), 0, 0, 0);
    
    const endTime = new Date(startTime);
    endTime.setMinutes(endTime.getMinutes() + service.durationMinutes);

    const booking = await prisma.booking.create({
      data: {
        menteeId: menteeObj.user.id,
        mentorProfileId: mentorObj.profile.id,
        mentorServiceId: service.id,
        startTime,
        endTime,
        status,
        meetingLink: status !== 'PAYMENT_PENDING' ? `https://meet.google.com/xyz-mock-${i}` : null,
        menteePhone: menteeObj.profile.contactNumber,
        discussionTopic: `Help with ${service.title}`,
        cancelledReason: status.includes('CANCELLED') ? 'Schedule conflict' : null,
      }
    });

    // Create payment if not pending
    if (status !== 'PAYMENT_PENDING') {
      const platformFee = service.price * 0.13;
      const mentorAmt = service.price - platformFee;
      
      const payment = await prisma.payment.create({
        data: {
          bookingId: booking.id,
          amount: service.price,
          platformFee,
          mentorAmount: mentorAmt,
          paymentStatus: status.includes('CANCELLED') ? 'REFUNDED' : 'SUCCESS',
          paidAt: new Date(startTime.getTime() - 86400000), // Paid 1 day before
        }
      });

      // If completed, add reviews and feedback
      if (status === 'COMPLETED') {
        await prisma.review.create({
          data: {
            bookingId: booking.id,
            mentorProfileId: mentorObj.profile.id,
            authorId: menteeObj.user.id,
            rating: randomInt(4, 5),
            review: 'Great session! Very helpful insights.',
          }
        });

        await prisma.sessionFeedback.create({
          data: {
            bookingId: booking.id,
            mentorProfileId: mentorObj.profile.id,
            strengths: 'Structured approach',
            weaknesses: 'Need more practice',
            recommendations: 'Solve 2 cases daily.',
          }
        });

        // Add wallet transaction
        const wallet = await prisma.mentorWallet.findUnique({ where: { mentorProfileId: mentorObj.profile.id } });
        if (wallet) {
          await prisma.walletTransaction.create({
            data: {
              walletId: wallet.id,
              bookingId: booking.id,
              type: 'EARNING',
              amount: mentorAmt,
              description: `Earnings from booking ${booking.id.substring(0,6)}`,
              balanceBefore: wallet.availableBalance,
              balanceAfter: wallet.availableBalance + mentorAmt,
            }
          });
        }
      }
    }
  }

  console.log('✅ Database seeded successfully!');
  console.log('----------------------------------------------------');
  console.log('Admin Access: admin@peersupport.com / password123');
  console.log('Mentor Access: mentor1@example.com / password123 (up to 10)');
  console.log('Mentee Access: mentee1@example.com / password123 (up to 15)');
  console.log('----------------------------------------------------');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
