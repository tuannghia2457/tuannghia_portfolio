import { Link, useParams } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, ArrowLeft, ArrowDown, Download, Mail, MapPin, House, GraduationCap, School, Languages } from 'lucide-react'
import HomePortrait from './HomePortrait'
import Education from '../components/Education'
import CourseCertificates from '../components/CourseCertificates'
import { Background, Experience, Companies, Testimonials, Awards, Evidence, Skills, ContactInfo } from './SupportingSections'
import { projects, education, ielts } from '../portfolio-data'
import { projectDetails, projectOrder } from '../project-details'
import { profile } from '../profile'
import HeroNameBand from '../components/HeroNameBand'
import HeroTerminal from '../components/HeroTerminal'
import { useScrollTone } from '../lib/useScrollTone'

function PageIntro({ label, title, children }) { return <header className="page-intro section-pad"><p className="section-kicker mono">{label}</p><h1>{title}<span className="period">.</span></h1><p className="page-description">{children}</p></header> }
export function ProjectCards() {
  return <div className="curated-projects">{projectOrder.map((slug, index) => {
    const detail = projectDetails[slug], project = projects.find(p => p.number === detail.number)
    return <Link className="curated-card" to={`/projects/${slug}`} key={slug}>
      <div className="card-topline mono"><span>0{index + 1} / {project.type}</span><ArrowUpRight size={20} /></div>
      <h3>{project.title}</h3><p>{detail.summary}</p><div className="tag-list">{detail.technologies.slice(0, 3).map(tag => <span className="tag mono" key={tag}>{tag}</span>)}</div>
      <span className="card-read">Explore project <ArrowRight size={16} /></span>
    </Link>
  })}</div>
}
function ConnectCTA() { return <section className="connect-cta section-pad"><div><p className="section-kicker mono">RESEARCH / ENGINEERING / COLLABORATION</p><h2>Let’s build something useful.</h2></div><Link className="button button-primary" to="/#contact">Let’s talk <ArrowUpRight size={18} /></Link></section> }
// Personal facts come from profile.js and portfolio-data, never typed in twice.
const [university, highSchool] = ['uts', 'gifted'].map(id => education.find(school => school.id === id))
const [birthCity, birthCountry] = profile.birthplace.split(', ')
const [homeCity, homeCountry] = profile.location.split(', ')
const heroFacts = [
  { Icon: MapPin, label: 'Born in', value: birthCity, detail: birthCountry },
  { Icon: House, label: 'Based in', value: homeCity, detail: homeCountry },
  { Icon: GraduationCap, label: 'University', value: 'UTS · HCMUT', detail: `${university.degree.replace('Bachelor’s degree in ', 'B. ')} · ${university.period.replace('EXPECTED ', 'exp. ')}` },
  // PTNK (Phổ thông Năng khiếu) is the common name of the High School for the Gifted, VNU-HCM.
  { Icon: School, label: 'High school', value: 'PTNK', detail: `VNU-HCM · ${highSchool.program.replace(' Program', '')} · ${highSchool.grade}` },
  { Icon: Languages, label: 'English', value: `IELTS ${ielts.overall}`, detail: 'Overall band score' },
]

export function Home({ children }) { useScrollTone(); return <>
  <section id="top" className="hero editorial-hero hero-stage section-pad" aria-labelledby="hero-title">
    <HeroNameBand />
    <HomePortrait />
    <HeroTerminal />
    <div className="hero-grid"><div className="hero-copy">
      <p className="hero-location-label mono"><span className="status-dot" />{profile.location}</p>
      <p className="hero-greeting mono">HELLO, I’M {profile.displayName.toUpperCase()}</p>
      <h1 id="hero-title">Tuan<br />Nghia<span className="period">.</span></h1>
      <p className="hero-statement">AI Engineer</p>
      <span className="hero-rule" aria-hidden="true"><i /><i /><i /></span>
      <p className="hero-description">I build intelligent systems that help machines understand the visual world, with a focus on computer vision, robotics, and real-world AI applications.</p>
      <div className="hero-actions"><Link className="button button-primary" to="/projects">Explore My Work <ArrowUpRight size={18} /></Link>
        {profile.resumeUrl ? <a className="button hero-secondary" href={profile.resumeUrl} download>Download Resume <Download size={16} /></a> : <a className="button hero-secondary" href="mailto:trantuannghia2457@gmail.com?subject=Resume%20request&body=Hi%20Tuan%20Nghia%2C%0A%0AI%27d%20love%20to%20learn%20more%20about%20your%20experience.%20Could%20you%20share%20your%20resume%3F">Request Resume <Mail size={16} /></a>}
      </div>
    </div></div>
    <dl className="hero-stats hero-facts">{heroFacts.map(({ Icon, label, value, detail }) => <div key={label}><Icon className="hero-fact-icon" size={20} aria-hidden="true" /><dt className="mono">{label}</dt><dd><strong>{value}</strong><span>{detail}</span></dd></div>)}</dl>
    <div className="editorial-hero-bottom"><a className="text-link mono" href="#work">SELECTED WORK <ArrowDown size={14} /></a><span className="mono">PERCEPTION / ROBOTICS / APPLIED AI</span></div>
  </section>
  <section id="work" className="home-work section-pad" data-tone="alt"><div className="compact-heading"><div><p className="section-kicker mono">01 / SELECTED PROJECTS</p><h2>From perception to impact.</h2></div><Link className="text-link" to="/projects">All projects <ArrowRight size={17} /></Link></div><ProjectCards /></section><Background /><Skills /><Testimonials /><ContactInfo />{children}
</> }
export function ExperiencePage() { return <><PageIntro label="EXPERIENCE / COMPANY WORK" title="Experience">My roles, responsibilities, and technical contributions within the companies I’ve worked with.</PageIntro><Experience /><Companies /><ConnectCTA /></> }
// Education carries its own hero-style title, so it skips the shared PageIntro.
export function EducationPage() { return <><Education /><CourseCertificates /><ConnectCTA /></> }
export function Projects() { return <><PageIntro label="PROJECTS / SELECTED WORK" title="Systems for real problems">Computer vision research, human-centered AI, and products with practical impact. Open a project to explore my role, approach, and results.</PageIntro><section id="work" className="project-index section-pad"><ProjectCards /></section><section className="supporting-section section-pad"><details><summary>Awards & recognition</summary><Awards /></details><details><summary>Certificates & supporting evidence</summary><Evidence /></details></section><ConnectCTA /></> }
export function ProjectDetail() {
  const { slug } = useParams(), detail = projectDetails[slug]
  if (!detail) return <NotFound />
  const project = projects.find(p => p.number === detail.number)
  return <article className="project-detail section-pad">
    <Link to="/projects" className="text-link"><ArrowLeft size={16} /> All projects</Link>
    <p className="section-kicker mono">{detail.status} / {project.year}</p><h1>{project.title}<span className="period">.</span></h1><p className="detail-lead">{detail.summary}</p>
    <div className="detail-facts"><div><span className="meta-label mono">MY ROLE</span><strong>{project.role}</strong></div><div><span className="meta-label mono">FOCUS</span><strong>{project.type}</strong></div></div>
    {slug === 'aquaguard' && <figure className="detail-image"><img src="/images/optimized/aquaguard-team.jpg" alt="AquaGuard team with their Engineering Projects in Community Service first-place award" width="960" height="640" /><figcaption className="mono">AQUAGUARD TEAM / ENGINEERING PROJECTS IN COMMUNITY SERVICE SEASON 8</figcaption></figure>}
    <section><h2>Technical approach</h2><p>{detail.technical}</p></section><section><h2>My contributions</h2><ul>{detail.contributions.map(item => <li key={item}>{item}</li>)}</ul></section><section><h2>Technologies</h2><div className="tag-list">{detail.technologies.map(tag => <span className="tag mono" key={tag}>{tag}</span>)}</div></section><section className="detail-result"><span className="section-kicker mono">RESULTS</span><p>{detail.result}</p></section>
    {project.link.startsWith('http') && <a className="button button-primary" href={project.link} target="_blank" rel="noreferrer">Visit {project.title} <ArrowUpRight size={18} /></a>}
    {slug === 'aquaguard' && <details className="project-evidence"><summary>Project certificates</summary><Evidence /></details>}
    <div className="detail-navigation"><Link to="/projects" className="text-link"><ArrowLeft size={16} /> More projects</Link><Link to="/#contact" className="text-link">Discuss this work <ArrowUpRight size={16} /></Link></div>
  </article>
}
export function Research() { return <><PageIntro label="RESEARCH / COMPUTER VISION & ROBOTICS" title="Perception in the real world">I study how machines understand geometry and navigate environments where information is sparse, noisy, or incomplete.</PageIntro>
  <section id="research" className="research-page section-pad"><h2>Research interests</h2><div className="interest-list">{['Natural Language Processing', 'Computer Vision', 'Robotics', 'Artificial Intelligence'].map((topic, index) => <div key={topic}><span className="mono">0{index + 1}</span><h3>{topic}</h3></div>)}</div>
    <div className="compact-heading"><h2>Ongoing work</h2><span className="mono">AT INDIVIDUAL SYSTEMS JOINT STOCK COMPANY / APR 2026 — PRESENT</span></div>
    <div className="research-records">{[
      ['GNSS-denied UAV localization', 'Perception and geometric matching for localization without satellite positioning.', 'Computer vision, canopy segmentation, Voronoi diagrams, and geometric matching.'],
      ['Autonomous robot navigation', 'Perception-based path planning in environments with limited visibility.', 'Path planning and graph construction for autonomous navigation.'],
      ['LiDAR-based pothole detection', 'Detecting damaged road surfaces and testing autonomous navigation.', 'LiDAR, ROS, Gazebo, and JetTank for development and testing.'],
    ].map(([title, summary, technical]) => <article key={title}><h3>{title}</h3><p>{summary}</p><details><summary>Explore the approach</summary><p>{technical}</p></details></article>)}</div>
    <div className="compact-heading"><h2>Publications & presentations</h2></div><article className="publication"><span className="section-kicker mono">CONFERENCE PRESENTATION / Current Topics in Mathematics and Industrial Applications 2026</span><h3>Pothole Surface Reconstruction</h3><p>Geometry-informed reconstruction with RGB cameras, sparse 2D LiDAR, depth functions, and monotonic neural networks.</p><p className="publication-note">Presented at Current Topics in Mathematics and Industrial Applications 2026. A paper link and publication citation are not currently listed in this portfolio.</p><Link className="text-link" to="/experience#ivs-pothole-milestone">Explore the research <ArrowUpRight size={16} /></Link></article>
  </section><ConnectCTA /></> }
export function NotFound() { return <><PageIntro label="404 / PAGE NOT FOUND" title="A little off the path">This page isn’t available.</PageIntro><div className="section-pad not-found"><Link className="button button-primary" to="/">Back to home <ArrowLeft size={16} /></Link></div></> }
