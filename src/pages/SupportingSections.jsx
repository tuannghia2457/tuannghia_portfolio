import { useEffect, useState } from 'react'
import { ArrowUpRight, ExternalLink, FileText, Download, Mail, Phone } from 'lucide-react'
import { experience, awards, evidence, testimonials } from '../portfolio-data'
import { profile } from '../profile'
import CompanyExplorer from '../components/CompanyExplorer'
import ExperienceTimeline from '../components/ExperienceTimeline'
import SkillsBento from '../components/SkillsBento'
import './recognition.css'
import { Link } from 'react-router-dom'
export function Background() { return (<section id="about" className="about-section section-pad" aria-labelledby="about-title">
          <div className="section-kicker mono">01 / Background</div>
          <div className="about-grid">
            <div><h2 id="about-title">Studying AI,<br /><em>building with it.</em></h2>
              <figure className="about-photo"><img src="/images/optimized/aquaguard-team.jpg" alt="The AquaGuard team holding their first-place award from Engineering Projects in Community Service Season 8" width="960" height="640" loading="lazy" decoding="async" /><figcaption>The AquaGuard team, the day we took first place at Engineering Projects in Community Service Season 8.</figcaption></figure></div>
            <div className="about-copy"><p>I’m Tuan Nghia, an AI student at UTS through the HCMUT–UTS program and a computer vision intern at IVS, working on robotics.</p><p>I co-founded Odylytics and help build AquaGuard, a flood-response platform in Vietnam. In research, product work and teaching alike, what I care about is whether the thing I made helps the people using it.</p></div>
          </div>
        </section>) }

export function Experience() { return (<section id="experience" className="experience-section section-pad" aria-labelledby="experience-title">
          <div className="section-heading experience-heading">
            <div className="section-kicker mono">01 / Timeline</div>
            <h2 id="experience-title">Where I’ve<br /><em>worked.</em></h2>
          </div>
          <ExperienceTimeline items={experience} />
        </section>) }

export function Companies() { return <CompanyExplorer /> }

export function Testimonials() {
  const published = testimonials.filter(item => item.published)
  return <section id="testimonials" className="testimonials-section section-pad" aria-labelledby="testimonials-title">
    <p className="section-kicker mono">04 / Testimonials</p>
    <div className="testimonials-heading"><h2 id="testimonials-title">Words from collaborators.</h2><p>What people I’ve worked with say about me.</p></div>
    {published.length ? <div className="testimonials-grid">{published.map(item => <figure className="testimonial-card" key={item.name + item.organization}><blockquote>{item.quote}</blockquote><figcaption><strong>{item.name}</strong><span>{item.organization}</span></figcaption></figure>)}</div> : <div className="testimonials-pending"><span className="testimonial-pending-mark" aria-hidden="true">“</span><div><h3>Recommendations coming soon.</h3><p>I’m collecting recommendations from people I’ve worked with. They’ll appear here with each person’s name and role.</p></div></div>}
  </section>
}

// Compact certificate list: a small preview or PDF badge, the certificate type and event, and one link.
export function Evidence() { return (<section id="evidence" className="evidence-section section-pad" aria-labelledby="evidence-title">
          <div className="evidence-header"><h2 id="evidence-title">Certificates</h2><p>Certificates from the competitions listed above.</p></div>
          <ul className="evidence-grid">
            {evidence.map((item) => (
              <li className="evidence-card" key={`${item.title}-${item.type}`}>
                {item.thumb ? <img className="evidence-thumb" src={item.thumb} alt="" width="72" height="51" loading="lazy" decoding="async" /> : <span className="evidence-thumb evidence-thumb-pdf mono" aria-hidden="true"><FileText size={18} strokeWidth={1.6} />PDF</span>}
                <div className="evidence-card-body">
                  <span className="evidence-type mono">{item.type}</span>
                  <h3>{item.title}</h3>
                  <a href={item.link} target="_blank" rel="noreferrer" aria-label={item.linkLabel}>Open <ArrowUpRight size={15} /></a>
                </div>
              </li>
            ))}
          </ul>
        </section>) }

// Nghia's own clock, so a visitor knows whether it's a good moment to expect a reply.
function LocalTime() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => { const timer = setInterval(() => setNow(new Date()), 30_000); return () => clearInterval(timer) }, [])
  const options = { timeZone: 'Asia/Ho_Chi_Minh' }
  const time = now.toLocaleTimeString('en-US', { ...options, hour: 'numeric', minute: '2-digit' })
  const hour = Number(now.toLocaleString('en-US', { ...options, hour: 'numeric', hourCycle: 'h23' }))
  const late = hour >= 23 || hour < 7
  return <p className="contact-local-time"><span className="status-dot" aria-hidden="true" />It’s {time} here in Ho Chi Minh City{late ? ', so I’ll probably reply in the morning.' : '.'}</p>
}

function ContactCV() {
  return <article className="contact-cv-card" aria-labelledby="contact-cv-title">
    <div className="contact-cv-heading"><span className="contact-cv-icon" aria-hidden="true"><FileText size={26} strokeWidth={1.5} /></span><div><p className="mono">Professional profile</p><h3 id="contact-cv-title">Curriculum Vitae</h3></div></div>
    <p className="contact-cv-description">A summary of my experience, research and projects.</p>
    <div className="contact-cv-footer">{profile.resumeUrl ? <><span className="contact-cv-status mono">Available</span><a className="button button-primary" href={profile.resumeUrl} download>Download CV <Download size={16} /></a></> : <><span className="contact-cv-status mono">CV coming soon</span><a className="button button-primary" href="mailto:trantuannghia2457@gmail.com?subject=CV%20request&body=Hi%20Tuan%20Nghia%2C%0A%0ACould%20you%20share%20your%20CV%3F">Request CV <Mail size={16} /></a></>}</div>
  </article>
}
export function ContactInfo() { return (<section id="contact" className="contact-section section-pad" aria-labelledby="contact-title">
          <div className="section-kicker mono">05 / Contact</div><div className="contact-grid"><div className="contact-heading"><h2 id="contact-title">Get in<br /><em>touch.</em></h2><div className="social-links">
            <a href={profile.linkedinUrl} target="_blank" rel="noreferrer">LinkedIn <ExternalLink size={17} /></a>
            {profile.facebookUrl ? <a href={profile.facebookUrl} target="_blank" rel="noreferrer">Facebook <ExternalLink size={17} /></a> : <span className="social-pending" title="Facebook link coming soon">Facebook <small>Coming soon</small></span>}
            <a href={profile.githubUrl} target="_blank" rel="noreferrer">GitHub <ExternalLink size={17} /></a>
          </div><LocalTime /></div><div className="contact-copy"><p>Email me about research, AI, robotics or a product idea, or just to say hello.</p><div className="contact-methods"><a className="email-link" href="mailto:trantuannghia2457@gmail.com">trantuannghia2457@gmail.com <ArrowUpRight size={20} /></a><a className="email-link phone-link" href={profile.phoneHref} aria-label={`Call ${profile.phone}`}><Phone size={18} aria-hidden="true" />{profile.phone}</a></div>
          <ContactCV /></div></div>
        </section>) }

export function Awards() { return <section className="awards-section recognition-panel" aria-labelledby="awards-title">
  <div className="recognition-heading"><p className="section-kicker mono">Awards & recognition</p><h2 id="awards-title">Project recognition<span className="period">.</span></h2></div>
  <ul className="recognition-grid">{awards.map(([, award, event, project]) => <li key={event}><Link className="award-item recognition-item" to={project === 'AquaGuard' ? '/projects/aquaguard' : '/projects/virtualdouble-ant'}>
    <h3>{event}</h3><span className="recognition-result">{award}</span>
  </Link></li>)}</ul>
</section> }

export function Skills() { return <SkillsBento /> }
