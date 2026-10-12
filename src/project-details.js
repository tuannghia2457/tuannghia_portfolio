export const projectDetails = {
  'pothole-surface-reconstruction': {
    number: '02', summary: 'Reconstructing damaged road surfaces with camera imagery, sparse LiDAR, and geometry-informed learning.',
    contributions: ['Research collaboration on geometry-informed reconstruction of damaged road surfaces.', 'Work combining RGB cameras, sparse 2D LiDAR, depth functions, and monotonic neural networks.', 'Presented the research at Current Topics in Mathematics and Industrial Applications 2026.'],
    technical: 'The work brings camera imagery and sparse range measurements together to study road surface geometry. Depth functions and monotonic neural networks support reconstruction, connecting perception research to autonomous robot navigation.',
    technologies: ['RGB cameras', '2D LiDAR', 'Depth functions', 'Monotonic neural networks'],
    result: 'Presented at Current Topics in Mathematics and Industrial Applications 2026. Research connected to autonomous robot navigation.', status: 'Applied research · Conference presentation',
  },
  aquaguard: {
    number: '01', summary: 'A flood-response platform connecting real-time alerts, safety guidance, and crowdsourced rescue coordination.',
    contributions: ['Co-founded AquaGuard and contributed as Product Manager.', 'Shaped a platform around real-time flood alerts, safety guidance, and crowdsourced rescue coordination.', 'Worked with the team across web and iOS product development.'],
    technical: 'A cross-platform flood-response system for Vietnam. Web and iOS experiences bring alerts, safety information, and community rescue coordination into a shared product.',
    technologies: ['Web', 'iOS', 'Real-time alerts', 'Crowdsourced coordination'],
    result: '1st Place — Engineering Projects in Community Service Season 8; 1st Place — OISP Presentation Contest 2025; First Runner-Up — Bach Khoa Innovation 2026. Additional recognition at InnoStars and Leave A Nest.', status: 'Ongoing · Flood-response platform',
  },
  'virtualdouble-ant': {
    number: '03', summary: 'A focus companion and cognitive body doubler designed to support neurodivergent users during deep work.',
    contributions: ['Contributed as Backend & AI Developer.', 'Worked on a focus companion and cognitive body doubling experience for neurodivergent users.', 'Applied MediaPipe and on-device AI within an adaptive user experience.'],
    technical: 'The project explores human-centered AI for deep work. Backend development, MediaPipe, and on-device AI support an adaptive focus companion built around neurodivergent users.',
    technologies: ['Backend systems', 'MediaPipe', 'On-device AI', 'Adaptive UX'],
    result: 'Finalist — Accessibility Design Competition Hackathon 2026.', status: 'Hackathon finalist · Human-centered AI',
  },
}
export const projectOrder = Object.keys(projectDetails)
