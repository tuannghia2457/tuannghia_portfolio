import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, ExternalLink } from 'lucide-react'
import { experience, awards, evidence, technicalSkills, testimonials } from '../portfolio-data'
import { profile } from '../profile'
import CompanyExplorer from '../components/CompanyExplorer'
function TestimonialsSlideshow() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const testimonial = testimonials[index]

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const timer = window.setInterval(() => setIndex(current => (current + 1) % testimonials.length), 5000)
    return () => window.clearInterval(timer)
  }, [paused])

  const move = (direction) => setIndex(current => (current + direction + testimonials.length) % testimonials.length)

  return (
    <div className="testimonials-showcase" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false) }}>
      <article className="testimonial-slide" aria-live="polite">
        <span className="testimonial-mark" aria-hidden="true">“</span>
        <blockquote>{testimonial.quote}</blockquote>
        <div className="testimonial-attribution"><strong>{testimonial.name}</strong><span className="mono">{testimonial.organization}</span></div>
      </article>
      <div className="testimonials-controls">
        <span className="mono">{String(index + 1).padStart(2, '0')} <span>/ {String(testimonials.length).padStart(2, '0')}</span></span>
        <div className="skills-dots" role="group" aria-label="Choose testimonial">
          {testimonials.map((item, dotIndex) => <button key={item.organization} type="button" className={dotIndex === index ? 'is-active' : ''} aria-label={`Show testimonial from ${item.organization}`} aria-current={dotIndex === index ? 'true' : undefined} onClick={() => setIndex(dotIndex)} />)}
        </div>
        <div className="skills-arrows"><button type="button" onClick={() => move(-1)} aria-label="Previous testimonial"><ArrowLeft size={18} /></button><button type="button" onClick={() => move(1)} aria-label="Next testimonial"><ArrowRight size={18} /></button></div>
      </div>
    </div>
  )
}

export function Background() { return (<section id="about" className="about-section section-pad" aria-labelledby="about-title">
          <div className="section-kicker mono">01 / BACKGROUND</div>
          <div className="about-grid">
            <div><h2 id="about-title">Technical<br /><em>by nature.</em><br />Human by choice.</h2></div>
            <div className="about-copy"><p>Hello, I’m Tuan Nghia — an Artificial Intelligence undergraduate at UTS through the HCMUT–UTS program.</p><p>I’m currently a research assistant at IVS, working on robotics and computer vision. I’m also a co-founder of Odylytics and part of the team building AquaGuard, a flood-response platform in Vietnam.</p><p>Across research, product, teaching, and public speaking, I’m interested in the same question: how can we make technology technically strong and genuinely useful to people?</p><div className="about-details"><div><span className="mono">EDUCATION</span><strong>UTS · Bachelor’s in Artificial Intelligence</strong></div><div><span className="mono">LANGUAGES</span><strong>English · Vietnamese · Japanese</strong></div><div><span className="mono">IELTS</span><strong>8.0</strong></div></div></div>
          </div>
        </section>) }

export function Experience() { return (<section id="experience" className="experience-section section-pad" aria-labelledby="experience-title">
          <div className="section-heading experience-heading">
            <div className="section-kicker mono">02 / EXPERIENCE</div>
            <h2 id="experience-title">Where I’ve<br /><em>been building.</em></h2>
          </div>
          <div className="experience-list">
            {experience.map((item) => (
              <article className="experience-item" key={`${item.organization}-${item.title}`}>
                <div className="experience-period mono">{item.period}</div>
                <div className="experience-main"><h3>{item.title}</h3><p className="experience-org">{item.organization}</p>{item.location && <p className="experience-location mono">{item.location}</p>}<details className="experience-details"><summary>Responsibilities & contributions</summary><p>{item.description}</p></details><span className="experience-stack mono">{item.stack}</span></div>
                <ArrowUpRight className="experience-icon" size={22} />
              </article>
            ))}
          </div>
        </section>) }

export function Companies() { return <CompanyExplorer /> }

export function Testimonials() { return (<section id="testimonials" className="testimonials-section section-pad section-inverted" aria-labelledby="testimonials-title">
          <div className="section-kicker mono">WORDS FROM COLLABORATORS</div>
          <div className="testimonials-heading"><h2 id="testimonials-title">What working<br /><em>together feels like.</em></h2><p>A few words that reflect the way I collaborate across research, education, and technology teams.</p></div>
          <TestimonialsSlideshow />
        </section>) }

export function Evidence() { return (<section id="evidence" className="evidence-section section-pad" aria-labelledby="evidence-title">
          <div className="section-kicker mono">SUPPORTING EVIDENCE</div>
          <div className="evidence-header"><h2 id="evidence-title">The work,<br /><em>documented.</em></h2><p>Certificates and academic recognition behind the projects and milestones.</p></div>
          <div className="evidence-grid">
            {evidence.map((item) => (
              <article className={`evidence-card ${item.preview ? '' : 'evidence-card-document'}`} key={`${item.title}-${item.type}`}>
                {item.preview ? <a className="evidence-preview" href={item.link} target="_blank" rel="noreferrer" aria-label={item.linkLabel}><img src={item.preview.includes('EPICS') ? '/images/optimized/epics-certificate.jpg' : '/images/optimized/oisp-certificate.jpg'} alt={`${item.title} — ${item.type}`} width="720" height="510" loading="lazy" decoding="async" /></a> : <div className="evidence-placeholder mono"><span>PDF</span>DOCUMENT / {item.type}</div>}
                <div className="evidence-card-body">
                  <span className="evidence-type mono">{item.type}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <a href={item.link} target="_blank" rel="noreferrer">{item.linkLabel} <ArrowUpRight size={15} /></a>
                </div>
              </article>
            ))}
          </div>
        </section>) }

export function ContactInfo() { return (<section id="contact" className="contact-section section-pad" aria-labelledby="contact-title">
          <div className="section-kicker mono">01 / CONTACT</div><div className="contact-grid"><h2 id="contact-title">Let’s make<br /><em>something useful.</em></h2><div className="contact-copy"><p>Whether you want to talk about research, AI, robotics, product ideas, or just say hello — my inbox is open.</p><a className="email-link" href="mailto:trantuannghia2457@gmail.com">trantuannghia2457@gmail.com <ArrowUpRight size={20} /></a><div className="social-links">
            <a href={profile.linkedinUrl} target="_blank" rel="noreferrer">LinkedIn <ExternalLink size={15} /></a>
            {profile.facebookUrl ? <a href={profile.facebookUrl} target="_blank" rel="noreferrer">Facebook <ExternalLink size={15} /></a> : <span className="social-pending" title="Facebook link coming soon">Facebook <small>Coming soon</small></span>}
            {profile.resumeUrl ? <a href={profile.resumeUrl} target="_blank" rel="noreferrer">CV <ExternalLink size={15} /></a> : <span className="social-pending" title="CV will be available soon">CV <small>Coming soon</small></span>}
          </div></div></div>
        </section>) }

export function Awards() { return (<section className="awards-section section-pad section-accent" aria-labelledby="awards-title">
          <div className="awards-header"><h2 id="awards-title">Proof,<br /><em>not noise.</em></h2><p>Awards are supporting evidence of the work — never the whole story.</p></div>
          <div className="awards-list">{awards.map(([number, award, event, project]) => <div className="award-item" key={event}><span className="award-number mono">{number}</span><strong>{award}</strong><span>{event}</span><span className="award-project mono">{project}</span></div>)}</div>
        </section>) }

export function Skills() { return <section className="skills-section section-pad"><span className="section-kicker mono">TECHNICAL TOOLKIT</span><h2>Tools I build with.</h2><div className="toolkit-grid">{technicalSkills.map(skill => <div key={skill.name}><span className="mono">{skill.category}</span><strong>{skill.name}</strong></div>)}</div></section> }
