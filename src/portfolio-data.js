import { ivsMilestone } from './project-details'

export const projects = [
  {
    number: '01',
    title: 'AquaGuard',
    type: 'Flood-response platform',
    description: 'A cross-platform system for real-time alerts, safety guidance, and crowdsourced rescue coordination during floods.',
    role: 'Co-Founder & Product Manager',
    year: '2025—NOW',
    tags: ['PRODUCT', 'IOS', 'WEB', 'DISASTER RESPONSE'],
    result: '1st Place — OISP Presentation Contest 2025 · First Runner-Up — Bach Khoa Innovation 2026',
    link: 'https://aquaguard.vn/',
    featured: true,
  },

  {
    number: '03',
    title: 'VirtualDouble / ANT',
    type: 'Human-centered AI',
    description: 'An AI focus companion and cognitive body doubler designed to support neurodivergent users during deep work.',
    role: 'Backend & AI Developer',
    year: '2026',
    tags: ['BACKEND', 'MEDIAPIPE', 'ON-DEVICE AI', 'ADAPTIVE UX'],
    result: 'Finalist — Accessibility Design Competition Hackathon 2026',
    link: '#contact',
    featured: false,
  },
]

export const experience = [
  {
    period: 'APR 2026 — PRESENT',
    title: 'Computer Vision Research Assistant',
    organization: 'Individual Systems Joint Stock Company · Internship',
    milestones: [ivsMilestone],
    logo: '/images/company-logos/ivs.png',
    responsibilities: [
      {
        "text": "Developing a GNSS-denied UAV localization system using computer vision, canopy segmentation, Voronoi diagrams, and geometric matching.",
        "highlights": [
          "GNSS-denied UAV localization",
          "geometric matching"
        ]
      },
      {
        "text": "Implementing perception-based path planning and graph construction for autonomous robot navigation in limited-visibility environments.",
        "highlights": [
          "perception-based path planning",
          "graph construction"
        ]
      },
      {
        "text": "Developing and testing pothole detection and autonomous navigation using LiDAR, ROS, Gazebo, and JetTank.",
        "highlights": [
          "pothole detection",
          "LiDAR, ROS, Gazebo, and JetTank"
        ]
      }
    ],
    stack: 'ROS · C++ · Computer Vision · LiDAR · Gazebo · JetTank',
    location: 'Ho Chi Minh City, Vietnam · On-site',
  },
  {
    period: 'SEP 2025 — JUL 2026',
    title: 'Web Developer',
    organization: 'Best Start English Center · Part-time',
    logo: '/images/company-logos/bsec_ielts.jpg',
    responsibilities: [
      {
        "text": "Co-developed an IELTS assessment platform using Proqyz, HTML, and CSS for 200+ active students per month.",
        "highlights": [
          "IELTS assessment platform",
          "200+ active students per month"
        ]
      },
      {
        "text": "Developed a Playwright automation tool for IELTS content uploads, making the deployment process 3× faster.",
        "highlights": [
          "Playwright automation tool",
          "3× faster"
        ]
      }
    ],
    stack: 'Web Application Development · Stakeholder Management · Playwright',
    location: 'Ho Chi Minh City, Vietnam · Remote',
  },
  {
    period: 'JUN 2025 — MAR 2026',
    title: 'Teaching Assistant',
    organization: 'Best Start English Center · Part-time',
    logo: '/images/company-logos/bsec_ielts.jpg',
    responsibilities: [
      {
        "text": "Coached IELTS Writing & Speaking for classes of 8–12 students.",
        "highlights": [
          "IELTS Writing & Speaking",
          "8–12 students"
        ]
      }
    ],
    stack: 'Communication · Assistant Teaching · IELTS',
    location: 'Ho Chi Minh City, Vietnam · On-site',
  },
  {
    period: 'JUL 2024 — AUG 2024',
    title: 'Low-Code Application Developer',
    organization: 'SDE Digital Technology Company Limited · Internship',
    logo: '/images/company-logos/logo-sde-tech.webp',
    responsibilities: [
      {
        "text": "Developed a time-tracking web app.",
        "highlights": [
          "time-tracking web app"
        ]
      },
      {
        "text": "Supported automation for footwear quality inspection.",
        "highlights": [
          "automation",
          "footwear quality inspection"
        ]
      }
    ],
    stack: 'Mendix · Python · Automation · Web Development',
    location: 'Ho Chi Minh City, Vietnam · On-site',
  },
]

// Dates and company context come from the owner's original profile; roles were supplied directly.
experience.push({
  period: 'JUL 2026 — PRESENT',
  title: 'Chief Technology Officer & Computer Vision Engineer',
  organization: 'Odylytics',
  logo: '/images/company-logos/odylytics-light.png',
  responsibilities: [
    { text: 'Co-founder and Chief Technology Officer at Odylytics, the team behind AquaGuard.', highlights: ['Co-founder and Chief Technology Officer', 'AquaGuard'] },
    { text: 'Contribute as a Computer Vision Engineer at Odylytics.', highlights: ['Computer Vision Engineer'] },
  ],
  stack: 'Technical Leadership · Computer Vision · Product Development',
  location: null,
})

export const awards = [
  ['01', 'First Runner-Up', 'Bach Khoa Innovation', 'AquaGuard'],
  ['02', '1st Place', 'Engineering Projects in Community Service Season 8', 'AquaGuard'],
  ['03', '1st Place', 'OISP Presentation Contest 2025', 'AquaGuard'],
  ['04', 'Finalist', 'InnoStars', 'AquaGuard'],
  ['05', 'Recognition', 'Leave A Nest', 'AquaGuard'],
  ['06', 'Finalist', 'Accessibility Design Competition Hackathon 2026', 'VirtualDouble / ANT'],
]

export const evidence = [
  {
    title: 'EPICS Season 8',
    type: 'Award certificate',
    description: 'AquaGuard recognition from EPICS Season 8.',
    preview: '/images/competitions-certifications/EPICS8/HCMUT%20-%20AquaGuard_page-0001.jpg',
    link: '/images/competitions-certifications/EPICS8/HCMUT%20-%20AquaGuard.pdf',
    linkLabel: 'Open EPICS certificate',
  },
  {
    title: 'EPICS Season 8',
    type: 'Team certificate',
    description: 'Additional AquaGuard certificate naming the project team.',
    preview: '/images/competitions-certifications/EPICS8/HCMUT%20-%20AquaGuard_page-0001.jpg',
    link: '/images/competitions-certifications/EPICS8/HCMUT%20-%20AquaGuard_Nghia.pdf',
    linkLabel: 'Open team certificate',
  },
  {
    title: 'OISP Presentation Contest 2025',
    type: 'First prize certificate',
    description: 'AquaGuardian recognition from the OISP Presentation Contest 2025 materials.',
    preview: '/images/competitions-certifications/OPC25/First%20Prize_AquaGuardian_page-0001.jpg',
    link: '/images/competitions-certifications/OPC25/First%20Prize_AquaGuardian.pdf',
    linkLabel: 'Open OISP Presentation Contest certificate',
  },
  {
    title: 'OISP Presentation Contest 2025',
    type: 'Golden Ticket',
    description: 'A second recognition from the AquaGuardian OISP Presentation Contest materials.',
    link: '/images/competitions-certifications/OPC25/Golden%20Ticket_AquaGuardian.pdf',
    linkLabel: 'Open Golden Ticket',
  },
]

export const academicRecognition = {
  title: 'Dean’s List 2026', institution: 'University of Technology Sydney',
  certificate: '/images/competitions-certifications/UTS/26227165_TuanNghiaTran_DeanList.pdf',
}
export const studentTestimonialUrl = 'https://www.uts.edu.au/about/uts-vision/initiatives/internationalisation/transnational-education/ho-chi-minh-city-university-of-technology'
export const ielts = { overall: '8.0' }

export const education = [
  {
    id: 'uts', institution: 'University of Technology Sydney', logo: '/images/schools/uts.png',
    degree: 'Bachelor’s degree in Artificial Intelligence', program: 'Ho Chi Minh City University of Technology–University of Technology Sydney Transnational Education Program',
    period: 'SEP 2025 — EXPECTED MAY 2028', grade: '6.9 / 7.0',
    summary: 'Studying Artificial Intelligence through the Ho Chi Minh City University of Technology–University of Technology Sydney program, with an academic foundation in programming and AI.',
    activities: ['Class Representative'], skills: ['Python', 'Java'],
    achievements: [
      { title: academicRecognition.title, href: academicRecognition.certificate, linkLabel: 'View Dean’s List certificate' },
      { title: 'Featured in University of Technology Sydney / Ho Chi Minh City University of Technology Student Testimonial', href: studentTestimonialUrl, linkLabel: 'Read my student story' },
      { title: 'Class Voted Collaborator' },
    ],
  },
  {
    id: 'gifted', institution: 'High School for the Gifted, Vietnam National University Ho Chi Minh City', logo: '/images/schools/gifted.jpg',
    degree: 'High School Diploma', program: 'Advanced Physics Program',
    period: 'AUG 2022 — JUN 2025', grade: '9.6 / 10',
    summary: 'An advanced physics background that shaped my approach to analytical thinking and technical problem-solving.',
    activities: [], skills: ['Physics', 'Event Management'],
    achievements: [],
  },
  {
    // Same program and years as UTS (transnational education), so it is shown as UTS's partner, not its own milestone.
    id: 'hcmut', institution: 'Ho Chi Minh City University of Technology', shortName: 'HCMUT', partnerOf: 'uts', url: 'https://hcmut.edu.vn', logo: '/images/schools/hcmut.jpg',
    degree: 'International Transnational Bachelor of Engineering Program with the University of Technology Sydney',
    program: 'Ho Chi Minh City University of Technology–University of Technology Sydney transnational partnership', period: null, grade: null,
    summary: 'My transnational education connects learning at Ho Chi Minh City University of Technology with the University of Technology Sydney within a shared international program.',
    activities: [], skills: [],
    achievements: [],
  },
]

export const courseCertificates = [
  {
    id: 'rag-introduction', title: 'Hands-On AI: Introduction to Retrieval-Augmented Generation (RAG)',
    issuer: 'LinkedIn', issued: 'September 2026',
    skills: ['Artificial Intelligence', 'Retrieval-Augmented Generation (RAG)'], credentialUrl: null,
  },
  {
    id: 'azure-ai-essentials', title: 'Microsoft Azure AI Essentials Professional Certificate',
    issuer: 'Microsoft and LinkedIn', issued: 'September 2026',
    skills: ['Machine Learning', 'Azure AI Studio'], credentialUrl: null,
  },
]

export const technicalSkills = [
  { name: 'Python', category: 'Programming', logo: '/images/skills/python-original.svg' },
  { name: 'C++', category: 'Programming', logo: '/images/skills/cplusplus-original.svg' },
  { name: 'Java', category: 'Programming', logo: '/images/skills/java-original.svg' },
  { name: 'JavaScript', category: 'Programming', logo: '/images/skills/javascript-original.svg' },
  { name: 'Node.js', category: 'Backend', logo: '/images/skills/nodejs-original.svg' },
  { name: 'React', category: 'Frontend', logo: '/images/skills/react-original.svg' },
  { name: 'ROS', category: 'Robotics', logo: '/images/skills/ros-original.svg' },
  { name: 'OpenCV', category: 'Computer vision', logo: '/images/skills/opencv-original.svg' },
  { name: 'PyTorch', category: 'Machine learning', logo: '/images/skills/pytorch-original.svg' },
  { name: 'Docker', category: 'Infrastructure', logo: '/images/skills/docker-original.svg' },
  { name: 'Git', category: 'Tools', logo: '/images/skills/git-original.svg' },
  { name: 'Linux', category: 'Tools', logo: '/images/skills/linux-original.svg' },
]

// Short company names for compact displays such as the experience chart.
export const companyShortNames = {
  'Individual Systems Joint Stock Company': 'IVS',
  'Best Start English Center': 'BSEC',
  'SDE Digital Technology Company Limited': 'SDE',
}

// Skills bento: the first area gets the large block.
// Tool names match technicalSkills (devicon logos) or the generic icons in SkillsBento.jsx.
export const skillAreas = [
  { id: 'ai', label: 'Primary focus', title: 'Machine Learning & AI',
    tools: ['Python', 'PyTorch', 'MediaPipe', 'On-device AI', 'RAG', 'Azure AI'] },
  { id: 'vision', label: 'Perception', title: 'Computer Vision & Robotics',
    tools: ['OpenCV', 'ROS', 'C++', 'LiDAR', 'Gazebo', 'JetTank'] },
  { id: 'product', label: 'Product', title: 'Web & Product',
    tools: ['React', 'JavaScript', 'Node.js', 'Playwright'] },
  { id: 'languages', label: 'Languages', title: 'Programming',
    tools: ['Python', 'C++', 'Java', 'JavaScript'] },
  { id: 'tooling', label: 'Tooling', title: 'Tools & Infrastructure',
    tools: ['Mendix', 'Git', 'Docker', 'Linux'] },
]

export const testimonials = [
  {
    published: false, // Draft copy: awaiting the owner’s approved quote and named author.
    quote: 'Nghia brings strong technical curiosity and turns complex ideas into clear, practical solutions.',
    name: 'Research & Robotics Collaborator',
    organization: 'Individual Systems Joint Stock Company',
  },
  {
    published: false, // Draft copy: awaiting the owner’s approved quote and named author.
    quote: 'He combines ownership, communication, and engineering discipline when building tools for real users.',
    name: 'Project Collaborator',
    organization: 'Best Start English Center',
  },
  {
    published: false, // Draft copy: awaiting the owner’s approved quote and named author.
    quote: 'Nghia learns quickly, works thoughtfully, and connects software development with real operational needs.',
    name: 'Technology Team Collaborator',
    organization: 'SDE Digital Technology Company Limited',
  },
]

