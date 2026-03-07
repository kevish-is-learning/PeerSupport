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
      pricePerSession: 2500,
      rating: 4.8,
      totalReviews: 25,
      verificationStatus: 'APPROVED',
      verifiedBadge: true,
      phone: '+91-9876543210',
      location: 'Bangalore, India',
      socialLinks: [
        { platform: 'LinkedIn', url: 'https://linkedin.com/in/johnsmith' },
        { platform: 'GitHub', url: 'https://github.com/johnsmith' },
      ],
      education10th: ['St. Joseph School', '95%', '2005'],
      education12th: ['Delhi Public School', '92%', '2007'],
      bachelors: ['BTech Computer Science', 'IIT Delhi', '8.9 CGPA', '2011'],
      masters: ['MS Computer Science', 'Stanford University', '3.8 GPA', '2013'],
      workExperience: [
        { company: 'Google', role: 'Senior Software Engineer', startDate: '2018-01', endDate: 'Present', description: 'Leading a team of 8 engineers building cloud infrastructure' },
        { company: 'Microsoft', role: 'Software Engineer', startDate: '2013-07', endDate: '2018-01', description: 'Worked on Azure services and distributed systems' },
      ],
      catScore: null,
      catYear: null,
      catPercentile: null,
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
      pricePerSession: 3000,
      rating: 4.9,
      totalReviews: 42,
      verificationStatus: 'APPROVED',
      verifiedBadge: true,
      phone: '+91-9876543211',
      location: 'Mumbai, India',
      socialLinks: [
        { platform: 'LinkedIn', url: 'https://linkedin.com/in/sarahjohnson' },
        { platform: 'Twitter', url: 'https://twitter.com/sarahpm' },
      ],
      education10th: ['Carmel Convent', '94%', '2006'],
      education12th: ['St. Xavier College', '91%', '2008'],
      bachelors: ['B.Tech', 'IIT Bombay', '9.1 CGPA', '2012'],
      masters: ['MBA', 'IIM Ahmedabad', '3.9 GPA', '2015'],
      workExperience: [
        { company: 'Flipkart', role: 'Senior Product Manager', startDate: '2020-03', endDate: 'Present', description: 'Leading payment products for 100M+ users' },
        { company: 'Amazon', role: 'Product Manager', startDate: '2015-07', endDate: '2020-03', description: 'Worked on Prime and marketplace products' },
      ],
      catScore: 98.5,
      catYear: 2012,
      catPercentile: 99.2,
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
      pricePerSession: 2000,
      rating: 4.7,
      totalReviews: 18,
      verificationStatus: 'APPROVED',
      verifiedBadge: true,
      phone: '+91-9876543212',
      location: 'Hyderabad, India',
      socialLinks: [
        { platform: 'LinkedIn', url: 'https://linkedin.com/in/mikechen' },
        { platform: 'GitHub', url: 'https://github.com/mikechen' },
      ],
      education10th: ['International School', '96%', '2008'],
      education12th: ['DPS RK Puram', '93%', '2010'],
      bachelors: ['BTech', 'IIT Madras', '9.3 CGPA', '2014'],
      masters: ['MS AI', 'Carnegie Mellon University', '3.9 GPA', '2016'],
      workExperience: [
        { company: 'NVIDIA', role: 'Lead Data Scientist', startDate: '2020-01', endDate: 'Present', description: 'Building AI models for autonomous vehicles' },
        { company: 'Facebook', role: 'Data Scientist', startDate: '2016-07', endDate: '2020-01', description: 'Recommendation systems and feed ranking' },
      ],
      catScore: null,
      catYear: null,
      catPercentile: null,
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
      pricePerSession: 1500,
      rating: 4.6,
      totalReviews: 33,
      verificationStatus: 'APPROVED',
      verifiedBadge: true,
      phone: '+91-9876543213',
      location: 'Delhi, India',
      socialLinks: [
        { platform: 'LinkedIn', url: 'https://linkedin.com/in/priyasharma' },
      ],
      education10th: ['Modern School', '92%', '2005'],
      education12th: ['DPS', '90%', '2007'],
      bachelors: ['BA Psychology', 'Delhi University', '8.5 CGPA', '2011'],
      masters: ['M.Ed Counseling', 'Jamia Millia', '8.8 CGPA', '2013'],
      workExperience: [
        { company: 'Independent Consultant', role: 'Career Counselor', startDate: '2015-06', endDate: 'Present', description: 'Helped 500+ students with career planning' },
        { company: 'Career Launcher', role: 'Counselor', startDate: '2013-07', endDate: '2015-06', description: 'MBA admissions counseling' },
      ],
      catScore: 95.0,
      catYear: 2011,
      catPercentile: 98.5,
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
      pricePerSession: 1000,
      rating: 4.5,
      totalReviews: 8,
      verificationStatus: 'PENDING',
      verifiedBadge: false,
      phone: '+91-9876543214',
      location: 'Pune, India',
      socialLinks: [
        { platform: 'GitHub', url: 'https://github.com/davidkumar' },
      ],
      education10th: ['KV School', '88%', '2012'],
      education12th: ['Kendriya Vidyalaya', '85%', '2014'],
      bachelors: ['BCA', 'Symbiosis', '7.8 CGPA', '2018'],
      masters: [],
      workExperience: [
        { company: 'TCS', role: 'Frontend Developer', startDate: '2019-07', endDate: 'Present', description: 'Building web applications for clients' },
      ],
      catScore: null,
      catYear: null,
      catPercentile: null,
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
      pricePerSession: 1800,
      rating: 4.7,
      totalReviews: 15,
      verificationStatus: 'APPROVED',
      verifiedBadge: true,
      phone: '+91-9876543215',
      location: 'Bangalore, India',
      socialLinks: [
        { platform: 'LinkedIn', url: 'https://linkedin.com/in/anjaliverma' },
        { platform: 'Behance', url: 'https://behance.net/anjaliverma' },
      ],
      education10th: ['Sacred Heart', '91%', '2009'],
      education12th: ['Bishop Cotton', '89%', '2011'],
      bachelors: ['B.Des', 'NID Ahmedabad', '8.6 CGPA', '2015'],
      masters: [],
      workExperience: [
        { company: 'Swiggy', role: 'Senior UX Designer', startDate: '2019-08', endDate: 'Present', description: 'Designing core user flows for food delivery app' },
        { company: 'Razorpay', role: 'UX Designer', startDate: '2016-07', endDate: '2019-08', description: 'Payment flows and merchant dashboard' },
      ],
      catScore: null,
      catYear: null,
      catPercentile: null,
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
            location: mentorInfo.location,
            socialLinks: mentorInfo.socialLinks,
            education10th: mentorInfo.education10th,
            education12th: mentorInfo.education12th,
            bachelors: mentorInfo.bachelors,
            masters: mentorInfo.masters,
            workExperience: mentorInfo.workExperience,
            catScore: mentorInfo.catScore,
            catYear: mentorInfo.catYear,
            catPercentile: mentorInfo.catPercentile,
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
      education10th: ['St. Mary High School', '92%', '2017'],
      education12th: ['Delhi Public School', '88%', '2019'],
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
      education10th: ['KV School', '85%', '2016'],
      education12th: ['National Public School', '82%', '2018'],
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
      education10th: ['Modern School', '90%', '2018'],
      education12th: ['Ryan International', '85%', '2020'],
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
      education10th: ['Convent School', '88%', '2019'],
      education12th: ['Cambridge School', '90%', '2021'],
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
      education10th: ['South Point', '86%', '2017'],
      education12th: ['La Martiniere', '84%', '2019'],
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
      education10th: ['Oakridge', '93%', '2018'],
      education12th: ['Oakridge', '91%', '2020'],
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
            education10th: menteeInfo.education10th,
            education12th: menteeInfo.education12th,
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
      location: 'Delhi, India',
      socialLinks: [
        { platform: 'LinkedIn', url: 'https://linkedin.com/in/alicewilliams' },
      ],
      expertise: ['Digital Marketing', 'Career Planning', 'Communication Skills', 'Content Writing'],
      education10th: ['St. Mary High School', '92%', '2017'],
      education12th: ['Delhi Public School', '88%', '2019'],
      bachelors: ['BA Economics', 'Delhi University', '8.5 CGPA', '2023'],
      masters: [],
      workExperience: [
        { company: 'Startup XYZ', role: 'Product Analytics Intern', startDate: '2023-01', endDate: '2023-06', description: 'Worked on user analytics and growth metrics' },
      ],
      catScore: 92.3,
      catYear: 2023,
      catPercentile: 94.8,
      certifications: ['Google Digital Marketing', 'Content Writing'],
      resumes: [
        { name: 'Alice_Resume.pdf', fileUrl: 'https://storage.example.com/applications/alice_resume.pdf' },
      ],
      pricePerSession: 800,
      status: 'PENDING',
    },
    {
      user: mentees[1], // Bob applying to become mentor
      bio: 'Experienced Software Engineer wanting to help students with coding and system design.',
      headline: 'Software Engineer @ Amazon | AI/ML',
      phone: '+91-9876500002',
      location: 'Mumbai, India',
      socialLinks: [
        { platform: 'LinkedIn', url: 'https://linkedin.com/in/bobpatel' },
        { platform: 'GitHub', url: 'https://github.com/bobpatel' },
      ],
      expertise: ['Java', 'Spring Boot', 'Microservices', 'System Design', 'Machine Learning', 'Python'],
      education10th: ['KV School', '85%', '2016'],
      education12th: ['National Public School', '82%', '2018'],
      bachelors: ['BTech CSE', 'IIT Delhi', '8.2 CGPA', '2022'],
      masters: ['MTech AI', 'IIT Bombay', '8.8 CGPA', '2024'],
      workExperience: [
        { company: 'Amazon', role: 'Software Engineer', startDate: '2022-07', endDate: 'Present', description: 'Working on recommendation systems and ML models' },
      ],
      catScore: null,
      catYear: null,
      catPercentile: null,
      certifications: ['AWS Solutions Architect', 'Oracle Java Certified'],
      resumes: [
        { name: 'Bob_Resume.pdf', fileUrl: 'https://storage.example.com/applications/bob_resume.pdf' },
      ],
      pricePerSession: 1800,
      status: 'APPROVED',
      reviewedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      reviewedBy: admin.id,
    },
    {
      user: mentees[2], // Carol's application rejected
      bio: 'Web developer with 1 year experience, passionate about teaching coding fundamentals.',
      headline: 'Frontend Developer',
      phone: '+91-9876500003',
      location: 'Bangalore, India',
      socialLinks: [
        { platform: 'GitHub', url: 'https://github.com/carolsingh' },
      ],
      expertise: ['HTML', 'CSS', 'JavaScript', 'React'],
      education10th: ['Modern School', '90%', '2018'],
      education12th: ['Ryan International', '85%', '2020'],
      bachelors: ['BTech CSE', 'BITS Pilani', '7.8 CGPA', '2024'],
      masters: [],
      workExperience: [],
      catScore: null,
      catYear: null,
      catPercentile: null,
      certifications: [],
      resumes: [
        { name: 'Carol_Resume.pdf', fileUrl: 'https://storage.example.com/applications/carol_resume.pdf' },
      ],
      pricePerSession: 500,
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
        location: app.location,
        socialLinks: app.socialLinks,
        expertise: app.expertise,
        education10th: app.education10th,
        education12th: app.education12th,
        bachelors: app.bachelors,
        masters: app.masters,
        workExperience: app.workExperience,
        catScore: app.catScore,
        catYear: app.catYear,
        catPercentile: app.catPercentile,
        certifications: app.certifications,
        resumes: app.resumes,
        pricePerSession: app.pricePerSession,
        status: app.status,
        rejectionReason: app.rejectionReason,
        reviewedAt: app.reviewedAt,
        reviewedBy: app.reviewedBy,
      },
    });
    console.log(`✅ Application created for ${app.user.name} - Status: ${app.status}`);
  }

  // ========================================
  // 10. SLOTS FOR MENTORS
  // ========================================
  console.log('\n📅 Creating mentor slots...');
  const slotsCreated = [];
  
  // Create slots for all mentors
  for (let mentorIndex = 0; mentorIndex < mentors.length; mentorIndex++) {
    const mentor = mentors[mentorIndex];
    if (!mentor.mentorProfile) continue;

    // Create slots for next 7 days
    for (let day = 0; day < 7; day++) {
      const date = new Date();
      date.setDate(date.getDate() + day);
      
      // Morning slot (10-11 AM)
      const morningStart = new Date(date);
      morningStart.setHours(10, 0, 0, 0);
      const morningEnd = new Date(date);
      morningEnd.setHours(11, 0, 0, 0);

      const morningSlot = await prisma.slot.create({
        data: {
          mentorId: mentor.mentorProfile.id,
          startTime: morningStart,
          endTime: morningEnd,
          status: day === 0 && mentorIndex < 3 ? 'BOOKED' : 'AVAILABLE',
        },
      });
      slotsCreated.push(morningSlot);

      // Afternoon slot (14-15 PM)
      const afternoonStart = new Date(date);
      afternoonStart.setHours(14, 0, 0, 0);
      const afternoonEnd = new Date(date);
      afternoonEnd.setHours(15, 0, 0, 0);

      const afternoonSlot = await prisma.slot.create({
        data: {
          mentorId: mentor.mentorProfile.id,
          startTime: afternoonStart,
          endTime: afternoonEnd,
          status: day === 1 && mentorIndex === 1 ? 'BOOKED' : 'AVAILABLE',
        },
      });
      slotsCreated.push(afternoonSlot);

      // Evening slot (18-19 PM)
      const eveningStart = new Date(date);
      eveningStart.setHours(18, 0, 0, 0);
      const eveningEnd = new Date(date);
      eveningEnd.setHours(19, 0, 0, 0);

      const eveningSlot = await prisma.slot.create({
        data: {
          mentorId: mentor.mentorProfile.id,
          startTime: eveningStart,
          endTime: eveningEnd,
          status: day === 6 ? 'BLOCKED' : day === 2 && mentorIndex === 2 ? 'BOOKED' : 'AVAILABLE',
        },
      });
      slotsCreated.push(eveningSlot);
    }
    console.log(`✅ Created 21 slots for ${mentor.name}`);
  }

  // ========================================
  // 11. BOOKINGS
  // ========================================
  console.log('\n📦 Creating bookings...');
  const bookingsData = [
    {
      mentor: mentors[0],
      mentee: mentees[0],
      slotIndex: 0, // First available booked slot
      status: 'CONFIRMED',
      sessionMode: 'VIDEO',
      sessionType: 'ONE_ON_ONE',
      purpose: 'Career guidance and resume review for PM roles',
      shareProfile: true,
      meetingLink: 'https://meet.google.com/abc-defg-hij',
    },
    {
      mentor: mentors[1],
      mentee: mentees[1],
      slotIndex: 21 + 7, // Second mentor's afternoon slot
      status: 'COMPLETED',
      sessionMode: 'VIDEO',
      sessionType: 'ONE_ON_ONE',
      purpose: 'Product management interview preparation and case studies',
      shareProfile: true,
      meetingLink: 'https://zoom.us/j/123456789',
    },
    {
      mentor: mentors[2],
      mentee: mentees[2],
      slotIndex: 42 + 14, // Third mentor's slot
      status: 'PENDING',
      sessionMode: 'CHAT',
      sessionType: 'ONE_ON_ONE',
      purpose: 'Quick doubt clearing session on ML algorithms',
      shareProfile: false,
      meetingLink: null,
    },
    {
      mentor: mentors[1],
      mentee: mentees[0],
      slotIndex: 21 + 0, // Sarah's morning slot different day
      status: 'COMPLETED',
      sessionMode: 'VIDEO',
      sessionType: 'ONE_ON_ONE',
      purpose: 'Second session - Mock PM interview',
      shareProfile: true,
      meetingLink: 'https://zoom.us/j/987654321',
    },
    {
      mentor: mentors[3],
      mentee: mentees[3],
      slotIndex: 63 + 7, // Priya's slot
      status: 'CONFIRMED',
      sessionMode: 'AUDIO',
      sessionType: 'ONE_ON_ONE',
      purpose: 'Career counseling for MBA vs MS decision',
      shareProfile: true,
      meetingLink: 'https://meet.google.com/xyz-abcd-efg',
    },
    {
      mentor: mentors[0],
      mentee: mentees[4],
      slotIndex: 7, // John's afternoon slot
      status: 'CANCELLED',
      sessionMode: 'VIDEO',
      sessionType: 'ONE_ON_ONE',
      purpose: 'System design interview prep',
      shareProfile: false,
      cancelledAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      cancelledBy: mentees[4].id,
      cancellationReason: 'Personal emergency, need to reschedule',
    },
    {
      mentor: mentors[5],
      mentee: mentees[5],
      slotIndex: 105 + 0, // Anjali's slot
      status: 'CONFIRMED',
      sessionMode: 'VIDEO',
      sessionType: 'ONE_ON_ONE',
      purpose: 'UX portfolio review and design feedback',
      shareProfile: true,
      meetingLink: 'https://meet.google.com/design-session',
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
        sessionType: bookingData.sessionType,
        purpose: bookingData.purpose,
        shareProfile: bookingData.shareProfile,
        meetingLink: bookingData.meetingLink,
        cancelledAt: bookingData.cancelledAt,
        cancelledBy: bookingData.cancelledBy,
        cancellationReason: bookingData.cancellationReason,
      },
    });
    bookings.push(booking);
    console.log(`✅ Booking created: ${bookingData.mentee.name} → ${bookingData.mentor.name} (${bookingData.status})`);
  }

  // ========================================
  // 12. PAYMENTS
  // ========================================
  console.log('\n💳 Creating payments...');
  for (let i = 0; i < bookings.length; i++) {
    const booking = bookings[i];
    const mentorIndex = mentors.findIndex(m => m.id === booking.mentorId);
    const mentor = mentors[mentorIndex];
    
    let paymentStatus = 'CREATED';
    if (booking.status === 'COMPLETED') paymentStatus = 'SUCCESS';
    else if (booking.status === 'CONFIRMED') paymentStatus = 'SUCCESS';
    else if (booking.status === 'CANCELLED') paymentStatus = 'REFUNDED';

    await prisma.payment.create({
      data: {
        bookingId: booking.id,
        razorpayOrderId: `order_${Math.random().toString(36).substring(7).toUpperCase()}`,
        razorpayPaymentId: paymentStatus === 'SUCCESS' || paymentStatus === 'REFUNDED'
          ? `pay_${Math.random().toString(36).substring(7).toUpperCase()}` 
          : null,
        amount: mentor.mentorProfile?.pricePerSession || 1500,
        currency: 'INR',
        status: paymentStatus,
      },
    });
    console.log(`✅ Payment created for booking ${i + 1} - Status: ${paymentStatus}`);
  }

  // ========================================
  // 13. REVIEWS
  // ========================================
  console.log('\n⭐ Creating reviews...');
  const reviewData = [
    {
      booking: bookings[1], // Sarah's completed session
      rating: 5,
      comment: 'Excellent session! Sarah is very knowledgeable and helped me prepare for my PM interviews. Her insights on product thinking and case studies were invaluable. Highly recommended!',
    },
    {
      booking: bookings[3], // Sarah's second completed session
      rating: 5,
      comment: 'Second session with Sarah was even better! The mock interview was very realistic and her feedback was spot-on. Got an offer from my dream company!',
    },
  ];

  for (const review of reviewData) {
    if (review.booking.status === 'COMPLETED') {
      await prisma.review.create({
        data: {
          bookingId: review.booking.id,
          rating: review.rating,
          comment: review.comment,
        },
      });
      console.log(`✅ Review created for booking ${review.booking.id}`);
    }
  }

  // ========================================
  // 14. EARNINGS
  // ========================================
  console.log('\n💰 Creating earnings records...');
  for (let i = 0; i < bookings.length; i++) {
    const booking = bookings[i];
    if (booking.status === 'COMPLETED' || booking.status === 'CONFIRMED') {
      const mentorIndex = mentors.findIndex(m => m.id === booking.mentorId);
      const mentor = mentors[mentorIndex];
      
      const amount = mentor.mentorProfile?.pricePerSession || 0;
      const platformFee = amount * 0.15; // 15% platform fee
      const netAmount = amount - platformFee;
      
      const isPending = booking.status === 'CONFIRMED';
      
      await prisma.earnings.create({
        data: {
          mentorId: mentor.mentorProfile?.id || '',
          bookingId: booking.id,
          amount: amount,
          platformFee: platformFee,
          netAmount: netAmount,
          status: isPending ? 'PENDING' : 'COMPLETED',
          clearedAt: isPending ? null : new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        },
      });
      console.log(`✅ Earnings recorded for booking ${i + 1}: ₹${netAmount} (after ${platformFee} fee)`);
    }
  }

  // ========================================
  // 15. MENTOR FEEDBACK
  // ========================================
  console.log('\n📝 Creating mentor feedback...');
  for (const booking of bookings) {
    if (booking.status === 'COMPLETED') {
      const mentorIndex = mentors.findIndex(m => m.id === booking.mentorId);
      const mentor = mentors[mentorIndex];
      
      await prisma.mentorFeedback.create({
        data: {
          mentorId: mentor.mentorProfile?.id || '',
          bookingId: booking.id,
          feedbackPdfUrl: `https://storage.example.com/feedback/${booking.id}_feedback.pdf`,
        },
      });
      console.log(`✅ Mentor feedback created for booking ${booking.id}`);
    }
  }

  // ========================================
  // 16. TRANSACTIONS
  // ========================================
  console.log('\n💸 Creating transaction records...');
  const transactionData = [
    // Earnings transactions
    { mentor: mentors[0], type: 'EARNING', amount: 2125, description: 'Session earnings from Alice Williams', reference: bookings[0].id },
    { mentor: mentors[1], type: 'EARNING', amount: 2550, description: 'Session earnings from Bob Patel', reference: bookings[1].id },
    { mentor: mentors[1], type: 'EARNING', amount: 2550, description: 'Session earnings from Alice Williams', reference: bookings[3].id },
    { mentor: mentors[3], type: 'EARNING', amount: 1275, description: 'Session earnings from Emma Desai', reference: bookings[4].id },
    { mentor: mentors[5], type: 'EARNING', amount: 1530, description: 'Session earnings from Grace Reddy', reference: bookings[6].id },
    
    // Withdrawal transactions
    { mentor: mentors[0], type: 'WITHDRAWAL', amount: -10000, description: 'Withdrawal to bank account', reference: 'withdraw_001' },
    { mentor: mentors[1], type: 'WITHDRAWAL', amount: -15000, description: 'Withdrawal to UPI', reference: 'withdraw_002' },
    
    // Platform fee transactions
    { mentor: mentors[0], type: 'PLATFORM_FEE', amount: -375, description: 'Platform commission (15%)', reference: bookings[0].id },
    { mentor: mentors[1], type: 'PLATFORM_FEE', amount: -450, description: 'Platform commission (15%)', reference: bookings[1].id },
    
    // Incentive transactions
    { mentor: mentors[1], type: 'INCENTIVE', amount: 5000, description: 'Bonus for completing 50 sessions', reference: 'incentive_001' },
    { mentor: mentors[0], type: 'INCENTIVE', amount: 2000, description: 'Referral bonus', reference: 'incentive_002' },
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
  // 17. WITHDRAWALS
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
  // 18. PAYOUTS (Admin-initiated)
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
  // 19. INCENTIVES
  // ========================================
  console.log('\n🎁 Creating incentives and rewards...');
  const incentiveData = [
    {
      mentor: mentors[1],
      type: 'milestone',
      title: '50 Sessions Milestone',
      description: 'Congratulations on completing 50 mentoring sessions!',
      amount: 5000,
      status: 'COMPLETED',
      criteria: { sessions_completed: 50 },
      claimedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    },
    {
      mentor: mentors[0],
      type: 'referral',
      title: 'Referral Bonus',
      description: 'Thank you for referring a new mentor to our platform',
      amount: 2000,
      status: 'COMPLETED',
      criteria: { referred_user: 'mentor_xyz' },
      claimedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    },
    {
      mentor: mentors[5],
      type: 'achievement',
      title: 'Rising Star Award',
      description: 'Achieved 4.7+ rating in first month',
      amount: 1000,
      status: 'PENDING',
      criteria: { rating: 4.7, period: 'first_month' },
    },
    {
      mentor: mentors[0],
      type: 'bonus',
      title: 'Top Mentor of the Month',
      description: 'Highest bookings and ratings for January 2026',
      amount: 3000,
      status: 'COMPLETED',
      criteria: { month: 'january_2026', rank: 1 },
      claimedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    },
    {
      mentor: mentors[3],
      type: 'milestone',
      title: '25 Sessions Milestone',
      description: 'Congratulations on completing 25 mentoring sessions!',
      amount: 2500,
      status: 'PENDING',
      criteria: { sessions_completed: 25 },
    },
  ];

  for (const incentive of incentiveData) {
    await prisma.incentive.create({
      data: {
        mentorId: incentive.mentor.mentorProfile?.id || '',
        type: incentive.type,
        title: incentive.title,
        description: incentive.description,
        amount: incentive.amount,
        status: incentive.status,
        criteria: incentive.criteria,
        claimedAt: incentive.claimedAt,
      },
    });
    console.log(`✅ Incentive created for ${incentive.mentor.name}: ${incentive.title} - ₹${incentive.amount}`);
  }

  // ========================================
  // 20. WEBINARS
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
  // 22. NOTIFICATIONS
  // ========================================
  console.log('\n🔔 Creating notifications...');
  const notificationData = [
    { user: mentees[0], title: 'Booking Confirmed', message: 'Your session with John Smith has been confirmed for tomorrow at 10 AM.', isRead: false },
    { user: mentees[0], title: 'New Webinar Available', message: 'Check out the new webinar on Breaking into Product Management starting next week!', isRead: true },
    { user: mentees[1], title: 'Session Completed', message: 'Your session with Sarah Johnson is complete. Please leave a review!', isRead: false },
    { user: mentees[2], title: 'Session Reminder', message: 'Reminder: Your session with Mike Chen starts in 1 hour.', isRead: false },
    { user: mentees[3], title: 'Booking Confirmed', message: 'Your career counseling session with Priya Sharma is confirmed.', isRead: true },
    { user: mentees[4], title: 'Refund Processed', message: 'Your refund of ₹2500 has been processed for the cancelled session.', isRead: false },
    { user: mentees[5], title: 'New Webinar', message: 'Free webinar on Career Paths in Tech - Register now!', isRead: false },
    { user: mentors[0], title: 'New Booking Request', message: 'Alice Williams has booked a session with you for tomorrow.', isRead: true },
    { user: mentors[0], title: 'Withdrawal Completed', message: 'Your withdrawal request of ₹10,000 has been processed successfully.', isRead: true },
    { user: mentors[1], title: 'Payment Received', message: 'You received ₹2,550 for your completed session with Bob Patel.', isRead: false },
    { user: mentors[1], title: 'New Review', message: 'Bob Patel left a 5-star review on your session!', isRead: false },
    { user: mentors[1], title: 'Milestone Achieved', message: 'Congratulations! You have completed 50 sessions. Bonus of ₹5,000 credited.', isRead: true },
    { user: mentors[2], title: 'Upcoming Session', message: 'You have a session with Carol Singh starting in 2 hours.', isRead: false },
    { user: mentors[3], title: 'New Booking', message: 'Emma Desai has booked a career counseling session with you.', isRead: true },
    { user: mentors[4], title: 'Payout Failed', message: 'Your payout of ₹5,000 failed due to invalid bank details. Please update.', isRead: false },
    { user: mentors[5], title: 'Rising Star Award', message: 'You have been awarded the Rising Star badge for excellent performance!', isRead: false },
    { user: admin, title: 'New Mentor Application', message: 'Alice Williams has applied to become a mentor. Please review the application.', isRead: false },
    { user: admin, title: 'New Mentor Application', message: 'Bob Patel has applied to become a mentor. Please review the application.', isRead: true },
    { user: admin, title: 'Withdrawal Request', message: 'Mike Chen has requested a withdrawal of ₹5,000. Approve or reject.', isRead: false },
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
  // 23. VERIFICATION DOCUMENTS
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
    prisma.notification.count(),
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
  console.log(`   🔔 Notifications: ${counts[20]}`);
  console.log(`   📄 Verification Documents: ${counts[21]}`);
  console.log(`   📑 Resumes: ${counts[22]} mentee + ${counts[23]} mentor`);
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
  console.log('   • Complete audit trail with notifications');
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
