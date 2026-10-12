import { ArrowUpRight, ChevronDown } from 'lucide-react'
import { education } from '../portfolio-data'
import './education.css'

export default function Education() { return <section id="education" className="education-section section-pad" aria-labelledby="education-title">
  <div className="education-heading"><p className="section-kicker mono">STUDY & ACADEMIC ACHIEVEMENTS</p><h2 id="education-title">From physics to artificial intelligence.</h2><p>My education brings together analytical foundations, AI studies, and an international learning environment.</p></div>
  <div className="education-layout">
    <div className="education-records">{education.map(item => <details className="education-record school-card" key={item.institution}>
      <summary className="school-summary">
        <div className="school-identity"><span className="school-logo">{item.logo && <img src={item.logo} alt="" width="64" height="64" loading="lazy" />}</span><h3 id={`school-name-${item.id}`}>{item.institution}</h3></div>
        <p className="education-degree">{item.degree}{item.id === 'gifted' && ` · ${item.program}`}</p>
        <div className="school-summary-footer">{item.grade && <div className="education-grade"><span className="mono">GPA</span><strong>{item.grade}</strong></div>}<span className="school-expand-label">Details <ChevronDown size={17} aria-hidden="true" /></span></div>
      </summary>
      <div className="school-details" role="region" aria-labelledby={`school-name-${item.id}`}>
      {item.period && <p className="school-period mono">{item.period}</p>}
      <p className="education-program">{item.program}</p><p className="education-summary">{item.summary}</p>
      {item.activities.length > 0 && <div className="school-activities"><span className="mono">ACTIVITIES & SOCIETIES</span><ul>{item.activities.map(activity => <li key={activity}>{activity}</li>)}</ul></div>}
      {item.skills.length > 0 && <div className="school-skills"><span className="mono">RELATED SKILLS</span><div className="tag-list">{item.skills.map(skill => <span className="tag mono" key={skill}>{skill}</span>)}</div></div>}
      {item.achievements.length > 0 && <div className="school-achievements"><h4>Achievements & recognition</h4>{item.achievements.map(achievement => <article key={achievement.title}><h5>{achievement.title}</h5>{achievement.href && <a className="text-link" href={achievement.href} target="_blank" rel="noreferrer">{achievement.linkLabel} <ArrowUpRight size={15} /></a>}</article>)}</div>}
      </div>
    </details>)}</div>
    <div className="education-capabilities">
      <article className="language-record"><h3>Languages & communication</h3>
        <div className="academic-language"><strong>English</strong><span>Full professional proficiency</span></div>
        <div className="ielts-record"><span className="mono">IELTS</span><strong>8.0</strong><span>Overall band score</span></div>
        <div className="academic-language"><strong>Japanese</strong><span>Elementary proficiency</span></div>
        <div className="academic-language"><strong>Vietnamese</strong></div>
      </article>
    </div>
  </div>
</section> }
