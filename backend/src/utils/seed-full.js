import { PrismaClient } from '../generated/prisma/index.js';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting comprehensive database seeding...\n');

  // ========================================
  // 1. ADMIN USER
  // ========================================
  console.log('👤 Creating Admin user...');
  const adminPassword = await bcrypt.hash('Admin@123', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@peersupport.com' },
    update: {},
    create: {
      email: 'admin@peersupport.com',
      password: adminPassword,
      name: 'Admin User',
      role: 'ADMIN',
      isVerified: true,
      isActive: true,
      adminProfile: {
        create: {
          lastLoginAt: new Date(),
        },
      },
    },
  });
  console.log(`✅ Admin created: ${admin.email}`);

  // ========================================
  // 2. MENTOR USERS WITH PROFILES
  // ========================================
  console.log('\n👨‍🏫 Creating Mentor users with profiles...');
  const mentorData = [
    {
      email: 'john.mentor@example.com',
      name: 'John Smith',
      bio: 'Senior Software Engineer with 10+ years experience in full-stack development. Specialized in React, Node.js, and system design.',
      expertise: ['JavaScript', 'React', 'Node.js', 'System Design', 'MongoDB'],
      certifications: ['AWS Solutions Architect', 'Google Cloud Professional'],
      pricePerSession: 2500,
      rating: 4.8,
      totalReviews: 25,
      verifiedBadge: true,
    },
    {
      email: 'sarah.mentor@example.com',
      name: 'Sarah Johnson',
      bio: 'Product Manager with MBA from IIM-A. Helping aspiring PMs crack interviews and build product thinking skills.',
      expertise: ['Product Management', 'Business Strategy', 'Data Analytics', 'Agile'],
      certifications: ['CSPO', 'PMP'],
      pricePerSession: 3000,
      rating: 4.9,
      totalReviews: 42,
      verifiedBadge: true,
    },
    {
      email: 'mike.mentor@example.com',
      name: 'Mike Chen',
      bio: 'Data Scientist at a leading tech company. Expert in ML, AI, and statistical analysis.',
      expertise: ['Python', 'Machine Learning', 'Deep Learning', 'Statistics', 'TensorFlow'],
      certifications: ['Google Professional ML Engineer', 'IBM Data Science'],
      pricePerSession: 2000,
      rating: 4.7,
      totalReviews: 18,
      verifiedBadge: true,
    },
    {
      email: 'priya.mentor@example.com',
      name: 'Priya Sharma',
      bio: 'Career counselor with 8 years experience. Helping students with college admissions and career planning.',
      expertise: ['Career Counseling', 'College Admissions', 'Resume Building', 'Interview Prep'],
      certifications: ['Certified Career Coach', 'NLP Practitioner'],
      pricePerSession: 1500,
      rating: 4.6,
      totalReviews: 33,
      verifiedBadge: true,
    },
    {
      email: 'david.mentor@example.com',
      name: 'David Kumar',
      bio: 'New mentor specializing in web development. Eager to help beginners start their coding journey.',
      expertise: ['HTML', 'CSS', 'JavaScript', 'React'],
      certifications: ['FreeCodeCamp Certified'],
      pricePerSession: 1000,
      rating: 0,
      totalReviews: 0,
      verifiedBadge: false,
    },
  ];

  const mentors = [];
  for (const mentorInfo of mentorData) {
    const password = await bcrypt.hash('Mentor@123', 12);
    const mentor = await prisma.user.create({
      data: {
        email: mentorInfo.email,
        password,
        name: mentorInfo.name,
        role: 'MENTOR',
        isVerified: true,
        isActive: true,
        profilePicture: `https://ui-avatars.com/api/?name=${encodeURIComponent(mentorInfo.name)}&size=200`,
        mentorProfile: {
          create: {
            bio: mentorInfo.bio,
            expertise: mentorInfo.expertise,
            certifications: mentorInfo.certifications,
            pricePerSession: mentorInfo.pricePerSession,
            rating: mentorInfo.rating,
            totalReviews: mentorInfo.totalReviews,
            verifiedBadge: mentorInfo.verifiedBadge,
          },
        },
      },
      include: {
        mentorProfile: true,
      },
    });
    mentors.push(mentor);
    console.log(`✅ Mentor created: ${mentor.name}`);
  }

  // ========================================
  // 3. MENTEE USERS WITH PROFILES
  // ========================================
  console.log('\n👨‍🎓 Creating Mentee users with profiles...');
  const menteeData = [
    {
      email: 'alice.student@example.com',
      name: 'Alice Williams',
      dob: new Date('2002-05-15'),
      education10th: ['St. Mary High School', '92%', '2017'],
      education12th: ['Delhi Public School', '88%', '2019'],
      bachelors: ['Delhi University', '8.5 CGPA', '2023'],
      masters: [],
      workExperience: 'Intern at Tech Startup for 6 months',
      certifications: ['Google Digital Marketing', 'Python for Data Science'],
      catScore: 92.5,
      expectations: 'Looking for guidance on breaking into product management',
    },
    {
      email: 'bob.student@example.com',
      name: 'Bob Patel',
      dob: new Date('2001-08-22'),
      education10th: ['KV School', '85%', '2016'],
      education12th: ['National Public School', '82%', '2018'],
      bachelors: ['IIT Delhi', '8.2 CGPA', '2022'],
      masters: ['IIT Bombay', '8.8 CGPA', '2024'],
      workExperience: 'Software Engineer at Amazon - 2 years',
      certifications: ['AWS Solutions Architect', 'Kubernetes'],
      catScore: null,
      expectations: 'Want to transition into ML/AI field',
    },
    {
      email: 'carol.student@example.com',
      name: 'Carol Singh',
      dob: new Date('2003-11-10'),
      education10th: ['Modern School', '90%', '2018'],
      education12th: ['Ryan International', '85%', '2020'],
      bachelors: ['BITS Pilani', '7.8 CGPA', '2024'],
      masters: [],
      workExperience: null,
      certifications: ['Full Stack Web Development'],
      catScore: 88.0,
      expectations: 'Need help with interview preparation and resume building',
    },
    {
      email: 'emma.student@example.com',
      name: 'Emma Desai',
      dob: new Date('2004-02-28'),
      education10th: ['Convent School', '88%', '2019'],
      education12th: ['Cambridge School', '90%', '2021'],
      bachelors: ['Pursuing at VIT', '8.1 CGPA', '2025'],
      masters: [],
      workExperience: null,
      certifications: [],
      catScore: 75.5,
      expectations: 'Confused about career path, need guidance on higher education options',
    },
  ];

  const mentees = [];
  for (const menteeInfo of menteeData) {
    const password = await bcrypt.hash('Mentee@123', 12);
    const mentee = await prisma.user.create({
      data: {
        email: menteeInfo.email,
        password,
        name: menteeInfo.name,
        role: 'MENTEE',
        isVerified: true,
        isActive: true,
        profilePicture: `https://ui-avatars.com/api/?name=${encodeURIComponent(menteeInfo.name)}&size=200`,
        menteeProfile: {
          create: {
            dob: menteeInfo.dob,
            education10th: menteeInfo.education10th,
            education12th: menteeInfo.education12th,
            bachelors: menteeInfo.bachelors,
            masters: menteeInfo.masters,
            workExperience: menteeInfo.workExperience,
            certifications: menteeInfo.certifications,
            catScore: menteeInfo.catScore,
            expectations: menteeInfo.expectations,
          },
        },
      },
      include: {
        menteeProfile: true,
      },
    });
    mentees.push(mentee);
    console.log(`✅ Mentee created: ${mentee.name}`);
  }

  // ========================================
  // 4. RESUMES FOR MENTEES
  // ========================================
  console.log('\n📄 Creating resumes...');
  for (let i = 0; i < mentees.length; i++) {
    if (mentees[i].menteeProfile) {
      await prisma.resume.create({
        data: {
          menteeId: mentees[i].menteeProfile.id,
          name: `${mentees[i].name}_Resume_v${i + 1}.pdf`,
          fileUrl: `https://storage.example.com/resumes/${mentees[i].id}_resume.pdf`,
        },
      });
      console.log(`✅ Resume created for ${mentees[i].name}`);
    }
  }

  // ========================================
  // 5. MENTOR APPLICATIONS
  // ========================================
  console.log('\n📝 Creating mentor applications...');
  const applicationData = [
    {
      user: mentees[0], // Alice applying to become mentor
      bio: 'Recent graduate looking to mentor students in digital marketing and career planning.',
      expertise: ['Digital Marketing', 'Career Planning', 'Communication Skills'],
      certifications: ['Google Digital Marketing', 'Content Writing'],
      pricePerSession: 800,
      status: 'PENDING',
    },
    {
      user: mentees[1], // Bob applying to become mentor
      bio: 'Experienced Software Engineer wanting to help students with coding and system design.',
      expertise: ['Java', 'Spring Boot', 'Microservices', 'System Design'],
      certifications: ['AWS Solutions Architect', 'Oracle Java Certified'],
      pricePerSession: 1800,
      status: 'APPROVED',
      reviewedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
    {
      user: mentees[2], // Carol's application rejected
      bio: 'Web developer with 1 year experience.',
      expertise: ['HTML', 'CSS', 'JavaScript'],
      certifications: [],
      pricePerSession: 500,
      status: 'REJECTED',
      rejectionReason: 'Need more experience and certifications before becoming a mentor.',
      reviewedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    },
  ];

  for (const app of applicationData) {
    await prisma.mentorApplication.create({
      data: {
        userId: app.user.id,
        bio: app.bio,
        expertise: app.expertise,
        certifications: app.certifications,
        pricePerSession: app.pricePerSession,
        status: app.status,
        rejectionReason: app.rejectionReason,
        reviewedAt: app.reviewedAt,
      },
    });
    console.log(`✅ Application created for ${app.user.name} - Status: ${app.status}`);
  }

  // ========================================
  // 6. SLOTS FOR MENTORS
  // ========================================
  console.log('\n📅 Creating mentor slots...');
  const slotsCreated = [];
  
  // Create slots for first 3 approved mentors
  for (let mentorIndex = 0; mentorIndex < 3; mentorIndex++) {
    const mentor = mentors[mentorIndex];
    if (!mentor.mentorProfile) continue;

    // Create 10 slots for each mentor (mix of available, booked, blocked)
    for (let day = 0; day < 5; day++) {
      const date = new Date();
      date.setDate(date.getDate() + day);
      
      // Morning slot
      const morningStart = new Date(date);
      morningStart.setHours(10, 0, 0, 0);
      const morningEnd = new Date(date);
      morningEnd.setHours(11, 0, 0, 0);

      const morningSlot = await prisma.slot.create({
        data: {
          mentorId: mentor.mentorProfile.id,
          startTime: morningStart,
          endTime: morningEnd,
          status: day === 0 ? 'BOOKED' : 'AVAILABLE',
        },
      });
      slotsCreated.push(morningSlot);

      // Evening slot
      const eveningStart = new Date(date);
      eveningStart.setHours(18, 0, 0, 0);
      const eveningEnd = new Date(date);
      eveningEnd.setHours(19, 0, 0, 0);

      const eveningSlot = await prisma.slot.create({
        data: {
          mentorId: mentor.mentorProfile.id,
          startTime: eveningStart,
          endTime: eveningEnd,
          status: day === 4 ? 'BLOCKED' : 'AVAILABLE',
        },
      });
      slotsCreated.push(eveningSlot);
    }
    console.log(`✅ Created 10 slots for ${mentor.name}`);
  }

  // ========================================
  // 7. BOOKINGS
  // ========================================
  console.log('\n📦 Creating bookings...');
  const bookingsData = [
    {
      mentor: mentors[0],
      mentee: mentees[0],
      slotIndex: 0, // First available booked slot
      status: 'CONFIRMED',
      sessionMode: 'VIDEO',
      purpose: 'Career guidance and resume review',
      meetingLink: 'https://meet.google.com/abc-defg-hij',
    },
    {
      mentor: mentors[1],
      mentee: mentees[1],
      slotIndex: 10, // Second mentor's first slot
      status: 'COMPLETED',
      sessionMode: 'VIDEO',
      purpose: 'Product management interview preparation',
      meetingLink: 'https://zoom.us/j/123456789',
    },
    {
      mentor: mentors[2],
      mentee: mentees[2],
      slotIndex: 20, // Third mentor's first slot
      status: 'PENDING',
      sessionMode: 'CHAT',
      purpose: 'Quick doubt clearing session',
      meetingLink: null,
    },
  ];

  const bookings = [];
  for (const bookingData of bookingsData) {
    const slot = slotsCreated[bookingData.slotIndex];
    if (!slot) continue;

    const booking = await prisma.booking.create({
      data: {
        mentorId: bookingData.mentor.id,
        menteeId: bookingData.mentee.id,
        slotId: slot.id,
        status: bookingData.status,
        sessionMode: bookingData.sessionMode,
        sessionType: 'ONE_ON_ONE',
        purpose: bookingData.purpose,
        meetingLink: bookingData.meetingLink,
      },
    });
    bookings.push(booking);
    console.log(`✅ Booking created: ${bookingData.mentee.name} → ${bookingData.mentor.name}`);
  }

  // ========================================
  // 8. PAYMENTS
  // ========================================
  console.log('\n💳 Creating payments...');
  for (let i = 0; i < bookings.length; i++) {
    const booking = bookings[i];
    const mentor = i === 0 ? mentors[0] : i === 1 ? mentors[1] : mentors[2];
    
    await prisma.payment.create({
      data: {
        bookingId: booking.id,
        razorpayOrderId: `order_${Math.random().toString(36).substring(7).toUpperCase()}`,
        razorpayPaymentId: booking.status === 'COMPLETED' || booking.status === 'CONFIRMED' 
          ? `pay_${Math.random().toString(36).substring(7).toUpperCase()}` 
          : null,
        amount: mentor.mentorProfile?.pricePerSession || 1500,
        currency: 'INR',
        status: booking.status === 'COMPLETED' ? 'SUCCESS' : 
                booking.status === 'CONFIRMED' ? 'SUCCESS' : 'CREATED',
      },
    });
    console.log(`✅ Payment created for booking ${i + 1}`);
  }

  // ========================================
  // 9. REVIEWS
  // ========================================
  console.log('\n⭐ Creating reviews...');
  // Only for completed bookings
  const completedBooking = bookings.find(b => b.status === 'COMPLETED');
  if (completedBooking) {
    await prisma.review.create({
      data: {
        bookingId: completedBooking.id,
        rating: 5,
        comment: 'Excellent session! Sarah is very knowledgeable and helped me prepare for my PM interviews. Highly recommended!',
      },
    });
    console.log('✅ Review created for completed booking');
  }

  // ========================================
  // 10. EARNINGS
  // ========================================
  console.log('\n💰 Creating earnings records...');
  for (let i = 0; i < bookings.length; i++) {
    const booking = bookings[i];
    if (booking.status === 'COMPLETED' || booking.status === 'CONFIRMED') {
      const mentor = i === 0 ? mentors[0] : i === 1 ? mentors[1] : mentors[2];
      
      await prisma.earnings.create({
        data: {
          mentorId: mentor.mentorProfile?.id || '',
          bookingId: booking.id,
          amount: mentor.mentorProfile?.pricePerSession || 0,
        },
      });
      console.log(`✅ Earnings recorded for booking ${i + 1}`);
    }
  }

  // ========================================
  // 11. MENTOR FEEDBACK
  // ========================================
  console.log('\n📝 Creating mentor feedback...');
  if (completedBooking) {
    const mentor = mentors[1];
    await prisma.mentorFeedback.create({
      data: {
        mentorId: mentor.mentorProfile?.id || '',
        bookingId: completedBooking.id,
        feedbackPdfUrl: `https://storage.example.com/feedback/${completedBooking.id}_feedback.pdf`,
      },
    });
    console.log('✅ Mentor feedback created');
  }

  // ========================================
  // 12. WEBINARS
  // ========================================
  console.log('\n🎓 Creating webinars...');
  const webinarData = [
    {
      title: 'Breaking into Product Management',
      description: 'Learn the fundamentals of product management and how to crack PM interviews at top companies.',
      price: 499,
      type: 'PAID',
      startTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      duration: 2, // hours
    },
    {
      title: 'Introduction to Machine Learning',
      description: 'Free webinar covering basics of ML, popular algorithms, and getting started with your first ML project.',
      price: null,
      type: 'FREE',
      startTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
      duration: 1.5,
    },
    {
      title: 'Resume Building Workshop',
      description: 'Learn how to create a standout resume that gets you interviews at top companies.',
      price: 299,
      type: 'PAID',
      startTime: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
      duration: 1,
    },
  ];

  const webinars = [];
  for (const webinarInfo of webinarData) {
    const startTime = webinarInfo.startTime;
    const endTime = new Date(startTime.getTime() + webinarInfo.duration * 60 * 60 * 1000);
    
    const webinar = await prisma.webinar.create({
      data: {
        title: webinarInfo.title,
        description: webinarInfo.description,
        price: webinarInfo.price,
        type: webinarInfo.type,
        startTime,
        endTime,
        meetingLink: `https://zoom.us/j/${Math.floor(Math.random() * 1000000000)}`,
      },
    });
    webinars.push(webinar);
    console.log(`✅ Webinar created: ${webinar.title}`);
  }

  // ========================================
  // 13. WEBINAR REGISTRATIONS
  // ========================================
  console.log('\n📝 Creating webinar registrations...');
  // Register mentees for various webinars
  const registrations = [
    { webinar: webinars[0], user: mentees[0], paid: true },
    { webinar: webinars[0], user: mentees[1], paid: true },
    { webinar: webinars[1], user: mentees[0], paid: false },
    { webinar: webinars[1], user: mentees[2], paid: false },
    { webinar: webinars[1], user: mentees[3], paid: false },
    { webinar: webinars[2], user: mentees[2], paid: true },
  ];

  for (const reg of registrations) {
    await prisma.webinarRegistration.create({
      data: {
        webinarId: reg.webinar.id,
        userId: reg.user.id,
        paymentId: reg.paid ? `pay_webinar_${Math.random().toString(36).substring(7)}` : null,
      },
    });
    console.log(`✅ ${reg.user.name} registered for "${reg.webinar.title}"`);
  }

  // ========================================
  // 14. NOTIFICATIONS
  // ========================================
  console.log('\n🔔 Creating notifications...');
  const notificationData = [
    { user: mentees[0], title: 'Booking Confirmed', message: 'Your session with John Smith has been confirmed for tomorrow at 10 AM.', isRead: false },
    { user: mentees[0], title: 'New Webinar Available', message: 'Check out the new webinar on Breaking into Product Management.', isRead: true },
    { user: mentees[1], title: 'Session Completed', message: 'Your session with Sarah Johnson is complete. Please leave a review!', isRead: false },
    { user: mentors[0], title: 'New Booking Request', message: 'Alice Williams has booked a session with you.', isRead: true },
    { user: mentors[1], title: 'Payment Received', message: 'You received ₹3000 for your completed session.', isRead: false },
    { user: admin, title: 'New Mentor Application', message: 'Alice Williams has applied to become a mentor. Please review.', isRead: false },
  ];

  for (const notif of notificationData) {
    await prisma.notification.create({
      data: {
        userId: notif.user.id,
        title: notif.title,
        message: notif.message,
        isRead: notif.isRead,
      },
    });
    console.log(`✅ Notification created for ${notif.user.name}`);
  }

  // ========================================
  // 15. VERIFICATION DOCUMENTS
  // ========================================
  console.log('\n📋 Creating verification documents...');
  // Create verification docs for mentors
  for (let i = 0; i < 4; i++) {
    const mentor = mentors[i];
    await prisma.verificationDocument.create({
      data: {
        userId: mentor.id,
        documentUrl: `https://storage.example.com/verifications/${mentor.id}_certificate.pdf`,
        status: mentor.mentorProfile?.verificationStatus || 'PENDING',
      },
    });
    console.log(`✅ Verification document created for ${mentor.name}`);
  }

  // ========================================
  // SUMMARY
  // ========================================
  console.log('\n' + '='.repeat(50));
  console.log('🎉 DATABASE SEEDING COMPLETED SUCCESSFULLY!');
  console.log('='.repeat(50));
  
  const counts = await Promise.all([
    prisma.user.count(),
    prisma.mentorProfile.count(),
    prisma.menteeProfile.count(),
    prisma.adminProfile.count(),
    prisma.mentorApplication.count(),
    prisma.slot.count(),
    prisma.booking.count(),
    prisma.payment.count(),
    prisma.review.count(),
    prisma.earnings.count(),
    prisma.mentorFeedback.count(),
    prisma.webinar.count(),
    prisma.webinarRegistration.count(),
    prisma.notification.count(),
    prisma.verificationDocument.count(),
    prisma.resume.count(),
  ]);

  console.log('\n📊 Summary:');
  console.log(`   • Users: ${counts[0]} (1 Admin, ${counts[1]} Mentors, ${counts[2]} Mentees)`);
  console.log(`   • Mentor Applications: ${counts[4]}`);
  console.log(`   • Slots: ${counts[5]}`);
  console.log(`   • Bookings: ${counts[6]}`);
  console.log(`   • Payments: ${counts[7]}`);
  console.log(`   • Reviews: ${counts[8]}`);
  console.log(`   • Earnings: ${counts[9]}`);
  console.log(`   • Mentor Feedback: ${counts[10]}`);
  console.log(`   • Webinars: ${counts[11]}`);
  console.log(`   • Webinar Registrations: ${counts[12]}`);
  console.log(`   • Notifications: ${counts[13]}`);
  console.log(`   • Verification Documents: ${counts[14]}`);
  console.log(`   • Resumes: ${counts[15]}`);
  
  console.log('\n🔑 Login Credentials:');
  console.log('   Admin:  admin@peersupport.com / Admin@123');
  console.log('   Mentor: john.mentor@example.com / Mentor@123');
  console.log('   Mentee: alice.student@example.com / Mentee@123');
  console.log('\n✨ All done! Database is ready for use.\n');
}

main()
  .catch((e) => {
    console.error('\n❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
