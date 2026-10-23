import { ArrowUpRight, ChevronDown } from 'lucide-react'
import { RevealItem } from './Reveal'
import { education, ielts } from '../portfolio-data'
import { monthLabel, parsePeriod } from '../lib/timeline'
import './education.css'

const yearOf = month => Math.floor(month / 12)
const titleMonth = label => label.charAt(0) + label.slice(1, 3).toLowerCase() + label.slice(3)
// Partner schools (HCMUT) share a milestone with the school they partner, so only main schools get nodes.
const partners = Object.fromEntries(education.filter(school => school.partnerOf).map(school => [school.partnerOf, school]))
const milestones = education.filter(school => !school.partnerOf)
  .map(school => ({ ...school, ...parsePeriod(school.period) }))
  .sort((a, b) => a.start - b.start)

// Shown without opening Details: the grade, then the first achievement or the program.
const highlightsFor = school => [school.grade && `GPA ${school.grade}`, school.achievements[0]?.title ?? school.program].filter(Boolean)

function Milestone({ school }) {
  const partner = partners[school.id]
  return <article className="education-record school-card" aria-labelledby={`school-name-${school.id}`}>
    <p className="milestone-years mono">
      {yearOf(school.start)} — {school.current ? 'NOW' : yearOf(school.end)}
      {school.current && <span className="milestone-badge">CURRENT</span>}
      {school.expected && <span className="milestone-expected">Expected {titleMonth(monthLabel(school.end))}</span>}
    </p>
    <div className="school-identity"><span className="school-logo"><img src={school.logo} alt="" width="64" height="64" loading="lazy" /></span><h3 id={`school-name-${school.id}`}>{school.institution}</h3></div>
    <p className="education-degree">{school.degree}</p>
    {partner && <p className="milestone-partner">
      <span className="school-logo is-small"><img src={partner.logo} alt="" width="24" height="24" loading="lazy" /></span>
      <span>Studied with <a href={partner.url} target="_blank" rel="noreferrer">{partner.shortName} <ArrowUpRight size={13} aria-hidden="true" /></a> through one transnational education program</span>
    </p>}
    <ul className="milestone-highlights">{highlightsFor(school).map(item => <li key={item}>{item}</li>)}</ul>
    <details className="school-more">
      <summary className="school-expand-label">Details <ChevronDown size={17} aria-hidden="true" /></summary>
      <div className="school-details" role="region" aria-labelledby={`school-name-${school.id}`}>
        <p className="school-period mono">{school.period}</p>
        <p className="education-program">{school.program}</p><p className="education-summary">{school.summary}</p>
        {partner && <p className="education-summary">{partner.summary}</p>}
        {school.activities.length > 0 && <div className="school-activities"><span className="mono">ACTIVITIES & SOCIETIES</span><ul>{school.activities.map(activity => <li key={activity}>{activity}</li>)}</ul></div>}
        {school.skills.length > 0 && <div className="school-skills"><span className="mono">RELATED SKILLS</span><div className="tag-list">{school.skills.map(skill => <span className="tag mono" key={skill}>{skill}</span>)}</div></div>}
        {school.achievements.length > 0 && <div className="school-achievements"><h4>Achievements & recognition</h4>{school.achievements.map(achievement => <article key={achievement.title}><h5>{achievement.title}</h5>{achievement.href && <a className="text-link" href={achievement.href} target="_blank" rel="noreferrer">{achievement.linkLabel} <ArrowUpRight size={15} /></a>}</article>)}</div>}
      </div>
    </details>
  </article>
}

export default function Education() { return <section id="education" className="education-section section-pad" aria-labelledby="education-title">
  <header className="education-intro">
    <p className="section-kicker mono">04 / EDUCATION</p>
    <h1 id="education-title">From physics to <em>artificial intelligence.</em></h1>
    <p>My education brings together analytical foundations, AI studies, and an international learning environment.</p>
  </header>
  <div className="education-layout">
    <ol className="education-timeline">{milestones.map(school => <RevealItem as="li" key={school.id} className={`education-milestone${school.current ? ' is-current' : ''}`}>
      <span className="milestone-rail" aria-hidden="true"><span className="milestone-node" /></span>
      <Milestone school={school} />
    </RevealItem>)}</ol>
    <aside className="education-capabilities">
      <article className="language-record"><h3>Languages & communication</h3>
        <div className="academic-language"><strong>Vietnamese</strong><span>Native</span></div>
        <div className="academic-language"><strong>English</strong><span>Full professional proficiency</span></div>
        <div className="ielts-record"><span className="mono">IELTS</span><strong>{ielts.overall}</strong><span>Overall band score</span></div>
        <div className="academic-language"><strong>Japanese</strong><span>Elementary proficiency</span></div>
      </article>
    </aside>
  </div>
</section> }
