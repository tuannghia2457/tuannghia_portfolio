import { Link, useParams } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, ArrowLeft, ArrowDown, Download, Mail, MapPin, GraduationCap, FlaskConical, Briefcase, Languages } from 'lucide-react'
import HomePortrait from './HomePortrait'
import Education from '../components/Education'
import CourseCertificates from '../components/CourseCertificates'
import { Background, Experience, Companies, Testimonials, Awards, Evidence, Skills, ContactInfo } from './SupportingSections'
import { projects, ielts, awards } from '../portfolio-data'
import { projectDetails, projectOrder } from '../project-details'
import { research } from '../research'
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
function ConnectCTA() { return <section className="connect-cta section-pad"><div><p className="section-kicker mono">Research / Engineering / Collaboration</p><h2>Let’s build something useful.</h2></div><Link className="button button-primary" to="/#contact">Let’s talk <ArrowUpRight size={18} /></Link></section> }
// Five highlights a visitor can read in seconds: where I am, study, research, work, and my English.
// Facts come from portfolio-data and research.js; each card is one label and one short value.
const heroFacts = [
  { Icon: MapPin, label: 'Location', value: 'HCMC' },
  { Icon: GraduationCap, label: 'Education', value: 'UTS · HCMUT' },
  { Icon: FlaskConical, label: 'Research', value: 'CV & Robotics' },
  { Icon: Briefcase, label: 'Experience', value: 'CV Intern' },
  { Icon: Languages, label: 'English', value: `IELTS ${ielts.overall}` },
]

export function Home({ children }) { useScrollTone(); return <>
  <section id="top" className="hero editorial-hero hero-stage section-pad" aria-labelledby="hero-title">
    <HeroNameBand />
    <HomePortrait />
    <HeroTerminal />
    <div className="hero-grid"><div className="hero-copy">
      <p className="hero-location-label mono"><span className="status-dot" />{profile.location}</p>
      <p className="hero-greeting mono">Hello, I’m {profile.displayName}</p>
      <h1 id="hero-title">Tuan<br />Nghia<span className="period">.</span></h1>
      <p className="hero-statement">AI Engineer</p>
      <span className="hero-rule" aria-hidden="true"><i /><i /><i /></span>
      <p className="hero-description">I build intelligent systems that help machines understand the visual world, with a focus on computer vision, robotics, and real-world AI applications.</p>
      <div className="hero-actions"><Link className="button button-primary" to="/projects">Explore My Work <ArrowUpRight size={18} /></Link>
        {profile.resumeUrl ? <a className="button hero-secondary" href={profile.resumeUrl} download>Download Resume <Download size={16} /></a> : <a className="button hero-secondary" href="mailto:trantuannghia2457@gmail.com?subject=Resume%20request&body=Hi%20Tuan%20Nghia%2C%0A%0AI%27d%20love%20to%20learn%20more%20about%20your%20experience.%20Could%20you%20share%20your%20resume%3F">Request Resume <Mail size={16} /></a>}
      </div>
    </div></div>
    <dl className="hero-stats hero-facts">{heroFacts.map(({ Icon, label, value }) => <div key={label}><Icon className="hero-fact-icon" size={20} aria-hidden="true" /><dt className="mono">{label}</dt><dd>{value}</dd></div>)}</dl>
    <div className="editorial-hero-bottom"><a className="text-link mono" href="#work">Selected work <ArrowDown size={14} /></a><span className="mono">Perception / Robotics / Applied AI</span></div>
  </section>
  <Background /><section id="work" className="home-work section-pad" data-tone="alt"><div className="compact-heading"><div><p className="section-kicker mono">02 / Selected projects</p><h2>From perception to impact.</h2></div><Link className="text-link" to="/projects">All projects <ArrowRight size={17} /></Link></div><ProjectCards /></section><Skills /><Testimonials /><ContactInfo />{children}
</> }
export function ExperiencePage() { return <><PageIntro label="Experience / Company work" title="Experience">My roles, responsibilities, and technical contributions within the companies I’ve worked with.</PageIntro><Experience /><Companies /><ConnectCTA /></> }
// Education carries its own hero-style title, so it skips the shared PageIntro.
export function EducationPage() { return <><Education /><CourseCertificates /><ConnectCTA /></> }
export function Projects() { return <><PageIntro label="Projects / Selected work" title="Systems for real problems">Computer vision research, human-centered AI, and products with practical impact. Open a project to explore my role, approach, and results.</PageIntro><section id="work" className="project-index section-pad"><ProjectCards /></section><section className="supporting-section section-pad"><details><summary>Awards & certificates</summary><Awards /><Evidence /></details></section><ConnectCTA /></> }
// Every project page shares one layout; a project without a photo shows a matching title panel instead.
const projectImages = {
  aquaguard: { src: '/images/optimized/aquaguard-team.jpg', alt: 'AquaGuard team with their Engineering Projects in Community Service first-place award', caption: 'AquaGuard team / Engineering Projects in Community Service Season 8' },
}
export function ProjectDetail() {
  const { slug } = useParams(), detail = projectDetails[slug]
  if (!detail) return <NotFound />
  const project = projects.find(p => p.number === detail.number), image = projectImages[slug]
  const recognition = awards.filter(([, , , name]) => name === project.title)
  const facts = [['My role', project.role], ['Focus', project.type], ['Timeline', project.year]]
  return <article className="project-detail section-pad">
    <Link to="/projects" className="text-link"><ArrowLeft size={16} /> All projects</Link>
    <header className="detail-hero">
      <p className="section-kicker mono">{detail.status}</p><h1>{project.title}<span className="period">.</span></h1><p className="detail-lead">{detail.summary}</p>
      <div className="detail-actions">
        {project.link.startsWith('http') && <a className="button button-primary" href={project.link} target="_blank" rel="noreferrer">Visit {project.title} <ArrowUpRight size={18} /></a>}
        <Link to="/#contact" className="button hero-secondary">Discuss this work <ArrowUpRight size={16} /></Link>
      </div>
    </header>
    <div className="detail-showcase">
      {image
        ? <figure className="detail-image"><img src={image.src} alt={image.alt} width="960" height="640" /><figcaption>{image.caption}</figcaption></figure>
        : <div className="detail-image detail-visual" aria-hidden="true"><span className="detail-visual-title">{project.title}</span><span className="detail-visual-type">{project.type}</span></div>}
      <dl className="detail-facts">{facts.map(([label, value]) => <div key={label}><dt className="meta-label mono">{label}</dt><dd>{value}</dd></div>)}</dl>
    </div>
    <div className="detail-body">
      <div className="detail-main">
        <section><h2>Technical approach</h2><p>{detail.technical}</p></section>
        <section><h2>My contributions</h2><ol className="detail-contributions">{detail.contributions.map((item, index) => <li key={item}><span className="detail-index mono">0{index + 1}</span><p>{item}</p></li>)}</ol></section>
      </div>
      <aside className="detail-aside">
        <section className="detail-panel"><h2>Technologies</h2><div className="tag-list">{detail.technologies.map(tag => <span className="tag mono" key={tag}>{tag}</span>)}</div></section>
        <section className="detail-panel detail-result"><h2>Results</h2>
          {recognition.length ? <ul className="detail-awards">{recognition.map(([number, award, event]) => <li key={number}><strong>{award}</strong><span>{event}</span></li>)}</ul> : <p>{detail.result}</p>}
        </section>
      </aside>
    </div>
    {slug === 'aquaguard' && <details className="project-evidence"><summary>Project certificates</summary><Evidence /></details>}
    <div className="detail-navigation"><Link to="/projects" className="text-link"><ArrowLeft size={16} /> More projects</Link><Link to="/#contact" className="text-link">Discuss this work <ArrowUpRight size={16} /></Link></div>
  </article>
}
export function Research() { return <><PageIntro label="Research / Vision & language" title="Perception in the real world">I study how machines make sense of incomplete information, from locating drones without GPS to answering legal questions from verifiable sources.</PageIntro>
  <section id="research" className="research-page section-pad"><h2>Research interests</h2><div className="interest-list">{['Natural Language Processing', 'Computer Vision', 'Robotics', 'Artificial Intelligence'].map((topic, index) => <div key={topic}><span className="mono">0{index + 1}</span><h3>{topic}</h3></div>)}</div>
    <div className="compact-heading"><h2>Ongoing research</h2></div>
    <div className="research-cards">{research.map(item => <Link className="research-card" to={`/research/${item.slug}`} key={item.slug}>
      <div className="research-card-topline"><span className="mono">{item.lab}</span><span className="research-stage mono">{item.stage}</span></div>
      <h3>{item.title}</h3><p>{item.summary}</p>
      <div className="tag-list">{item.fields.map(field => <span className="tag mono" key={field}>{field}</span>)}</div>
      <span className="card-read">Read the research <ArrowRight size={16} /></span>
    </Link>)}</div>
    <div className="compact-heading"><h2>Publications & presentations</h2></div><article className="publication"><span className="section-kicker mono">Conference presentation / Current Topics in Mathematics and Industrial Applications 2026</span><h3>Pothole Surface Reconstruction</h3><p>Geometry-informed reconstruction with RGB cameras, sparse 2D LiDAR, depth functions, and monotonic neural networks.</p><p className="publication-note">Presented at Current Topics in Mathematics and Industrial Applications 2026. A paper link and publication citation are not currently listed in this portfolio.</p><Link className="text-link" to="/experience#ivs-pothole-milestone">Explore the research <ArrowUpRight size={16} /></Link></article>
  </section><ConnectCTA /></> }
// Research detail pages share the project page layout: title, key facts, focus areas, and a goal/status panel.
export function ResearchDetail() {
  const { slug } = useParams(), item = research.find(entry => entry.slug === slug)
  if (!item) return <NotFound />
  const facts = [['Lab', item.lab], ['Field', item.fields.slice(0, 2).join(' · ')], ['Stage', item.stage]]
  return <article className="project-detail section-pad">
    <Link to="/research" className="text-link"><ArrowLeft size={16} /> All research</Link>
    <header className="detail-hero">
      <p className="section-kicker mono">Ongoing research / {item.lab}</p><h1>{item.title}<span className="period">.</span></h1><p className="detail-lead">{item.summary}</p>
    </header>
    <dl className="detail-facts detail-facts-row">{facts.map(([label, value]) => <div key={label}><dt className="meta-label mono">{label}</dt><dd>{value}</dd></div>)}</dl>
    <div className="detail-body">
      <div className="detail-main">
        <section><h2>Research focus</h2><ol className="detail-contributions">{item.focus.map((entry, index) => <li key={entry}><span className="detail-index mono">0{index + 1}</span><p>{entry}</p></li>)}</ol></section>
      </div>
      <aside className="detail-aside">
        <section className="detail-panel"><h2>Fields</h2><div className="tag-list">{item.fields.map(field => <span className="tag mono" key={field}>{field}</span>)}</div></section>
        <section className="detail-panel detail-result"><h2>Goal</h2><p>{item.goal}</p></section>
        <section className="detail-panel"><h2>Status</h2><p className="detail-status">{item.status}</p></section>
      </aside>
    </div>
    <div className="detail-navigation"><Link to="/research" className="text-link"><ArrowLeft size={16} /> More research</Link><Link to="/#contact" className="text-link">Discuss this research <ArrowUpRight size={16} /></Link></div>
  </article>
}
export function NotFound() { return <><PageIntro label="404 / Page not found" title="A little off the path">This page isn’t available.</PageIntro><div className="section-pad not-found"><Link className="button button-primary" to="/">Back to home <ArrowLeft size={16} /></Link></div></> }
