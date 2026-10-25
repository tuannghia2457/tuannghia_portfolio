import { ArrowUpRight, ExternalLink, FileText, Download, Mail } from 'lucide-react'
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
            <div><h2 id="about-title">Technical<br /><em>by nature.</em><br />Human by choice.</h2></div>
            <div className="about-copy"><p>Hello, I’m Tuan Nghia — an Artificial Intelligence undergraduate at the University of Technology Sydney through the Ho Chi Minh City University of Technology–University of Technology Sydney program.</p><p>I’m currently a computer vision intern at Individual Systems Joint Stock Company, working on robotics and computer vision. I’m also a co-founder of Odylytics and part of the team building AquaGuard, a flood-response platform in Vietnam.</p><p>Across research, product, teaching, and public speaking, I’m interested in the same question: how can we make technology technically strong and genuinely useful to people?</p></div>
          </div>
        </section>) }

export function Experience() { return (<section id="experience" className="experience-section section-pad" aria-labelledby="experience-title">
          <div className="section-heading experience-heading">
            <div className="section-kicker mono">01 / Timeline</div>
            <h2 id="experience-title">Where I’ve<br /><em>been building.</em></h2>
          </div>
          <ExperienceTimeline items={experience} />
        </section>) }

export function Companies() { return <CompanyExplorer /> }

export function Testimonials() {
  const published = testimonials.filter(item => item.published)
  return <section id="testimonials" className="testimonials-section section-pad" aria-labelledby="testimonials-title">
    <p className="section-kicker mono">04 / Testimonials</p>
    <div className="testimonials-heading"><h2 id="testimonials-title">Words from collaborators.</h2><p>Perspectives from the people I’ve worked with.</p></div>
    {published.length ? <div className="testimonials-grid">{published.map(item => <figure className="testimonial-card" key={item.name + item.organization}><blockquote>{item.quote}</blockquote><figcaption><strong>{item.name}</strong><span>{item.organization}</span></figcaption></figure>)}</div> : <div className="testimonials-pending"><span className="testimonial-pending-mark" aria-hidden="true">“</span><div><h3>Recommendations coming soon.</h3><p>This space is reserved for collaborators’ recommendations, with their names and roles.</p></div></div>}
  </section>
}

// Compact certificate list: a small preview or PDF badge, the certificate type and event, and one link.
export function Evidence() { return (<section id="evidence" className="evidence-section section-pad" aria-labelledby="evidence-title">
          <div className="evidence-header"><h2 id="evidence-title">Certificates</h2><p>Proof behind the project and competition milestones.</p></div>
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

function ContactCV() {
  return <article className="contact-cv-card" aria-labelledby="contact-cv-title">
    <div className="contact-cv-heading"><span className="contact-cv-icon" aria-hidden="true"><FileText size={26} strokeWidth={1.5} /></span><div><p className="mono">Professional profile</p><h3 id="contact-cv-title">Curriculum Vitae</h3></div></div>
    <p className="contact-cv-description">My experience, research, and technical work — in one place.</p>
    <div className="contact-cv-footer">{profile.resumeUrl ? <><span className="contact-cv-status mono">Ready to explore</span><a className="button button-primary" href={profile.resumeUrl} download>Download CV <Download size={16} /></a></> : <><span className="contact-cv-status mono">CV coming soon</span><a className="button button-primary" href="mailto:trantuannghia2457@gmail.com?subject=CV%20request&body=Hi%20Tuan%20Nghia%2C%0A%0ACould%20you%20share%20your%20CV%3F">Request CV <Mail size={16} /></a></>}</div>
  </article>
}
export function ContactInfo() { return (<section id="contact" className="contact-section section-pad" aria-labelledby="contact-title">
          <div className="section-kicker mono">05 / Contact</div><div className="contact-grid"><h2 id="contact-title">Let’s make<br /><em>something useful.</em></h2><div className="contact-copy"><p>Whether you want to talk about research, AI, robotics, product ideas, or just say hello — my inbox is open.</p><a className="email-link" href="mailto:trantuannghia2457@gmail.com">trantuannghia2457@gmail.com <ArrowUpRight size={20} /></a><div className="social-links">
            <a href={profile.linkedinUrl} target="_blank" rel="noreferrer">LinkedIn <ExternalLink size={15} /></a>
            {profile.facebookUrl ? <a href={profile.facebookUrl} target="_blank" rel="noreferrer">Facebook <ExternalLink size={15} /></a> : <span className="social-pending" title="Facebook link coming soon">Facebook <small>Coming soon</small></span>}
            <a href={profile.githubUrl} target="_blank" rel="noreferrer">GitHub <ExternalLink size={15} /></a>
          </div><ContactCV /></div></div>
        </section>) }

export function Awards() { return <section className="awards-section recognition-panel" aria-labelledby="awards-title">
  <div className="recognition-heading"><p className="section-kicker mono">Awards & recognition</p><h2 id="awards-title">Project recognition<span className="period">.</span></h2></div>
  <ul className="recognition-grid">{awards.map(([, award, event, project]) => <li key={event}><Link className="award-item recognition-item" to={project === 'AquaGuard' ? '/projects/aquaguard' : '/projects/virtualdouble-ant'}>
    <h3>{event}</h3><span className="recognition-result">{award}</span>
  </Link></li>)}</ul>
</section> }

export function Skills() { return <SkillsBento /> }
