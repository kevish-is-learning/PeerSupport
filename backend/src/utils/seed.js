import { PrismaClient } from '../generated/prisma/index.js';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting comprehensive database seeding...\n');

  // ========================================
  // 1. CATEGORIES
  // ========================================
  console.log('📁 Creating categories...');
  const categories = [
    { name: 'Software Engineering', slug: 'software-engineering', description: 'Full-stack development, algorithms, system design', icon: '💻', color: '#3B82F6', sortOrder: 1 },
    { name: 'Product Management', slug: 'product-management', description: 'Product strategy, roadmaps, user research', icon: '📊', color: '#8B5CF6', sortOrder: 2 },
    { name: 'Data Science', slug: 'data-science', description: 'Machine learning, AI, data analytics', icon: '📈', color: '#10B981', sortOrder: 3 },
    { name: 'Career Counseling', slug: 'career-counseling', description: 'Career guidance, college admissions, resume building', icon: '🎯', color: '#F59E0B', sortOrder: 4 },
    { name: 'Business & Consulting', slug: 'business-consulting', description: 'Strategy, operations, case interviews', icon: '💼', color: '#EF4444', sortOrder: 5 },
    { name: 'Design', slug: 'design', description: 'UI/UX design, product design, design thinking', icon: '🎨', color: '#EC4899', sortOrder: 6 },
  ];

  const createdCategories = [];
  for (const cat of categories) {
    const category = await prisma.category.create({ data: cat });
    createdCategories.push(category);
    console.log(`✅ Category created: ${category.name}`);
  }

  // ========================================
  // 2. BADGES
  // ========================================
  console.log('\n🏅 Creating badges...');
  const badges = [
    { name: 'Verified Mentor', description: 'Completed profile verification', icon: '✓', criteria: 'Submit verification documents and get approved' },
    { name: 'Top Rated', description: 'Maintains 4.8+ rating with 20+ reviews', icon: '⭐', criteria: 'rating >= 4.8 AND reviews >= 20' },
    { name: 'Rising Star', description: 'New mentor with excellent initial reviews', icon: '🌟', criteria: 'rating >= 4.5 AND reviews >= 5 AND tenure < 3 months' },
    { name: 'Mentor Pro', description: 'Completed 50+ sessions', icon: '🎓', criteria: 'completed_sessions >= 50' },
    { name: 'Quick Responder', description: 'Responds within 1 hour on average', icon: '⚡', criteria: 'avg_response_time <= 60 minutes' },
    { name: 'First Session', description: 'Completed first mentoring session', icon: '🎉', criteria: 'completed_sessions >= 1' },
    { name: 'Super Mentor', description: 'Exceptional mentor with 100+ sessions', icon: '🏆', criteria: 'completed_sessions >= 100' },
  ];

  const createdBadges = [];
  for (const badge of badges) {
    const createdBadge = await prisma.badge.create({ data: badge });
    createdBadges.push(createdBadge);
    console.log(`✅ Badge created: ${createdBadge.name}`);
  }

  // ========================================
  // 3. ADMIN USER
  // ========================================
  console.log('\n👤 Creating Admin user...');
  const adminPassword = await bcrypt.hash('asd@asd.com', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'asd@asd.com' },
    update: {},
    create: {
      email: 'admin@peersupport.com',
      password: adminPassword,
      name: 'Admin User',
      role: 'ADMIN',
      isVerified: true,
      isActive: true,
      profilePicture: 'https://ui-avatars.com/api/?name=Admin+User&size=200',
      adminProfile: {
        create: {
          lastLoginAt: new Date(),
        },
      },
    },
  });
  console.log(`✅ Admin created: ${admin.email}`);

  // ========================================
  // 4. MENTOR USERS WITH PROFILES
  // ========================================
  console.log('\n👨‍🏫 Creating Mentor users with profiles...');
  const mentorData = [
    {
      email: 'mentor@mentor.com',
      name: 'John Smith',
      bio: 'Senior Software Engineer with 10+ years experience in full-stack development. Specialized in React, Node.js, and system design. Worked at Google and Microsoft.',
      headline: 'Senior SWE @ Google | Full-Stack Expert',
      expertise: ['JavaScript', 'React', 'Node.js', 'System Design', 'MongoDB', 'AWS', 'Docker'],
      certifications: ['AWS Solutions Architect', 'Google Cloud Professional', 'Meta React Advanced'],
      rating: 4.8,
      totalReviews: 25,
      verificationStatus: 'APPROVED',
      verifiedBadge: true,
      phone: '+91-9876543210',
      gender: 'MALE',
      location: 'Bangalore, India',
      socialLinks: [
        { platform: 'LinkedIn', url: 'https://linkedin.com/in/johnsmith' },
        { platform: 'GitHub', url: 'https://github.com/johnsmith' },
      ],
      verificationIds: [],
      bachelors: ['BTech Computer Science', 'IIT Delhi', '8.9 CGPA', '2011'],
      masters: ['MS Computer Science', 'Stanford University', '3.8 GPA', '2013'],
      workExperience: [
        { company: 'Google', role: 'Senior Software Engineer', startDate: '2018-01', endDate: 'Present', description: 'Leading a team of 8 engineers building cloud infrastructure' },
        { company: 'Microsoft', role: 'Software Engineer', startDate: '2013-07', endDate: '2018-01', description: 'Worked on Azure services and distributed systems' },
      ],
      exams: [],
      balance: 15000,
      totalEarnings: 125000,
      pendingEarnings: 7500,
    },
    {
      email: 'sarah.mentor@example.com',
      name: 'Sarah Johnson',
      bio: 'Product Manager with MBA from IIM-A. Helping aspiring PMs crack interviews and build product thinking skills. Ex-Amazon, currently at Flipkart.',
      headline: 'Senior PM @ Flipkart | Ex-Amazon | IIM-A',
      expertise: ['Product Management', 'Business Strategy', 'Data Analytics', 'Agile', 'Product Design', 'A/B Testing'],
      certifications: ['CSPO', 'PMP', 'Product Management by Duke University'],
      rating: 4.9,
      totalReviews: 42,
      verificationStatus: 'APPROVED',
      verifiedBadge: true,
      phone: '+91-9876543211',
      gender: 'FEMALE',
      location: 'Mumbai, India',
      socialLinks: [
        { platform: 'LinkedIn', url: 'https://linkedin.com/in/sarahjohnson' },
        { platform: 'Twitter', url: 'https://twitter.com/sarahpm' },
      ],
      verificationIds: [],
      bachelors: ['B.Tech', 'IIT Bombay', '9.1 CGPA', '2012'],
      masters: ['MBA', 'IIM Ahmedabad', '3.9 GPA', '2015'],
      workExperience: [
        { company: 'Flipkart', role: 'Senior Product Manager', startDate: '2020-03', endDate: 'Present', description: 'Leading payment products for 100M+ users' },
        { company: 'Amazon', role: 'Product Manager', startDate: '2015-07', endDate: '2020-03', description: 'Worked on Prime and marketplace products' },
      ],
      exams: [{ examName: 'CAT', score: 98.5, year: 2012, percentile: 99.2 }],
      balance: 22000,
      totalEarnings: 180000,
      pendingEarnings: 12000,
    },
    {
      email: 'mike.mentor@example.com',
      name: 'Mike Chen',
      bio: 'Data Scientist at a leading tech company. Expert in ML, AI, and statistical analysis. Published researcher with 15+ papers in AI conferences.',
      headline: 'Lead Data Scientist | ML/AI Expert',
      expertise: ['Python', 'Machine Learning', 'Deep Learning', 'Statistics', 'TensorFlow', 'PyTorch', 'NLP'],
      certifications: ['Google Professional ML Engineer', 'IBM Data Science', 'Deep Learning Specialization'],
      rating: 4.7,
      totalReviews: 18,
      verificationStatus: 'APPROVED',
      verifiedBadge: true,
      phone: '+91-9876543212',
      gender: 'MALE',
      location: 'Hyderabad, India',
      socialLinks: [
        { platform: 'LinkedIn', url: 'https://linkedin.com/in/mikechen' },
        { platform: 'GitHub', url: 'https://github.com/mikechen' },
      ],
      verificationIds: [],
      bachelors: ['BTech', 'IIT Madras', '9.3 CGPA', '2014'],
      masters: ['MS AI', 'Carnegie Mellon University', '3.9 GPA', '2016'],
      workExperience: [
        { company: 'NVIDIA', role: 'Lead Data Scientist', startDate: '2020-01', endDate: 'Present', description: 'Building AI models for autonomous vehicles' },
        { company: 'Facebook', role: 'Data Scientist', startDate: '2016-07', endDate: '2020-01', description: 'Recommendation systems and feed ranking' },
      ],
      exams: [],
      balance: 8500,
      totalEarnings: 72000,
      pendingEarnings: 4000,
    },
    {
      email: 'priya.mentor@example.com',
      name: 'Priya Sharma',
      bio: 'Career counselor with 8 years experience. Helping students with college admissions and career planning. Certified career coach and NLP practitioner.',
      headline: 'Career Coach | College Admissions Expert',
      expertise: ['Career Counseling', 'College Admissions', 'Resume Building', 'Interview Prep', 'MBA Counseling'],
      certifications: ['Certified Career Coach', 'NLP Practitioner', 'ICF Accredited Coach'],
      rating: 4.6,
      totalReviews: 33,
      verificationStatus: 'APPROVED',
      verifiedBadge: true,
      phone: '+91-9876543213',
      gender: 'FEMALE',
      location: 'Delhi, India',
      socialLinks: [
        { platform: 'LinkedIn', url: 'https://linkedin.com/in/priyasharma' },
      ],
      verificationIds: [],
      bachelors: ['BA Psychology', 'Delhi University', '8.5 CGPA', '2011'],
      masters: ['M.Ed Counseling', 'Jamia Millia', '8.8 CGPA', '2013'],
      workExperience: [
        { company: 'Independent Consultant', role: 'Career Counselor', startDate: '2015-06', endDate: 'Present', description: 'Helped 500+ students with career planning' },
        { company: 'Career Launcher', role: 'Counselor', startDate: '2013-07', endDate: '2015-06', description: 'MBA admissions counseling' },
      ],
      exams: [{ examName: 'CAT', score: 95.0, year: 2011, percentile: 98.5 }],
      balance: 12000,
      totalEarnings: 89500,
      pendingEarnings: 4500,
    },
    {
      email: 'david.mentor@example.com',
      name: 'David Kumar',
      bio: 'New mentor specializing in web development. Eager to help beginners start their coding journey. Frontend developer with 3 years experience.',
      headline: 'Frontend Developer | React Specialist',
      expertise: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS'],
      certifications: ['FreeCodeCamp Certified', 'React - The Complete Guide'],
      rating: 4.5,
      totalReviews: 8,
      verificationStatus: 'PENDING',
      verifiedBadge: false,
      phone: '+91-9876543214',
      gender: 'MALE',
      location: 'Pune, India',
      socialLinks: [
        { platform: 'GitHub', url: 'https://github.com/davidkumar' },
      ],
      verificationIds: [],
      bachelors: ['BCA', 'Symbiosis', '7.8 CGPA', '2018'],
      masters: [],
      workExperience: [
        { company: 'TCS', role: 'Frontend Developer', startDate: '2019-07', endDate: 'Present', description: 'Building web applications for clients' },
      ],
      exams: [],
      balance: 5000,
      totalEarnings: 16000,
      pendingEarnings: 3000,
    },
    {
      email: 'anjali.mentor@example.com',
      name: 'Anjali Verma',
      bio: 'UX Designer with a passion for creating delightful user experiences. Worked with startups and enterprises. Teaching design thinking and prototyping.',
      headline: 'Senior UX Designer | Design Mentor',
      expertise: ['UI/UX Design', 'Figma', 'User Research', 'Prototyping', 'Design Thinking', 'Wireframing'],
      certifications: ['Google UX Design Certificate', 'Interaction Design Foundation'],
      rating: 4.7,
      totalReviews: 15,
      verificationStatus: 'APPROVED',
      verifiedBadge: true,
      phone: '+91-9876543215',
      gender: 'FEMALE',
      location: 'Bangalore, India',
      socialLinks: [
        { platform: 'LinkedIn', url: 'https://linkedin.com/in/anjaliverma' },
        { platform: 'Behance', url: 'https://behance.net/anjaliverma' },
      ],
      verificationIds: [],
      bachelors: ['B.Des', 'NID Ahmedabad', '8.6 CGPA', '2015'],
      masters: [],
      workExperience: [
        { company: 'Swiggy', role: 'Senior UX Designer', startDate: '2019-08', endDate: 'Present', description: 'Designing core user flows for food delivery app' },
        { company: 'Razorpay', role: 'UX Designer', startDate: '2016-07', endDate: '2019-08', description: 'Payment flows and merchant dashboard' },
      ],
      exams: [],
      balance: 9500,
      totalEarnings: 45000,
      pendingEarnings: 5400,
    },
  ];

  const mentors = [];
  for (const mentorInfo of mentorData) {
    const password = await bcrypt.hash('mentor@mentor.com', 12);
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
            headline: mentorInfo.headline,
            expertise: mentorInfo.expertise,
            certifications: mentorInfo.certifications,
            pricePerSession: mentorInfo.pricePerSession,
            rating: mentorInfo.rating,
            totalReviews: mentorInfo.totalReviews,
            verificationStatus: mentorInfo.verificationStatus,
            verifiedBadge: mentorInfo.verifiedBadge,
            phone: mentorInfo.phone,
            gender: mentorInfo.gender,
            location: mentorInfo.location,
            socialLinks: mentorInfo.socialLinks,
            verificationIds: mentorInfo.verificationIds || [],
            bachelors: mentorInfo.bachelors,
            masters: mentorInfo.masters,
            workExperience: mentorInfo.workExperience,
            exams: mentorInfo.exams || [],
            balance: mentorInfo.balance,
            totalEarnings: mentorInfo.totalEarnings,
            pendingEarnings: mentorInfo.pendingEarnings,
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
  // 5. USER BADGES FOR MENTORS
  // ========================================
  console.log('\n🏅 Assigning badges to mentors...');
  const userBadgeData = [
    { mentor: mentors[0], badges: [0, 1, 3] }, // John: Verified, Top Rated, Mentor Pro
    { mentor: mentors[1], badges: [0, 1, 3, 6] }, // Sarah: Verified, Top Rated, Mentor Pro, Super Mentor
    { mentor: mentors[2], badges: [0, 5] }, // Mike: Verified, First Session
    { mentor: mentors[3], badges: [0, 3] }, // Priya: Verified, Mentor Pro
    { mentor: mentors[4], badges: [5] }, // David: First Session
    { mentor: mentors[5], badges: [0, 2, 5] }, // Anjali: Verified, Rising Star, First Session
  ];

  for (const { mentor, badges: badgeIndices } of userBadgeData) {
    for (const badgeIndex of badgeIndices) {
      await prisma.userBadge.create({
        data: {
          odlUserId: mentor.id,
          badgeId: createdBadges[badgeIndex].id,
        },
      });
      console.log(`✅ Badge "${createdBadges[badgeIndex].name}" assigned to ${mentor.name}`);
    }
  }

  // ========================================
  // 6. MENTOR RESUMES
  // ========================================
  console.log('\n📄 Creating mentor resumes...');
  for (let i = 0; i < 4; i++) {
    const mentor = mentors[i];
    if (mentor.mentorProfile) {
      await prisma.mentorResume.create({
        data: {
          mentorId: mentor.mentorProfile.id,
          name: `${mentor.name}_Resume.pdf`,
          fileUrl: `https://storage.example.com/mentor-resumes/${mentor.id}_resume.pdf`,
        },
      });
      console.log(`✅ Resume created for mentor ${mentor.name}`);
    }
  }

  // ========================================
  // 7. MENTEE USERS WITH PROFILES
  // ========================================
  console.log('\n👨‍🎓 Creating Mentee users with profiles...');
  const menteeData = [
    {
      email: 'mentee@mentee.com',
      name: 'Alice Williams',
      dob: new Date('2002-05-15'),
      phone: '+91-9876500001',
      location: 'Delhi, India',
      gender: 'FEMALE',
      bachelors: ['BA Economics', 'Delhi University', '8.5 CGPA', '2023'],
      masters: [],
      workExperience: 'Intern at Tech Startup for 6 months - Product Analytics',
      certifications: ['Google Digital Marketing', 'Python for Data Science'],
      catAttempts: [
        { year: 2022, score: 89.5, percentile: 92.5 },
        { year: 2023, score: 92.3, percentile: 94.8 },
      ],
      expectations: 'Looking for guidance on breaking into product management. Want to understand product thinking and prepare for PM interviews.',
      targetColleges: 'IIM A/B/C, ISB, XLRI',
    },
    {
      email: 'bob.student@example.com',
      name: 'Bob Patel',
      dob: new Date('2001-08-22'),
      phone: '+91-9876500002',
      location: 'Mumbai, India',
      gender: 'MALE',
      bachelors: ['BTech CSE', 'IIT Delhi', '8.2 CGPA', '2022'],
      masters: ['MTech AI', 'IIT Bombay', '8.8 CGPA', '2024'],
      workExperience: 'Software Engineer at Amazon - 2 years',
      certifications: ['AWS Solutions Architect', 'Kubernetes', 'Machine Learning Specialization'],
      catAttempts: [],
      expectations: 'Want to transition into ML/AI field. Looking for guidance on research opportunities and career path in AI.',
      targetColleges: 'PhD programs in US',
    },
    {
      email: 'carol.student@example.com',
      name: 'Carol Singh',
      dob: new Date('2003-11-10'),
      phone: '+91-9876500003',
      location: 'Bangalore, India',
      gender: 'FEMALE',
      bachelors: ['BTech CSE', 'BITS Pilani', '7.8 CGPA', '2024'],
      masters: [],
      workExperience: null,
      certifications: ['Full Stack Web Development', 'React Advanced Patterns'],
      catAttempts: [
        { year: 2023, score: 85.0, percentile: 88.0 },
      ],
      expectations: 'Need help with interview preparation and resume building. Want to crack product-based company interviews.',
      targetColleges: null,
    },
    {
      email: 'emma.student@example.com',
      name: 'Emma Desai',
      dob: new Date('2004-02-28'),
      phone: '+91-9876500004',
      location: 'Ahmedabad, India',
      gender: 'FEMALE',
      bachelors: ['BTech ECE', 'VIT Vellore', '8.1 CGPA', '2025'],
      masters: [],
      workExperience: null,
      certifications: [],
      catAttempts: [
        { year: 2023, score: 72.5, percentile: 75.5 },
      ],
      expectations: 'Confused about career path, need guidance on higher education options. Exploring MBA vs MS abroad.',
      targetColleges: 'IIMs for MBA or MS in US universities',
    },
    {
      email: 'frank.student@example.com',
      name: 'Frank Gupta',
      dob: new Date('2002-12-05'),
      phone: '+91-9876500005',
      location: 'Kolkata, India',
      gender: 'MALE',
      bachelors: ['BBA', 'Presidency College', '8.0 CGPA', '2023'],
      masters: [],
      workExperience: 'Business Analyst at Deloitte - 1 year',
      certifications: ['Excel for Business Analytics', 'SQL for Data Analysis'],
      catAttempts: [
        { year: 2022, score: 90.0, percentile: 93.2 },
        { year: 2023, score: 94.5, percentile: 96.5 },
      ],
      expectations: 'Preparing for consulting roles. Need case interview prep and understanding of consulting industry.',
      targetColleges: 'ISB, IIM A/B/C',
    },
    {
      email: 'grace.student@example.com',
      name: 'Grace Reddy',
      dob: new Date('2003-07-18'),
      phone: '+91-9876500006',
      location: 'Hyderabad, India',
      gender: 'FEMALE',
      bachelors: ['B.Des', 'NID', '8.4 CGPA', '2024'],
      masters: [],
      workExperience: null,
      certifications: ['Google UX Design', 'Figma Essentials'],
      catAttempts: [],
      expectations: 'Want to improve my UX design portfolio and learn from industry experts. Looking for design mentorship.',
      targetColleges: null,
    },
  ];

  const mentees = [];
  for (const menteeInfo of menteeData) {
    const password = await bcrypt.hash('mentee@mentee.com', 12);
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
            phone: menteeInfo.phone,
            location: menteeInfo.location,
            gender: menteeInfo.gender,
            bachelors: menteeInfo.bachelors,
            masters: menteeInfo.masters,
            workExperience: menteeInfo.workExperience,
            certifications: menteeInfo.certifications,
            catAttempts: menteeInfo.catAttempts,
            expectations: menteeInfo.expectations,
            targetColleges: menteeInfo.targetColleges,
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
  // 8. MENTEE RESUMES
  // ========================================
  console.log('\n📄 Creating mentee resumes...');
  for (let i = 0; i < mentees.length; i++) {
    if (mentees[i].menteeProfile) {
      const resumeCount = Math.floor(Math.random() * 2) + 1; // 1 or 2 resumes
      for (let j = 0; j < resumeCount; j++) {
        await prisma.menteeResume.create({
          data: {
            menteeId: mentees[i].menteeProfile.id,
            name: `${mentees[i].name}_Resume_v${j + 1}.pdf`,
            fileUrl: `https://storage.example.com/resumes/${mentees[i].id}_resume_v${j + 1}.pdf`,
          },
        });
      }
      console.log(`✅ ${resumeCount} resume(s) created for ${mentees[i].name}`);
    }
  }

  // ========================================
  // 9. MENTOR APPLICATIONS
  // ========================================
  console.log('\n📝 Creating mentor applications...');
  const applicationData = [
    {
      user: mentees[0], // Alice applying to become mentor
      bio: 'Recent graduate looking to mentor students in digital marketing and career planning.',
      headline: 'Digital Marketing & Career Planning',
      phone: '+91-9876500001',
      gender: 'FEMALE',
      location: 'Delhi, India',
      socialLinks: [
        { platform: 'LinkedIn', url: 'https://linkedin.com/in/alicewilliams' },
      ],
      verificationIds: [],
      expertise: ['Digital Marketing', 'Career Planning', 'Communication Skills', 'Content Writing'],
      bachelors: ['BA Economics', 'Delhi University', '8.5 CGPA', '2023'],
      masters: [],
      workExperience: [
        { company: 'Startup XYZ', role: 'Product Analytics Intern', startDate: '2023-01', endDate: '2023-06', description: 'Worked on user analytics and growth metrics' },
      ],
      exams: [{ examName: 'CAT', score: 92.3, year: 2023, percentile: 94.8 }],
      certifications: ['Google Digital Marketing', 'Content Writing'],
      resumes: [
        { name: 'Alice_Resume.pdf', fileUrl: 'https://storage.example.com/applications/alice_resume.pdf' },
      ],
      status: 'PENDING',
    },
    {
      user: mentees[1], // Bob applying to become mentor
      bio: 'Experienced Software Engineer wanting to help students with coding and system design.',
      headline: 'Software Engineer @ Amazon | AI/ML',
      phone: '+91-9876500002',
      gender: 'MALE',
      location: 'Mumbai, India',
      socialLinks: [
        { platform: 'LinkedIn', url: 'https://linkedin.com/in/bobpatel' },
        { platform: 'GitHub', url: 'https://github.com/bobpatel' },
      ],
      verificationIds: [],
      expertise: ['Java', 'Spring Boot', 'Microservices', 'System Design', 'Machine Learning', 'Python'],
      bachelors: ['BTech CSE', 'IIT Delhi', '8.2 CGPA', '2022'],
      masters: ['MTech AI', 'IIT Bombay', '8.8 CGPA', '2024'],
      workExperience: [
        { company: 'Amazon', role: 'Software Engineer', startDate: '2022-07', endDate: 'Present', description: 'Working on recommendation systems and ML models' },
      ],
      exams: [],
      certifications: ['AWS Solutions Architect', 'Oracle Java Certified'],
      resumes: [
        { name: 'Bob_Resume.pdf', fileUrl: 'https://storage.example.com/applications/bob_resume.pdf' },
      ],
      status: 'APPROVED',
      reviewedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      reviewedBy: admin.id,
    },
    {
      user: mentees[2], // Carol's application rejected
      bio: 'Web developer with 1 year experience, passionate about teaching coding fundamentals.',
      headline: 'Frontend Developer',
      phone: '+91-9876500003',
      gender: 'FEMALE',
      location: 'Bangalore, India',
      socialLinks: [
        { platform: 'GitHub', url: 'https://github.com/carolsingh' },
      ],
      verificationIds: [],
      expertise: ['HTML', 'CSS', 'JavaScript', 'React'],
      bachelors: ['BTech CSE', 'BITS Pilani', '7.8 CGPA', '2024'],
      masters: [],
      workExperience: [],
      exams: [],
      certifications: [],
      resumes: [
        { name: 'Carol_Resume.pdf', fileUrl: 'https://storage.example.com/applications/carol_resume.pdf' },
      ],
      status: 'REJECTED',
      rejectionReason: 'Need more professional experience and certifications before becoming a mentor. Please reapply after gaining 2+ years of industry experience.',
      reviewedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      reviewedBy: admin.id,
    },
  ];

  for (const app of applicationData) {
    await prisma.mentorApplication.create({
      data: {
        userId: app.user.id,
        bio: app.bio,
        headline: app.headline,
        phone: app.phone,
        gender: app.gender,
        location: app.location,
        socialLinks: app.socialLinks,
        verificationIds: app.verificationIds || [],
        expertise: app.expertise,
        bachelors: app.bachelors,
        masters: app.masters,
        workExperience: app.workExperience,
        exams: app.exams || [],
        certifications: app.certifications,
        resumes: app.resumes,
        status: app.status,
        rejectionReason: app.rejectionReason,
        reviewedAt: app.reviewedAt,
        reviewedBy: app.reviewedBy,
      },
    });
    console.log(`✅ Application created for ${app.user.name} - Status: ${app.status}`);
  }

  // ========================================
  // 10. SERVICES FOR MENTORS
  // ========================================
  console.log('\n💼 Creating mentor services...');
  const servicesCreated = [];
  
  const serviceTemplates = [
    {
      title: '1-on-1 Career Guidance Session',
      shortDescription: 'Personalized career counseling and roadmap planning',
      longDescription: 'Get expert guidance on your career path, industry insights, and actionable advice tailored to your goals. Perfect for career transitions, growth planning, and strategic decision-making.',
      duration: 60,
      tags: ['Career', 'Counseling', 'Planning'],
      category: 'Career Development',
    },
    {
      title: 'Resume & Profile Review',
      shortDescription: 'Comprehensive review and optimization of your resume',
      longDescription: 'I will thoroughly review your resume, LinkedIn profile, and provide detailed feedback to make them stand out to recruiters and hiring managers.',
      duration: 45,
      tags: ['Resume', 'Profile', 'Review'],
      category: 'Job Preparation',
    },
    {
      title: 'Mock Interview Session',
      shortDescription: 'Practice interviews with real-time feedback',
      longDescription: 'Realistic mock interview experience with immediate feedback on your responses, body language, and communication skills. Includes technical and behavioral rounds.',
      duration: 90,
      tags: ['Interview', 'Preparation', 'Mock'],
      category: 'Interview Prep',
    },
    {
      title: 'Technical Skill Development',
      shortDescription: 'Learn specific technical skills with hands-on guidance',
      longDescription: 'Focused sessions on building technical competencies in your domain. From coding to analytics, get personalized mentorship to accelerate your learning.',
      duration: 120,
      tags: ['Technical', 'Skills', 'Learning'],
      category: 'Skill Development',
    },
    {
      title: 'Quick Doubt Clearing',
      shortDescription: 'Fast answers to your specific questions',
      longDescription: 'Have a quick question or need clarity on a concept? Book this short session for immediate help without booking a full session.',
      duration: 30,
      tags: ['Quick', 'Help', 'Q&A'],
      category: 'Support',
    },
  ];

  for (let mentorIndex = 0; mentorIndex < mentors.length; mentorIndex++) {
    const mentor = mentors[mentorIndex];
    if (!mentor.mentorProfile) continue;

    // Create 2-3 services per mentor
    const numServices = 2 + Math.floor(Math.random() * 2); // 2 or 3 services
    const mentorServices = [];

    for (let i = 0; i < numServices; i++) {
      const template = serviceTemplates[i % serviceTemplates.length];
      const priceMultiplier = 0.8 + (Math.random() * 0.4); // Random price between 80% and 120%
      const basePrice = 1500 + (mentorIndex * 200); // Base price varies by mentor
      const price = Math.round(basePrice * priceMultiplier);

      const service = await prisma.service.create({
        data: {
          mentorId: mentor.mentorProfile.id,
          title: template.title,
          shortDescription: template.shortDescription,
          longDescription: template.longDescription,
          price: price,
          duration: template.duration,
          status: i === 0 ? 'ACTIVE' : (Math.random() > 0.3 ? 'ACTIVE' : 'INACTIVE'), // First service always active
          tags: template.tags,
          category: template.category,
          // Simulate some analytics for active services
          totalBookings: i === 0 ? Math.floor(Math.random() * 50) + 10 : Math.floor(Math.random() * 20),
          totalRevenue: 0, // Will be calculated
          averageRating: 0, // Will be set when reviews are created
          totalReviews: 0,
          viewCount: Math.floor(Math.random() * 500) + 100,
          isPopular: i === 0 && mentorIndex < 3, // First 3 mentors' first service is popular
        },
      });

      // Calculate total revenue based on bookings
      await prisma.service.update({
        where: { id: service.id },
        data: {
          totalRevenue: service.totalBookings * price,
        },
      });

      servicesCreated.push(service);
      mentorServices.push(service);
      console.log(`✅ Service created: "${service.title}" by ${mentor.name} - ₹${price} (${service.status})`);
    }
  }

  // ========================================
  // 11. SERVICE REVIEWS
  // ========================================
  console.log('\n⭐ Creating service reviews...');
  
  const reviewTemplates = [
    { rating: 5, comment: 'Excellent session! Very insightful and helpful. The mentor was well-prepared and answered all my questions thoroughly.' },
    { rating: 5, comment: 'Best mentorship experience I have had. Practical advice and clear guidance on my career path.' },
    { rating: 4, comment: 'Great session, learned a lot. Would have appreciated more time for Q&A but overall very satisfied.' },
    { rating: 5, comment: 'Highly recommended! The mentor is knowledgeable and patient. Got exactly what I needed.' },
    { rating: 4, comment: 'Good session with actionable insights. The feedback was constructive and motivating.' },
    { rating: 5, comment: 'Amazing experience! The mock interview was very realistic and the feedback helped me improve significantly.' },
    { rating: 4, comment: 'Very helpful session. The mentor provided valuable industry insights and practical tips.' },
  ];

  // Create reviews for active services
  let reviewCount = 0;
  for (const service of servicesCreated) {
    if (service.status === 'ACTIVE' && service.totalBookings > 0) {
      // Create 1-3 reviews per active service
      const numReviews = Math.min(3, Math.floor(Math.random() * 3) + 1);
      let totalRating = 0;

      for (let i = 0; i < numReviews; i++) {
        const randomMentee = mentees[Math.floor(Math.random() * mentees.length)];
        const template = reviewTemplates[Math.floor(Math.random() * reviewTemplates.length)];

        const review = await prisma.serviceReview.create({
          data: {
            serviceId: service.id,
            menteeId: randomMentee.id,
            rating: template.rating,
            comment: template.comment,
            isVerified: Math.random() > 0.3, // 70% verified
          },
        });

        totalRating += template.rating;
        reviewCount++;
        console.log(`✅ Review created for service "${service.title}" by ${randomMentee.name} - ${template.rating}⭐`);
      }

      // Update service with average rating and review count
      const averageRating = totalRating / numReviews;
      await prisma.service.update({
        where: { id: service.id },
        data: {
          averageRating: Math.round(averageRating * 10) / 10,
          totalReviews: numReviews,
        },
      });
    }
  }
  console.log(`\n✅ Created ${reviewCount} service reviews in total`);

  // ========================================
  // 12. TRANSACTIONS
  // ========================================
  console.log('\n💸 Creating transaction records...');
  const transactionData = [
    // Earnings transactions (from completed services)
    { mentor: mentors[0], type: 'EARNING', amount: 2125, description: 'Service earnings from mentee', reference: 'service_001' },
    { mentor: mentors[1], type: 'EARNING', amount: 2550, description: 'Service earnings from mentee', reference: 'service_002' },
    { mentor: mentors[1], type: 'EARNING', amount: 2550, description: 'Service earnings from mentee', reference: 'service_003' },
    { mentor: mentors[3], type: 'EARNING', amount: 1275, description: 'Service earnings from mentee', reference: 'service_004' },
    { mentor: mentors[5], type: 'EARNING', amount: 1530, description: 'Service earnings from mentee', reference: 'service_005' },
    
    // Withdrawal transactions
    { mentor: mentors[0], type: 'WITHDRAWAL', amount: -10000, description: 'Withdrawal to bank account', reference: 'withdraw_001' },
    { mentor: mentors[1], type: 'WITHDRAWAL', amount: -15000, description: 'Withdrawal to UPI', reference: 'withdraw_002' },
    
    // Platform fee transactions
    { mentor: mentors[0], type: 'PLATFORM_FEE', amount: -375, description: 'Platform commission (15%)', reference: 'service_001' },
    { mentor: mentors[1], type: 'PLATFORM_FEE', amount: -450, description: 'Platform commission (15%)', reference: 'service_002' },
  ];

  for (const txn of transactionData) {
    const currentBalance = txn.mentor.mentorProfile?.balance || 0;
    await prisma.transaction.create({
      data: {
        mentorId: txn.mentor.mentorProfile?.id || '',
        type: txn.type,
        amount: Math.abs(txn.amount),
        balanceBefore: currentBalance,
        balanceAfter: currentBalance + txn.amount,
        status: 'COMPLETED',
        reference: txn.reference,
        description: txn.description,
      },
    });
    console.log(`✅ Transaction recorded: ${txn.type} - ${txn.mentor.name} - ₹${txn.amount}`);
  }

  // ========================================
  // 13. WITHDRAWALS
  // ========================================
  console.log('\n🏦 Creating withdrawal requests...');
  const withdrawalData = [
    {
      mentor: mentors[0],
      amount: 10000,
      status: 'COMPLETED',
      paymentMethod: 'bank_transfer',
      bankDetails: { accountNumber: '123456789', ifsc: 'HDFC0001234', accountName: 'John Smith', bankName: 'HDFC Bank' },
      processedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      transactionRef: 'TXN123456789',
    },
    {
      mentor: mentors[1],
      amount: 15000,
      status: 'COMPLETED',
      paymentMethod: 'upi',
      upiId: 'sarah@okaxis',
      processedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      transactionRef: 'UPI987654321',
    },
    {
      mentor: mentors[2],
      amount: 5000,
      status: 'PENDING',
      paymentMethod: 'bank_transfer',
      bankDetails: { accountNumber: '987654321', ifsc: 'ICIC0004567', accountName: 'Mike Chen', bankName: 'ICICI Bank' },
    },
    {
      mentor: mentors[3],
      amount: 3000,
      status: 'REJECTED',
      paymentMethod: 'bank_transfer',
      bankDetails: { accountNumber: '456789123', ifsc: 'SBIN0001234', accountName: 'Priya Sharma', bankName: 'SBI' },
      rejectionReason: 'Insufficient balance in account',
    },
  ];

  for (const withdrawal of withdrawalData) {
    await prisma.withdrawal.create({
      data: {
        mentorId: withdrawal.mentor.mentorProfile?.id || '',
        amount: withdrawal.amount,
        status: withdrawal.status,
        paymentMethod: withdrawal.paymentMethod,
        bankDetails: withdrawal.bankDetails,
        upiId: withdrawal.upiId,
        processedAt: withdrawal.processedAt,
        rejectionReason: withdrawal.rejectionReason,
        transactionRef: withdrawal.transactionRef,
      },
    });
    console.log(`✅ Withdrawal created for ${withdrawal.mentor.name}: ₹${withdrawal.amount} - ${withdrawal.status}`);
  }

  // ========================================
  // 14. PAYOUTS (Admin-initiated)
  // ========================================
  console.log('\n💰 Creating admin-initiated payouts...');
  const payoutData = [
    {
      mentor: mentors[1],
      amount: 20000,
      status: 'COMPLETED',
      paymentMethod: 'bank_transfer',
      processedBy: admin.id,
      processedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      transactionRef: 'PAYOUT_TXN_001',
    },
    {
      mentor: mentors[0],
      amount: 15000,
      status: 'PROCESSING',
      paymentMethod: 'razorpay',
      processedBy: admin.id,
      metadata: { razorpayBatchId: 'batch_123456' },
    },
    {
      mentor: mentors[4],
      amount: 5000,
      status: 'FAILED',
      paymentMethod: 'bank_transfer',
      processedBy: admin.id,
      processedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      failureReason: 'Invalid bank account details',
    },
  ];

  for (const payout of payoutData) {
    await prisma.payout.create({
      data: {
        mentorId: payout.mentor.mentorProfile?.id || '',
        amount: payout.amount,
        status: payout.status,
        paymentMethod: payout.paymentMethod,
        processedBy: payout.processedBy,
        processedAt: payout.processedAt,
        failureReason: payout.failureReason,
        transactionRef: payout.transactionRef,
        metadata: payout.metadata,
      },
    });
    console.log(`✅ Payout created for ${payout.mentor.name}: ₹${payout.amount} - ${payout.status}`);
  }

  // ========================================
  // 15. WEBINARS
  // ========================================
  console.log('\n🎓 Creating webinars...');
  const webinarData = [
    {
      title: 'Breaking into Product Management',
      description: 'Learn the fundamentals of product management and how to crack PM interviews at top companies. Topics include product thinking, case studies, and interview strategies.',
      price: 499,
      type: 'PAID',
      startTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      duration: 2, // hours
    },
    {
      title: 'Introduction to Machine Learning',
      description: 'Free webinar covering basics of ML, popular algorithms, and getting started with your first ML project. Perfect for beginners!',
      price: null,
      type: 'FREE',
      startTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
      duration: 1.5,
    },
    {
      title: 'Resume Building Workshop',
      description: 'Learn how to create a standout resume that gets you interviews at top companies. Includes live resume reviews and templates.',
      price: 299,
      type: 'PAID',
      startTime: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
      duration: 1,
    },
    {
      title: 'System Design Masterclass',
      description: 'Deep dive into system design concepts with real-world examples. Learn how to ace system design interviews.',
      price: 999,
      type: 'PAID',
      startTime: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      duration: 3,
    },
    {
      title: 'Career Paths in Tech',
      description: 'Free webinar exploring different career paths in technology - SWE, PM, Design, Data Science, and more.',
      price: null,
      type: 'FREE',
      startTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
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
  // 21. WEBINAR REGISTRATIONS
  // ========================================
  console.log('\n📝 Creating webinar registrations...');
  const registrations = [
    { webinar: webinars[0], user: mentees[0], paid: true },
    { webinar: webinars[0], user: mentees[1], paid: true },
    { webinar: webinars[0], user: mentees[4], paid: true },
    { webinar: webinars[1], user: mentees[0], paid: false },
    { webinar: webinars[1], user: mentees[2], paid: false },
    { webinar: webinars[1], user: mentees[3], paid: false },
    { webinar: webinars[1], user: mentees[5], paid: false },
    { webinar: webinars[2], user: mentees[2], paid: true },
    { webinar: webinars[2], user: mentees[3], paid: true },
    { webinar: webinars[3], user: mentees[1], paid: true },
    { webinar: webinars[3], user: mentees[4], paid: true },
    { webinar: webinars[4], user: mentees[3], paid: false },
    { webinar: webinars[4], user: mentees[5], paid: false },
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
  // 22. VERIFICATION DOCUMENTS
  // ========================================
  console.log('\n📋 Creating verification documents...');
  for (let i = 0; i < mentors.length; i++) {
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
  console.log('\n' + '='.repeat(60));
  console.log('🎉 DATABASE SEEDING COMPLETED SUCCESSFULLY!');
  console.log('='.repeat(60));
  
  const counts = await Promise.all([
    prisma.user.count(),
    prisma.mentorProfile.count(),
    prisma.menteeProfile.count(),
    prisma.adminProfile.count(),
    prisma.category.count(),
    prisma.badge.count(),
    prisma.userBadge.count(),
    prisma.mentorApplication.count(),
    prisma.slot.count(),
    prisma.booking.count(),
    prisma.payment.count(),
    prisma.review.count(),
    prisma.earnings.count(),
    prisma.mentorFeedback.count(),
    prisma.transaction.count(),
    prisma.withdrawal.count(),
    prisma.payout.count(),
    prisma.incentive.count(),
    prisma.webinar.count(),
    prisma.webinarRegistration.count(),
    prisma.verificationDocument.count(),
    prisma.menteeResume.count(),
    prisma.mentorResume.count(),
  ]);

  console.log('\n📊 Comprehensive Summary:');
  console.log('────────────────────────────────────────────────────────────');
  console.log(`   👥 Users: ${counts[0]} (1 Admin, ${counts[1]} Mentors, ${counts[2]} Mentees)`);
  console.log(`   📁 Categories: ${counts[4]}`);
  console.log(`   🏅 Badges: ${counts[5]} (${counts[6]} assigned to users)`);
  console.log(`   📝 Mentor Applications: ${counts[7]}`);
  console.log(`   📅 Available Slots: ${counts[8]}`);
  console.log(`   📦 Bookings: ${counts[9]}`);
  console.log(`   💳 Payments: ${counts[10]}`);
  console.log(`   ⭐ Reviews: ${counts[11]}`);
  console.log(`   💰 Earnings Records: ${counts[12]}`);
  console.log(`   📝 Mentor Feedback: ${counts[13]}`);
  console.log(`   💸 Transactions: ${counts[14]}`);
  console.log(`   🏦 Withdrawals: ${counts[15]}`);
  console.log(`   💵 Payouts: ${counts[16]}`);
  console.log(`   🎁 Incentives: ${counts[17]}`);
  console.log(`   🎓 Webinars: ${counts[18]}`);
  console.log(`   📋 Webinar Registrations: ${counts[19]}`);
  console.log(`   � Verification Documents: ${counts[20]}`);
  console.log(`   📑 Resumes: ${counts[21]} mentee + ${counts[22]} mentor`);
  console.log('────────────────────────────────────────────────────────────');
  
  console.log('\n🔑 Login Credentials:');
  console.log('   ┌─────────────────────────────────────────────────────┐');
  console.log('   │ Admin:  admin@peersupport.com / Admin@123          │');
  console.log('   │ Mentor: john.mentor@example.com / Mentor@123       │');
  console.log('   │         sarah.mentor@example.com / Mentor@123      │');
  console.log('   │ Mentee: alice.student@example.com / Mentee@123     │');
  console.log('   │         bob.student@example.com / Mentee@123       │');
  console.log('   └─────────────────────────────────────────────────────┘');
  
  console.log('\n✨ All done! Database is fully populated and ready for use.');
  console.log('   • 6 Mentors with complete profiles and slots');
  console.log('   • 6 Mentees with education and work experience');
  console.log('   • Multiple bookings in various states');
  console.log('   • Financial transactions, earnings, and withdrawals');
  console.log('   • Incentives, badges, and gamification data');
  console.log('   • Webinars with registrations');
  console.log('');
}

main()
  .catch((e) => {
    console.error('\n❌ Seed failed with error:');
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
