import { useState } from 'react'
import { ArrowDownRight, ArrowUpRight, ExternalLink, Menu, X } from 'lucide-react'

const projects = [
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
    number: '02',
    title: 'Pothole Surface Reconstruction',
    type: 'Applied research',
    description: 'Geometry-informed reconstruction of damaged road surfaces using RGB cameras, sparse 2D LiDAR, depth functions, and monotonic neural networks.',
    role: 'Research Collaborator · Speaker',
    year: '2026',
    tags: ['COMPUTER VISION', 'ROBOTICS', 'LIDAR', 'APPLIED ML'],
    result: 'Presented at CTMIA 2026 · Research connected to autonomous robot navigation',
    link: '#research',
    featured: false,
  },
  {
    number: '03',
    title: 'VirtualDouble / ANT',
    type: 'Human-centered AI',
    description: 'An AI focus companion and cognitive body doubler designed to support neurodivergent users during deep work.',
    role: 'Backend & AI Developer',
    year: '2026',
    tags: ['BACKEND', 'MEDIAPIPE', 'ON-DEVICE AI', 'ADAPTIVE UX'],
    result: 'Finalist — ADC Hackathon 2026',
    link: '#contact',
    featured: false,
  },
]

const experience = [
  {
    period: 'APR 2026 — PRESENT',
    title: 'Research Assistant',
    organization: 'IVS JOINT STOCK COMPANY',
    description: 'Support robotics and computer vision experiments across path planning, pothole detection, surface reconstruction, mapping, and navigation in simulated and real-world environments.',
    stack: 'LiDAR · ROS · Gazebo · JetTank · C++ · Ubuntu',
  },
  {
    period: 'JUL 2026 — PRESENT',
    title: 'Co-Founder',
    organization: 'ODYLYTICS',
    description: 'Building an early-stage student startup around technology, emergency response, and human-centered problem solving. AquaGuard is the team’s flagship project.',
    stack: 'PRODUCT · RESEARCH · STARTUP BUILDING',
  },
  {
    period: 'SEP 2025 — JUL 2026',
    title: 'Web Developer',
    organization: 'BEST START ENGLISH CENTER',
    description: 'Co-developed an IELTS assessment platform serving 200+ active students per month and built Node.js + Playwright automation that improved content deployment speed by approximately 3×.',
    stack: 'HTML · CSS · NODE.JS · PLAYWRIGHT',
  },
  {
    period: 'JUN 2025 — MAR 2026',
    title: 'Teaching Assistant',
    organization: 'BEST START ENGLISH CENTER',
    description: 'Coached IELTS Writing and Speaking for classes of approximately 8–12 students while supporting communication, class activities, and learning delivery.',
    stack: 'TEACHING · COMMUNICATION · PRESENTATION',
  },
  {
    period: 'JUL 2024 — AUG 2024',
    title: 'Low-Code Application Developer',
    organization: 'SDE DIGITAL TECHNOLOGY CO., LTD.',
    description: 'Developed a time-tracking and task-management web application using Mendix and supported Python automation for footwear quality inspection.',
    stack: 'MENDIX · PYTHON · AUTOMATION',
  },
]

const awards = [
  ['01', 'Second Runner-Up', 'Bach Khoa Innovation', 'AquaGuard'],
  ['02', '1st Place', 'EPICS Season 8', 'AquaGuard'],
  ['03', '1st Place', 'OISP Presentation Contest 2025', 'AquaGuard'],
  ['04', 'Finalist', 'InnoStars', 'AquaGuard'],
  ['05', 'Recognition', 'Leave A Nest', 'AquaGuard'],
  ['06', "Dean's List", 'University of Technology Sydney', 'Academic recognition'],
  ['07', 'Finalist', 'ADC Hackathon 2026', 'VirtualDouble / ANT'],
]

const evidence = [
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
    description: 'AquaGuardian recognition from the OPC 2025 materials.',
    preview: '/images/competitions-certifications/OPC25/First%20Prize_AquaGuardian_page-0001.jpg',
    link: '/images/competitions-certifications/OPC25/First%20Prize_AquaGuardian.pdf',
    linkLabel: 'Open OISP certificate',
  },
  {
    title: 'OISP Presentation Contest 2025',
    type: 'Golden Ticket',
    description: 'A second recognition from the AquaGuardian OPC materials.',
    link: '/images/competitions-certifications/OPC25/Golden%20Ticket_AquaGuardian.pdf',
    linkLabel: 'Open Golden Ticket',
  },
  {
    title: "Dean's List",
    type: 'Academic recognition',
    description: 'University of Technology Sydney academic recognition.',
    link: '/images/competitions-certifications/UTS/26227165_TuanNghiaTran_DeanList.pdf',
    linkLabel: "Open Dean's List certificate",
  },
]

const skills = ['Machine Learning', 'Computer Vision', 'Robotics', 'Backend Development', 'Python', 'C++', 'Java', 'Node.js', 'ROS', 'Gazebo', 'LiDAR', 'MediaPipe', 'Playwright', 'RAG', 'Azure AI Studio', 'Product Management', 'User Research', 'Public Speaking']

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#top" onClick={closeMenu}>
          <span className="brand-mark">NT</span>
          <span className="brand-name">NGHIA TUAN TRAN</span>
        </a>
        <button className="menu-toggle" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
          <a href="#work" onClick={closeMenu}>Work</a>
          <a href="#research" onClick={closeMenu}>Research</a>
          <a href="#experience" onClick={closeMenu}>Experience</a>
          <a href="#evidence" onClick={closeMenu}>Evidence</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a className="nav-contact" href="#contact" onClick={closeMenu}>Contact <ArrowUpRight size={15} /></a>
        </nav>
      </header>

      <main id="top">
        <section className="hero section-pad" aria-labelledby="hero-title">
          <div className="hero-label mono">01 / INTRODUCTION</div>
          <div className="hero-grid">
            <div className="hero-copy">
              <h1 id="hero-title">Building<br /><span>human-centered</span><br />technology<span className="period">.</span></h1>
              <p className="hero-description">AI/ML student working across research, robotics, and real-world products. I connect technical systems with the people and problems they are meant to serve.</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#work">View selected work <ArrowDownRight size={18} /></a>
                <a className="text-link" href="#contact">Let’s talk <ArrowUpRight size={16} /></a>
              </div>
            </div>
            <div className="hero-aside">
              <div className="hero-portrait">
                <img src="/images/personal-images/personal_image.JPG" alt="Portrait of Nghia Tuan Tran" />
                <span className="mono">NGHIA TUAN TRAN</span>
              </div>
              <div className="aside-line"></div>
              <p className="mono">AI UNDERGRADUATE AT UTS<br />RESEARCH ASSISTANT AT IVS<br />CO-FOUNDER OF ODYLYTICS</p>
              <p className="aside-location">Based in<br /><strong>Ho Chi Minh City, Vietnam</strong></p>
            </div>
          </div>
          <div className="hero-footer mono">
            <span>SCROLL TO EXPLORE</span>
            <span className="scroll-line"></span>
            <span>AI / CV / ROBOTICS / PRODUCT</span>
          </div>
        </section>

        <section id="work" className="work-section section-pad" aria-labelledby="work-title">
          <div className="section-heading">
            <div className="section-kicker mono">02 / SELECTED WORK</div>
            <h2 id="work-title">Work that<br /><em>means something.</em></h2>
            <p>From flood-response platforms to computer vision research, I build systems around meaningful real-world problems.</p>
          </div>
          <div className="project-list">
            {projects.map((project) => (
              <article className={`project-card ${project.featured ? 'project-featured' : ''}`} key={project.number}>
                <div className="project-topline">
                  <span className="project-number mono">{project.number}</span>
                  <span className="project-type mono">{project.type}</span>
                  <span className="project-year mono">{project.year}</span>
                </div>
                <div className="project-content">
                  <div className="project-title-wrap">
                    <h3>{project.title}</h3>
                    <a className="project-arrow" href={project.link} target={project.link.startsWith('http') ? '_blank' : undefined} rel={project.link.startsWith('http') ? 'noreferrer' : undefined} aria-label={`View ${project.title}`}><ArrowUpRight size={28} /></a>
                  </div>
                  <p className="project-description">{project.description}</p>
                  <div className="project-meta">
                    <div><span className="meta-label mono">ROLE</span><strong>{project.role}</strong></div>
                    <div><span className="meta-label mono">OUTCOME</span><strong>{project.result}</strong></div>
                  </div>
                  <div className="tag-list">{project.tags.map((tag) => <span className="tag mono" key={tag}>{tag}</span>)}</div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="research" className="research-section section-pad section-inverted" aria-labelledby="research-title">
          <div className="section-kicker mono">03 / RESEARCH POSITION</div>
          <div className="research-grid">
            <h2 id="research-title">Curious about<br /><em>what’s underneath.</em></h2>
            <div className="research-copy">
              <p>My research interests sit at the intersection of computer vision, robotics, and applied machine learning. I am especially interested in building perception and navigation systems that can operate reliably in real-world environments.</p>
              <a className="button button-light" href="#experience">Explore research experience <ArrowUpRight size={18} /></a>
            </div>
          </div>
          <div className="research-bottom">
            <div className="research-fact"><span className="fact-number">01</span><span>Surface<br />reconstruction</span></div>
            <div className="research-fact"><span className="fact-number">02</span><span>Autonomous<br />navigation</span></div>
            <div className="research-fact"><span className="fact-number">03</span><span>LiDAR-based<br />perception</span></div>
            <div className="research-fact"><span className="fact-number">04</span><span>Human-centered<br />AI</span></div>
          </div>
        </section>

        <section id="experience" className="experience-section section-pad" aria-labelledby="experience-title">
          <div className="section-heading experience-heading">
            <div className="section-kicker mono">04 / EXPERIENCE</div>
            <h2 id="experience-title">Where I’ve<br /><em>been building.</em></h2>
          </div>
          <div className="experience-list">
            {experience.map((item) => (
              <article className="experience-item" key={`${item.organization}-${item.title}`}>
                <div className="experience-period mono">{item.period}</div>
                <div className="experience-main"><h3>{item.title}</h3><p className="experience-org">{item.organization}</p><p>{item.description}</p><span className="experience-stack mono">{item.stack}</span></div>
                <ArrowUpRight className="experience-icon" size={22} />
              </article>
            ))}
          </div>
        </section>

        <section className="awards-section section-pad section-accent" aria-labelledby="awards-title">
          <div className="section-kicker mono">05 / RECOGNITION</div>
          <div className="awards-header"><h2 id="awards-title">Proof,<br /><em>not noise.</em></h2><p>Awards are supporting evidence of the work — never the whole story.</p></div>
          <div className="awards-list">{awards.map(([number, award, event, project]) => <div className="award-item" key={event}><span className="award-number mono">{number}</span><strong>{award}</strong><span>{event}</span><span className="award-project mono">{project}</span></div>)}</div>
        </section>

        <section id="evidence" className="evidence-section section-pad" aria-labelledby="evidence-title">
          <div className="section-kicker mono">06 / EVIDENCE</div>
          <div className="evidence-header"><h2 id="evidence-title">The work,<br /><em>documented.</em></h2><p>Certificates and academic recognition behind the projects and milestones.</p></div>
          <div className="evidence-grid">
            {evidence.map((item) => (
              <article className={`evidence-card ${item.preview ? '' : 'evidence-card-document'}`} key={`${item.title}-${item.type}`}>
                {item.preview ? <img src={item.preview} alt={`${item.title} — ${item.type}`} /> : <div className="evidence-placeholder mono">PDF<br />DOCUMENT</div>}
                <div className="evidence-card-body">
                  <span className="evidence-type mono">{item.type}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <a href={item.link} target="_blank" rel="noreferrer">{item.linkLabel} <ArrowUpRight size={15} /></a>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section id="about" className="about-section section-pad" aria-labelledby="about-title">
          <div className="section-kicker mono">07 / A LITTLE ABOUT ME</div>
          <div className="about-grid">
            <div><h2 id="about-title">Technical<br /><em>by nature.</em><br />Human by choice.</h2></div>
            <div className="about-copy"><p>Hello, I’m Nghia — an Artificial Intelligence undergraduate at UTS through the HCMUT–UTS program.</p><p>I’m currently a research assistant at IVS, working on robotics and computer vision. I’m also a co-founder of Odylytics and part of the team building AquaGuard, a flood-response platform in Vietnam.</p><p>Across research, product, teaching, and public speaking, I’m interested in the same question: how can we make technology technically strong and genuinely useful to people?</p><div className="about-details"><div><span className="mono">EDUCATION</span><strong>UTS · Bachelor’s in Artificial Intelligence</strong></div><div><span className="mono">LANGUAGES</span><strong>English · Vietnamese · Japanese</strong></div><div><span className="mono">IELTS</span><strong>8.0</strong></div></div></div>
          </div>
        </section>

        <section className="skills-section section-pad section-inverted" aria-labelledby="skills-title">
          <div className="section-kicker mono">08 / TOOLKIT</div><h2 id="skills-title">Things I work with.</h2><div className="skills-list">{skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
        </section>

        <section id="contact" className="contact-section section-pad" aria-labelledby="contact-title">
          <div className="section-kicker mono">08 / CONTACT</div><div className="contact-grid"><h2 id="contact-title">Let’s make<br /><em>something useful.</em></h2><div className="contact-copy"><p>Whether you want to talk about research, AI, robotics, product ideas, or just say hello — my inbox is open.</p><a className="email-link" href="mailto:trantuannghia2457@gmail.com">trantuannghia2457@gmail.com <ArrowUpRight size={20} /></a><div className="social-links"><a href="https://www.linkedin.com/in/tuannghia0405" target="_blank" rel="noreferrer">LinkedIn <ExternalLink size={15} /></a><a href="https://odylytics.com/" target="_blank" rel="noreferrer">Odylytics <ExternalLink size={15} /></a><a href="https://aquaguard.vn/" target="_blank" rel="noreferrer">AquaGuard <ExternalLink size={15} /></a></div></div></div>
        </section>
      </main>

      <footer className="site-footer section-pad"><span className="mono">NGHIA TUAN TRAN © 2026</span><span className="mono">BUILT WITH CURIOSITY / HO CHI MINH CITY</span><a href="#top" className="back-top">BACK TO TOP <ArrowUpRight size={15} /></a></footer>
    </div>
  )
}

export default App
