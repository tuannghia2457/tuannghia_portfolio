export const ivsMilestone = {
    title: 'Pothole Surface Reconstruction',
    certificate: null,
    number: '02', summary: 'Reconstructing damaged road surfaces with camera imagery, sparse LiDAR, and geometry-informed learning.',
    contributions: ['Collaborated on research into reconstructing damaged road surfaces from geometry.', 'Combined RGB cameras, sparse 2D LiDAR, depth functions and monotonic neural networks.', 'Presented the research at Current Topics in Mathematics and Industrial Applications 2026.'],
    technical: 'Camera images and sparse range measurements are combined to recover the shape of the road surface. Depth functions and monotonic neural networks do the reconstruction, and the results feed into autonomous robot navigation.',
    technologies: ['RGB cameras', '2D LiDAR', 'Depth functions', 'Monotonic neural networks'],
    result: 'Presented at Current Topics in Mathematics and Industrial Applications 2026. The research supports autonomous robot navigation.', status: 'Applied research · Conference presentation',
}

export const projectDetails = {
  aquaguard: {
    number: '01', summary: 'A flood-response platform with real-time alerts, safety guidance and crowdsourced rescue coordination.',
    contributions: ['Co-founded AquaGuard and work on it as Product Manager.', 'Shaped the product around flood alerts, safety guidance and rescue coordination by the community.', 'Worked with the team on both the web and iOS apps.'],
    technical: 'AquaGuard is built for floods in Vietnam and runs on the web and on iOS. Both apps share the same alerts, safety information and community rescue coordination.',
    technologies: ['Web', 'iOS', 'Real-time alerts', 'Crowdsourced coordination'],
    result: '1st Place at Engineering Projects in Community Service Season 8 and at the OISP Presentation Contest 2025; First Runner-Up at Bach Khoa Innovation 2026. Also recognized at InnoStars and Leave A Nest.', status: 'Ongoing · Flood-response platform',
  },
  'virtualdouble-ant': {
    number: '03', summary: 'A focus companion that works as a virtual body double for neurodivergent people during deep work.',
    contributions: ['Worked as the Backend & AI Developer.', 'Worked on the body-doubling features for neurodivergent users.', 'Used MediaPipe and on-device AI so the experience adapts to the person using it.'],
    technical: 'The companion is designed around neurodivergent users doing deep work. It runs MediaPipe and on-device AI, has a backend behind it, and adapts to the user.',
    technologies: ['Backend systems', 'MediaPipe', 'On-device AI', 'Adaptive UX'],
    result: 'Finalist at the Accessibility Design Competition Hackathon 2026.', status: 'Hackathon finalist · Human-centered AI',
  },
}
export const projectOrder = Object.keys(projectDetails)
